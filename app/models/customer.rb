class Customer < ApplicationRecord
    has_one :user, as: :profile
    has_many :applications
    has_many :pets, through: :applications
    has_many :bookmarks
    has_many :pets, through: :bookmarks
end
