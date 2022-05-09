class Bookmark < ApplicationRecord
    belongs_to :pet
    belongs_to :customer

    validates :pet_id, presence: true, uniqueness: { scope: :customer_id }
    validates :customer_id, presence: true
end
