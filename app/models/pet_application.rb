class PetApplication < ApplicationRecord
    STATUSES = ["Approved", "Pending", "We're sorry, but your application has been denied"]
    
    belongs_to :customer
    belongs_to :pet

    validates :customer_id, presence: true
    validates :pet_id, presence: true, uniqueness: { scope: :customer_id }
    validates :customer_text, presence: true, length: { maximum: 200 }
    validates :status, inclusion: { in: STATUSES }
end

# build custom method - set adoption status; 
# if no applications or none with status = "Pending", adoption_status = "Available"
# if any application swith status = "Approved", adoption_status = "Adopted"
# if any applications with status = "Pending", adoption_status = "Application(s) Pending"
