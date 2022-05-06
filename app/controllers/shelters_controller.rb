class SheltersController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :invalid_record

    def index
        shelters = Shelter.all
        render json: shelters
    end


    def create
        new_shelter = Shelter.create!(shelter_params)
        session[:user_id] = new_shelter.user.id
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, status: :created
        else
            render json: {error: "User not found"}
        end
    end

    # TEST CUSTOMER VERSION TO SEE IF WORKS BETTER
    # def create
    #     new_shelter = Shelter.create!(shelter_params)
    #     session[:user_id] = new_shelter.user.id
    #     user = User.find_by(id: session[:user_id])
    #     if user
    #         render json: user, status: :created
    #     else
    #         render json: {error: "User not found"}
    #     end
    # end

    def update
        user = User.find_by(id: session[:user_id])
        if user
            shelter_id = user.profile.id
            shelter = Shelter.find_by(id: shelter_id)
            shelter.update!(shelter_params)
            render json: user
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
        params.permit(:name, :bio, user_attributes: [:email, :password, :password_confirmation, :phone_number, :city, :state])
    end

    # def user_params
    #     (:email, :password, :password_confirmation, :phone_number, :city, :state)
    # end
end
