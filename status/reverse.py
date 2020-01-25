import json
import string

# Creates objects that contain information about package and its reverse dependencies. Pushes the objects to an array.
# The object is like {name: nameofthepackage, Depends: reversedependencies}
filename = "data.json"

dict_list = []
depends = []
json_dict = {}
json_list = []

with open(filename, 'r') as json_file:
    data = json_file.read()

dict_list = json.loads(data)

"""
Two for-loops: the first one loops through every package name, the second one loops through every package name but looks at dependencies. 
If the package name in first loop is found from dependencies of package looped through in the second loop, the package name at current index of the second loop is
added to the depends-list
"""
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

# Stores the array in file named reversedata
with open("reversedata.json", 'w') as newfile:
    json.dump(json_list, newfile, indent=1  )

# The reversedata file is not sorted, so it has to be sorted with datasort.py. From datasort.py I got file named reversesorted.py which is the final file used in my app.