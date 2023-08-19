from djoser import email

class ActivationEmail(email.ActivationEmail):
    template_name = "users/activation.html"

class ConfirmationEmail(email.ConfirmationEmail):
    template_name = "users/confirmation.html"

class PasswordResetEmail(email.PasswordResetEmail):
    template_name = "users/password_reset.html"

class PasswordChangedConfirmationEmail(email.PasswordChangedConfirmationEmail):
    template_name = "users/password_changed_confirmation.html"