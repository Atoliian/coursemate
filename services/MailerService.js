const { Resend } = require("resend");
const ValidationEmail = require("../emails/ValidationEmail");
require('dotenv').config();
const React = require('react');

const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);

class MailerService {

    async sendValidationEmail(user){
        const { data, error } = await resend.emails.send({
            from: `Coursemate 🧺 <${process.env.RESEND_EMAIL}>`,
            to: process.env.ENV === "dev" ? "delivered@resend.dev" : [user.email],
            subject: "Validation de votre compte Coursemate",
            react: <ValidationEmail name={user.name} token={user.token}/>
          });

          if (error) {
            // Gestion de l'erreur ici
            console.error("Erreur lors de l'envoi de l'e-mail:", error);
            return { error };
        }
        
        // Succès de l'envoi
        console.log("E-mail envoyé avec succès:", data);
        return { data };
    }
}

module.exports = MailerService;