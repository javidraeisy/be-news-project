const request = require("supertest");
const app = require("../index");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");

afterAll(() => {
  db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("Get / api/topics", () => {
  it("returns with array of objects in topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.topics.length).toBeGreaterThan(0);
        response.body.topics.forEach((topic) => {
          expect(topic).toHaveProperty("slug");
          expect(topic).toHaveProperty("description");
        });
      });
  });
});

describe("GET /api/topics", () => {
  it("should return an error when connecting to the wrong path", () => {
    return request(app)
      .get("/api/toopics")
      .then((response) => {
        expect(response.status).toBe(404);
      });
  });
});
