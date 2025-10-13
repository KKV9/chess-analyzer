// visualiser.js

let winrateChart = null;

document.addEventListener("DOMContentLoaded", () => {
    const runBtn = document.getElementById("runBtn");
    const output = document.getElementById("output");

    runBtn.addEventListener("click", async () => {
        output.innerHTML = '<span class="status-indicator processing"></span>Running analysis...';
        
        try {
            const response = await fetch("/run-black-white");
            const data = await response.json();
            
            if (data.error) {
                output.innerHTML = `<span class="status-indicator error"></span>❌ Error: ${data.error}`;
                return;
            }
            
            if (data.success) {
                displayResults(data);
            }
        } catch (err) {
            output.innerHTML = '<span class="status-indicator error"></span>❌ Error running analysis.';
            console.error(err);
        }
    });
});

function displayResults(data) {
    const output = document.getElementById("output");
    
    // Create container for chart and stats
    const resultsHTML = `
        <div style="background: var(--card-bg); padding: 1.5rem; border-radius: 8px;">
            <canvas id="winrateChart" style="max-height: 300px;"></canvas>
        </div>
    `;
    
    output.innerHTML = resultsHTML;
    
    // Create bar chart
    const ctx = document.getElementById('winrateChart').getContext('2d');
    
    // Destroy previous chart if it exists
    if (winrateChart) {
        winrateChart.destroy();
    }
    
    winrateChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['White Wins', 'Black Wins', 'Draws'],
            datasets: [{
                label: 'Number of Games',
                data: [data.white_wins, data.black_wins, data.draws],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',  // Blue for white
                    'rgba(168, 85, 247, 0.8)',  // Purple for black
                    'rgba(107, 114, 128, 0.8)'  // Gray for draws
                ],
                borderColor: [
                    'rgba(59, 130, 246, 1)',
                    'rgba(168, 85, 247, 1)',
                    'rgba(107, 114, 128, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Win Rate Distribution',
                    color: '#e5e7eb',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed.y;
                            const total = data.total_games;
                            const percentage = ((value / total) * 100).toFixed(2);
                            return `${value.toLocaleString()} games (${percentage}%)`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#9ca3af',
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#9ca3af'
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}