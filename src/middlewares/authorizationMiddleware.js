export default async function authorization (req, res, next) {
    const token = req.headers['authorization']?.replace('Bearer ', '');
    if (!token) {
      return res.sendStatus(403);
    }

    req.authorizationToken = token;

    next();
}
