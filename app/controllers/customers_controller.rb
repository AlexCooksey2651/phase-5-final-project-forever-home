class CustomersController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :invalid_record

    def index
        customers = Customer.all
        render json: customers
    end

    def create
        new_customer = Customer.create!(customer_params)
        session[:user_id] = new_customer.user.id
        render json: new_customer, status: :created
    end

    def update
        # user = User.find_by(id: session[:user_id])
        # customer = Customer.find(user.profile.id)
        customer = Customer.find_by(id: params[:id])
        if customer
            customer.update!(customer_params)
            render json: customer
        else
            render json: {error: "User not found"}, status: :not_found
        end
    end

    def destroy
        # user = User.find_by(id: session[:user_id])
        # if user
        #     customer_id = user.profile.id
        #     customer = Customer.find_by(id: customer_id)
        #     customer.destroy
        #     head :no_content
        # else
        #     render json: {error: "User not found"}, status: :not_found
        # end
        customer = Customer.find_by(id: params[:id])
        customer.destroy
        head :no_content
    end

    private 

    def invalid_record(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def customer_params
        params.permit(:first_name, :last_name, :interested_in, user_attributes: [:email, :password, :password_confirmation, :phone_number, :city, :state])
    end

    # def user_params
    #    params.permit(:email, :password, :password_confirmation, :phone_number, :city, :state)
    # end

end
