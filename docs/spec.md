To list all contacts

`DELETE /api/contact/`

Returns a status 200 if all contacts are gotten successfully

To list a single contact

`GET /api/contacts/:contactID`

To add a contact

`POST /api/contacts`

The request body should contain

```
interface CreateContact {
    full_name: string;
    email: string;
    phone_number: string;
    company?: string;
}

```

The `ID` would be auto generated;

To block or unblock a contact

`PUT /api/contacts/block/:contactID`

To delete contact

`DELETE /api/contacts/:contactID`
