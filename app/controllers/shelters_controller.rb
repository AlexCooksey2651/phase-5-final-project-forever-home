class SheltersController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :invalid_record

    def create
        new_shelter = Shelter.create!(shelter_params)
        user = new_shelter.user.create!(user_params)
        user.profile_type = "shelter"
        session[:user_id] = new_user.id
        render json: new_shelter, status: :created
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
