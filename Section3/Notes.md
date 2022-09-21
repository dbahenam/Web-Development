## Section3:

### Development Web Server:

- Serves websites locally, on our machine. It's NOT exposing our machine or the website to the internet
- The "Live Server" extension is a software that does actually listen for incoming HTTP requests and sends back appropriate responses(that contain the HTML code for example).

### Address:127.0.0.1:

- A special IP that's reserved to your local machine(if it's running a local web server). You reach your machine.
- It's an IP address that's not assigned to other machines in the world wide web. It's reserved as a "placeholder" that always points at your local machine.
- You can also enter **localhost:5500** which is an alias for 127.0.0.1.

### :5500

- The **:5500** is called a **port**
- The idea is that a machine can expose different processes(e.g different web servers serving different websites) via different **ports**.
- So a single machine could host/provide three different websites on three different ports. The IP address of the local machine would always be the same (127.0.0.1) but every website would have its own port(e.g **5500**, **3000**, **8080**)
- When moving a website to some machine that **is exposed** to the world wide web, then the website is reached via the IP address of that remote machine(or via the domain). However, the port concept still exists.
- When exposed to the www, websites are typically served on ports **80(HTTP) or 443(HTTPS)**.

### Inheritance:

- (Selected) container rules apply to descendants

### Cascading Style Sheets:

- Multiple rules can be applied to the same element
- Latest applied rule wins

### Specifity:

- More specific selector's rule wins over lesser specific selector

### The CSS Box Model

- Element has content(space required for text)
- Padding is the space between content and border (top,right,bottom,left)
- Border (width, type, color) : border of an element
- Margin is the space between an element and other elements (top/bottom, left/right, or just one value)

### Selectors

- [Type][elementname]
- [ID] [#id]
- [Group] [elementname, elementname]
- [Class] [.class]

### Combinators

- combination of different selectors
- Descendant -- li p -- All p with li as ancestor
- Child -- h2 > p -- Only p which are direct children of h2

### Block vs Inline Elements

- Block: new line started and width
- Inline: in line added and only width of content is used
  - top and bottom margins don't work for them
