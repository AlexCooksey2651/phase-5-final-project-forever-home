class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :password_digest, :city, :state, :phone_number, 

  belongs_to :profile, polymorphic: true
end
