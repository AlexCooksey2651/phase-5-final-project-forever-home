class ShelterSerializer < ActiveModel::Serializer
  attributes :id, :name, :bio

  has_one :user, as: :profile
  has_many :pets
  has_many :applications, through: :pets
end
