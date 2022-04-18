class PetApplication < ApplicationRecord
    belongs_to :customer
    belongs_to :pet

    validates :customer_id, presence: true, uniqueness: { scope: :pet_id }
    validates :pet_id, presence: true
    validates :date, presence: true
    validates :customer_text, presence: true, length: { max: 200 }
end
