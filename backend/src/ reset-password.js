const bcrypt = require('bcryptjs');
const { Sequelize } = require('sequelize');

// Configuration de la connexion à la base de données (utilisez les mêmes paramètres que votre application)
const sequelize = new Sequelize('nom_de_votre_base', 'utilisateur', 'mot_de_passe', {
  host: 'localhost',
  dialect: 'mysql'
});

async function resetPassword() {
  try {
    // Se connecter à la base de données
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie');

    // Nouveau mot de passe à définir
    const newPassword = 'nouveau_mot_de_passe_securise';
    
    // Générer un hash du nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Mettre à jour le mot de passe de l'utilisateur admin
    const [updatedRows] = await sequelize.query(
      "UPDATE Users SET password = :password WHERE email = :email",
      {
        replacements: { 
          password: hashedPassword,
          email: 'admin@example.com'
        }
      }
    );
    
    console.log(`Mot de passe réinitialisé pour admin@example.com`);
    console.log(`Nouveau mot de passe (à conserver de façon sécurisée) : ${newPassword}`);
    
    await sequelize.close();
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
  }
}

resetPassword();