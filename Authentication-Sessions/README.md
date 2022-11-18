### What is Authentication?

- In many websites, certain "areas"(pages) should only be accessible by authenticated (=logged in) users

- Examples: Personal Profile on a social network, Your shopping cart and order history in an online shop, The administration area of your own blog website

- **Process**:
  1. User **Sign Up** (create account with email + password)
  2. User **Log In** (enter email + password)
  3. Users **Authentication** (grant access to protected pages)

## Password Hashing

- To render security-relevant data (e.g a password) useless in case of a data breach, you should hash it

- **Hashing:** converting a string (i.e the password) to a non-decodable, different string

- Securely hashed values can't be reverted, decoded or transformed back into the original value

- The hashing algorithm will be able to tell if hashing a string would lead to the hashed password therefore verifying it

## bcrypt.js

- npm package for hashing and comparing passwords

## Locking down part of our website

- We need to track user authentication status

- To the web server (backend code) every incoming request is similar

- Just by looking at a default request, the server-side code can't find out whether a user should be granted access or not

- An "entry ticket" must be saved on the server and handed out to the visitor

## Sessions

- Tickets generated on the server-side (Server)

- A record/document with only a few pieces of information that will be stored in a database

- It will have a unique id

- Every session will be unique per user, every visitor will receive their own session

- Even if the user has not logged in, a session can be created for them but we can store information that the user hasn't logged in yet in the session.

- We can map a session to a user because the server will send back the session ID to the client,

- There it will be stored as a cookie

## Session Cookies

- Stored on the Client-side

- You can think of a cookie as a form of automatically-managed data storage in the browser

- there are different types of cookies (tracking fore example)

## Working with Sessions & Cookies

- You can create and use sessions and cookies on your own - for authentication or other purposes

- Typically you use third-party packages

- With expressjs, you have **express-session**

- for cookies, you can use **cookie-parser**

- Sessions can not only be used for authentication purposes, but also for temporarily storing data on the server. (Saving input data until new page is rendered)

-
