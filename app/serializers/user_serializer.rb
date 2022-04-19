class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :city, :state, :phone_number

  belongs_to :profile, polymorphic: true
end
