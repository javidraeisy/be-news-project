const request = require("supertest");
const app = require("../index");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");

afterAll(() => {
    db.end();
  });
  
  beforeEach(() => {
    return seed(data);
  });

  