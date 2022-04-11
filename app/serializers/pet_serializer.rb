class PetSerializer < ApplicationSerializer
  attributes :id, :name, :image, :bio, :species, :age, :shelter_id, :adoption_status
end
