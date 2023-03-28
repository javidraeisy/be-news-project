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

describe("Get /api/articles/:article_id", () => {
  it("returns the requested article_id object", () => {
    return request(app)
      .get("/api/articles/4")
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("articleById");
        expect(response.body.articleById).toEqual({
          article_id: 4,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          author: "rogersop",
          body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
          created_at: "2020-05-06T01:14:00.000Z",
          title: "Student SUES Mitch!",
          topic: "mitch",
          votes: 0,
        });
      });
  });
});

it("should return 404 error if bad pathway", () => {
  return request(app)
    .get("/articles/3/northcoders")
    .then((response) => {
      expect(response.status).toBe(404);
    });
});
