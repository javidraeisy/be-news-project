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
  it("checking the body of returned comment", async () => {
    const commentBody = "small cat";
    const username = "lurker";
    const articleId = 4;

    const response = await request(app)
      .post(`/api/articles/${articleId}/comments`)
      .send({ username: username, body: commentBody });

    expect(response.status).toEqual(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toEqual({ comment: "small cat" });
  });
});

it("returns 404 if the article_id is not a number", async () => {
  const commentBody = "small cat";
  const username = "lurker";
  const response = await request(app)
    .post("/api/articles/notANumber/comment")
    .send({ username, body: commentBody })
    .then((response) => {
      expect(response.status).toEqual(404);
    });
});

// it("expect 400 code when inputting invalid username ", async () => {
//  const response = await request(app)
//     .post("/api/articles/3/comments")
//     .send({ username: "Duncan", body: "small cat" })
//     .then((response) => {
//       expect(response.status).toEqual(400);
//     });
// });

it("expect 404 when inputting invalid pathway", async () => {
  const commentBody = "small cat";
  const username = "lurker";
  const articleId = 3;

  const response = await request(app)
    .post(`/api/articles/${articleId}/commenttttt`)
    .send({ username, body: commentBody });

  expect(response.status).toEqual(404);
  expect(response.body).toBeInstanceOf(Object);
});


// describe("POST 404 if article_id number does not exist", () => {
//     it("post /api/articles/999/comments", async () => {
//         const commentBody = "small cat";
//         const username = "lurker";
//  const response = await request(app)
//         .post("/api/articles/999/comments")
//         .send({ username, body: commentBody })
//         .then((response) => {
//           expect(response.status).toEqual(404);
//         });
//     });
// });


