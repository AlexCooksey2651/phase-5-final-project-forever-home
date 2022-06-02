class MessagesController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :invalid_record
    
    def index
        user = User.find_by(id: session[:user_id])
        if user
            messages = user.profile.messages.order("created_at DESC")
            render json: messages, status: :ok
        else
            render json: {error: "User not found"}, status: :not_found
        end
    end
    
    def create
        user = User.find_by(id: session[:user_id])
        if user
            new_message = user.profile.messages.create!(message_params)
            render json: new_message, status: :created
        else
            render json: {error: "User not found"}, status: :not_found
        end
    end

    private 

    def invalid_record(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def message_params
        params.permit(:sender, :customer_id, :shelter_id, :pet_name, :message_text)
    end
end
