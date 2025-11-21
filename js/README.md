# Employee Posts Viewer

This project is a dynamic JavaScript web application that allows users to select an employee from a dropdown menu and view their associated posts and comments. It demonstrates modular programming, asynchronous data fetching, DOM manipulation, and event-driven UI updates using vanilla JavaScript.

## 📦 Features

- Fetches and displays a list of users from an external API
- Dynamically populates a `<select>` dropdown with user names
- Displays posts for the selected user, including:
  - Post title, body, ID
  - Author name, company, and catchphrase
  - Toggleable comment sections
- Efficient DOM updates using `DocumentFragment`
- Modular, testable functions with clear responsibilities

## 🚀 How It Works

1. **Initialization**

   - `initApp()` is triggered on `DOMContentLoaded`
   - Calls `initPage()` to fetch users and populate the dropdown
   - Adds a `change` event listener to the dropdown

2. **User Selection**

   - When a user is selected, `selectMenuChangeEventHandler()`:
     - Disables the dropdown
     - Fetches posts for the selected user
     - Calls `refreshPosts()` to update the UI
     - Re-enables the dropdown

3. **Post Rendering**

   - `createPosts()` builds the full post structure
   - `displayPosts()` appends it to the DOM
   - `addButtonListeners()` attaches comment toggling logic

4. **Comment Toggling**
   - Clicking a post’s button triggers `toggleComments()`
   - This toggles visibility of the comment section and button text

## 🧩 Function Overview

| Function                         | Purpose                                              |
| -------------------------------- | ---------------------------------------------------- |
| `createElemWithText()`           | Creates an element with optional text and class      |
| `createSelectOptions()`          | Builds `<option>` elements from user data            |
| `populateSelectMenu()`           | Appends options to the dropdown                      |
| `getUsers()`                     | Fetches all users                                    |
| `getUserPosts(userId)`           | Fetches posts for a specific user                    |
| `getUser(userId)`                | Fetches a single user’s details                      |
| `getPostComments(postId)`        | Fetches comments for a post                          |
| `createComments()`               | Builds comment elements                              |
| `displayComments()`              | Creates and returns a hidden comment section         |
| `createPosts()`                  | Builds full post articles with metadata and comments |
| `displayPosts()`                 | Appends posts or fallback message to `<main>`        |
| `deleteChildElements()`          | Clears all children from a parent element            |
| `addButtonListeners()`           | Adds comment toggle listeners to post buttons        |
| `removeButtonListeners()`        | Removes comment toggle listeners                     |
| `toggleCommentSection()`         | Toggles visibility of a comment section              |
| `toggleCommentButton()`          | Toggles button text between Show/Hide                |
| `toggleComments()`               | Coordinates section and button toggling              |
| `refreshPosts()`                 | Clears and re-renders posts                          |
| `selectMenuChangeEventHandler()` | Handles dropdown changes and triggers post refresh   |
| `initPage()`                     | Fetches users and populates the dropdown             |
| `initApp()`                      | Initializes the app and sets up event listeners      |

## 🛠️ Technologies

- JavaScript (ES6+)
- HTML5
- Fetch API
- DOM API

## 📡 API Source

All data is fetched from [JSONPlaceholder](https://jsonplaceholder.typicode.com/), a free fake REST API for testing and prototyping.

## 🧪 Testing

This project is designed to pass a comprehensive test suite that validates:

- Function existence and return types
- DOM manipulation accuracy
- Event listener behavior
- Data integrity (e.g., correct userId matching)
