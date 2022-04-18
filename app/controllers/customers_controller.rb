class CustomersController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :invalid_record

    def create
        new_customer = Customer.create!(customer_params)
        new_user = new_customer.user.create!(user_params)
        # new_user.profile = new_customer
        # is this line necessary?
        new_user.profile_type = "customer" 
        # alternate...
        # new_customer.user << User.create!(user_params)
        # session[:user_id] = new_customer.user.id
        session[:user_id] = new_user.id
        render json: new_customer, status: :created
    end

    def update
        user = User.find_by(id: session[:user_id])
        if user
            user.update!(user_params)
            customer = user.profile
            customer.update!(customer_params)
            render json: customer
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
        params.permit(:first_name, :last_name, :interested_in)
    end

    def user_params
       params.permit(:email, :password, :password_confirmation, :phone_number, :city, :state)
    end

end
