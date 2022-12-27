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

Add a user list other than listing all user's information
