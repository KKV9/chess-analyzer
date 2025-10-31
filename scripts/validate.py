#!/usr/bin/env python3
"""
Simple Validation Script for Chess Analyzer App
-----------------------------------------------
Checks that data/data.csv exists, can be read, and contains required columns.
"""

import os
import csv

FILE_PATH = "data/data.csv"
REQUIRED_COLUMNS = ["Black", "White"]  # Required column names

def main():
    # 1. Check if file exists
    if not os.path.exists(FILE_PATH):
        print(f"❌ File not found: {FILE_PATH}")
        print("Please upload a CSV file using the upload form.")
        return

    print(f"✅ Found file: {FILE_PATH}")

    # 2. Try reading first few lines
    try:
        with open(FILE_PATH, newline='', encoding='utf-8') as f:
            reader = csv.reader(f)
            header = next(reader, None)
            first_row = next(reader, None)

            if not header:
                print("❌ CSV file is empty or missing a header row.")
                return
            else:
                print(f"✅ Header columns: {header}")

            # 3. Check for required columns
            missing_columns = []
            for col in REQUIRED_COLUMNS:
                if col not in header:
                    missing_columns.append(col)
            
            if missing_columns:
                print(f"❌ Missing required columns: {', '.join(missing_columns)}")
                print(f"   Required columns are: {', '.join(REQUIRED_COLUMNS)}")
                return
            else:
                print(f"✅ All required columns present: {', '.join(REQUIRED_COLUMNS)}")

            if not first_row:
                print("⚠️  CSV file has no data rows.")
            else:
                print(f"✅ First data row: {first_row}")
                
                # Count total rows
                row_count = 1
                for _ in reader:
                    row_count += 1
                print(f"✅ Total data rows: {row_count}")
                
    except Exception as e:
        print(f"❌ Error reading CSV file: {e}")
        return

    print("🎉 CSV validation completed successfully!")

if __name__ == "__main__":
    main()