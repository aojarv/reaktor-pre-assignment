import json
import string

filename = "data.json"

list = []

with open(filename, 'r') as json_file:
    data = json_file.read()

list = json.loads(data)

sortedData = sorted(list, key=lambda k: k['Package'])

with open("sorted.json", 'w') as newfile:
     json.dump(sortedData, newfile, indent=1  )
