class Pet < ApplicationRecord
    ANIMALS = ["Dog", "Cat", "Other Mammal", "Bird", "Reptile/Amphibian", "Fish"]
    AGE_UNITS = ["Weeks", "Months", "Years"]
    has_many :pet_applications, dependent: :destroy
    has_many :customers, through: :pet_applications
    has_many :bookmarks, dependent: :destroy
    has_many :customers, through: :bookmarks
    belongs_to :shelter

    validates :name, presence: true
    validates :image, presence: true
    validates :bio, presence: true, length: { maximum: 200 }
    validates :species, presence: true, inclusion: { in: ANIMALS }
    validates :age, presence: true, inclusion: { in: 1..20 }
    validates :age_unit, presence: true, inclusion: { in: AGE_UNITS }
    validates :shelter_id, presence: true
    # validates :adoption_status, >>> want it "Available" on instantiation
    # validates :adoption_date, >>> want it NIL on instantiation
    
    
end
