#  Chess Analyzer App

An intelligent web-based application that analyzes thousands of chess games to extract insights, visualize trends, and assist players in improving their strategic understanding.
Developed as part of the **COMP7039 – Agile Processes** module (Autumn 2025).

##  Project Overview

The **Chess Analyzer App** is designed to demonstrate Agile development practices while applying data science and AI to the world of chess.
The system imports, processes, and visualizes large datasets of chess games, providing knowledge extraction through machine learning and LLM-based analysis.

##  Key Features

### **Sprint 1 – Data Input**
- Import chess game datasets (PGN/CSV format)
- Preprocess and clean data (handle missing or invalid values)
- Store structured data in a relational database

### **Sprint 2 – Data Visualization**
- Display processed chess data using tables and charts
- Explore move frequencies, opening trends, and player performance
- Interactive dashboard for filtering and sorting data

### **Sprint 3 – Knowledge Extraction**
- Apply machine learning or communicate with an LLM for intelligent insights
- Identify anomalies, patterns, and strengths in player behavior
- Generate human-readable summaries of player performance

### **Data Validation**
- Validates large chess game datasets (`data/data.csv`)
- Simple Python validation script (`validate.py`)
- Runs automatically through the Express backend

### **Web Interface**
- Built using **Node.js** and **Express**
- Frontend served from the `/public` directory
- Button to execute Python validation and display output dynamically

### **Technology Stack**
| Layer | Technologies |
|-------|---------------|
| **Frontend** | HTML / CSS / JavaScript |
| **Backend** | Node.js / Express |
| **Python Integration** | `validate.py` (CSV validator) |
| **Database (future)** | PostgreSQL |
| **DevOps** | GitHub + Render (for deployment) |

##  Knowledge Extraction Examples

- Predict the likelihood of winning based on opening moves.
- Detect common blunders and their frequencies.
- Use an LLM to summarize a player’s strategic profile.

##  Agile Artifacts

- **Product Backlog:** Defined in Jira with story points and priorities.
- **Sprints:** 3 total (Data Input, Visualization, Knowledge Extraction).
- **Scrum Roles:** Each sprint has a different Scrum Master.
- **Burndown Charts:** Tracked automatically through project management tools.
- **Meetings:** Sprint Planning, Daily Standups, Reviews, and Retrospectives.

##  Agile Timeline

| Sprint | Duration | Focus |
|--------|-----------|--------|
| **Sprint 1** | 22 Sep – 29 Sep | Data Import & Preprocessing |
| **Sprint 2** | 6 Oct – 20 Oct | Visualization & Interim Report |
| **Sprint 3** | 3 Nov – 17 Nov | Knowledge Extraction & Final Report |

##  Team Roles

| Member | Sprint | Role |
|---------|--------|------|
| Cillian Houlihan | Sprint 1 | Scrum Master |
| Daniel Sheehan | Sprint 2 | Scrum Master |
| Scott Wolohan | Sprint 3 | Scrum Master |
| Ciarán O'Brien | Ongoing | DevOps Lead |

##  Documentation

- Interim Report: Submitted 20 October 2025

- Final Report: Submitted 17 November 2025

- Presentation: 24 November 2025

##  Installation & Usage

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/chess-analyzer.git
cd chess-analyzer
```

### 2. Install Node.js Dependencies
```bash
npm install
```

### 3. Install Python Dependencies
```bash
pip install python-dotenv
```

### 4. Run the Web Server
```bash
node server.js
```

### 5. Open in Browser
```bash
http://localhost:3000
```

##  License

- This project is for educational purposes.
- Not intended for commercial use.

