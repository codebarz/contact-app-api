const contacts = require('../../data/contacts.json');
const fs = require('fs');
import { uuidv4 } from '../Helpers';

interface IDetails {
  id?: string;
  fullName: string;
  phone: string;
  email: string;
  company: string;
  isBlocked: boolean;
}

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

export function addContact(details: IDetails) {
  let id = uuidv4();
  const newContact = details;
  newContact.id = id;

  let addedToExisting = false;
  contacts.forEach((contact: any) => {
    if (contact.fullName === newContact.fullName) {
      contact.phone = [contact.phone];
      contact.phone.push(newContact.phone);
      addedToExisting = true;
      return;
    }
  });

  if (!addedToExisting) {
    contacts.push(newContact);
  }

  return newContact;
}

export function deleteContact(id: string) {
  const contact = getSingleContact(id);

  if (contact.length > 1) {
    throw new Error(
      'There are more than one contact with this name. Kindly enter specific name'
    );
  }

  contacts.splice(contact[0].id - 1, 1);

  const newContact = JSON.stringify(contacts);

  fs.writeFile('data/contacts.json', newContact, 'utf-8', (err: any) => {
    if (err) {
      console.log(err);
    }
    return true;
  });

  return contacts;
}
