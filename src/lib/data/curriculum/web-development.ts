import type { SectionCategory } from './types';

export const WEB_DEVELOPMENT_CATEGORY: SectionCategory = {
  id: 'web-development',
  slug: 'web-and-software-development',
  title: 'Web & Software Development (Full-Stack)',
  description: 'Understand how real-world applications work: HTML structure, CSS layout, JavaScript DOM interactivity, Backend APIs, Databases, and Git version control.',
  icon: 'Layers',
  topics: [
    {
      id: 'html-css-web-foundations',
      slug: 'html-css-structure-and-styling',
      title: 'HTML & CSS: The Building Blocks of Every Website',
      description: 'Master HTML5 semantic tags, elements, attributes, forms, and CSS styling, the Box Model, Flexbox layout, and mobile responsiveness.',
      estimatedMinutes: 20,
      difficulty: 'Easy',
      companyTags: ['Frontend', 'Web Development'],
      keyTakeaways: [
        'HTML (HyperText Markup Language) provides the raw structure, content, and semantics of a webpage.',
        'CSS (Cascading Style Sheets) controls colors, fonts, margins, animations, and responsive screen layout.',
        'The CSS Box Model defines every element as: Content -> Padding -> Border -> Margin.',
        'Flexbox and Grid allow responsive layouts that adapt smoothly across mobile phones and desktop monitors.'
      ],
      prerequisites: ['How the Internet Works: Websites, Browsers & Servers'],
      youtube_url: 'https://www.youtube.com/results?search_query=html+css+crash+course+for+absolute+beginners',
      notesMarkdown: `# HTML & CSS: The Building Blocks of Every Website

## 1. What Will You Learn?
You will learn how every webpage on the internet is visually constructed. You will master HTML elements for structure (headings, buttons, inputs) and CSS rules for styling and responsive layouts.

---

## 2. Why Is This Important?
Whether you build a web app using React, Next.js, Angular, or Vue, browsers only render three things: HTML, CSS, and JavaScript. Understanding this foundation is essential before working with any modern web framework.

---

## 3. Prerequisites
Completion of **How the Internet Works: Websites, Browsers & Servers**.

---

## 4. Simple Explanation: The Human Body Analogy
- **HTML is the Skeleton:** It provides structure. Bones for the skull, ribs, and legs (headings, paragraphs, buttons, image placeholders).
- **CSS is the Appearance (Skin & Clothing):** Hair color, height, skin tone, clothing styles, and layout (fonts, background colors, padding, flex alignment).
- **JavaScript is the Muscles & Nervous System:** Making the body move and respond to touch (handling clicks, fetching data, submitting forms).

---

## 5. HTML Elements & Tags
HTML uses **tags** enclosed in angle brackets: \`<tag>content</tag>\`.
\`\`\`html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My First Website</title>
  </head>
  <body>
    <!-- Main Heading -->
    <h1>Welcome to StackUp!</h1>
    
    <!-- Paragraph of text -->
    <p>This is where your learning journey begins.</p>
    
    <!-- Clickable Link -->
    <a href="https://stackup-zeta.vercel.app">Visit StackUp</a>
    
    <!-- Interactive Button -->
    <button>Click Me</button>
  </body>
</html>
\`\`\`

---

## 6. The CSS Box Model
Every single element on a web page is treated by the browser as a rectangular box:

\`\`\`
+----------------------------------------------------+
|                      MARGIN                        |  (Outer spacing around the box)
|   +--------------------------------------------+   |
|   |                  BORDER                    |   |  (The visible frame/edge)
|   |   +------------------------------------+   |   |
|   |   |              PADDING               |   |   |  (Inner breathing room)
|   |   |   +----------------------------+   |   |   |
|   |   |   |          CONTENT           |   |   |   |  (The actual text/image)
|   |   |   +----------------------------+   |   |   |
|   |   +------------------------------------+   |   |
|   +--------------------------------------------+   |
+----------------------------------------------------+
\`\`\`

\`\`\`css
/* Styling a button card */
.card {
  background-color: #ffffff;
  color: #0b1020;
  padding: 16px;         /* Space inside the card */
  border: 1px solid #e2e8f0;
  border-radius: 8px;     /* Rounded corners */
  margin: 12px 0;        /* Space outside the card */
}
\`\`\`

---

## 7. Modern Layouts: Flexbox
In the past, aligning items side-by-side on a screen was difficult. Modern CSS uses **Flexbox**:
\`\`\`css
.nav-container {
  display: flex;                /* Enables flexible layout */
  justify-content: space-between; /* Spreads items to left & right */
  align-items: center;          /* Centers items vertically */
}
\`\`\`

---

## 8. Knowledge Check
Test your understanding with the quiz questions below!
`,
      questions: [
        {
          id: 'wd-html-1',
          question: 'What is the primary role of HTML in web development?',
          options: [
            'To calculate database queries on the server',
            'To provide the structural elements and content of a web page',
            'To connect the computer to Wi-Fi',
            'To encrypt user passwords'
          ],
          correct_option: 1,
          explanation: 'HTML (HyperText Markup Language) defines the semantic structure and content of a webpage, such as headings, paragraphs, and links.'
        },
        {
          id: 'wd-html-2',
          question: 'In the CSS Box Model, what is the layer located between the Content and the Border?',
          options: [
            'Margin',
            'Padding',
            'Shadow',
            'Outline'
          ],
          correct_option: 1,
          explanation: 'Padding provides inner spacing between the element content and its surrounding border.'
        },
        {
          id: 'wd-html-3',
          question: 'Which CSS property enables modern flexible layouts for aligning items horizontally or vertically?',
          options: [
            'display: flex;',
            'font-style: italic;',
            'color: blue;',
            'background-image: none;'
          ],
          correct_option: 0,
          explanation: 'display: flex initiates a Flexbox layout container, enabling powerful automatic alignment of child elements.'
        }
      ],
      externalResources: [
        {
          title: 'MDN Web Docs: Learn HTML',
          provider: 'MDN Web Docs',
          url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML',
          difficulty: 'Beginner',
          isFree: true
        },
        {
          title: 'MDN Web Docs: Learn CSS',
          provider: 'MDN Web Docs',
          url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS',
          difficulty: 'Beginner',
          isFree: true
        }
      ]
    },
    {
      id: 'javascript-dom-interactivity',
      slug: 'javascript-dom-events-interactivity',
      title: 'JavaScript & The DOM: Making Web Pages Interactive',
      description: 'Learn how JavaScript brings websites to life: selecting elements, listening for user clicks and form submissions, and dynamically updating the DOM.',
      estimatedMinutes: 20,
      difficulty: 'Easy',
      companyTags: ['Frontend', 'JavaScript'],
      keyTakeaways: [
        'The DOM (Document Object Model) is the browser tree representation of HTML elements.',
        'JavaScript can read, modify, add, or delete elements in the DOM dynamically.',
        'Event Listeners wait for user actions (clicks, keypresses, scrolls) and run callback code in response.',
        'Modern frameworks like React build on top of DOM concepts to manage UI state declaratively.'
      ],
      prerequisites: ['HTML & CSS: The Building Blocks of Every Website'],
      youtube_url: 'https://www.youtube.com/results?search_query=javascript+dom+manipulation+tutorial+for+beginners',
      notesMarkdown: `# JavaScript & The DOM: Making Web Pages Interactive

## 1. What Will You Learn?
You will learn how websites respond when you click buttons, type into search bars, or toggle Dark Mode. You will master the DOM (Document Object Model), element selection, and Event Listeners.

---

## 2. Why Is This Important?
Without JavaScript, a webpage is just a static digital poster. JavaScript is the programming language of the web that transforms static HTML documents into interactive software applications like Google Maps, Netflix, and StackUp.

---

## 3. Prerequisites
Variables, Functions, and HTML/CSS basics.

---

## 4. Simple Explanation: What Is the DOM?
When your browser loads an HTML file, it translates the text into an interactive tree of objects in memory called the **DOM (Document Object Model)**.
Think of the DOM as a live control panel:
- JavaScript can press buttons, change text on the screen, show or hide popups, and change colors in real time without reloading the page.

---

## 5. Selecting Elements & Listening for Events

\`\`\`html
<!-- HTML -->
<h1 id="greeting">Hello, Guest!</h1>
<button id="login-btn">Log In</button>
\`\`\`

\`\`\`javascript
// JavaScript

// 1. Select the elements from the DOM
const greetingHeading = document.getElementById("greeting");
const loginButton = document.getElementById("login-btn");

// 2. Attach an Event Listener for clicks
loginButton.addEventListener("click", function() {
  // 3. Dynamically change the text and style
  greetingHeading.textContent = "Welcome back, Sarah!";
  greetingHeading.style.color = "#0D08CB";
  loginButton.textContent = "Log Out";
});
\`\`\`

---

## 6. How Modern Frameworks (React, Next.js) Fit In
In raw JavaScript, you manually tell the browser: *"Find button with ID X, change text to Y"*.
In modern frameworks like **React** (which powers StackUp), you write **declarative components**:
\`\`\`jsx
function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <h1>{isLoggedIn ? "Welcome, Sarah!" : "Hello, Guest!"}</h1>
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? "Log Out" : "Log In"}
      </button>
    </div>
  );
}
\`\`\`
React automatically updates the DOM whenever your state changes!

---

## 7. Knowledge Check
Test your understanding with the quiz questions below!
`,
      questions: [
        {
          id: 'wd-js-1',
          question: 'What does the DOM (Document Object Model) represent?',
          options: [
            'A database server running in the cloud',
            'The browser in-memory object tree representing the HTML elements of a web page',
            'A security firewall that blocks popups',
            'A type of USB cable'
          ],
          correct_option: 1,
          explanation: 'The DOM is the live object-oriented tree representation of the HTML document created by the browser, which JavaScript can read and manipulate.'
        },
        {
          id: 'wd-js-2',
          question: 'What method is commonly used in JavaScript to listen for user actions like button clicks?',
          options: [
            'element.addEventListener("click", callbackFunction)',
            'element.deleteElement()',
            'element.restartComputer()',
            'element.printPaper()'
          ],
          correct_option: 0,
          explanation: 'addEventListener registers an event handler function to be invoked whenever the specified event (e.g. "click") is fired on that element.'
        },
        {
          id: 'wd-js-3',
          question: 'How does modern React improve upon vanilla JavaScript DOM manipulation?',
          options: [
            'It eliminates the need for web browsers',
            'It provides declarative state-driven rendering, updating the DOM automatically when data changes',
            'It replaces HTML with PDF files',
            'It only works when offline'
          ],
          correct_option: 1,
          explanation: 'React allows developers to declare what the UI should look like for a given state; React then efficiently handles updating the DOM under the hood.'
        }
      ],
      externalResources: [
        {
          title: 'MDN Web Docs: Introduction to the DOM',
          provider: 'MDN Web Docs',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction',
          difficulty: 'Beginner',
          isFree: true
        },
        {
          title: 'javascript.info: Document and Event Handling',
          provider: 'Official Documentation',
          url: 'https://javascript.info/',
          difficulty: 'Beginner',
          isFree: true
        }
      ]
    },
    {
      id: 'backend-apis-rest',
      slug: 'backend-apis-rest-servers-databases',
      title: 'Backend & APIs: What Happens Behind the Scenes',
      description: 'Demystifying backend web servers, JSON data exchange, REST APIs, HTTP methods (GET, POST, PUT, DELETE), and authentication.',
      estimatedMinutes: 20,
      difficulty: 'Easy',
      companyTags: ['Backend', 'System Design'],
      keyTakeaways: [
        'The frontend is what the user sees in the browser; the backend is the server logic running securely in the cloud.',
        'An API (Application Programming Interface) is a messenger that lets frontend and backend exchange data.',
        'JSON (JavaScript Object Notation) is the universal format for sending structured data over the web.',
        'REST APIs use standard HTTP verbs: GET (read), POST (create), PUT (update), and DELETE (remove).'
      ],
      prerequisites: ['How the Internet Works: Websites, Browsers & Servers'],
      youtube_url: 'https://www.youtube.com/results?search_query=what+is+an+api+backend+explained+for+beginners',
      notesMarkdown: `# Backend & APIs: What Happens Behind the Scenes

## 1. What Will You Learn?
You will learn the difference between frontend and backend, what an API (Application Programming Interface) actually is, how JSON data travels across the web, and how servers handle operations securely.

---

## 2. Why Is This Important?
You cannot store user passwords or credit cards on a frontend browser; anyone can press F12 and inspect the code. Business logic, payment processing, and database storage must run on a secure **backend server**. Understanding APIs allows you to connect the frontend and backend together into a complete application.

---

## 3. Prerequisites
Completion of **How the Internet Works** and **Variables & Data Types**.

---

## 4. Frontend vs. Backend: The Restaurant Analogy
- **The Frontend (Dining Room):** The stylish tables, menu cards, and ambient lighting that customers interact with.
- **The Backend (Kitchen):** The secure area where chefs follow secret recipes, manage raw inventory, and safely prepare meals.
- **The API (The Waiter):** The messenger who takes your order from the table, brings it to the kitchen, and returns with your food.

---

## 5. What Is JSON (JavaScript Object Notation)?
JSON is the universal language of APIs. It looks almost identical to a Python dictionary or JavaScript object:
\`\`\`json
{
  "user_id": "usr_994",
  "username": "alex_dev",
  "email": "alex@example.com",
  "solved_problems_count": 42,
  "is_pro_member": true,
  "skills": ["Python", "React", "SQL"]
}
\`\`\`
Every programming language can easily generate and read JSON.

---

## 6. The 4 Fundamental REST API Methods (CRUD)
REST (Representational State Transfer) maps database operations to standard HTTP verbs:

| HTTP Verb | Operation | What It Does | Example URL |
| :--- | :--- | :--- | :--- |
| **\`GET\`** | **Read** | Fetches data from the server | \`GET /api/dsa/potd\` (Fetches today's challenge) |
| **\`POST\`** | **Create** | Submits new data to the server | \`POST /api/resume-analysis\` (Uploads a resume) |
| **\`PUT / PATCH\`** | **Update** | Updates an existing record | \`PUT /api/profile/update\` (Changes bio) |
| **\`DELETE\`** | **Delete** | Removes a record | \`DELETE /api/admin/dsa?id=123\` (Removes problem) |

---

## 7. How an API Request Works in Code (Fetch)
In your frontend JavaScript, you make an API call like this:
\`\`\`javascript
// Fetching today's Problem of the Day from the StackUp backend
async function loadDailyChallenge() {
  const response = await fetch('/api/dsa/potd');
  const data = await response.json();
  console.log("Today's challenge is: " + data.problem.title);
}
\`\`\`

---

## 8. Knowledge Check
Test your understanding with the quiz questions below!
`,
      questions: [
        {
          id: 'wd-api-1',
          question: 'What is the primary role of an API (Application Programming Interface) in web applications?',
          options: [
            'To clean dust from the computer monitor',
            'To act as a messenger allowing different software programs (like frontend and backend) to exchange data',
            'To replace the computer keyboard',
            'To turn off the power supply'
          ],
          correct_option: 1,
          explanation: 'An API defines the contract and protocols that allow client applications to request and exchange data with backend services.'
        },
        {
          id: 'wd-api-2',
          question: 'Which HTTP method should be used when submitting a new user registration form to create a new account?',
          options: [
            'GET',
            'POST',
            'DELETE',
            'HEAD'
          ],
          correct_option: 1,
          explanation: 'POST is the standard HTTP method used to send data to the server to create a new resource.'
        },
        {
          id: 'wd-api-3',
          question: 'Why is JSON the most widely adopted format for web APIs?',
          options: [
            'It is lightweight, human-readable, and supported by almost every modern programming language',
            'It can only be used on iPhones',
            'It is impossible to make errors in JSON',
            'It is owned by Google'
          ],
          correct_option: 0,
          explanation: 'JSON (JavaScript Object Notation) is a standardized, plain-text data interchange format that is easy for humans to read and for computers to parse in any language.'
        }
      ],
      externalResources: [
        {
          title: 'freeCodeCamp: What is a REST API? Beginner Guide',
          provider: 'freeCodeCamp',
          url: 'https://www.freecodecamp.org/news/what-is-an-api-in-english-please-b880a3218e82/',
          difficulty: 'Beginner',
          isFree: true
        },
        {
          title: 'MDN Web Docs: Fetch API Guide',
          provider: 'MDN Web Docs',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch',
          difficulty: 'Beginner',
          isFree: true
        }
      ]
    },
    {
      id: 'databases-sql-crud',
      slug: 'databases-sql-relational-data-tables',
      title: 'Databases & SQL: Storing Information Permanently',
      description: 'Learn how databases organize data into tables, rows, and columns, understand Primary Keys and Foreign Keys, and write basic SQL CRUD queries.',
      estimatedMinutes: 20,
      difficulty: 'Easy',
      companyTags: ['Database', 'SQL'],
      keyTakeaways: [
        'A database is an organized, high-performance system for permanently storing and querying structured data.',
        'Relational databases (PostgreSQL, MySQL) store data in tables composed of rows (records) and columns (fields).',
        'Primary keys uniquely identify each row; foreign keys link rows between different tables.',
        'SQL (Structured Query Language) is the universal language for querying and mutating database records.'
      ],
      prerequisites: ['Backend & APIs: What Happens Behind the Scenes'],
      youtube_url: 'https://www.youtube.com/results?search_query=sql+and+databases+for+absolute+beginners+tutorial',
      notesMarkdown: `# Databases & SQL: Storing Information Permanently

## 1. What Will You Learn?
You will learn what databases are, why text files cannot handle millions of users, how relational databases use tables, and how to write basic SQL queries.

---

## 2. Why Is This Important?
Every application needs to remember data permanently: your user account, friends list, past orders, and high scores. Databases are the memory of the software industry. SQL is consistently ranked among the top 3 most demanded technical skills across software engineering, data science, and product management.

---

## 3. Prerequisites
Variables, collections, and basic backend concepts.

---

## 4. Simple Explanation: Supercharged Excel Spreadsheets
Imagine a spreadsheet program like Microsoft Excel or Google Sheets:
- You have **Sheets (Tables)** like \`Users\` and \`Orders\`.
- Each horizontal line is a **Row (a specific record)**, like customer Alex.
- Each vertical column is a **Field (an attribute)**, like \`email\` or \`signup_date\`.

A relational database (like **PostgreSQL**, which powers StackUp via Supabase) is like a supercharged spreadsheet designed to handle millions of rows simultaneously with sub-millisecond search speed and bank-grade data safety.

---

## 5. Primary Keys & Relationships
- **Primary Key (PK):** A unique ID given to every row so you never confuse two people with the same name (e.g. \`user_id: 101\`).
- **Foreign Key (FK):** A reference in one table pointing to the Primary Key of another table, creating a relationship!

\`\`\`
TABLE: users (Primary Key: id)
+----+-------------------+-----------------------+
| id | name              | email                 |
+----+-------------------+-----------------------+
|  1 | Maya Lin          | maya@example.com      |
|  2 | Rahul Verma       | rahul@example.com     |
+----+-------------------+-----------------------+
               ^
               | (linked by foreign key: user_id)
TABLE: orders
+----------+---------+------------+--------+
| order_id | user_id | item_name  | amount |
+----------+---------+------------+--------+
|     1001 |       1 | Laptop Bag |  49.99 |
|     1002 |       1 | Mouse      |  25.00 |
|     1003 |       2 | Keyboard   |  89.00 |
+----------+---------+------------+--------+
\`\`\`

---

## 6. The 4 Core SQL Statements (CRUD)

### 1. SELECT (Read)
\`\`\`sql
-- Fetch all users from the database
SELECT * FROM users;

-- Fetch only name and email for users whose ID is 1
SELECT name, email FROM users WHERE id = 1;
\`\`\`

### 2. INSERT (Create)
\`\`\`sql
-- Add a new student to the database
INSERT INTO users (name, email)
VALUES ('Priya Patel', 'priya@example.com');
\`\`\`

### 3. UPDATE (Edit)
\`\`\`sql
-- Update an email address for user ID 1
UPDATE users
SET email = 'new_maya@example.com'
WHERE id = 1;
\`\`\`
*Important Safety Rule:* Always include a \`WHERE\` clause when updating! If you forget \`WHERE id = 1\`, you will overwrite EVERY user's email in the entire database!

### 4. DELETE (Remove)
\`\`\`sql
-- Remove user with ID 2
DELETE FROM users WHERE id = 2;
\`\`\`

---

## 7. Knowledge Check
Test your understanding with the quiz questions below!
`,
      questions: [
        {
          id: 'wd-db-1',
          question: 'What is a Primary Key in a relational database?',
          options: [
            'A special password to log into the database server',
            'A column (or set of columns) that uniquely identifies each individual row in a table',
            'The name of the database file',
            'The first column on the left side of the screen'
          ],
          correct_option: 1,
          explanation: 'A Primary Key enforces uniqueness, guaranteeing that each record in a database table can be distinctly identified.'
        },
        {
          id: 'wd-db-2',
          question: 'Which SQL keyword is used to retrieve data from a database table?',
          options: [
            'FETCH_ALL',
            'SELECT',
            'GET_DATA',
            'LOOKUP'
          ],
          correct_option: 1,
          explanation: 'SELECT is the foundational SQL command used to query and retrieve records from database tables.'
        },
        {
          id: 'wd-db-3',
          question: 'Why is the WHERE clause critical when running an UPDATE or DELETE SQL command?',
          options: [
            'Without WHERE, the operation would affect every single row in the entire table',
            'WHERE turns on encryption',
            'WHERE is optional and has no effect',
            'WHERE speeds up internet connections'
          ],
          correct_option: 0,
          explanation: 'Without a WHERE filter specifying target rows, UPDATE or DELETE applies to every record in the table, potentially causing catastrophic accidental data loss.'
        }
      ],
      externalResources: [
        {
          title: 'W3Schools: SQL Tutorial for Beginners',
          provider: 'W3Schools',
          url: 'https://www.w3schools.com/sql/',
          difficulty: 'Beginner',
          isFree: true
        },
        {
          title: 'PostgreSQL Official Documentation',
          provider: 'Official Documentation',
          url: 'https://www.postgresql.org/docs/',
          difficulty: 'Beginner',
          isFree: true
        }
      ]
    },
    {
      id: 'git-github-collaboration',
      slug: 'git-github-version-control-collaboration',
      title: 'Git & GitHub: Time Travel & Team Collaboration',
      description: 'Learn version control: tracking code changes, making commits, branches, pushing to GitHub repositories, and creating Pull Requests.',
      estimatedMinutes: 20,
      difficulty: 'Easy',
      companyTags: ['DevOps', 'Developer Tools'],
      keyTakeaways: [
        'Git is a local version control system that tracks the history of changes made to your files over time.',
        'GitHub is a cloud platform for hosting Git repositories and collaborating with other developers.',
        'A commit is an immutable checkpoint/snapshot of your project at a specific point in time with a descriptive message.',
        'Branches allow you to build new features in an isolated sandbox without breaking working production code.'
      ],
      prerequisites: ['Your Developer Environment: Editors, Terminals & Running Code'],
      youtube_url: 'https://www.youtube.com/results?search_query=git+and+github+tutorial+for+beginners',
      notesMarkdown: `# Git & GitHub: Time Travel & Team Collaboration

## 1. What Will You Learn?
You will learn how software engineers collaborate without overwriting each other's work, how to track code history like a time machine, and how to use Git and GitHub.

---

## 2. Why Is This Important?
Every software company in the world uses version control. Without Git, team members would have to email zip files named \`final_project_v2_really_final.zip\`. With Git, hundreds of engineers can work on the same codebase simultaneously with complete confidence and safety.

---

## 3. Prerequisites
Terminal basics and file navigation.

---

## 4. Simple Explanation: Git vs. GitHub
- **Git is the Tool (The Camera):** A program installed on your local computer that takes snapshots of your project whenever you choose.
- **GitHub is the Website (The Cloud Album):** A cloud service where you upload (push) those snapshots so teammates can view them, contribute, and deploy the code to the world.

---

## 5. The Core Git Workflow: 3 Simple Steps

\`\`\`
[Working Directory]  ----( git add )---->  [Staging Area]  ----( git commit )---->  [Local Repository]  ----( git push )---->  [GitHub (Cloud)]
 (Your modified files)                     (Preparing photo)                         (Saved snapshot)                          (Shared with team)
\`\`\`

1. **\`git status\`**: Shows what files you have modified.
2. **\`git add .\`**: Stages files, telling Git: *"Include these files in the next snapshot."*
3. **\`git commit -m "Add navbar component"\`**: Takes the snapshot with a clear descriptive message.
4. **\`git push origin main\`**: Uploads your local snapshots to GitHub.

---

## 6. Branches: Fearless Experimentation
What if you want to experiment with a risky new feature? You create a **branch**:
\`\`\`bash
# Create and switch to a new branch
git checkout -b feature/dark-mode
\`\`\`
You can change anything you want on this branch. If your experiment fails, you simply delete the branch and your original \`main\` code remains safe and untouched! When it succeeds, you merge it back into \`main\` via a **Pull Request (PR)**.

---

## 7. Knowledge Check
Test your understanding with the quiz questions below!
`,
      questions: [
        {
          id: 'wd-git-1',
          question: 'What is the difference between Git and GitHub?',
          options: [
            'There is no difference; they are two names for the same company',
            'Git is a local version control command-line tool; GitHub is a cloud hosting service for Git repositories',
            'Git is a programming language; GitHub is a web browser',
            'GitHub is only for Mac computers'
          ],
          correct_option: 1,
          explanation: 'Git is the distributed version control system that runs locally on your machine. GitHub is an online service that hosts Git repositories in the cloud.'
        },
        {
          id: 'wd-git-2',
          question: 'What does a "git commit" represent in a software project?',
          options: [
            'Deleting the repository permanently',
            'A recorded checkpoint/snapshot of changes in the repository with an explanatory message',
            'Sending an email to Microsoft',
            'Running automated antivirus scans'
          ],
          correct_option: 1,
          explanation: 'A commit captures a permanent snapshot of the staged changes at a point in time, accompanied by a commit message.'
        },
        {
          id: 'wd-git-3',
          question: 'Why do developers create branches in Git when building new features?',
          options: [
            'To make their computer run faster',
            'To work in an isolated environment without risking bugs in the main working code',
            'Because Git only allows 10 lines of code per branch',
            'To avoid using the internet'
          ],
          correct_option: 1,
          explanation: 'Branching allows developers to experiment and build new functionality safely in isolation without affecting the stable production branch.'
        }
      ],
      externalResources: [
        {
          title: 'Git Official Documentation: Book & Cheat Sheet',
          provider: 'Official Documentation',
          url: 'https://git-scm.com/doc',
          difficulty: 'Beginner',
          isFree: true
        },
        {
          title: 'GitHub Skills: Interactive Introduction to GitHub',
          provider: 'Official Documentation',
          url: 'https://skills.github.com/',
          difficulty: 'Beginner',
          isFree: true
        }
      ]
    }
  ]
};
