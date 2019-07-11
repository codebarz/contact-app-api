const contacts = require('../../data/contacts.json');
const fs = require('fs');

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

export function deleteContact(name: string) {
  const contact = getSingleContact(name);

  if (contact.length > 1) {
    throw new Error(
      'There are more than one contact with this name. Kindly enter specific name'
    );
  }

  contacts.splice(contact[0].id - 1, 1);

  const newContact = JSON.stringify(contacts);

  fs.writeFile('contacts.json', newContact, 'utf-8', (err: any) => {
    if (err) {
      console.log(err);
    }
    return true;
  });
  return contacts;
}
