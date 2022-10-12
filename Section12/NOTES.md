## DOM:

- Document Object Model: The data representation ("internal representation") of the parsed HTML code
- The browser parses our HTML code and saves all elements as **JavaScript** objects
- Our JavaScript code is able to interact with the DOM and extract data from it or manipulate it
- The DOM can be seen as a nested tree of javascript objects
- You can either drill into elements to select them, or you can query for specific elements with certain commands provided by the browser or javascript

### window & document:

- Bult in Variables and functions
- Global "window" object: holds information functionality related to the active browser window
- This object is not required to be written out to access it's functions (e.g window.aler())
- The "document" object: holds information and functionality to the loaded website content (e.g. utility functions to access HTML elements)

### document:

- We can log our document object instantly.
- We can not use the document to change things if we place our script tag (without defer) with the js source, before the content of the html code is loaded.
- This is because the changes will be done instantly before the content is loaded.
- One solution is to place script tag at the bottom of the body tag, while another more elegant solution is to place it in the head section with the defer property
- defer tells the js commands to wait until the html is parsed
- White space is taken as empty **text nodes**

### getElementById vs querySelector:

- getElementById specifically looks for an html element with the specific id passed in
- querySelector can also get elements by their ID, using the css selector. (id selector, class selector, combined selectors, etc).
- querySelector can also get an element by their html element tag('p','a', etc) or even by specificing the order ('p a')
  **NOTE**: querySelector gets the first element it finds with the tag, if you want to get all elements, you would use querySelectorAll which returns an **array**

### Events:

- Events to which we might want to react-to then execute JavaScript code
- user clicks on some element, user types some text into an input field, user scrolls to a certain part of the page.
- someElement.addEventListener('<EVENT>',...);

### Function Parameter

- When dealing with events, the browser automatically provides you with a special default parameter in all your functions that are connected via addEventListener
- The parameter is an object with many properties
- The data property can hold data that belongs to the event
- The target property holds the html element object on which the event occured.
- The concrete information will depend on the event

### Styling with Javascript

- After getting access to the html element, you can style it using javascript with the style property
- The values you assign a specific style property should be in **string** format (i.e element.style.color = "red")
