import json
import string

dict_list = []
filename = "status"
lines = [line.rstrip('\n') for line in open(filename)]
dict = {}
for line in lines:
	if not line == "":
		words = line.split(": ")
		print(words)
		if len(words) < 2:
			pass
		else:
			print(words[0], words[1])
			dict[words[0]] = words[1]
	else:
		dict_list.append(dict)

		dict = {}


with open("data.json", 'w') as json_file:
	json.dump(dict_list, json_file)
