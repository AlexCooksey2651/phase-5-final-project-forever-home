class PetApplication < ApplicationRecord
    STATUSES = ["Approved", "Pending", "We're sorry, but your application has been denied"]
    
    belongs_to :customer
    belongs_to :pet

    # validates :customer_id, presence: true, uniqueness: { scope: :pet_id }
    # validates :pet_id, presence: true
    # validates :date, presence: true
    # validates :customer_text, presence: true, length: { max: 200 }
    # validates :status, inclusion: { in: STATUSES }
end
