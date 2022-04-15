class Pet < ApplicationRecord
    has_many :applications, dependent: :destroy
    has_many :customers, through: :applications
    has_many :bookmarks, dependent: :destroy
    has_many :customers, through: :bookmarks
    belongs_to :shelter
end
