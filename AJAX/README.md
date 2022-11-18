### Ajax

- Asychronous JavaScript And XML

- JavaScript driven HTTP requests

- XML is a data format for formmating/structuring text data in a machine-readable way

- Looks like HTML - because HTML is based on XML

- HTML is standardized, XML is not

- Nowadays, XML isn't really used anymore for transmitting data, instead JSON is used

### Sending Http Request without Ajax

- Enter a URL (sends a GET request to URL)

- Click a link(sends a GET request to URL)

- Submit a form (sends a GET/POST request to URL)

All of this is fine but always leads to a new page being loaded

### Sending Http requests with Ajax

- Send a Http request via browser-side JavaScript

- Handle response in same script code

You have full control over the browser behavior and can prevent loading a new page

### fetch()

- An object built-into browser-side JavaScript that contains utility methods for sending Http requests via JavaScript

- Uses modern JS features like Promises

- Relatively straightforward to use

- Alternative to XMLHttpRequest and libraries like "axios"
