const request = require("supertest");
const app = require("../index");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const jestSorted = require("jest-sorted");

afterAll(() => {
  db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("POST /api/articles/:article_id/comments", () => {
  it("Checks the body for the returned comment", async () => {
    const commentBody = "BIG DOG";
    const username = "lurker";
    const articleId = 4;

    const response = await request(app)
      .post(`/api/articles/${articleId}/comments`)
      .send({ username: username, body: commentBody });

    expect(response.status).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);

    expect(response.body).toEqual({ comment: "BIG DOG" });
  });
});