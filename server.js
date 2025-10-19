// server.js
require('dotenv').config(); // Load environment variables from .env file

const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from 'public' folder
app.use(express.static("public"));

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
app.post("/run-strategy", (req, res) => {
    const { playerName } = req.body;

    if (!playerName || playerName.trim() === '') {
        return res.status(400).json({ error: "Player name is required" });
    }

    const scriptPath = path.join(__dirname, "scripts/strat.py");
    const pythonCmd = path.join(__dirname, "venv/bin/python3");
    const sanitizedName = playerName.replace(/[^a-zA-Z0-9_\-\s]/g, ''); // Sanitize input

    // Pass GENAI_KEY as environment variable to the Python process
    const env = {
        ...process.env,
        GENAI_KEY: process.env.GENAI_KEY
    };

    exec(`"${pythonCmd}" "${scriptPath}" "${sanitizedName}"`, { env, maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing strategy script: ${error.message}`);
            return res.status(500).json({
                error: error.message,
                stderr: stderr
            });
        }

        if (stderr && !stdout) {
            console.error(`Script stderr: ${stderr}`);
            return res.status(500).json({ error: stderr });
        }

        // Return the analysis as plain text
        res.json({
            success: true,
            playerName: playerName,
            analysis: stdout
        });
    });
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
