import {
  getContacts,
  blockContact,
  getSingleContact,
  getBlocked
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
});
