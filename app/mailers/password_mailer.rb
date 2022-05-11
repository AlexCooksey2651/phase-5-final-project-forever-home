class PasswordMailer < ApplicationMailer
    default from: 'foreverhome.aec@gmail.com'

    def reset_password(user)
        @user = user
        mail(to: @user.email, subject: "Reset your password on Forever Home")
    end
end
