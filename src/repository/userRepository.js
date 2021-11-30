import connection from '../../database/database.js';

async function findUserByTokenSession (token) {
    const result = await connection.query(
        `
              SELECT users.id FROM sessions 
                  INNER JOIN users ON sessions."userId" = users.id
              WHERE token = $1;
          `,
        [token]
      );
    return result.rows;
}

export {
    findUserByTokenSession,
}