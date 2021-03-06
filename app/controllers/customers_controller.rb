class CustomersController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :invalid_record

    def index
        customers = Customer.all
        render json: customers
    end

    def create
        new_customer = Customer.create!(customer_params)
        session[:user_id] = new_customer.user.id
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, status: :created
        else
            render json: {error: "User not found"}
        end
    end

    def update
        user = User.find_by(id: session[:user_id])
        if user
            customer = Customer.find_by(id: params[:id])
            customer.update!(customer_params)
            render json: user
        else
            render json: {error: "User not found"}, status: :not_found
        end
    end

    def destroy
        user = User.find_by(id: session[:user_id])
        if user
            customer_id = user.profile.id
            customer = Customer.find_by(id: customer_id)
            customer.destroy
            head :no_content
        else
            render json: {error: "User not found"}, status: :not_found
        end
    end

    private 

    def invalid_record(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def customer_params
        params.permit(:first_name, :last_name, :interested_in => [], user_attributes: [:id, :email, :password, :password_confirmation, :phone_number, :city, :state])
    end

end
