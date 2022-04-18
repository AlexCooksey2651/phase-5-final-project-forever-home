class PetSerializer < ApplicationSerializer
  attributes :id, :name, :image, :bio, :species, :age, :age_unit, :adoption_status, :adoption_date

  has_many :applications
  has_many :customers, through: :applications
  has_many :bookmarks
  has_many :customers, through: :bookmarks
  belongs_to :shelter
end
