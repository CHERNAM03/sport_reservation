import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserForm = ({ onUserAdded }) => {
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        role: '',
        status: 'Active', // Par défaut, l'utilisateur est actif
    });

    const [roles, setRoles] = useState(['Admin', 'Manager', 'User']); // Liste simulée des rôles

    const handleInputChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleAddUser = () => {
        // Validation basique (ajoutez une validation plus robuste si nécessaire)
        if (!newUser.name || !newUser.email || !newUser.role) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        // Simulation de l'ajout d'un utilisateur (remplacez par votre appel API)
        const userToAdd = { id: Date.now(), ...newUser };

        // Appel de la fonction onUserAdded pour mettre à jour l'état du composant parent
        onUserAdded(userToAdd);

        // Réinitialisation du formulaire
        setNewUser({ name: '', email: '', role: '', status: 'Active' });
    };

    return (
        <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Ajouter un Utilisateur</h1>
            </div>

            <div className="card p-3">
                <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input type="text" className="form-control" name="name" value={newUser.name} onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={newUser.email} onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Rôle</label>
                    <select className="form-select" name="role" value={newUser.role} onChange={handleInputChange}>
                        <option value="">Sélectionner un rôle</option>
                        {roles.map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Statut</label>
                    <select className="form-select" name="status" value={newUser.status} onChange={handleInputChange}>
                        <option value="Active">Actif</option>
                        <option value="Inactive">Inactif</option>
                    </select>
                </div>

                <button className="btn btn-primary" onClick={handleAddUser}>Ajouter un Utilisateur</button>
            </div>
        </div>
    );
};

export default UserForm;