import json
import string

# Sorts data.json (the file I got from statustojson.py) alphabetically
filename = "data.json"

list = []

with open(filename, 'r') as json_file:
    data = json_file.read()

list = json.loads(data)

sortedData = sorted(list, key=lambda k: k['Package'])

# Stores the sorted array in file named sorted.json
with open("sorted.json", 'w') as newfile:
     json.dump(sortedData, newfile, indent=1  )
