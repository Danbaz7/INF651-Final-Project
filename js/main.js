/** fn1
 * Creates an HTML element with optional text and class.
 *
 * @param {string} elemType - The type of element to create (default: "p").
 * @param {string} text - The textContent for the element (default: "").
 * @param {string} className - Optional class name to apply.
 * @returns {HTMLElement} The created element.
 */

function createElemWithText(elemType = "p", text = "", className) {
  // Create the element
  const element = document.createElement(elemType);

  // Set textContent if provided
  element.textContent = text;

  // Apply className if provided
  if (className) {
    element.className = className;
  }

  // Return the element
  return element;
}

/** fn2
 * Creates an array of <option> elements from users JSON data.
 *
 * @param {Array} users - Array of user objects (with id and name).
 * @returns {Array|undefined} Array of <option> elements, or undefined if no parameter received.
 */
function createSelectOptions(users) {
  // Return undefined if no parameter received
  if (!users) return undefined;

  // Array to hold option elements
  const options = [];

  // Loop through users data

  //  forEach LOOP OPTION:
  // users.forEach((user) => {
  //   const option = document.createElement("option");
  //   option.value = user.id;
  //   option.textContent = user.name;
  //   options.push(option);
  // });

  for (const user of users) {
    // Create an <option> element
    const option = document.createElement("option");
    option.value = user.id;
    option.textContent = user.name;
    options.push(option);
  }

  return options;
}

/**fn3
 * Toggles the 'hide' class on a section element with a given postId.
 *
 * @param {number|string} postId - The postId used to find the section element.
 * @returns {HTMLElement|null|undefined} The section element, null if not found, or undefined if no postId.
 */
function toggleCommentSection(postId) {
  // Return undefined if no postId is provided
  if (postId === undefined || postId === null) return undefined;

  // Select the section element with matching data-post-id
  const section = document.querySelector(`section[data-post-id="${postId}"]`);

  // If no matching section, return null
  if (!section) return null;

  // Toggle the 'hide' class safely
  section.classList.toggle("hide");

  // Return the section element
  return section;
}

// fn4
function toggleCommentButton(postId) {
  // b. Select the button with the data-post-id attribute equal to postId
  if (postId === undefined || postId === null) return undefined;

  const button = document.querySelector(`button[data-post-id="${postId}"]`);

  // guard clause if no button found
  // If no matching section, return null
  if (!button) return null;

  // c & d. Toggle textContent between 'Show Comments' and 'Hide Comments'
  button.textContent =
    button.textContent === "Show Comments" ? "Hide Comments" : "Show Comments"; // e. ternary statement used

  // f. Return the button element
  return button;
}

// fn5
function deleteChildElements(parentElement) {
  // a. Check if parentElement is a valid HTML element
  if (!(parentElement instanceof HTMLElement)) return undefined;

  // b. Define a child variable as parentElement.lastElementChild
  let child = parentElement.lastElementChild;

  // c. While the child exists…
  while (child) {
    // d. Remove the child
    parentElement.removeChild(child);

    // e. Reassign child to parentElement.lastElementChild
    child = parentElement.lastElementChild;
  }

  // f. Return the parentElement
  return parentElement;
}

// // i. Define an empty toggleComments function for now
// function toggleComments(event, postId) {
//   // Placeholder logic — actual implementation already completed earlier
//   return [null, null];
// }

function commentClickHandler(event) {
  const postId = event.target?.dataset?.postId;
  if (postId) toggleComments(event, postId);
}

function addButtonListeners() {
  const main = document.querySelector("main");
  const buttons = main ? main.querySelectorAll("button") : [];
  buttons.forEach((button) => {
    button.addEventListener("click", commentClickHandler);
  });
  return buttons;
}

function removeButtonListeners() {
  const buttons = document.querySelectorAll("main button");
  buttons.forEach((button) => {
    button.removeEventListener("click", commentClickHandler);
  });
  return buttons;
}

