# Reaktor pre-assignment by Antti Järveläinen
Finished in January the 24th, still has a lot to be improved. The status file is from my AWS-server (Ubuntu).
## Technologies?
### React
Everything started from npx create-react-app
### Python
I used Python to turn the status file into JSON. Also sorted the list and created a file for reverse dependencies by using Python
### Google Firebase
The app runs in Google Firebase
## What to change?
The code still looks bad. I didn't know if the main idea of the assignment was to manipulate the status-file so that you could get the needed information straight from one file. I manipulated it inside React's useEffect but should change it so that I would manipulate the status-file with Python so that the app itself would be faster. I should also loop through the file to find dependencies that do not exist in the list (I created a list by hand but it still misses a couple of packages).
