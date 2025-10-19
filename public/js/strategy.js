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
                // Handle errors
                if (analysis.includes("No games found")) {
                    output.innerHTML = `<span class="status-indicator error"></span>❌ <strong>Player Not Found</strong>\n\nNo games found for "${playerName}" in the database.\n\n<strong>Suggestions:</strong>\n• Check the spelling\n• Try the full name or nickname\n• Player might not be in the database`;
                } else {
                    output.innerHTML = `<span class="status-indicator error"></span>❌ <strong>Error:</strong>\n\n${analysis}`;
                }
            }
        } catch (err) {
            output.innerHTML = '<span class="status-indicator error"></span>❌ <strong>Connection Error</strong>\n\nFailed to connect to the analysis server.\n\nPlease check your connection and try again.';
            console.error("Analysis error:", err);
        }
    });

    // Monitor output changes to update status indicator
    const observer = new MutationObserver((mutations) => {
        const text = output.textContent.toLowerCase();
        const indicator = output.querySelector('.status-indicator');
        
        if (indicator) {
            indicator.className = 'status-indicator';
            
            if (text.includes('error') || text.includes('failed')) {
                indicator.classList.add('error');
            } else if (text.includes('profile') || text.includes('analysis')) {
                indicator.classList.add('success');
            } else if (text.includes('analyzing') || text.includes('processing')) {
                indicator.classList.add('processing');
            } else {
                indicator.classList.add('waiting');
            }
        }
        
        // Remove loading state when done
        if (!text.includes('analyzing')) {
            analyzeBtn.classList.remove('loading');
        }
    });

    observer.observe(output, { childList: true, subtree: true, characterData: true });
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