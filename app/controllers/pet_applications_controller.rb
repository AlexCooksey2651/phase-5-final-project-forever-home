class PetApplicationsController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :invalid_record
    
    def shelter_index
        user = User.find_by(id: session[:user_id])
        if user
            shelter = Shelter.find_by(id: user.profile.id)
            pets = shelter.pets
            applications = []
            pets.each do |pet|
                apps = pet.pet_applications
                matching = apps.where.not(status: "Approved").order(:created_at)
                matching.each do |app|
                    applications << app
                end
            end
            render json: applications, include: ['pet', 'customer', 'customer.user'], status: :ok
        else
            render json: {error: "User not found"}, status: :not_found
        end
    end

    def customer_index
        user = User.find_by(id: session[:user_id])
        if user
            customer_applications = user.profile.pet_applications.order(:created_at)
            render json: customer_applications, include: ['pet', 'pet.shelter', 'pet.shelter.user'], status: :ok
        else
            render json: {error: "User not found"}, status: :not_found
        end
    end

    def create
        user = User.find_by(id: session[:user_id])
        if user
            new_application = user.profile.pet_applications.create!(application_params)
            # NOTE: if pet.adoption_status isn't "application(s) pending", should update to pending
            # pet = Pet.find_by(id: new_application.pet.id)
            # if pet.status == "Available"
            #     pet.update!(adoption_status: "Application(s) pending")
            # end
            pet = Pet.find_by(id: params[:pet_id])
            if pet.adoption_status == "Available"
                pet.update!(adoption_status: "Application(s) Pending")
            end
            render json: new_application, status: :created
        else
            render json: {error: "User not found"}, status: :not_found
        end
    end

    def destroy
        application = PetApplication.find_by(id: params[:id])
        if application
            # NOTE: if pet.applications.length now = 0, adoption_status should update to "Available"
            # pet = Pet.find_by(id: application.pet.id)
            application.destroy
            pet = Pet.find_by(id: application.pet.id)
            petApps = pet.pet_applications
            active = petApps.where(status: "Pending")
            if active.length > 0
                pet.update(adoption_status: "Application(s) Pending")
            else
                pet.update!(adoption_status: "Available")
            end
            # if pet.applications.length = 0
            #     pet.update!(adoption_status: "Available")
            # end
            
            head :no_content
        else
            render json: {error: "Application not found"}, status: :not_found
        end
    end

    def update 
        application = PetApplication.find_by(id: params[:id])
        if application
            # NOTE: if pet.applications doesn't have any that aren't 
            application.update!(application_params)
            pet = Pet.find_by(id: application.pet.id)
            petApps = pet.pet_applications
            active = petApps.where(status: "Pending")
            if active.length > 0
                pet.update(adoption_status: "Application(s) Pending")
            else
                pet.update!(adoption_status: "Available")
            end
            render json: application, status: :ok
        else
            render json: {error: "Application not found"}, status: :not_found
        end
    end

    def adopt
        pet = Pet.find_by(id: params[:pet_id])
        if pet
            approved_application = PetApplication.find_by(id: params[:id])
            if approved_application
                approved_application.update!(status: "Approved")
                pet.update!(adoption_date: Date.today, adoption_status: "Adopted")
                denied_applications = pet.pet_applications.where.not(id: params[:id])
                denied_applications.each do |application|
                    application.update!(status: "We're sorry but your application has been denied")
                end
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

# include: ['customer', 'customer.user']