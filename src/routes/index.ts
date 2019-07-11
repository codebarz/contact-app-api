import { Router } from 'express';
import { getContacts } from '../controllers';

const router = Router();

/* GET home page. */
router.get('/', function(_req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/contacts', function(_req, res) {
  const contacts = getContacts();

  res.status(200).json({ data: contacts });
});

export default router;
