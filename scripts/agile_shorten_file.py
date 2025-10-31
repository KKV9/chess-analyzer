
# This script takes a large chess CSV file and creates
# a smaller file with 1000 random rows

import csv # needed so it can handle the data csv file
import random

input_file = "chess_games.csv"          # original big file
output_file = "chess_games_sample.csv"  # new smaller file
new_size = 1000

# open and read all rows
with open(input_file, "r") as new_file:
    reader = list(csv.reader(new_file))
    header = reader[0]     # first row = column names
    rows = reader[1:]      # rest of the data using slicing got from github

# take 5000 random rows
sample_rows = random.sample(rows, new_size)

# write them out to a new CSV
with open(output_file, "w", newline="") as outfile:
    writer = csv.writer(outfile)
    writer.writerow(header)
    writer.writerows(sample_rows)

print("done")

