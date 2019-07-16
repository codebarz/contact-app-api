import {
  getContacts,
  blockContact,
  getSingleContact,
  getBlocked,
  addContact
} from '../src/controllers';

describe('Controllers', () => {
  test('Should check if contacts can be gotten', async () => {
    const data = await getContacts();
    expect(data).toContainEqual({
      id: expect.any(String),
      fullName: expect.any(String),
      phone: expect.any(String),
      email: expect.any(String),
      company: expect.any(String),
      isBlocked: expect.any(Boolean)
    });
  });

  test('Should check if a single contacts can be gotten', async () => {
    try {
      const data = await getSingleContact(
        '2aea406b-cad5-4406-8409-81c5785b5884'
      );
      await getSingleContact('2aea406b-cad5-4406-8409-81c5785b');

      expect(data).toContainEqual({
        id: expect.any(String),
        fullName: expect.any(String),
        phone: expect.any(String),
        email: expect.any(String),
        company: expect.any(String),
        isBlocked: expect.any(Boolean)
      });
    } catch (e) {
      expect(e.message).toBe('Contact not found');
    }
  });

  test('Should check if contacts can be blocked', async () => {
    const contact = await getSingleContact(
      '2aea406b-cad5-4406-8409-81c5785b5884'
    );
    const data = await blockContact('2aea406b-cad5-4406-8409-81c5785b5884');
    if (contact.isBlocked) {
    expect(data[0].isBlocked).toBeTruthy();
  });

  test('Should check if contacts can be unblocked', async () => {
    const data = await blockContact('2aea406b-cad5-4406-8409-81c5785b5884');
    expect(data[0].isBlocked).toBeFalsy();
    }
  });

  test('Should check if blocked contacts can be gotten', async () => {
    const data = await getBlocked();
    expect(data).toContainEqual({
      id: expect.any(String),
      fullName: expect.any(String),
      phone: expect.any(String),
      email: expect.any(String),
      company: expect.any(String),
      isBlocked: expect.any(Boolean)
    });
  });

  test('Should check if contacts can be added', () => {
    try {
      const contact = {
        fullName: 'Will Smith',
        phone: '08157218403',
        email: 'willsmith@gmail.com',
        company: 'GLO',
        isBlocked: false
      };
      const data = addContact(contact);
      expect(data).toContainEqual({
        id: expect.any(String),
        fullName: expect.any(String),
        phone: expect.any(String),
        email: expect.any(String),
        company: expect.any(String),
        isBlocked: expect.any(Boolean)
      });
    } catch (error) {
      expect(error.message).toBe('Contact already added');
    }
  });
});
