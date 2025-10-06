// server.js
const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from 'public' folder
app.use(express.static("public"));

// Endpoint to run Python validation
app.get("/run-validation", (req, res) => {
    const scriptPath = path.join(__dirname, "scripts/validate.py");

    exec(`python "${scriptPath}"`, (error, stdout, stderr) => {
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

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
