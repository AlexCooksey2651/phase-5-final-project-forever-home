class Customer < ApplicationRecord
    has_one :user, as: :profile
    has_many :applications, dependent: :destroy
    has_many :pets, through: :applications
    has_many :bookmarks, dependent: :destroy
    has_many :pets, through: :bookmarks
end
