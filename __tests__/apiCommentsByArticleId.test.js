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

describe("GET /api/articles/:article_id/comments", () => {
  it("responds with an array of sorted comments for given article", () => {
    return request(app)
      .get("/api/articles/5/comments")
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.articleComments).toBeInstanceOf(Array);
        expect(response.body).toHaveProperty("articleComments");
        expect(response.body.articleComments).toEqual([
          {
            body: "I am 100% sure that we're not completely sure.",
            comment_id: 15,
            votes: 1,
            author: "butter_bridge",
            article_id: 5,
            created_at: "2020-11-24T00:08:00.000Z",
          },
          {
            body: "What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.",
            comment_id: 14,
            votes: 16,
            author: "icellusedkars",
            article_id: 5,
            created_at: "2020-06-09T05:00:00.000Z",
          },
        ]);
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  it("returns an empty array if there is no comments in the article", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.message).toBeInstanceOf(Array);
        expect(response.body.message).toEqual([]);
      });
  });
});

describe("GET incorrect pathway should return 404", () => {
  it("GET /api/articles/:article_id/commenttttt", () => {
    return request(app)
      .get("/articles/3/commenttttt")
      .then((response) => {
        expect(response.status).toBe(404);
      });
  });
});

describe("GET request that article_id is not a number", () => {
  it("GET /api/articles/'ninety'/comments", () => {
    return request(app)
      .get("/api/articles/'ninety'/comments")
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: "Invalid input" });
        expect(response.body).toBeInstanceOf(Object);
      });
  });
});

describe("GET 404 if article_id number does not exist", () => {
  it("GET /api/articles/1000/comments", () => {
    return request(app)
      .get("/api/articles/1000/comments")
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body.message).toEqual([]);
        expect(response.body.message).toBeInstanceOf(Array);
        expect(response.body).toBeInstanceOf(Object);
      });
  });
});
