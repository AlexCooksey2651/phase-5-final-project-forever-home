class Shelter < ApplicationRecord
    has_one :user, as: :profile, dependent: :destroy
    has_many :pets, dependent: :destroy
    has_many :pet_applications, through: :pets
    has_many :messages, dependent: :destroy
    has_many :customers, through: :messages

    validates :name, presence: true, uniqueness: true, length: { in: 2..40 }
    validates :bio, presence: true, length: { maximum: 300 }

    accepts_nested_attributes_for :user
end