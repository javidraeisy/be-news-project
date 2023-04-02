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

describe("GET /api/articles", () => {
    it("responds with an array of article objects when given no parameters", () => {
      return request(app)
        .get("/api/articles")
  
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body).toBeInstanceOf(Object);
          const expectedProperties = [
            "article_id",
            "title",
            "topic",
            "author",
            "created_at",
            "votes",
            "article_img_url",
            "comment_count",
          ];
          const articles = response.body.articles;
  
          response.body.articles.forEach((article) => {
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
  
  describe("Get /api/articles/:article_id", () => {
    it("returns the requested article_id object", () => {
      return request(app)
        .get("/api/articles/4")
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body).toBeInstanceOf(Object);
          expect(response.body).toHaveProperty("article");
          expect(response.body.article).toEqual({
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
  
  it("should return 404 error if bad pathway", () => {
    return request(app)
    .get("/articles/90000")
    .then((response) => {
      expect(response.status).toBe(404);
    });
  });
  
  it("should return 400 error if id is not a number", () => {
    return request(app)
      .get("/articles/notAnId")
      .catch((err) => {
        expect(err.response.status).toBe(400)
      });
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
      // expect(response.body).toEqual({ comment: "small cat" });
      expect(response.body.comment.body).toEqual("small cat");
    // expect(response.body).toMatchObject({ comment: expect.any(String) });
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
  
//   it("expect 400 code when inputting invalid username ", async () => {
//    const response = await request(app)
//       .post("/api/articles/3/comments")
//       .send({ username: "Duncan", body: "small cat" })
//       .then((response) => {
//         expect(response.status).toEqual(400);
//       });
//   });
  
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
  
  
  describe("POST 404 if article_id number does not exist", () => {
      it("post /api/articles/999/comments", async () => {
          const commentBody = "small cat";
          const username = "lurker";
   const response = await request(app)
          .post("/api/articles/999/comments")
          .send({ username, body: commentBody })
          .then((response) => {
            expect(response.status).toEqual(404);
          });
      });
  });
  
  describe("PATCH/api/articles/:article_id", () => {
    it("update vote count to article_id pathway", async () => {
      const articleId = 3;
      const newVote = 27;
  
      const response = await request(app)
        .patch(`/api/articles/${articleId}`)
        .send({ inc_votes: newVote });
      expect(response.status).toEqual(200);
      expect(response.body.msg.votes).toEqual(27);
    });
  });
  
  it("update vote count to article_id pathway that isn't already at 0", async () => {
    const articleId = 1;
    const newVote = 27;
  
    const response = await request(app)
      .patch(`/api/articles/${articleId}`)
      .send({ inc_votes: newVote });
    expect(response.status).toEqual(200);
    expect(response.body.msg.votes).toEqual(127);
  });
  
  it("article_id with 0 votes, returns negative number -27", async () => {
    const articleId = 2;
    const newVote = -27;
  
    const response = await request(app)
      .patch(`/api/articles/${articleId}`)
      .send({ inc_votes: newVote });
    expect(response.status).toEqual(200);
    expect(response.body.msg.votes).toEqual(-27);
  });
  
  it("invalid article_id returns code 200 but empty results []", async () => {
    const articleId = 300;
    const newVote = 27;
  
    const response = await request(app)
      .patch(`/api/articles/${articleId}`)
      .send({ inc_votes: newVote });
    expect(response.status).toEqual(200);
    expect(response.body.msg).toEqual([]);
  });
  
  it("returns an error if the article_id is not a number returns 400 code", async () => {
    const newVote = 5;
    const response = await request(app)
      .patch("/api/articles/notANumber")
      .send({ inc_votes: newVote });
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("Invalid");
  });
  
  it("returns 400 if newVote is NaN", async () => {
    const newVote = "5";
    const response = await request(app)
      .patch("/api/articles/notANumber")
      .send({ inc_votes: newVote });
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("Invalid");
  });
  
  describe("GET /api/topics", () => {
    it("responds with an array of topic objects", () => {
      return request(app)
        .delete("/api/comments/3")
        .then((response) => {
          expect(response.status).toBe(204);
          expect(response.body).toEqual({});
        });
    });
  });
  
  it("When trying to delete a comment that does not exist, should respond with 404 and 'comment not found' message", () => {
    return request(app)
      .delete("/api/comments/300")
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ msg: "comment not found" });
      });
  });
  
  it("When trying to delete a invalid comment pathway eg a string", () => {
    return request(app)
      .delete("/api/comments/notANumber")
      .then((response) => {
        expect(response.status).toBe(400);
        
      });
  });


  describe("GET /api/users", () => {
    it("Returns an array of objects with each object containing a username, name and avatar_url ", async () => {
      const response = await request(app).get("/api/users");
      expect(response.status).toEqual(200);
      expect(response.body.users).toBeInstanceOf(Array);
      expect(response.body.users).toBeInstanceOf(Object);
      expect(response.body.users[0]).toHaveProperty("username");
      expect(response.body.users[0]).toHaveProperty("name");
      expect(response.body.users[0]).toHaveProperty("avatar_url");
    });
  });