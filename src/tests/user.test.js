const request = require("supertest");
const app = require("../app");
let id;
let token;

test("should POST /users", async () => {
  const user = {
    firstName: "Cristian",
    lastName: "Galvis",
    password: "cristian1234",
    email: "cristian@gmail.com",
    phone: "123456789",
  };

  const res = await request(app).post("/users").send(user);

  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.password).not.toBe(user.password);
});

test("should POST login /users/login", async () => {
  const emailPassword = {
    email: "julio@gmail.com",
    password: "julio1234",
  };
  const res = await request(app).post("/users/login").send(emailPassword);
  token = res.body.token;
  expect(res.status).toBe(200);
  expect(res.body.token).toBeDefined();
});

test("should GET /users", async () => {
  const res = await request(app)
    .get("/users")
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("should UPDATE /users/:id", async () => {
  const updatedUser = {
    firstName: "Cristian Camilo",
  };

  const res = await request(app)
    .put(`/users/${id}`)
    .send(updatedUser)
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(updatedUser.firstName);
});

test("should POST /users/login credenciales incorrectas", async () => {
  const emailPasswordWrong = {
    email: "julioincorrecto@gmail.com",
    password: "julioincorrecto1234",
  };

  const res = await request(app).post("/users/login").send(emailPasswordWrong);
  expect(res.status).toBe(401);
});

test("should DELETE /user/:id", async () => {
  const res = await request(app)
    .delete(`/users/${id}`)
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(204);
});
