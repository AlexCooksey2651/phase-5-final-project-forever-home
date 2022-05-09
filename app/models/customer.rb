class Customer < ApplicationRecord
    ANIMALS = ["Dog", "Cat", "Other Mammal", "Bird", "Reptile/Amphibian", "Fish"]

    has_one :user, as: :profile, dependent: :destroy
    has_many :pet_applications, dependent: :destroy
    has_many :pets, through: :pet_applications
    has_many :bookmarks, dependent: :destroy
    has_many :pets, through: :bookmarks

    validates :first_name, presence: true, length: { minimum: 2 }
    validates :last_name, presence: true, length: { minimum: 2 }
    validates :interested_in, presence: true, inclusion: { in: ANIMALS }

    accepts_nested_attributes_for :user

end

