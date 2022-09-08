import bcrypt from "bcryptjs"

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('abCD1234', 10),
    isAdmin: true,
  },
  {
    name: 'Lesnar',
    email: 'lesnar@example.com',
    password: bcrypt.hashSync('abCD1234', 10),
  },
  {
    name: ' Taker',
    email: 'taker@example.com',
    password: bcrypt.hashSync('abCD1234', 10),
  },
];
// same fileds as we defined in userModel.js

export default users;