// fn8
function createComments(comments) {
  // a. Depends on createElemWithText
  if (!Array.isArray(comments)) return;

  // c. Create a document fragment
  const fragment = document.createDocumentFragment();

  // d. Loop through the comments
  comments.forEach((comment) => {
    // f. Create an article element
    const article = document.createElement("article");

    // g. Create h3 with comment.name
    const h3 = createElemWithText("h3", comment.name);

    // h. Create paragraph with comment.body
    const bodyPara = createElemWithText("p", comment.body);

    // i. Create paragraph with comment.email
    const emailPara = createElemWithText("p", `From: ${comment.email}`);

    // j. Append h3 and paragraphs to article
    article.append(h3, bodyPara, emailPara);

    // Append article to fragment
    fragment.appendChild(article);
  });

  // Return the fragment
  return fragment;
}

// fn9

function populateSelectMenu(users) {
  // a. Depends on createSelectOptions (assumed defined elsewhere)
  if (!Array.isArray(users)) return;

  // c. Select the #selectMenu element by id
  const selectMenu = document.getElementById("selectMenu");

  if (!selectMenu) return;

  // d. Pass the users JSON data to createSelectOptions()
  // e. Receive an array of option elements
  const options = createSelectOptions(users);

  // f. Loop through the options and append each to the select menu
  options.forEach((option) => {
    selectMenu.appendChild(option);
  });

  // g. Return the selectMenu element
  return selectMenu;
}

// 10. getUsers
async function getUsers() {
  try {
    // d. Use the fetch API to request all users
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    // e. Await the users data response and parse JSON
    const users = await response.json();

    // f. Return the JSON data
    return users;
  } catch (error) {
    // c. Handle errors gracefully
    console.error("Error fetching users:", error);
    return null; // return null if something goes wrong
  }
}

// 11. getUserPosts
async function getUserPosts(userId) {
  // a. Return undefined if no userId is provided
  if (!userId) return undefined;

  try {
    // e. Fetch posts for the specific user ID
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );

    // f. Await and parse the JSON response
    const posts = await response.json();

    // g. Return the JSON data
    return posts;
  } catch (error) {
    // c. Catch and log any errors
    console.error("Error fetching user posts:", error);
    return null;
  }
}

// 12. getUser
async function getUser(userId) {
  // a. Return undefined if no userId is provided
  if (!userId) return undefined;

  try {
    // e. Use fetch API to request a specific user by ID
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );

    // f. Await and parse the user data response
    const user = await response.json();

    // g. Return the JSON data
    return user;
  } catch (error) {
    // d. Catch and log any errors
    console.error("Error fetching user:", error);
    return null;
  }
}

// 13. getPostComments
async function getPostComments(postId) {
  // a. Return undefined if no postId is provided
  if (!postId) return undefined;

  try {
    // e. Use fetch API to request all comments for a specific post id
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );

    // f. Await and parse the JSON response
    const comments = await response.json();

    // g. Return the JSON data
    return comments;
  } catch (error) {
    // d. Handle errors gracefully
    console.error("Error fetching post comments:", error);
    return null;
  }
}

// 14. displayComments
async function displayComments(postId) {
  // c. Return undefined if no postId is provided
  if (!postId) return undefined;

  // d. Create a section element
  const section = document.createElement("section");

  // e. Set dataset attribute with postId
  section.dataset.postId = postId;

  // f. Add classes 'comments' and 'hide'
  section.classList.add("comments", "hide");

  try {
    // g. Await comments data from getPostComments
    const comments = await getPostComments(postId);

    // h. Create fragment with createComments(comments)
    const fragment = createComments(comments);

    // i. Append fragment to section
    section.appendChild(fragment);
  } catch (error) {
    console.error("Error displaying comments:", error);
  }

  // j. Return the section element
  return section;
}

