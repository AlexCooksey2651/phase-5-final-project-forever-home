class User < ApplicationRecord
    belongs_to :profile, polymorphic: true

    has_secure_password

    validates :email, presence: true, uniqueness: true
    validates :password, length: { in: 6..20 }
    validates :phone_number, length: { is: 12 }
    validates :city, presence: true
    validates :state, presence: true, length: { is: 2 }
    
end