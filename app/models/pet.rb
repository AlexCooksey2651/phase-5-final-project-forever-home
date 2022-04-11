class Pet < ApplicationRecord
    has_many :applications
    has_many :customers, through: :applications
    has_many :bookmarks
    has_many :customers, through: :bookmarks
    belongs_to :shelter
end
