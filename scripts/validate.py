#!/usr/bin/env python3
"""
Simple Validation Script for Chess Analyzer App
-----------------------------------------------
Checks that data/data.csv exists and can be read.
"""

import os
import csv

FILE_PATH = "data/data.csv"

def main():
    # 1. Check if file exists
    if not os.path.exists(FILE_PATH):
        print(f"❌ File not found: {FILE_PATH}")
        return

    print(f"✅ Found file: {FILE_PATH}")

    # 2. Try reading first few lines
    try:
        with open(FILE_PATH, newline='', encoding='utf-8') as f:
            reader = csv.reader(f)
            header = next(reader, None)
            first_row = next(reader, None)

            if not header:
                print("⚠️  CSV file is empty or missing a header row.")
            else:
                print(f"✅ Header columns: {header}")

            if not first_row:
                print("⚠️  CSV file has no data rows.")
            else:
                print(f"✅ First data row: {first_row}")
    except Exception as e:
        print(f"❌ Error reading CSV file: {e}")
        return

    print("🎉 CSV validation completed successfully!")

if __name__ == "__main__":
    main()
