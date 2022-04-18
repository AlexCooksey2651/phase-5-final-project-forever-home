class PetApplicationsController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :invalid_record

    def create
        user = User.find_by(id: session[:user_id])
        if user
            new_application = user.profile.pet_applications.create!(application_params)
            render json: new_application, status: :created
        else
            render json: {error: "User not found"}, status: :not_found
        end
    end

    def destroy
        application = PetApplication.find_by(id: params[:id])
        if application
            application.destroy
            head :no_content
        else
            render json: {error: "Application not found"}, status: :not_found
        end
    end

    def update
        application = PetApplication.find_by(id: params[:id])
        if application
            application.update!(application_params)
            render json: application, status: :ok
        else
            render json: {error: "Application not found"}, status: :not_found
        end
    end

    def shelter_index
        user = User.find_by(id: session[:user_id])
        if user
            shelter_applications = PetApplication.where(pet.shelter.user = user)
            render json: shelter_applications, include: ['customer', 'customer.user'], status: :ok
        else
            render json {error: "User not found"}, status: :not_found
        end
    end

    def customer_index
        user = User.find_by(id: session[:user_id])
        if user
            customer_applications = user.profile.pet_applications
            render json: customer_applications, include: ['pet', 'pet.shelter', 'pet.shelter.user'], status: :ok
        else
            render json {error: "User not found"}, status: :not_found
        end
    end

    def adopt
        pet = Pet.find_by(id: params[:pet_id])
        if pet
            approved_application = PetApplication.find_by(id: params[:id])
            if approved_application
                approved_application.update!(status: "Approved")
                denied_applications = pet.applications.where(:id != params[:id])
                denied_applications.each do |application|
                    application.update!(status: "Denied")
                end
                pet.update!(adoption_date: Date.today, adoption_status: "Adopted")
                render json: approved_application, status: :ok
            else
                render json: {error: "Application not found"}, status: :not_found 
            end
        else
            render json: {error: "Pet not found"}, status: :not_found
        end
    end

    private

    def invalid_record(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def application_params
        params.permit(:date, :customer_id, :pet_id, :customer_text, :status)
    end

    def pet_params
        params.permit(:adoption_status, :adoption_date)
    end
end
