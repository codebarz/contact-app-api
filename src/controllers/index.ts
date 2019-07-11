const contacts = require('../../data/contacts.json');

export function getContacts() {
  return contacts;
}

export function addNewContact(
  id: number,
  fullname: string,
  email: string,
  phonenumber: string,
  company: string
) {
  return 1;
}
