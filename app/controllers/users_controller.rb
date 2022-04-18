class UsersController < ApplicationController
    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, include: :profile, status: :ok
        else
            render json: {error: "Unauthorized user"}, status: :unauthorized
        end
    end
end