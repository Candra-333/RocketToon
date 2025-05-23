const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'App-component')));

const users = [];

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'App-component', 'Register.html'));
});

app.post("/register", (req, res) => {
    const {name, email, password, country, phone} = req.body;
    if (!name || !email || !password || !country) {
        return res.status(400).json({
            message: "Missing required fields"
        });
    }
    const existingUser = users.find(user => user.email === email);
    if (existingUser) return res.status(400).json({
        message: "User already exists"
    });

    users.push({
        name, email, password, country, phone
    });
    res.status(201).json({
        message: "Registration successful"
    });
});

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) return res.status(401).json({
        message: "Invalid credentials"
    });

    res.status(200).json({
        message: "Login successful"
    });
});

app.use("/", router);

app.listen(PORT, () => {
    console.log("Server running on http://localhost: " +PORT);
});


