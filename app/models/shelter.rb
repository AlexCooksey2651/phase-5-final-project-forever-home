class Shelter < ApplicationRecord
    has_one :user, as: :profile
    has_many :pets, dependent: :destroy
    has_many :applications, through: :pets

    validates :name, presence: true, uniqueness: true, length: { in: 2..40 }
    validates :bio, presence: true, length: { max: 200 }
end
