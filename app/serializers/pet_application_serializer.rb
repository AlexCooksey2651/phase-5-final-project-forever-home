class PetApplicationSerializer < ActiveModel::Serializer
  attributes :id, :customer_text, :status, :created_at, :customer 

  belongs_to :customer
  belongs_to :pet
end
