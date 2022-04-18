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

    # def create
    #     new_user = User.create!(user_params)



    private
    
    # def user_params
    #     params.permit(:profile, :email, :password, )
end