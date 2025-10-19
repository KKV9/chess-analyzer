// strategy.js

document.addEventListener("DOMContentLoaded", () => {
    const analyzeBtn = document.getElementById("analyzeBtn");
    const output = document.getElementById("output");
    const playerInput = document.getElementById("playerInput");

    analyzeBtn.addEventListener("click", async () => {
        const playerName = playerInput.value.trim();
        
        // Validation
        if (!playerName) {
            output.innerHTML = '<span class="status-indicator error"></span>❌ Please enter a player name.';
            return;
        }

        // Show analyzing state
        output.innerHTML = '<span class="status-indicator processing"></span>🧠 Analyzing player data with AI...\n\nThis may take 10-30 seconds. Please wait...';
        
        try {
            const response = await fetch("/run-strategy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ playerName })
            });

            const data = await response.json();
            
            if (data.error) {
                // Handle errors
                if (data.error.includes("No games found")) {
                    output.innerHTML = `<span class="status-indicator error"></span>❌ <strong>Player Not Found</strong>\n\nNo games found for "${playerName}" in the database.\n\n<strong>Suggestions:</strong>\n• Check the spelling\n• Try the full name or nickname\n• Player might not be in the database`;
                } else {
                    output.innerHTML = `<span class="status-indicator error"></span>❌ <strong>Error:</strong>\n\n${data.error}\n\n${data.stderr || ''}`;
                }
                return;
            }
            
            if (data.success && data.analysis) {
                // Display successful analysis
                displayAnalysis(playerName, data.analysis);
            }
        } catch (err) {
            output.innerHTML = '<span class="status-indicator error"></span>❌ <strong>Connection Error</strong>\n\nFailed to connect to the analysis server.\n\nPlease check your connection and try again.';
            console.error("Analysis error:", err);
        }
    });
});

function displayAnalysis(playerName, analysis) {
    const output = document.getElementById("output");
    
    // Format the analysis with better styling
    const formattedAnalysis = formatAnalysisText(analysis);
    
    output.innerHTML = `<span class="status-indicator success"></span><strong>✅ Analysis Complete for: ${playerName}</strong>\n\n${formattedAnalysis}`;
}

function formatAnalysisText(text) {
    // Add some basic formatting to make the AI output more readable
    let formatted = text;
    
    // Make section headers bold and add spacing
    formatted = formatted.replace(/^(PLAYER PROFILE:|OPENING PREFERENCES:|MIDDLEGAME SKILLS:|RECOMMENDATIONS:)/gm, 
        '\n<strong style="color: var(--primary); font-size: 1.1em;">$1</strong>');
    
    // Make subsections stand out
    formatted = formatted.replace(/^- ([^:]+):/gm, '• <strong>$1:</strong>');
    
    // Add line breaks for better readability
    formatted = formatted.replace(/\n\n/g, '\n\n');
    
    return formatted;
}