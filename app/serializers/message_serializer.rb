class MessageSerializer < ActiveModel::Serializer
  attributes :id, :sender, :customer_id, :shelter_id, :pet_name, :message_text, :created_at

  belongs_to :customer
  belongs_to :shelter
end
