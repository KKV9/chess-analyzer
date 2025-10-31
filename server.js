// server.js
require('dotenv').config(); // Load environment variables from .env file

const express = require("express");
const { exec } = require("child_process");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, "data");
        // Create data directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Save as data.csv, replacing any existing file
        cb(null, "data.csv");
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024 // 2MB limit
    },
    fileFilter: (req, file, cb) => {
        // Only accept CSV files
        if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
            cb(null, true);
        } else {
            cb(new Error('Only CSV files are allowed'));
        }
    }
});

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from 'public' folder
app.use(express.static("public"));

// Endpoint to upload CSV file
app.post("/upload-csv", upload.single('csvFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    
    res.json({ 
        success: true, 
        message: "File uploaded successfully",
        filename: req.file.filename,
        size: req.file.size
    });
});

// Endpoint to run Python validation
app.get("/run-validation", (req, res) => {
    const scriptPath = path.join(__dirname, "scripts/validate.py");
    const pythonCmd = path.join(__dirname, "venv/bin/python3");

    exec(`"${pythonCmd}" "${scriptPath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            return res.status(500).send(`❌ Error: ${error.message}`);
        }
        if (stderr) {
            console.error(`Script stderr: ${stderr}`);
        }
        res.send(`<pre>${stdout}</pre>`);
    });
});

// Endpoint to run Python black-white winrate script
app.get("/run-black-white", (req, res) => {
    const scriptPath = path.join(__dirname, "scripts/wins.py");
    const pythonCmd = path.join(__dirname, "venv/bin/python3");

    exec(`"${pythonCmd}" "${scriptPath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            return res.status(500).json({ error: error.message });
        }
        if (stderr) {
            console.error(`Script stderr: ${stderr}`);
        }
        
        // Parse JSON output from Python script
        try {
            const result = JSON.parse(stdout);
            res.json(result);
        } catch (parseError) {
            res.status(500).json({ error: "Failed to parse script output" });
        }
    });
});

// Endpoint to run strategic player analysis
app.get("/run-strategy", (req, res) => {
    const playerName = req.query.player;
    
    if (!playerName || playerName.trim() === '') {
        return res.status(400).send("Error: Player name is required");
    }

    const scriptPath = path.join(__dirname, "scripts/strat.py");
    const pythonCmd = path.join(__dirname, "venv/bin/python3");
    const sanitizedName = playerName.replace(/[^a-zA-Z0-9_\-\s'.]/g, '');
    
    // Pass GENAI_KEY as environment variable to the Python process
    const env = {
        ...process.env,
        GENAI_KEY: process.env.GENAI_KEY
    };

    exec(`"${pythonCmd}" "${scriptPath}" "${sanitizedName}"`, { 
        env, 
        maxBuffer: 1024 * 1024 * 10,
        timeout: 60000 // 60 second timeout for AI processing
    }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing strategy script: ${error.message}`);
            
            // Check if it's a timeout
            if (error.killed) {
                return res.status(504).send("Analysis timed out. Please try again with a different player.");
            }
            
            return res.status(500).send(`Error: ${error.message}\n${stderr || ''}`);
        }
        
        // Check if stderr contains actual errors (not just warnings)
        if (stderr && stderr.toLowerCase().includes('error:')) {
            console.error(`Script error: ${stderr}`);
            return res.status(500).send(stderr);
        }
        
        // Check if output indicates no games found (now exits with status 0)
        if (stdout.includes("❌ Error: No games found") || stdout.includes("No games found")) {
            return res.status(404).send(stdout);
        }
        
        // Return the analysis as plain text
        res.send(stdout);
    });
});

// Error handling for multer
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File size exceeds 2MB limit' });
        }
        return res.status(400).json({ error: error.message });
    } else if (error) {
        return res.status(400).json({ error: error.message });
    }
    next();
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));