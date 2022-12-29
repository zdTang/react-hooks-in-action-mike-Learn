# Create folder hierarchy

App.js
Index.js
Index.html
/Components

# some foundmental Libraries

react-router-dom
react-icons

# Add bookable list

Very strange, I cannot use 'import { bookables } form "xxx.json"' directly, while the Book's source code can
I have no idea if this is bacause different Node version?

# At this momonet, if you click button, you will change the state,but the UI will not be update

Just because you change the value of a varialbe within your component doesn't mean React will notice.

# useState Data flow

be aware, when we use updater function to tell React we changed state, React will run the component
from start to the end. only one time!
With useState, React is now listening,
we fixate on the state
react does its diffing and update the DOM

# follow Book's approach.

Add a user list other than listing all user's informationent

# Add group picker

a. Pay attention how SELECT' value will make certain OPTION to behave as it is to be "selected"
b. Pay attention how data flow goes from the top to the bottom, even beyond the function
c. Pay attention how the function use "%" to cycle all items. (not clear the logic)
d. Pay attention how to use SET to filter unique values from database and use ... to spread them into a new array
e. Pay attention how to dynamically create two different groups of bookable items based on user's interaction.
f. "React.strictMode" as it always console.log two times, could make you mis-understand the data-flow.

# Add another State, check box

understand how to use Conditional Render! {display_condition && xx_Something_can_be_display_when}

# Use one function to update several STATEs one time.

# Create a reducer function

a, Be aware some new States will be retrieved based on previous State.
b, Or be passed by Action's payload.

# useReducer

No like useState, we send a value to useState, for useReducer, we send a Action to tell the reducer function how to processig the state.

# Another useReducer example

Notice how to use those dispatchs within the event handler.

# Other Demos of useEffect

https://codesandbox.io/s/sayhello-jhijd // Run useEffect every Render
https://codesandbox.io/s/windowsize-gn80v?file=/src/index.js // Run useEffect after Mount
https://codesandbox.io/s/windowsizecleanup-b8wii?file=/src/App.js:386-453 // Run cleanup function to clean Effect
https://codesandbox.io/s/userstorage-c987h?file=/src/App.js:0-682 // Run useEffect base on dependencies ( see React-hook-in-action-demo)

for the 4th demo, the second useEffect will run after Render. Even it has dependency, it is "sanjiv" once the component be called. after the Component is rendered, this useEffect will be ran.

# Use useEffect to fetch data from remote database

1, set up Node server and use 'json-server --watch db.json --port 3001 --delay 3000' to simulate latency of network
2, the dependency of useEffect is [], so that the Effect will be executed only one time when the component mount, which is enought for loading users from database.
3, Notice, if adding latency to the node server, we can see the Spinner is running at the location where the dropdown list is supposed to be
