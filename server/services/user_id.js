const jwt = require('jsonwebtoken');

async function getUserId(req) {
    try{
        const token = req.cookies.token;
        if (!token) {
          return new Error("No token found in cookies");
        }
      
        const decoded = jwt.verify(token, "your_jwt_secret");
        const userID = decoded.userId;
        return userID;
    }catch(error){
        console.error(error);
        return undefined;
    }
}

module.exports = {getUserId};