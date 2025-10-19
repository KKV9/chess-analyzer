<div align="center">
  <img src="public/images/logo.png" alt="Chess Analyzer Logo" width="200" height="200">
  
  <h2><b>Chess Analyzer</b></h2>

  <p><i>An intelligent web-based chess analysis platform</i></p>

  <p align="center">
    <a href="https://chess-app.kkv9.ovh/">
      <img src="https://img.shields.io/badge/demo-live%20app-%231C7ED6.svg?style=flat-square&logo=google-chrome&logoColor=white">
    </a>
    <a href="https://github.com/KKV9/chess-analyzer">
      <img src="https://img.shields.io/github/last-commit/KKV9/chess-analyzer?style=flat-square&color=%23FFD43B&logo=git&logoColor=white">
    </a>
  </p>

  <p align="center">
    <a href="https://aistudio.google.com/">
      <img src="https://img.shields.io/badge/AI-Google%20Gemini-%2300AEEF?style=flat-square&logo=googlecloud&logoColor=white">
    </a>
    <a href="https://www.chartjs.org/">
      <img src="https://img.shields.io/badge/visuals-Chart.js-%23FF6384?style=flat-square&logo=chartdotjs&logoColor=white">
    </a>
    <a href="https://aws.amazon.com/">
      <img src="https://img.shields.io/badge/devops-AWS%20%7C%20PM2%20%7C%20CI%2FCD-%23F0B429.svg?style=flat-square&logo=cloudflare&logoColor=white">
    </a>
  </p>
</div>

---

An intelligent web-based application that analyzes thousands of chess games to extract insights, visualize trends, and assist players in improving their strategic understanding. Developed as part of the **COMP7039 – Agile Processes** module (Autumn 2025).

