class Shelter < ApplicationRecord
    has_one :user, as: :profile, dependent: :destroy
    has_many :pets, dependent: :destroy
    has_many :pet_applications, through: :pets

    validates :name, presence: true, uniqueness: true, length: { in: 2..40 }
    validates :bio, presence: true, length: { maximum: 200 }

    accepts_nested_attributes_for :user
end

 # def set_adoption_status
    #     if self.applications.any? { |application| application.status == "Adopted" }
    #         self.adoption_status = "Adopted"
    #     elsif self.applications.any? { |application| application.status == "Application Pending" }
    #         self.adoption_status = "Application(s) Pending"
    #     else
    #         self.adoption_status = "Available"
    #     end
    # end