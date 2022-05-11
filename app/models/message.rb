class Message < ApplicationRecord
    SENDERS = ["customer", "shelter"]
    
    belongs_to :customer
    belongs_to :shelter

    validates :message_text, presence: true, length: { maximum: 400 }
    validates :sender, inclusion: { in: SENDERS }
    validates :pet_name, presence: true
end