// 15. createPosts
async function createPosts(posts) {
  if (!Array.isArray(posts)) return undefined;

  const fragment = document.createDocumentFragment();

  for (const post of posts) {
    const article = document.createElement("article");

    const h2 = createElemWithText("h2", post.title);
    const bodyPara = createElemWithText("p", post.body);
    const idPara = createElemWithText("p", `Post ID: ${post.id}`);

    const author = (await getUser(post.userId)) || {};
    const company = author.company || {};

    const authorPara = createElemWithText(
      "p",
      `Author: ${author.name || "Unknown"} with ${company.name || "Unknown"}`
    );
    const catchPhrasePara = createElemWithText("p", company.catchPhrase || "");

    const button = createElemWithText("button", "Show Comments");
    button.dataset.postId = post.id;

    const section = await displayComments(post.id);

    article.append(
      h2,
      bodyPara,
      idPara,
      authorPara,
      catchPhrasePara,
      button,
      section
    );
    fragment.appendChild(article);
  }

  return fragment;
}

// 16. displayPosts
async function displayPosts(posts) {
  const main = document.querySelector("main");

  const element =
    Array.isArray(posts) && posts.length > 0
      ? await createPosts(posts)
      : createElemWithText("p", "Select an Employee to display their posts.");

  if (element.tagName === "P") {
    element.classList.add("default-text");
  }

  // Only append if main exists
  if (main instanceof HTMLElement) {
    main.appendChild(element);
  }

  // Always return the element (fragment or paragraph)
  return element;
}

// 17. toggleComments
function toggleComments(event, postId) {
  // b. Validate parameters
  if (!event || !postId) return undefined;

  // c. Set listener flag for testing
  event.target.listener = true;

  // d. Call toggleCommentSection with postId
  const section = toggleCommentSection(postId);

  // f. Call toggleCommentButton with postId
  const button = toggleCommentButton(postId);

  // h. Return both elements in an array
  return [section, button];
}

// 18. refreshPosts
async function refreshPosts(posts) {
  // b. Async function
  // c. Receives posts JSON data
  if (!posts) return undefined;
  // d. Call removeButtonListeners
  const removeButtons = removeButtonListeners();

  // e. Result is the buttons returned
  // f. Select the main element
  const main = document.querySelector("main");

  // g. Call deleteChildElements with main
  const deletedMain = deleteChildElements(main);

  // h. Pass posts to displayPosts and await result
  const fragment = await displayPosts(posts);

  // j. Call addButtonListeners
  const addButtons = addButtonListeners();

  // l. Return array of results
  return [removeButtons, deletedMain, fragment, addButtons];
}

// 19. selectMenuChangeEventHandler
async function selectMenuChangeEventHandler(event) {
  // Validate event and target
  if (!event || !event.target) return undefined;

  // Disable the select menu
  const select = event.target;
  select.disabled = true;

  // Parse userId as a number
  const userId = Number(select.value);
  const validUserId = Number.isFinite(userId) ? userId : 1;
  let posts = await getUserPosts(validUserId);
  if (!Array.isArray(posts)) posts = [];
  const filteredPosts = posts.filter(
    (post) => Number(post.userId) === validUserId
  );
  const refreshPostsArray = (await refreshPosts(filteredPosts)) || [];
  return [validUserId, filteredPosts, refreshPostsArray];
}

// 20. initPage
async function initPage() {
  // b/c. Async function with no parameters

  // d. Await getUsers
  const users = await getUsers();

  // f. Pass users to populateSelectMenu
  const select = populateSelectMenu(users);

  // h. Return array with users and select element
  return [users, select];
}

// 21. initApp
function initApp() {
  // b. Call the initPage() function
  initPage();

  // c. Select the #selectMenu element by id
  const selectMenu = document.getElementById("selectMenu");

  // d/e. Add event listener for "change" that calls selectMenuChangeEventHandler
  if (selectMenu) {
    selectMenu.addEventListener("change", selectMenuChangeEventHandler);
  }
}

// f. NOTE: initApp does not return anything

// *** Final step to start the app after DOM loads
document.addEventListener("DOMContentLoaded", initApp);
