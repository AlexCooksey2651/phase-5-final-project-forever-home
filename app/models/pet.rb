class Pet < ApplicationRecord
    include Rails.application.routes.url_helpers
    
    ANIMALS = ["Dog", "Cat", "Other Mammal", "Bird", "Reptile/Amphibian", "Fish"]
    AGE_UNITS = ["Weeks", "Months", "Years"]
    ADOPTION_STATUSES = ["Adopted", "Application(s) Pending", "Available"]

    has_many :pet_applications, dependent: :destroy
    has_many :customers, through: :pet_applications
    has_many :bookmarks, dependent: :destroy
    has_many :customers, through: :bookmarks
    has_one_attached :image_file
    belongs_to :shelter

    validates :name, presence: true, length: { in: 2..20 }
    validates :image_file, presence: true, on: :create
    validates :bio, presence: true, length: { maximum: 200 }
    validates :species, presence: true, inclusion: { in: ANIMALS }
    validates :age, presence: true, inclusion: { in: 1..20 }
    validates :age_unit, presence: true, inclusion: { in: AGE_UNITS }
    validates :shelter_id, presence: true
    validates :adoption_status, inclusion: { in: ADOPTION_STATUSES }

    def image_url
        if image_file.attached?
            url_for(image_file)
        end
    end
    
    # def set_adoption_status
    #     if self.pet_applications.any? { |app| app.status == "Approved" }
    #         self.adoption_status = "Adopted"
    #     elsif self.pet_applications.any? { |app| app.status == "Pending" }
    #         self.adoption_status = "Application(s) Pending"
    #     else
    #         self.adoption_status = "Available"
    #     end
    # end
end


