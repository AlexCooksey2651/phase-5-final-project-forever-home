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
            pets = Pet.where(adoption_status: ["Available", "Application Pending"], shelter_id: user.profile.id)
            render json: pets
        else
            render json: {error: "User not found"}, status: :not_found
        end
    end

    def adopted_pets_index
        user = User.find_by(id: session[:user_id])
        if user
            pets = Pet.where("adoption_status = ? AND shelter_id = ?", "Adopted", user.profile.id)
            render json: pets
        else
            render json: {error: "User not found"}, status: :not_found
        end
    end


    # NOTES: want to filter so that only showing animals whose species is included within the array of species held in user's profile
    def customer_index
        user = User.find_by(id: session[:user_id])
        if user
            interested_in = user.profile.interested_in
            pets = Pet.all
            shown_pets = pets.filter { |pet| interested_in.include?(pet[:species]) }
            render json: shown_pets, include: ['shelter', 'shelter.user']
        else
            render json: {error: "User not found"}, status: :not_found
        end
    end

    private 

    def invalid_record(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def pet_params
        params.permit(:name, :image, :bio, :species, :age, :age_unit, :shelter_id, :adoption_status, :adoption_date)
    end

end

# t.string :name
#       t.string :image
#       t.text :bio
#       t.string :species
#       t.integer :age
#       t.string :age_unit
#       t.integer :shelter_id
#       t.string :adoption_status
#       t.date :adoption_date
