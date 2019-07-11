const contacts = require('../../data/contacts.json');

export function getContacts() {
  return contacts;
}

export function getSingleContact(name: string) {
  const pattern = new RegExp(name, 'gi');

  const contact = contacts.filter(
    (contact: any) => pattern.test(contact.full_name) === true
  );

  if (!contact.length) {
    throw new Error('Contact not found');
  }

  return contact;
}
