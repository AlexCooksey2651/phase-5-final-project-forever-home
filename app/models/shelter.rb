class Shelter < ApplicationRecord
    has_one :user, as: :profile
    has_many :pets, dependent: :destroy
    has_many :applications, through: :pets
end
