import json
import string

filename = "data.json"

dict_list = []
depends = []
json_dict = {}
json_list = []

with open(filename, 'r') as json_file:
    data = json_file.read()

dict_list = json.loads(data)

for dict in dict_list:
    name = dict["Package"]
    for object in dict_list:
        if "Depends" in object:
            string = object["Depends"]
            list = string.split(" ")
            for entry in list:
                if entry == name:
                    depends.append(object["Package"])
    json_dict["name"] = name
    json_dict["Depends"] = depends
    json_list.append(json_dict)
    json_dict = {}
    depends = []

with open("reversedata.json", 'w') as newfile:
    json.dump(json_list, newfile, indent=1  )
