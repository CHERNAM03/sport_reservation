const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');
const avisController = require('../controllers/avisController');

// Ajouter un avis
router.post('/', authenticateToken, avisController.addAvis);

// Récupérer tous les avis
router.get('/', avisController.getAllAvis);

// Récupérer les avis pour un terrain spécifique
router.get('/:groundId', avisController.getAvisByGround);

// avisRoutes.js
// Supprimer un avis (accessible uniquement aux administrateurs)
//router.delete('/:id', authenticateToken, authorizeRoles(['admin']), avisController.deleteAvis);
//router.delete('/:id', authenticateToken, authorizeRoles(['admin']), (req, res) => {
  //  console.log(`Tentative de suppression de l'avis ${req.params.id} par l'admin ${req.user.username}`);
    //avisController.deleteAvis(req, res);
//});
//router.delete('/:id', (req, res, next) => {
  //  console.log(`Route DELETE activée pour /api/avis/${req.params.id}`);
    //authenticateToken(req, res, () => {
      //authorizeRoles(['admin'])(req, res, () => {
        //avisController.deleteAvis(req, res);
      //});
   // });
  //});
  router.delete('/:id', (req, res, next) => {
    console.log(`Route DELETE activée pour /api/avis/${req.params.id}`);
    console.log('Headers d\'authentification:', req.headers.authorization);
    
    authenticateToken(req, res, (err) => {
      if (err) {
        console.log('Échec d\'authentification:', err);
        return res.status(401).json({ message: 'Échec d\'authentification' });
      }
      
      console.log('Authentification réussie, utilisateur:', req.user);
      console.log('Rôle utilisateur:', req.user?.role);
      
      authorizeRoles(['admin'])(req, res, (err) => {
        if (err) {
          console.log('Échec d\'autorisation:', err);
          return res.status(403).json({ message: 'Autorisations insuffisantes' });
        }
        
        console.log('Autorisation réussie, suppression de l\'avis');
        avisController.deleteAvis(req, res);
      });
    });
});

module.exports = router;