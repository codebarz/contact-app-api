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
  const realContacts = contacts.filter((contact: any) => !contact.isBlocked);
  return realContacts;
}

export function getSingleContact(contactID: string) {
  const contact = contacts.filter((contact: any) => contact.id === contactID);

  if (!contact.length) {
    throw new Error('Contact not found');
  }

  return contact;
}

export function addContact(details: IDetails) {
  let id = uuidv4();
  details.id = id;

  let addedToExisting = false;
  contacts.forEach((contact: any) => {
    if (contact.fullName.toLowerCase() === details.fullName.toLowerCase()) {
      if (contact.phone === details.phone) {
        throw new Error('Contact already added');
      }
      if (typeof contact.phone === 'string') {
        contact.phone = [contact.phone];
      } else {
        contact.phone = [...contact.phone];
      contact.phone.push(details.phone);
      addedToExisting = true;
      return;
    }
  });

  if (!addedToExisting) {
    contacts.push(details);
  }

  const newList = JSON.stringify(contacts);

  fs.writeFile('data/contacts.json', newList, 'utf-8', function(err: any) {
    if (err) {
      console.log(err);
    }
  });

  return details;
}

export function getBlocked() {
  const blocked = contacts.filter((contact: any) => contact.isBlocked);

  if (!blocked.length) {
    throw new Error('No blocked contact');
  }

  return blocked;
}

export function blockContact(id: string) {
  let contact = getSingleContact(id);

  if (!contact.length) {
    throw new Error('Contact not found');
  }
  contact[0].isBlocked = !contact[0].isBlocked;

  const newList = JSON.stringify(contacts);

  fs.writeFile('data/contacts.json', newList, 'utf-8', (err: any) => {
    if (err) {
      console.log(err);
    }
  });

  return contact;
}

export function editContact({ id, fullName, phone, email, company }: any) {
  let contact = getSingleContact(id);

  if (!contact.length) {
    throw new Error('There is no contact with this id');
  }

  fullName ? (contact[0].fullName = fullName) : contact[0].fillName;
  phone ? (contact[0].phone = phone) : contact[0].phone;
  email ? (contact[0].email = email) : contact[0].email;
  company ? (contact[0].company = company) : contact[0].company;

  const newList = JSON.stringify(contacts);

  fs.writeFile('data/contacts.json', newList, 'utf-8', (err: any) => {
    if (err) {
      console.log(err);
    }
  });

  return contact;
}

export function deleteContact(id: string) {
  const contact = getSingleContact(id);

  if (!contact.length) {
    throw new Error('There is no contact with this id');
  }

  contacts.splice(contact[0].id - 1, 1);

  const newContact = JSON.stringify(contacts);

  fs.writeFile('data/contacts.json', newContact, 'utf-8', (err: any) => {
    if (err) {
      console.log(err);
    }
  });

  return contacts;
}
