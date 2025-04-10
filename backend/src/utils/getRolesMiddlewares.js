//Une fois que l'on a nos utilisateurs-rices authentifié-e-s, nous allons vouloir limiter l'accès de certains
//  à certaines ressources. En effet, la plupart des systèmes d'information ne sont pas ouverts, et il faut 
// avoir un certain nombre de droits pour réaliser des opérations (créer ou supprimer par exemple).
//Pour cela, nous allons attribuer des rôles à nos utilisateurs. Pour notre système de reservation de terrains,
//  nous allons imaginer que nous avons plusieurs types d'utilisateurs :
//  des gestionnaires de terrains, d'un admin, et des clients.
//  disons qu'il y aura 3 rôles : « manager » pour les gestionnaires de terrains, « Admin » pour 
// l'administrateur et « user » pour les clients.
//
//Tout d'abord, ajoutons la clé « role » à notre modèle « User », et passons lui la valeur par défaut
//  « customer ».
//
//Pour récupérer le rôle de chaque utilisateur au moment où il se connecte, nous allons voir comment
//  mettre en place un middleware, c'est-à-dire un bout de code qui va s'exécuter avant d'arriver 
// au contrôleur de ma route. Le but de ce middleware est de regarder si ma requête contient un token,
//  et si oui, de retrouver l'utilisateur et son rôle.
//Puis, notre middleware passera le rôle à l'objet « requête » que chacune des routes reçoit.
//  Ainsi, nous pourrons récupérer le rôle de l'utilisateur dans nos contrôleurs, et décider si
//  l'utilisateur a le droit de réaliser l'opération ou non.
function getRolesMiddlewares(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Récupérer le token depuis l'en-tête Authorization
    if (!token) {
        return res.status(401).json({ message: 'Token manquant' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token invalide' });
        }
        req.user = decoded; // Ajouter les informations de l'utilisateur à la requête
        next();
    });
}
// Middleware d'autorisation par rôle
function authorizeRoles(roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Accès refusé' });
        }
        next();
    };
}
module.exports = {
    getRolesMiddlewares,
    authorizeRoles
};


