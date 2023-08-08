const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");
require("../models");

let token;
let id;

beforeAll(async () => {
  const res = await request(app)
    .post("/users/login")
    .send({ email: "testuser@gmail.com", password: "testuser1234" });

  token = res.body.token;
});

test("should GET /carts", async () => {
  const res = await request(app)
    .get("/carts")
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("should POST /carts", async () => {
  const product = await Product.create({
    title: "smart TV Series 5 UN40T5290AKXZL LED Tizen Full HD 40",
    description:
      "Samsung es reconocida a nivel mundial como una empresa líder en la industria tecnológica. Todos sus productos son diseñados con una calidad superior y pensados para contribuir a un futuro mejor. Por eso, hará que disfrutes de una experiencia incomparable.",
    price: 500,
    brand: "Samsung",
  });

  const cartProduct = {
    productId: product.id,
    quantity: 4,
  };
  const res = await request(app)
    .post("/carts")
    .send(cartProduct)
    .set("Authorization", `Bearer ${token}`);
  id = res.body.id;
  await product.destroy();

  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.quantity).toBe(cartProduct.quantity);
});

test("should PUT /carts/:id", async () => {
  const updatedCart = {
    quantity: 2,
  };

  const res = await request(app)
    .put(`/carts/${id}`)
    .send(updatedCart)
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body.quantity).toBe(updatedCart.quantity);
});

test("should DELETE /carts/:id", async () => {
  const res = await request(app)
    .delete(`/carts/${id}`)
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(204);
});
