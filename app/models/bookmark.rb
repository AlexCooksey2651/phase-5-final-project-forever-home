class Bookmark < ApplicationRecord
    belongs_to :pet
    belongs_to :customer
end
