class PetsController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :invalid_record
    def index
        pets = Pet.all
        render json: pets
    end

    def show
        pet = Pet.find_by(id: params[:id])
        render json: pet
    end
    
    def create
        user = User.find_by(id: session[:user_id])
        if user
            new_pet = user.profile.pets.create!(pet_params)
            render json: new_pet, methods: :image_url, status: :created
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
            render json: pet, methods: :image_url, status: :ok
        else
            render json: {error: "Pet not found"}, status: :not_found
        end
    end

    def shelter_index
        user = User.find_by(id: session[:user_id])
        if user
            pets = Pet.where(adoption_status: ["Available", "Application(s) Pending"], shelter_id: user.profile.id).order(:species, :name)
            render json: pets, methods: :image_url
        else
            render json: {error: "User not found"}, status: :not_found
        end
    end

    def adopted_pets_index
        user = User.find_by(id: session[:user_id])
        if user
            pets = Pet.where("adoption_status = ? AND shelter_id = ?", "Adopted", user.profile.id).order(:species, :name)
            render json: pets, include: ['pet_applications', 'pet_applications.customer.user'], methods: :image_url
        else
            render json: {error: "User not found"}, status: :not_found
        end
    end


    # NOTES: want to filter so that only showing animals whose species is included within the array of species held in user's profile
    # def customer_index
    #     user = User.find_by(id: session[:user_id])
    #     if user
    #         interested_in = user.profile.interested_in
    #         pets = Pet.all
    #         available_pets = pets.where(adoption_status: ["Available", "Application(s) Pending"]).order(:species, :name)
    #         shown_pets = available_pets.filter { |pet| interested_in.include?(pet[:species]) }
    #         render json: shown_pets, include: ['shelter', 'shelter.user', 'pet.bookmarks']
    #     else
    #         render json: {error: "User not found"}, status: :not_found
    #     end
    # end

    def customer_index
        user = User.find_by(id: session[:user_id])
        if user
            pets = Pet.all
            available_pets = pets.where(adoption_status: ["Available", "Application(s) Pending"]).order(:species, :name)
            render json: available_pets, include: ['shelter', 'shelter.user', 'pet.bookmarks'], methods: :image_url
        else
            render json: {error: "User not found"}, status: :not_found
        end
    end

    private 

    def invalid_record(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end

    def pet_params
        params.permit(:name, :image_file, :bio, :species, :age, :age_unit, :shelter_id, :adoption_status, :adoption_date)
    end

end
