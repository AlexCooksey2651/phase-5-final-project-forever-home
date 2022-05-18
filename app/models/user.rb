class User < ApplicationRecord
    belongs_to :profile, polymorphic: true

    has_secure_password

    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP } 
    validates :password, length: { in: 6..20 }, on: :create
    validates :phone_number, presence: true, length: { is: 12 }
    validates :city, presence: true, length: { in: 2..30 }
    validates :state, presence: true, length: { is: 2 }
    
end