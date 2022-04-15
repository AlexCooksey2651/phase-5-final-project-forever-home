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
            shelter_applications = user.profile.pet.pet_applications
            # profile = user.profile
            # shelter_applications = PetApplication.where(pet.shelter = profile)
            render json: shelter_applications, status: :ok
        else
            render json {error: "User not found"}, status: :not_found
        end
    end

    def customer_index
        user = User.find_by(id: session[:user_id])
        if user
            customer_applications = user.profile.pet_applications
            # profile = user.profile
            # customer_applications = PetApplication.where(customer = profile)
            render json: customer_applications, status: :ok
        else
            render json {error: "User not found"}, status: :not_found
        end
    end

    def adopt
        application = PetApplication.find_by(id: params[:id])
        if application
            application.update!(params[:status])
            application.pet.update!(pet_params)
            render json: application, status: :ok
        else
            render json: {error: "Application not found"}, status: :not_found
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
