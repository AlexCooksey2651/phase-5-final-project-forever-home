class User < ApplicationRecord
    belongs_to :profile, polymorphic: true
end
