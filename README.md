# Reaktor pre-assignment by Antti Järveläinen
Finished on January the 24th, still has a lot to be improved. The status file is from my AWS-server (Ubuntu).
## How does it work?
The app lists all the packages. By clicking a package name you find some information about it.
If a package is replaced by some another package, the package name leads to the package replacing it.
If a package does not exist, error is displayed.
## Technologies?
### React
Everything started from npx create-react-app
### Python
I used Python to turn the status file into JSON. Also sorted the list and created a file for reverse dependencies by using Python
### Google Firebase
The app runs in Google Firebase
## What to change?
The code still looks bad (I'm not happy with it, mostly because of the huge useEffect which makes the app slow). I didn't know if the main idea of the assignment was to manipulate the status-file so that you could get the needed information straight from one file. I manipulated it inside React's useEffect but should change it so that I would manipulate the status-file with Python so that the app itself would be faster. I should also loop through the status-file to find dependencies that do not exist in the list (I created a list by hand but it still misses a couple of packages). Got also a couple of ideas how to make it better.
