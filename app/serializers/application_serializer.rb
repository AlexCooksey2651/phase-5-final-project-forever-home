class ApplicationSerializer < ActiveModel::Serializer
  attributes :id, :customer_id, :pet_id, :date, :customer_text
end
