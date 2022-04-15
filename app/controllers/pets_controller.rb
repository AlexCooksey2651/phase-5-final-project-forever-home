class PetsController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :invalid_record
    def create
        user = User.find_by(id: session[:user_id])
        if user
            new_pet = user.profile.pets.create!(pet_params)
            render json: new_pet, status: :created
        else
            render json: {error: "User not found"}, status: :not_found
        end
    end
    
    def destroy
        pet = Pet.find_by(id: params[:id])
        if pet
            pet.destroy
            head :no_content
        else
            render json: {error: "Pet not found"}, status: :not_found
        end
    end

    def update
        pet = Pet.find_by(id: params[:id])
        if pet
            pet.update!(pet_params)
            render json: pet, status: :ok
        else
            render json: {error: "Pet not found"}, status: :not_found
        end
    end

    def shelter_index
        user = User.find_by(id: session[:user_id])
        if user
            pets = user.profile.pets
            render json: pets
        else
            render json: {error: "User not found"}, status: :not_found
        end
    end

    # def customer_index
    #     user = User.find_by(id: session[:user_id])
    #     if user
    #         interested_in = user.profile.interested_in
    #         pets = Pet.all
    #         shown_pets = pets.filter(pet => interested_in.includes(pet.species))
    #         render json: shown_pets, status: :ok
    #     else
    #         render json: {error: "User not found"}, status: :not_found
    #     end
    # end
    
    private 

    def invalid_record(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

end
