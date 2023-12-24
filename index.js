const { Command } = require("commander");
const contactsControls = require("./contacts");

const program = new Command();
program.option("-a, --action <type>", "choose action").option("-i, --id <type>", "user id").option("-n, --name <type>", "user name").option("-e, --email <type>", "user email").option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: refactor
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      console.table(await contactsControls.listContacts());
      break;

    case "get":
      console.table(await contactsControls.getContactById(id));
      break;

    case "add":
      console.table(await contactsControls.addContact(name, email, phone));
      break;

    case "remove":
      console.table(await contactsControls.removeContact(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
