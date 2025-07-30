import jwt from "jsonwebtoken";

export const login = ((req, res) => {
    const { email, password } = req.body;

    const USER = {
        email: "test@example.com",
        password: "123456"
    }

    if (email === USER.email && password === USER.password) {
        const token = jwt.sign({ email}, process.env.JWT_SECRET, {expiresIn: '1h'});
        return res.json({ token });
    }
    
    return res.status(401).json({ message: "Invalid creds" })
});

export const profile = ((req, res) => {
    const user = req.user;
    res.json({ email: user.email })
});