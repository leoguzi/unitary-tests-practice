import Filter from 'bad-words';

import * as memeRepository from '../repository/memeRepository.js';
import * as userRepository from '../repository/userRepository.js';

async function listMemes (limit) {


    if (limit <= 0) {
        return {
            message: 'No memes today!',
            data: []
        }
    }

    const memes = await memeRepository.listMemes(limit);

    
    if (memes.length === 0) {
        return {
            message: 'No memes today!',
            data: []
        }
    }
    return {
        message: 'List all memes',
        data: memes,
    }
}

async function insertMeme (userToken, url, text) {

    const badWordsFilter = new Filter();

    const user = await userRepository.findUserByTokenSession(userToken)
    if (user.length === 0) {
        return {
            message: 'No user!',
            data: []
        }
    }
    const niceText = badWordsFilter.clean(text);
    const newMeme = await memeRepository.insertMeme(url, niceText, user[0].id);
    return {
        message: 'New meme indahouse',
        data: newMeme,
    }
}

export {
    listMemes,
    insertMeme,
}