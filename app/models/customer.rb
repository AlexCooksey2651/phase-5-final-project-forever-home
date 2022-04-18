class Customer < ApplicationRecord
    ANIMALS = ["Dog", "Cat", "Other Mammal", "Bird", "Reptile/Amphibian", "Fish"]

    has_one :user, as: :profile
    has_many :applications, dependent: :destroy
    has_many :pets, through: :applications
    has_many :bookmarks, dependent: :destroy
    has_many :pets, through: :bookmarks

    validates :first_name, presence: true, length: { min: 2 }
    validates :last_name, presence: true, length: { min: 2 }
    validates :interested_in, presence: true, inclusion: { in: ANIMALS }

end
