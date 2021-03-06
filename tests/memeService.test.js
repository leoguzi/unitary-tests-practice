import * as memeRepository from "../src/repository/memeRepository.js";
import * as userRepository from "../src/repository/userRepository.js";
import * as memeService from "../src/services/memeService.js";

jest.mock("bad-words");

describe("List Memes", () => {
  it("Returns 0 memes if limit = 0", async () => {
    const result = await memeService.listMemes(0);
    expect(result).toEqual({
      message: "No memes today!",
      data: [],
    });
    expect(result.data.length).toEqual(0);
  });

  it("Returns 0 memes if limit < 0", async () => {
    const result = await memeService.listMemes(-1);
    expect(result).toEqual({
      message: "No memes today!",
      data: [],
    });
    expect(result.data.length).toEqual(0);
  });

  it("Returns 1 meme if limit > 0 ", async () => {
    jest
      .spyOn(memeRepository, "listMemes")
      .mockImplementationOnce((limit) => new Array(limit));
    const result = await memeService.listMemes(1);
    expect(result).toEqual({
      message: "List all memes",
      data: expect.any(Array),
    });
    expect(result.data.length).toEqual(1);
  });

  it("Returns 0 memes if limit > 0, but the database is empty", async () => {
    jest
      .spyOn(memeRepository, "listMemes")
      .mockImplementationOnce((limit) => []);
    const result = await memeService.listMemes(1);
    expect(result).toEqual({
      message: "No memes today!",
      data: [],
    });
    expect(result.data.length).toEqual(0);
  });

  it("Returns 0 memes if limit = undefined and the database is empty", async () => {
    jest
      .spyOn(memeRepository, "listMemes")
      .mockImplementationOnce((limit) => []);
    const result = await memeService.listMemes();
    expect(result).toEqual({
      message: "No memes today!",
      data: [],
    });
    expect(result.data.length).toEqual(0);
  });

  it("Returns array of memes if limit = undefined", async () => {
    jest
      .spyOn(memeRepository, "listMemes")
      .mockImplementationOnce((limit) => new Array(5));
    const result = await memeService.listMemes();
    expect(result).toEqual({
      message: "List all memes",
      data: expect.any(Array),
    });
    expect(result.data.length).toEqual(5);
  });
});

describe("Insert Meme", () => {
  it("Returns 'No user' if no user is found at the database", async () => {
    jest
      .spyOn(userRepository, "findUserByTokenSession")
      .mockImplementationOnce((token) => []);

    const result = await memeService.insertMeme(
      "",
      "www.memeurl.com",
      "New meme text. It's very funny trust me!"
    );

    expect(result).toEqual({
      message: "No user!",
      data: [],
    });
  });

  it("It insert a meme", async () => {
    jest
      .spyOn(userRepository, "findUserByTokenSession")
      .mockImplementationOnce((token) => [{ id: 1 }]);
    jest
      .spyOn(memeRepository, "insertMeme")
      .mockImplementationOnce((url, text, userId) => ({
        url,
        text,
        published_by: userId,
      }));

    const result = await memeService.insertMeme(
      "TOKEN",
      "www.memeurl.com",
      "It's very funny trust me!"
    );

    expect(result).toEqual({
      message: "New meme indahouse",
      data: expect.any(Object),
    });
  });
});
