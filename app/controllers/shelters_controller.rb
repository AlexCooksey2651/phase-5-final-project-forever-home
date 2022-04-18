class SheltersController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :invalid_record

    def create
        new_shelter = Shelter.create!(shelter_params)
        user = new_shelter.user.create!(user_params)
        user.profile_type = "shelter"
        session[:user_id] = user.id
        render json: new_shelter, status: :created
    end

    def update
        user = User.find_by(id: session[:user_id])
        if user
            user.update!(user_params)
            shelter = user.profile
            shelter.update!(shelter_params)
            render json: shelter
        else
            render json: {error: "User not found"}, status: :not_found
        end
    end

    def destroy
        user = User.find_by(id: session[:user_id])
        if user
            shelter_id = user.profile.id
            shelter = Shelter.find_by(id: shelter_id)
            shelter.destroy
            head :no_content
        else
            render json: {error: "User not found"}, status: :not_found
        end
    end

    private 

    def invalid_record(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def shelter_params
        params.permit(:name, :bio)
    end

    def user_params
        (:email, :password, :password_confirmation, :phone_number, :city, :state)
    end
end
