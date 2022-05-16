class PasswordsController < ApplicationController    
    before_action :find_user

    def forgot
        user = User.find_by(email: params[:email])
        token = password_reset_token
        user.update!(recovery_password: token)
        if user.recovery_password_digest != nil
            PasswordMailer.reset_password(user).deliver_now
            render json: { alert: "An email has been sent to reset your password." }, status: :ok
        else
            render json: {error: "Please try again"}
        end
    end

    def reset
        if user&.authenticate_recovery_password(params[:recovery_password])
            user.update!(password_params)
            session[:user_id] = user.id
            render json: user, status: :ok
        else
            render json: {error: "An error was encountered when reseting your password, please try again"}
        end
    end
    
    private 

    def find_user
        user = User.find_by(email: params[:email])
    end
    
    def password_params
        params.permit(:email, :password, :password_confirmation, :recovery_password)
    end

    def password_reset_token
        SecureRandom.urlsafe_base64
    end
end

# HELLO THERE THIS IS A TEST