**Live Demo**: [https://chess-app.kkv9.ovh/](https://chess-app.kkv9.ovh/)  
**Sprint Progress**: 2/3 Sprints Completed

## Features

### Core Functionality

| Feature | Status | Description |
|---------|---------|-------------|
| **Data Validation** | Complete | Validate chess CSV datasets for integrity and format |
| **Win Rate Analysis** | Complete | Interactive charts showing black vs white performance |
| **AI Player Analysis** | Complete | Strategic profiles using Google's Generative AI |
| **Animated Chess Demos** | Complete | Interactive Opera Game with move animations |
| **Responsive Design** | Complete | Mobile-friendly interface with dark theme |

### Data Visualization
- **Interactive Charts**: Win rate distributions using Chart.js
- **Real-time Processing**: Live data analysis from CSV files
- **Statistical Insights**: Percentage calculations and trend analysis
- **Mobile Optimized**: Responsive design for all devices

### AI-Powered Insights
- **Strategic Profiles**: Player style analysis (Aggressive/Positional/Tactical)
- **Opening Repertoire**: Preferred openings and variations
- **Skill Assessment**: Tactical awareness and strategic planning evaluation
- **Training Recommendations**: Personalized improvement suggestions

## Architecture

```
Frontend (HTML/CSS/JS)
    ↓ HTTP Requests
Express.js Server (Node.js)
    ↓ Child Process Execution  
Python Scripts (Data Processing)
    ↓ File I/O & AI API Calls
Data Files + Google Gemini AI
    ↑ JSON/Text Responses
Backend → Frontend → User
```

## Technology Stack

| Layer | Technologies | Purpose |
|-------|---------------|---------|
| **Frontend** | HTML5, CSS3, JavaScript, Bootstrap 5, Chart.js | User interface and data visualization |
| **Backend** | Node.js, Express.js | Web server and API routing |
| **AI/ML** | Google Generative AI (Gemini), Python | Strategic analysis and insights |
| **Data Processing** | Python 3.8+, CSV module | Chess game analysis and statistics |
| **DevOps** | GitHub Actions, PM2, Nginx | Continuous deployment and process management |
| **Hosting** | AWS EC2, Cloudflare DNS | Production deployment and DNS management |

## Project Structure

```
chess-analyzer/
├── public/                 # Frontend assets
│   ├── css/
│   │   └── styles.css     # Main stylesheet and animations
│   ├── js/                # JavaScript modules
│   │   ├── index.js       # Chess board animations
│   │   ├── strategy.js    # AI analysis interface
│   │   ├── validator.js   # Data validation
│   │   └── visualiser.js  # Chart visualizations
│   ├── images/            # Logos and icons
│   │   ├── logo.png       # Main application logo
│   │   ├── favicon_black.png
│   │   └── favicon_white.png
│   └── *.html            # Application pages
├── scripts/               # Python analysis scripts
│   ├── validate.py       # CSV data validation
│   ├── wins.py           # Win rate analysis
│   ├── strat.py          # AI player analysis
│   └── requirements.txt  # Python dependencies
├── data/
│   └── data.csv          # Chess games dataset (5000+ games)
├── server.js             # Express server
├── ecosystem.config.js   # PM2 production configuration
└── package.json          # Node.js dependencies
```

## Agile Development

### Sprint Timeline & Progress

| Sprint | Duration | Focus | Scrum Master | Status | Velocity |
|--------|-----------|--------|--------------|---------|----------|
| **Sprint 1** | 22 Sep – 29 Sep | Data Input & Validation | Cillian Houlihan | Complete | 9/11 points |
| **Sprint 2** | 6 Oct – 20 Oct | Visualization & UI | Daniel Sheehan | Complete | 11/11 points |
| **Sprint 3** | 3 Nov – 17 Nov | AI Integration & Deployment | Scott Wolohan | In Progress | 18 points planned |

### Team Roles

| Member | Role | Responsibilities |
|---------|------|------------------|
| **Cillian Houlihan** | Sprint 1 Scrum Master | Data validation, project foundation |
| **Daniel Sheehan** | Sprint 2 Scrum Master | Visualization, UI/UX design |
| **Scott Wolohan** | Sprint 3 Scrum Master | AI integration, strategic analysis |
| **Ciarán O'Brien** | DevOps Lead | Deployment, infrastructure, CI/CD |

### Agile Artifacts
- **Product Backlog**: Jira-managed user stories with story points
- **Sprint Reviews**: Bi-weekly demonstrations and feedback sessions
- **Burndown Charts**: Progress tracking and velocity measurement
- **Retrospectives**: Continuous process improvement

## Quick Start

### Prerequisites
- **Node.js** (v14 or higher)
- **Python** (v3.8 or higher)
- **npm** (v6 or higher)
- **Google Generative AI API Key** ([Get one here](https://aistudio.google.com/))

### Installation

1. **Clone the Repository**
```bash
git clone https://github.com/KKV9/chess-analyzer.git
cd chess-analyzer
```

2. **Setup Node.js Backend**
```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your API key and settings
```

3. **Setup Python Environment**
```bash
# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate  # Windows

# Install Python dependencies
pip install --upgrade pip
pip install -r scripts/requirements.txt
```

4. **Configure Environment**
```env
# .env file
PORT=3000
GENAI_KEY=your_google_genai_api_key_here
NODE_ENV=development
```

5. **Run the Application**
```bash
# Development
node server.js

# Production (with PM2)
pm2 start ecosystem.config.js
```

6. **Access the Application**
```
http://localhost:3000
```

## Usage Guide

### Data Validation
1. Navigate to **Validator** page
2. Click "Run Validation" to check CSV data integrity
3. View validation results and data statistics

### Win Rate Analysis
1. Go to **Visualizer** page  
2. Click "Run Analysis" to generate win rate charts
3. Explore black vs white performance statistics

### Player Strategy Analysis
1. Access **Strategy Analysis** page
2. Enter player name (e.g., "fiore2", "ram77", "Cultan")
3. View AI-generated strategic profile and recommendations

### Chess Demonstrations
- **Homepage**: Watch animated Opera Game with special move effects
- **Interactive**: Piece movements, captures, and game state indicators

## API Endpoints

| Endpoint | Method | Description | Response Format |
|----------|---------|-------------|-----------------|
| `/run-validation` | GET | Validate CSV data integrity | Plain Text |
| `/run-black-white` | GET | Get win rate statistics | JSON |
| `/run-strategy?player=<name>` | GET | Generate AI player analysis | Formatted Text |

## Troubleshooting

### Common Issues

**Python Script Errors**
```bash
# Ensure virtual environment is activated
source venv/bin/activate

# Reinstall dependencies if needed
pip install -r scripts/requirements.txt
```

**API Key Issues**
- Verify `GENAI_KEY` in `.env` file
- Check Google AI Studio quota and permissions
- Ensure proper environment variable loading

**Deployment Issues**
```bash
# Check PM2 status
pm2 status chess-analyzer

# View application logs
pm2 logs chess-analyzer

# Restart application
pm2 restart chess-analyzer
```

### Data File Requirements
- CSV file must be located at `data/data.csv`
- Required columns: `White`, `Black`, `Result`
- Supported result formats: `1-0` (white wins), `0-1` (black wins), `1/2-1/2` (draw)

## Documentation

- **[Interim Report](docs/interim-report.pdf)** - Due 02 November 2025
- **[Final Report](docs/final-report.md)** - Due 01 December 2025
- **[Presentation Slides](docs/presentation.pdf)** - Scheduled 24 November 2025

## Project Status

| Component | Status | Notes |
|-----------|---------|-------|
| Data Validation | Production Ready | Handles 5000+ game datasets |
| Visualization | Production Ready | Interactive charts with Chart.js |
| AI Analysis | Production Ready | Google Gemini integration complete |
| Deployment | Production Ready | AWS EC2 with CI/CD pipeline |
| Documentation | Work in progress | README, sprint reports, Interim and Final Reports, and Presentation Slides |

## License

This project is developed for educational purposes as part of COMP7039 – Agile Processes. Not intended for commercial use.
All chess data used for analysis is from publicly available sources and used for educational demonstration.

## Team Contact

| Member | Role | Contact |
|---------|------|---------|
| Cillian Houlihan | Sprint 1 Lead | [GitHub](https://github.com/houlihan999) |
| Daniel Sheehan | Sprint 2 Lead | [GitHub](https://github.com/Daniel-Sheehan-Projects) |
| Scott Wolohan | Sprint 3 Lead | [GitHub](https://github.com/ScottW23) |
| Ciarán O'Brien | DevOps Lead | [GitHub](https://github.com/KKV9) |
