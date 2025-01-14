import jwt from "jsonwebtoken";

const verifyToken = (req, res, next)=>{ 
    let token
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }

    if (!token) {
        res.status(401).json({ message: "No Token, Auth denied!" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SEC);
        req.user = decoded;

        next();
    } catch (error) {
        res.status(400).json({ message: "Token not valid", error });
    }
};

export default verifyToken;