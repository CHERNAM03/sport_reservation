const nodemailer = require('nodemailer');

// Configuration du transporteur
const transporter = nodemailer.createTransport({
  service: 'gmail', // Vous pouvez utiliser un autre service comme Outlook, Yahoo, etc.
  auth: {
    user: process.env.EMAIL_USER, // Adresse e-mail de l'expéditeur
    pass: process.env.EMAIL_PASS, // Mot de passe ou clé d'application
  },
});

// Fonction pour envoyer un e-mail
const sendEmail = async (to, subject, text, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Adresse e-mail de l'expéditeur
      to, // Destinataire
      subject, // Sujet de l'e-mail
      text, // Texte brut
      html, // Contenu HTML
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail envoyé :', info.response);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
  }
};

module.exports = sendEmail;