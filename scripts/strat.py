#!/usr/bin/env python3
"""
Strategic profile analysis Script for Chess Analyzer App
-----------------------------------------------
A script to find a player's games in a dataset,
this data is fed to Google's generative AI through the API which provides an analysis.
"""

import os
import csv
import sys
import google.generativeai as genai

# Configure the generative AI API
API_KEY = os.getenv("GENAI_KEY")

if not API_KEY:
    print("Missing GENAI_KEY environment variable.")
    sys.exit(1)

genai.configure(api_key=API_KEY)

# Pick model for analysis
model = genai.GenerativeModel('gemma-3-4b-it')

# Path to the CSV file containing chess data
FILE_PATH = "data/data.csv"

# Ensure a player name is provided as a command-line argument
if len(sys.argv) < 2:  # Updated to check for at least one argument after the script name
    print("Usage: python helo.py <player_name>")
    sys.exit(1)

player = sys.argv[1]  # Get the player's name from the command-line argument

# Open the CSV file and read its contents
with open(FILE_PATH, newline='') as f:
    reader = csv.DictReader(f)
    headings = reader.fieldnames

    # Check if the required columns exist in the CSV file
    if "White" not in headings or "Black" not in headings:
        print("Error: CSV must contain 'White' and 'Black' columns.")
        sys.exit(1)

    # Filter rows where the player is either White or Black
    data_rows = [
        row for row in reader
        if row["White"].strip().lower() == player.lower()
        or row["Black"].strip().lower() == player.lower()
    ]

# Exit if no games are found for the player
if not data_rows:
    print(f"Error: No games found where '{player}' played as White or Black.")
    sys.exit(1)

# Prepare the data for analysis
heading = ','.join(headings)  # Combine column headings into a single string
data = '\n'.join([','.join([row[h] for h in headings]) for row in data_rows])  # Combine rows into a single string

# Define the prompt for the generative AI model
PROMPT = f"""Analyze this chess data to create a strategic player profile for {player}.

{heading}
{data}

Provide analysis in this format:

PLAYER PROFILE:
- Style: [Aggressive/Positional/Tactical/Defensive]
- Strengths: [2-3 key strengths]
- Weaknesses: [2-3 areas for improvement]

OPENING PREFERENCES:
- [Preferred openings and variations]
- [Opening knowledge level]

MIDDLEGAME SKILLS:
- Tactical Awareness: [Assessment]
- Strategic Planning: [Assessment]
- Piece Coordination: [Assessment]

RECOMMENDATIONS:
- [Specific training suggestions]
- [Opening repertoire advice]
- [Study materials focus]

Keep responses clean, professional, and actionable.
"""

# Send the prompt and print the result
response = model.generate_content(PROMPT)
print(response.text)