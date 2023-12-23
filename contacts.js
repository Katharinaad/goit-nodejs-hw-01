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
async function safeContacts(contacts) {}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId);
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const filteredContacts = contacts.filter((contact) => contact.id !== contactId);
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: generateUniqueId(),
    name,
    email,
    phone,
  };
}
