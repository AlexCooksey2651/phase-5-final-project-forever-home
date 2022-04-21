class PetApplicationSerializer < ActiveModel::Serializer
  attributes :id, :date, :customer_text, :status

  belongs_to :customer
  belongs_to :pet
end
