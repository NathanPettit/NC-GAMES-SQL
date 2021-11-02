const request = require("supertest");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET/not-a-route", () => {
  it("Status:404 handles an invalid path name request", () => {
    return request(app)
      .get("/api/invalid_path")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Path name not found");
      });
  });
});

describe("GET/categories", () => {
  it("Status:200 and returns object of category types", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        expect(body.categories.length).toBe(4);
        expect(body.categories).toBeInstanceOf(Array);
        body.categories.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});

describe("GET/reviews", () => {
  it("Status:200 an array of reviews", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews.length).toBe(13);
        expect(body.reviews).toBeInstanceOf(Array);
        body.reviews.forEach((review) => {
          expect(review).toEqual(
            expect.objectContaining({
              title: expect.any(String),
              designer: expect.any(String),
              owner: expect.any(String),
              review_img_url: expect.any(String),
              review_body: expect.any(String),
              category: expect.any(String),
              votes: expect.any(Number),
            })
          );
        });
      });
  });
});

describe("GET/reviews:review_id", () => {
  it("Status:200 return a specific review", () => {
    const REVIEW_ID = 3;
    return request(app)
      .get(`/api/reviews/${REVIEW_ID}`)
      .expect(200)
      .then(({ body }) => {
        const review = body.review;
        expect(review).toBeInstanceOf(Object);
        expect(review).toEqual(
          expect.objectContaining({
            review_id: 3,
            title: "Ultimate Werewolf",
            review_body: "We couldn't find the werewolf!",
            designer: "Akihisa Okui",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            votes: 5,
            category: "social deduction",
            owner: "bainesface",
            created_at: "2021-01-18T00:00:00.000Z",
          })
        );
      });
  });
});

describe("PATCH /api/reviews/:review_id", () => {
  it("status:200, responds with the updated review", () => {
    const reviewUpdates = {
      title: "Animal Crossing: New Horizons",
      review_body: "Tom Nook made me bankrupt",
    };
    return request(app)
      .patch("/api/reviews/3")
      .send(reviewUpdates)
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toEqual({
          review_id: 3,
          designer: "Akihisa Okui",
          owner: "bainesface",
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          category: "social deduction",
          created_at: "2021-01-18T00:00:00.000Z",
          votes: 5,
          ...reviewUpdates,
        });
      });
  });
});

describe("GET/users", () => {
  it("Status:200 and returns an array of users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body.users.length).toBe(4);
        expect(body.users).toBeInstanceOf(Array);
        // expect(user.name).toBe('dave');
      });
  });
});
