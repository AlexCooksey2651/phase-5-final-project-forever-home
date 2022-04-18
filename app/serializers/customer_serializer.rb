class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :interested_in

  has_one :user, as: :profile
  has_many :pet_applications
  has_many :pets, through: :pet_applications
  has_many :bookmarks
  has_many :pets, through: :bookmarks

end
