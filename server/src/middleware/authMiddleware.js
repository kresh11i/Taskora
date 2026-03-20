import jwt from "jsonwebtoken";

export function jwtCookie(req, res, next) {
    const userToken = req.cookies.token;
    try {
        if (!userToken) {
            return res.status(401).json({ message: "Unauthorised" })
        }

        const userVerification = jwt.verify(userToken, process.env.JWT_SECRET)
        req.userID = userVerification.userID
        next();
    } catch (err) {
        res.clearCookie('token');
        return res.status(401).json({ message: "Unauthorised" })

    }
}