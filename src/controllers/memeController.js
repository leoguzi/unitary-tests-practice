import * as memeService from '../services/memeService.js';

async function listMemes(req, res) {
  try {

    const {
        limit,
    } = req.query;
    
    const result = await memeService.listMemes(limit);

    if (result.data.length === 0) {
      return res.status(200).send(result.message);
    }

    return res.status(200).send(result.data);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}

async function insertMeme(req, res) {

  const { url, text } = req.body;
  const token = req.authorizationToken;
  
  if (!url || !text) {
    return res.sendStatus(403);
  }
  try {

    const insertedMeme = await memeService.insertMeme(token, url, text);

    if (insertedMeme.length === 0) {
      return res.status(401).send(insertMeme.message);
    }


    return res.status(200).send({
      ...insertedMeme,
    });

  } catch (error) {
    console.log(error);
    res.status(500);
  }
}

export { listMemes, insertMeme };
