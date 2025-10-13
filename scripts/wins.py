#!/usr/bin/env python3
"""
Black/White Winrate Analysis Script for Chess Analyzer App
----------------------------------------------------------
Analyzes data/data.csv to calculate win rates for black and white pieces.
"""

import os
import csv
import json

FILE_PATH = "data/data.csv"

def main():
    # Check if file exists
    if not os.path.exists(FILE_PATH):
        print(json.dumps({"error": f"File not found: {FILE_PATH}"}))
        return

    # Initialize counters
    white_wins = 0
    black_wins = 0
    draws = 0
    total_games = 0

    try:
        with open(FILE_PATH, newline='', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            
            # Check if 'Result' column exists
            if 'Result' not in reader.fieldnames:
                print(json.dumps({"error": "CSV file missing 'Result' column"}))
                return
            
            # Count wins for each side
            # Result format: "1-0" (white wins), "0-1" (black wins), "1/2-1/2" (draw)
            for row in reader:
                total_games += 1
                result = row.get('Result', '').strip()
                
                if result == '1-0':
                    white_wins += 1
                elif result == '0-1':
                    black_wins += 1
                elif result == '1/2-1/2':
                    draws += 1

        # Calculate percentages
        if total_games > 0:
            white_percentage = round((white_wins / total_games) * 100, 2)
            black_percentage = round((black_wins / total_games) * 100, 2)
            draw_percentage = round((draws / total_games) * 100, 2)
        else:
            white_percentage = black_percentage = draw_percentage = 0

        # Output JSON for frontend
        result = {
            "success": True,
            "total_games": total_games,
            "white_wins": white_wins,
            "black_wins": black_wins,
            "draws": draws,
            "white_percentage": white_percentage,
            "black_percentage": black_percentage,
            "draw_percentage": draw_percentage
        }
        
        print(json.dumps(result))

    except Exception as e:
        print(json.dumps({"error": f"Error reading CSV file: {str(e)}"}))

if __name__ == "__main__":
    main()