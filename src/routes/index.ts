import { Router } from 'express';
import { getContacts, getSingleContact, deleteContact } from '../controllers';

const router = Router();

/* GET home page. */
router.get('/', function(_req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/contacts', function(_req, res) {
  const contacts = getContacts();

  res.status(200).json({ data: contacts });
});

router.get('/contacts/:contactName', function(req, res) {
  try {
    const data = getSingleContact(req.params.contactName);

    res.status(200).json({ data });
  } catch {
    res.status(404).json({ error: 'Contact not found' });
  }
});

router.delete('/contacts/:contactName', function(req, res) {
  try {
    const data = deleteContact(req.params.contactName);

    res.status(200).json({ data });
  } catch {
    res.status(404).json({ error: 'Contact not found' });
  }
});

export default router;
