const sequelize = require("../utils/connection");
const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

const main = async () => {
  try {
    // Acciones a ejecutar antes de los tests
    sequelize.sync();
    const user = {
      email: "testuser@gmail.com",
      password: "testuser1234",
      firstName: "test",
      lastName: "user",
      phone: "123456789",
    };
    const userFound = await User.findOne({ where: { email: user.email } });

    if (!userFound) {
      await request(app).post("/users").send(user);
    }

    await request(app).post("/users").send(user);

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

main();
