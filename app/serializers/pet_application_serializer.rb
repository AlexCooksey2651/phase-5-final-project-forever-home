class PetApplicationSerializer < ApplicationSerializer
  attributes :id, :date, :customer_text

  belongs_to :customer
  belongs_to :pet
end
