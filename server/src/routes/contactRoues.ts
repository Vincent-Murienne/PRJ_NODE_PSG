import { Router } from 'express';
import { addContact, updateContact, deleteContact, getAllContacts, getContactByID } from "../controllers/contact.Controller"; 
import { authorizeRole, authenticateToken } from '../middlewares/auth';

const router = Router();

// Route pour récupérer tout les contacts
router.get('/contacts', getAllContacts);

// Route pour récupérer un contact
router.get('/contacts/:id_contact', getContactByID);


// Route pour ajouter un contact
router.post('/contacts', addContact);

// Route pour mettre à jour un contact
router.put('/contacts/:id_contact', updateContact);

// Route pour supprimer un contact
router.delete('/contacts/:id_contact', authenticateToken, authorizeRole([1]), deleteContact);

export default router;
