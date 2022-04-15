class Shelter < ApplicationRecord
    has_one :user, as: :profile
    has_many :pets
    has_many :applications, through: :pets
end
