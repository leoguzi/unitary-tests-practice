import connection from '../../database/database.js';

async function listMemes (limit) {
    
    let query = `SELECT * FROM memes`
    if (limit) {
        query += ` LIMIT $1;`
        return (await connection.query(query, [limit])).rows;
    }

    return (await connection.query(query)).rows;
}

async function insertMeme (url, text, userId) {
    const reuslt = await connection.query(
        `INSERT INTO memes (url, text, published_by) VALUES($1, $2, $3)
            RETURNING *;`,
        [url, text, userId]
      );
    return reuslt.rows;
}

export {
    listMemes,
    insertMeme,
}