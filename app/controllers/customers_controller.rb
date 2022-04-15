class CustomersController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :invalid_record

    def create
        new_customer = Customer.create!(customer_params)
        new_user = new_customer.user.create!(user_params)
        user.profile_type = "customer"
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
    end

    private 

    def invalid_record(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def customer_params
        params.permit(:first_name, :last_name, :interested_in)
    end

    def user_params
        (:email, :password, :password_confirmation, :phone_number, :city, :state)
    end

end
