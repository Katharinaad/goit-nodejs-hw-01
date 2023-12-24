const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// create an absolute path to contacts.json
const contactsPath = path.join(__dirname, "db", "contacts.json");

//generates unique identifier
function generateUniqueId() {
  return uuidv4();
}

// read contacts from the file
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

// write an array of contact objects to a file, to a JSON file
async function safeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const foundIndex = contacts.findIndex(({ id }) => id === contactId);
  if (foundIndex === -1) return null; // if we have found an index then we get an index of this object otherwise if we get -1 we return null
  const deletedContact = contacts.splice(foundIndex, 1); // if foundIndex have found an index of an object we use method splice (splice returns something deleted) splice changed the array -> contacts
  await safeContacts(contacts); // contacts which is already mutated we write to the safeContacts
  return deletedContact;
  //   const deletedContact = contacts.find(({ id }) => id === contactId);
  //   if (deletedContact) {
  //     const filteredContacts = contacts.filter(({ id }) => id !== contactId);
  //       await safeContacts(filteredContacts);
  //   }
  //   return deletedContact || null;
}

async function addContact(name = "", email = "", phone = "") {
  const contacts = await listContacts();
  const newContact = {
    id: generateUniqueId(),
    name,
    email,
    phone,
  };

  contacts.push(newContact); // changes the main array, mutates array
  await safeContacts(contacts); // changed array we write to the file
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
