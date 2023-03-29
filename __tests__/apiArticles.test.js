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

describe("GET /api/articles", () => {
  it("responds with an array of article objects when given no parameters", () => {
    return request(app)
      .get("/api/articles")

      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        console.log(response.body.article);
        const expectedProperties = [
          "article_id",
          "title",
          "topic",
          "created_at",
          "votes",
          "article_img_url",
          "comment_count",
        ];
        const articles = response.body.article;

        response.body.article.forEach((article) => {
          expect(article).toBeInstanceOf(Object);
          expectedProperties.forEach((property) => {
            expect(article).toHaveProperty(property);
          });
          expect(articles).toBeSorted({
            descending: (a, b) =>
              new Date(b.created_at) - new Date(a.created_at),
          });
        });
      });
  });
});
