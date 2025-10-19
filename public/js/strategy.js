// strategy.js

document.addEventListener("DOMContentLoaded", () => {
    const analyzeBtn = document.getElementById("analyzeBtn");
    const output = document.getElementById("output");
    const playerInput = document.getElementById("playerInput");

    // Enable Bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));

    // Add loading state when button is clicked
    analyzeBtn.addEventListener('click', function() {
        this.classList.add('loading');
        output.classList.add('has-content');
    });

    // Enable Enter key to submit
    playerInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            analyzeBtn.click();
        }
    });

    // Analysis functionality
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
            const response = await fetch(`/run-strategy?player=${encodeURIComponent(playerName)}`);
            const analysis = await response.text();
            
            if (response.ok) {
                // Display successful analysis
                displayAnalysis(playerName, analysis);
            } else {
                // Handle errors - display the exact server response without overriding it
                output.innerHTML = `<span class="status-indicator error"></span>${analysis}`;
            }
        } catch (err) {
            output.innerHTML = '<span class="status-indicator error"></span>❌ <strong>Connection Error</strong>\n\nFailed to connect to the analysis server.\n\nPlease check your connection and try again.';
            console.error("Analysis error:", err);
        } finally {
            // Remove loading state when done
            analyzeBtn.classList.remove('loading');
        }
    });
});

function displayAnalysis(playerName, analysis) {
    const output = document.getElementById("output");
    
    // Format the analysis with better styling
    const formattedAnalysis = formatAnalysisText(analysis);
    
    output.innerHTML = `${formattedAnalysis}`;
}
function formatAnalysisText(text) {
    // For error messages, return as-is to preserve the Python formatting
    if (text.includes("❌ Error:") || text.includes("No games found")) {
        return text;
    }
    
    let formatted = text;
    
    // Remove the initial disclaimer note if present
    formatted = formatted.replace(/^Okay, here's a strategic player profile for .*?, based on the provided chess data:\n\n/g, '');
    
    // Format main section headers with larger, colored text
    formatted = formatted.replace(/^(PLAYER PROFILE:|OPENING PREFERENCES:|MIDDLEGAME SKILLS:|RECOMMENDATIONS:)/gm, 
        '\n<strong style="color: var(--primary); font-size: 1.2em; display: block; margin: 1.5rem 0 0.5rem 0;">$1</strong>');
    
    // Format subsection headers (like Strengths, Weaknesses, etc.)
    formatted = formatted.replace(/^\*   \*\*([^:]+):\*\*/gm, 
        '<strong style="color: var(--accent); display: block; margin: 0.8rem 0 0.3rem 0;">$1:</strong>');
    
    // Format bullet points with better styling
    formatted = formatted.replace(/^\*   ([^*].*)/gm, 
        '<div style="margin: 0.3rem 0; padding-left: 1rem;">• $1</div>');
    
    // Format bold text within content
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, 
        '<strong style="color: var(--text-light);">$1</strong>');
    
    // Format the disclaimer at the end
    formatted = formatted.replace(/(---\n\n\*\*Disclaimer:\*\*.*)/gs, 
        '<div style="margin-top: 2rem; padding: 1rem; background: var(--card-bg); border-left: 4px solid var(--text-muted); font-style: italic; font-size: 0.9em;">$1</div>');
    
    // Clean up any remaining markdown-style formatting
    formatted = formatted.replace(/\*{2}(.*?)\*{2}/g, '<strong>$1</strong>');
    
    // Add proper spacing between sections
    formatted = formatted.replace(/\n\n/g, '\n\n');
    
    return formatted;
}