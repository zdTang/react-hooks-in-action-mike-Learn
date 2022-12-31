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

# Use useEffect to fetch data

const user = users?.[userIndex]; // this syntax is beautiful, if users is null, then will return null

# use Async within useEffect hook

As the Async function will return a function(Promise), which will be regarded as a CLEANUP function of the Effect. will cause Error.

# use Async

Notice those 3 console.logs in the useEffect hook, try to study the order carefully. which line will be executed first and which is later.

# Loading data

Even through the useEffect will be executed after Mounting, but during the Effect is working, it can dispatch different Action to Reducer, which will update the State, and the State will trigger component be reloading

This section is good demo for fetching data from database via useEffect + useReducer !

# use useRef to do presentation

Here we use the useRef in another way. when the useRef track a state, if the state changes, it will not trigger re-render. so that we use useRef to store TIMER, which is a inner logic and need not to re-render the UI.

# Fix NAN bug

When use the second useEffect to run setInterval(), it will trigger "NEXT_BOOKABLE" action every 3 seconds. While, if the "bookable" have not been loaded by the first useEffect, this "NEXT_BOOKABLE" will cause the Id to be a NAN. what I did is just to check if "bookable" is ready. and dispatch "NEXT_BOOKABLE" until "bookable" is ready.

Now, if you navigate to "bookables", it will do presentation automatically.

# use useRef to refer a DOM node

1, declare a ref variable with useRef. const myRef= useRef()
2, assign this ref to the DOM Node. <button ref={myRef}>Next</button>
3, use "myRef.current" to refer the Node

# Change the hierarchy of the bookable component.

1, create bookablesPage->bookablesView=>(1, bookablesList, 2, bookableDetail)
2, remove the detail information of a bookable into an individual component
3, use the Parent component(bookablesView) to maintain useReducer and pass States
and Dispatch to two Child component.
4, manage like this will make the logic cleaier.

# Only raise nessary state to the Parent

1, all state are generated by BookableDetail's useEffect, among those state, only `bookable` need to be shared with `BookableDetail` component. So that we only raise `bookable` state to Parent component. so that once the Parent will track the `bookable`, once it is updated, it will re-render, and 2 childs will be re-render as well.
2, as the parent pass a `stateUpdater` other than `dispatch`, the useReducer will not be necessary in this session. we only use useState to manage state.

# About the useEffect's dependency

After compiling, the React could advice adding the parameter 'bookable' as a dependency of useEffect. Theoritically, it is not workable as we want the loading database only one time.
In reality, once I added the `bookable` in the dependency array, the useEffect will keep on loading data from database which is not what we want.

React's recommondation is not always feasible!

# Use Tutorial's approach

The parent pass `user` and `setUser` to userList. the user is used to retrieve `id`
While I just pass `user` to userList, and id is tracked as a individual state
Both approach works well.
