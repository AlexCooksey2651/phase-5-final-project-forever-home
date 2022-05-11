class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :interested_in, :bookmarks, :pet_applications

  has_one :user, as: :profile
  has_many :pet_applications
  has_many :pets, through: :pet_applications
  has_many :bookmarks
  has_many :pets, through: :bookmarks
  has_many :messages

end
