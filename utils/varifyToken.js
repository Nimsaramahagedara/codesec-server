import jwt from 'jsonwebtoken';

export const verifyToken = (req) => {
  return new Promise((resolve, reject) => {
    // Access the JWT token from the Authorization header
    const token = req.headers.authorization.split('Bearer ')[1];
    const secretKey = process.env.SECRET_KEY;

    // Verify and decode the token to get the ownerID
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject({ error: 'Unauthorized' });
      } else {
        console.log('USER ID ' +  decoded.id);
        resolve(decoded.id);
      }
    });
  });
}