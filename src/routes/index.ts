import { Router } from 'express';
import {
  getContacts,
  getSingleContact,
  deleteContact,
  addContact,
  blockContact,
  getBlocked,
  editContact
} from '../controllers';

const router = Router();

/* GET home page. */
router.get('/', function(_req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/contacts', function(_req, res) {
  const contacts = getContacts();

  res.status(200).json({ data: contacts });
});

router.get('/contacts/blocked', function(_req, res) {
  try {
    const data = getBlocked();
    res.status(200).json({ data });
  } catch {
    res.status(404).json({ error: 'No blocked contacts' });
  }
});

router.put('/contacts/:contactID', (req, res) => {
  try {
    const data = editContact(req.body);
    res.status(200).json({ data });
  } catch {
    res.status(404).json({ error: 'There is no contact with this id to edit' });
  }
});

router.put('/contacts/block/:contactID', function(req, res) {
  try {
    const data = blockContact(req.params.contactID);
    res.status(200).json({ data });
  } catch {
    res.status(404).json({ error: 'conctact not found to block' });
  }
});

router.get('/contacts/:contactID', function(req, res) {
  try {
    const data = getSingleContact(req.params.contactID);

    res.status(200).json({ data });
  } catch {
    res.status(404).json({ error: 'Contact not found to show' });
  }
});

router.post('/contacts', function(req, res) {
  try {
    const newContact = addContact(req.body);
    res.status(200).json({ data: newContact });
  } catch {
    res.status(400).json({ error: 'An error occured!. Please try again' });
  }
});

router.delete('/contacts/:contactID', function(req, res) {
  try {
    const data = deleteContact(req.params.contactID);

    res.status(200).json({ data });
  } catch {
    res.status(404).json({ error: 'Contact not found to delete' });
  }
});

export default router;
