class PetSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :bio, :species, :age, :age_unit, :adoption_status, :adoption_date

  has_many :pet_applications
  has_many :customers, through: :pet_applications
  has_many :bookmarks
  has_many :customers, through: :bookmarks
  belongs_to :shelter
end
