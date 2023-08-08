const request = require("supertest");
const app = require("../app");
const Image = require("../models/Image");
require("../models");

let token;
let id;

beforeAll(async () => {
  const res = await request(app).post("/users/login").send({
    email: "testuser@gmail.com",
    password: "testuser1234",
  });
  token = res.body.token;
});

test("should GET /products", async () => {
  const res = await request(app).get("/products");

  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("should POST /products", async () => {
  const product = {
    title: "smart TV Series 5 UN40T5290AKXZL LED Tizen Full HD 40",
    description:
      "Samsung es reconocida a nivel mundial como una empresa líder en la industria tecnológica. Todos sus productos son diseñados con una calidad superior y pensados para contribuir a un futuro mejor. Por eso, hará que disfrutes de una experiencia incomparable.",
    price: 500,
    brand: "Samsung",
  };

  const res = await request(app)
    .post("/products")
    .send(product)
    .set("Authorization", `Bearer ${token}`);
  id = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.title).toBe(product.title);
  expect(res.body.id).toBeDefined();
});

test("should POST /products/:id/images", async () => {
  const image = await Image.create({
    url: "cualquier cosa",
    publicId: "cualquier cosa",
  });

  const res = await request(app)
    .post(`/products/${id}/images`)
    .send([image.id])
    .set("Authorization", `Bearer ${token}`);
  await image.destroy();

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("should DELETE /products/:id", async () => {
  const res = await request(app)
    .delete(`/products/${id}`)
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(204);
});
