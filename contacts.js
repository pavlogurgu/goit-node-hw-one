const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  console.table(JSON.parse(data));
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const result = data.find((item) => item.id === contactId);
  console.log(result);
  return result || null;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  const [result] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  console.log(data[index]);
  return result;
}

async function addContact(name, email, phone) {
  const data = await listContacts();
  const id = data.length + 1;
  const newObject = { id, name, email, phone };
  data.push(newObject);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  console.log(newObject);
  return newObject;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};