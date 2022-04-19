class UsersController < ApplicationController
    # def index
    #     users = User.all
    #     render json: users
    # end

    # def destroy
    #     user = User.find_by(id: params[:id])
    #     user.destroy
    #     head :no_content
    # end

    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, include: :profile, status: :ok
        else
            render json: {error: "Unauthorized user"}, status: :unauthorized
        end
    end

end