const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json()); // ✅ Middleware to parse JSON requests

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const SECRET_KEY = "your_secret_key"; // Change this to a secure secret key

// MySQL Database Connection
const db = mysql.createConnection({
    host: "tramway.proxy.rlwy.net",
    user: "root",
    password: "QohMqYSiqwtzKzOqjezIlNvCkZCKiGzm",
    database: "railway",
    port: 55555
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL Database");
});

// Nodemailer Config (for sending emails)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "learnify.prasannasai@gmail.com",  // Change to your email
        pass: "yggc loiz omwn nwny"    // Change to your email password (use App Passwords if 2FA is enabled)
    }
});

// Configure Multer for File Uploads (Courses)
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });


// ** USER AUTHENTICATION ROUTES **

// 🟢 **User Signup Route**
app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    // Validate input fields
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    // Check if the email already exists
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) return res.status(500).json({ error: "Database error: " + err.message });

        if (results.length > 0) {
            return res.status(400).json({ error: "Email already exists." });
        }

        try {
            // Hash password before storing
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user into the database
            const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
            db.query(sql, [name, email, hashedPassword], (err, result) => {  
                if (err) return res.status(500).json({ error: "Signup failed: " + err.message });

                // Send welcome email
                const mailOptions = {
                    from: "your-email@gmail.com",
                    to: email,
                    subject: "Welcome to LearnHub!",
                    text: `Hello ${name},\n\nYour LearnHub account has been successfully created. Please login with your credentials.\n\nHappy Learning!\n\n- LearnHub Team`
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error("Email Error:", error);
                    } else {
                        console.log("Welcome email sent:", info.response);
                    }
                });

                res.json({ message: "Signup successful!", user: { id: result.insertId, name, email } });
            });

        } catch (error) {
            res.status(500).json({ error: "Server error: " + error.message });
        }
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Both email and password are required." });
    }

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(400).json({ error: "User not found." });
        }

        const user = results[0];

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ error: "Incorrect password." });
        }

        // Check if user is the specific admin
        const isAdmin = user.email === "learnify.prasannasai@gmail.com"; // Change this to your admin email

        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email, isAdmin }, SECRET_KEY, { expiresIn: "1h" });

        res.json({
            message: "Login successful!",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                isAdmin,  // Send isAdmin flag
            },
            token
        });
    });
});


// Middleware for authentication (Protect Routes)
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ error: "Unauthorized access." });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token." });
        req.user = user;
        next();
    });
};

app.post("/verify-token", (req, res) => {
    const token = req.body.token; // Extract token from request body

    if (!token) {
        return res.status(400).json({ error: "Token is required." });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Invalid or expired token." });
        }

        res.json({ message: "Token is valid.", user: decoded });
    });
});

app.post("/logout", (req, res) => {
    console.log("🔹 Logout request received!"); // Debug log
    res.clearCookie("token"); // If using cookies
    res.json({ message: "✅ Logout successful!" });
});


// ** COURSE ROUTES ** (UNCHANGED)

// Get all courses
app.get("/courses", (req, res) => {
    const sql = "SELECT * FROM courses";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add a new course
app.post("/add-course", upload.fields([{ name: "image" }, { name: "instructor_image" }]), (req, res) => {
    const { name, instructor, curriculum, timings, training_mode, start_date, end_date, price } = req.body;
    
    if (!req.files || !req.files["image"] || !req.files["instructor_image"]) {
        return res.status(400).json({ error: "Course and instructor images are required." });
    }

    const courseImage = req.files["image"][0].filename;
    const instructorImage = req.files["instructor_image"][0].filename;
    
    const sql = "INSERT INTO courses (name, image, instructor, instructor_image, curriculum, timings, training_mode, start_date, end_date, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [name, courseImage, instructor, instructorImage, curriculum, timings, training_mode, start_date, end_date, price], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Course added successfully!" });
    });
});

// Delete a course
app.delete("/delete-course/:id", (req, res) => {
    const courseId = req.params.id;
    const sql = "DELETE FROM courses WHERE id = ?";
    
    db.query(sql, [courseId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Course deleted successfully!" });
    });
});

// Route to get all users
app.get("/users", (req, res) => {
    const sql = "SELECT id, name, email FROM users";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }
        res.json(results);
    });
});

app.delete("/remove-user/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        await db.query("DELETE FROM users WHERE id = ?", [userId]);
        res.json({ message: "User removed successfully!" });
    } catch (error) {
        console.error("Error removing user:", error);
        res.status(500).json({ error: "Failed to remove user" });
    }
});

// 📨 Send Message API
app.post("/send-message", (req, res) => {
    const { userId, message } = req.body;

    if (!userId || !message) {
        console.error("❌ Missing userId or message:", req.body);
        return res.status(400).json({ error: "Missing userId or message" });
    }

    // ✅ Check if the user exists
    db.query("SELECT email FROM users WHERE id = ?", [userId], (err, rows) => {
        if (err) {
            console.error("❌ Database Error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        console.log("🔍 MySQL Query Result:", rows); // Debugging output

        if (!rows || rows.length === 0) {
            console.error("❌ User not found for userId:", userId);
            return res.status(404).json({ error: "User not found" });
        }

        const email = rows[0].email; // Extract email safely
        console.log("✅ Found email:", email);

        // ✅ Store the message in the database
        db.query(
            "INSERT INTO messages (user_id, email, message) VALUES (?, ?, ?)",
            [userId, email, message],
            (err, result) => {
                if (err) {
                    console.error("❌ Error inserting message:", err);
                    return res.status(500).json({ error: "Database insert error" });
                }
                console.log("✅ Message stored successfully:", result);
                res.json({ success: true, message: "Message sent successfully!" });
            }
        );
    });
});

// 📨 Fetch Messages API (For User Dashboard)
app.get("/get-messages", (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ error: "Missing email parameter" });
    }

    // Fetch message + timestamp
    const sql = "SELECT message, timestamp FROM messages WHERE email = ? ORDER BY timestamp DESC";
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error("❌ Error fetching messages:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
});
// Configure Multer for Certificate Uploads
const certificateStorage = multer.diskStorage({
    destination: "./uploads/certificates/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const certificateUpload = multer({ storage: certificateStorage });


app.post("/upload-certificate", certificateUpload.single("certificate"), (req, res) => {
    console.log("✅ Certificate upload request received!");

    const { userId } = req.body;
    if (!userId || !req.file) {
        console.log("❌ Missing userId or file!");
        return res.status(400).json({ error: "User ID and certificate file are required." });
    }

    console.log("🔹 Uploaded file:", req.file);

    const certificateUrl = `/uploads/certificates/${req.file.filename}`;

    const sql = "INSERT INTO certificates (user_id, certificate_url) VALUES (?, ?)";
    db.query(sql, [userId, certificateUrl], (err, result) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "✅ Certificate uploaded successfully!", certificateUrl });
    });
});
app.post('/get-certificates', (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    db.query("SELECT * FROM certificates WHERE user_id = ?", [userId], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        res.json(results); // ✅ Ensure results is an iterable array
    });
});

// Start the Server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
