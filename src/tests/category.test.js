const request = require("supertest");
const app = require("../app");
let token;
let id;
beforeAll(async () => {
  const res = await request(app).post("/users/login").send({
    email: "testuser@gmail.com",
    password: "testuser1234",
  });
  token = res.body.token;
});

test("should GET /categories", async () => {
  const res = await request(app).get("/categories");

  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("should POST /categories", async () => {
  const category = {
    name: "Tech",
  };

  const res = await request(app)
    .post("/categories")
    .send(category)
    .set("Authorization", `Bearer ${token}`);

  id = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.name).toBe(category.name);
  expect(res.body.id).toBeDefined();
});

test("should PUT /categories", async () => {
  const updatedCategory = {
    name: "Tech plus",
  };
  const res = await request(app)
    .put(`/categories/${id}`)
    .send(updatedCategory)
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updatedCategory.name);
});

test("should DELETE /categories/:id", async () => {
  const res = await request(app)
    .delete(`/categories/${id}`)
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(204);
});
