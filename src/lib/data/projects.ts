export interface ProjectMilestone {
  milestoneNumber: number;
  title: string;
  description: string;
  tasks: string[];
  codeSnippet?: string;
  codeLanguage?: string;
}

export interface ProjectEvaluationRubric {
  criterion: string;
  weight: string;
  description: string;
}

export interface PracticalProject {
  id: string;
  slug: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tagline: string;
  estimatedHours: number;
  tags: string[];
  objective: string;
  prerequisites: string[];
  problemStatement: string;
  keyFeatures: string[];
  architectureOverview: string;
  techChoices: {
    frontend: string;
    backend?: string;
    database?: string;
    styling: string;
    deployment: string;
  };
  milestones: ProjectMilestone[];
  starterCode?: {
    filename: string;
    language: string;
    content: string;
  };
  testingGuidelines: string[];
  deploymentInstructions: string[];
  rubric: ProjectEvaluationRubric[];
}

export const PRACTICAL_PROJECTS: PracticalProject[] = [
  // =========================================================================
  // BEGINNER PROJECTS
  // =========================================================================
  {
    id: 'proj-personal-profile',
    slug: 'personal-profile-card',
    title: 'Personal Developer Profile Card',
    level: 'Beginner',
    tagline: 'Your first responsive web project with semantic HTML, modern CSS styling, and social links.',
    estimatedHours: 4,
    tags: ['HTML5', 'CSS3', 'Responsive Design', 'Flexbox'],
    objective: 'Build an elegant, responsive developer biography card showcasing your skills, bio, avatar, and social portfolio links.',
    prerequisites: ['HTML & CSS: The Building Blocks of Every Website'],
    problemStatement: 'Aspiring developers need a clean, shareable digital presence to highlight their contact info, technical interests, and social profiles to recruiters and peers.',
    keyFeatures: [
      'Responsive card centered on screen across all device widths',
      'Profile avatar with circular clip and hover zoom effect',
      'Badges for top 5 technical skills (e.g. Python, HTML, CSS, Git)',
      'Accessible semantic social links with hover animations',
      'Light / Dark theme toggle using CSS variables'
    ],
    architectureOverview: 'Single-page client-rendered static web document. HTML provides semantic tags (<main>, <article>, <header>, <nav>), while CSS utilizes Custom Properties (variables) and Flexbox for centered card distribution.',
    techChoices: {
      frontend: 'HTML5 Semantic Elements',
      styling: 'Modern CSS3 with CSS Variables & Flexbox',
      deployment: 'GitHub Pages / Vercel'
    },
    milestones: [
      {
        milestoneNumber: 1,
        title: 'Semantic HTML Structure',
        description: 'Set up the basic HTML5 skeleton and content hierarchy.',
        tasks: [
          'Create index.html with meta viewport and title tags',
          'Add an <article class="profile-card"> container',
          'Include <img> for profile avatar, <h1> for your name, and <p> for your bio',
          'Add a <ul class="skill-tags"> list for your current technical skills',
          'Add a <nav class="social-links"> with links to GitHub and LinkedIn'
        ]
      },
      {
        milestoneNumber: 2,
        title: 'Modern CSS Styling & Box Model',
        description: 'Style the card with colors, typography, margins, and padding.',
        tasks: [
          'Define CSS root variables for background, text, and accent colors',
          'Use Flexbox on body to center the card horizontally and vertically',
          'Add border-radius (16px) and subtle box-shadow for depth',
          'Style skill badges with soft background pills'
        ],
        codeLanguage: 'css',
        codeSnippet: `body {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8fafc;
  font-family: system-ui, sans-serif;
}
.profile-card {
  max-width: 380px;
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
  text-align: center;
}`
      },
      {
        milestoneNumber: 3,
        title: 'Responsive Design & Accessibility',
        description: 'Ensure the card looks great on mobile phones and meets accessibility standards.',
        tasks: [
          'Add mobile media query for screens under 400px width',
          'Verify image has descriptive alt text (alt="Photo of Jane Doe")',
          'Check that all color combinations meet WCAG AA contrast ratio',
          'Ensure all buttons and links are navigable using the Tab key'
        ]
      }
    ],
    starterCode: {
      filename: 'index.html',
      language: 'html',
      content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Developer Profile Card</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <article class="profile-card">
    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" alt="Profile avatar" class="avatar">
    <h1>Your Name</h1>
    <p class="role">Aspiring Software Engineer</p>
    <p class="bio">Learning web development, Python, and computer science on StackUp.</p>
    <div class="skills">
      <span class="badge">Python</span>
      <span class="badge">HTML5</span>
      <span class="badge">CSS3</span>
      <span class="badge">Git</span>
    </div>
  </article>
</body>
</html>`
    },
    testingGuidelines: [
      'Resize browser window to 375px (mobile) and verify no horizontal scrollbars appear.',
      'Test navigation using only the keyboard (Tab and Enter keys).',
      'Verify image renders cleanly or provides clear fallback when disconnected from internet.'
    ],
    deploymentInstructions: [
      'Create a free GitHub repository named "personal-profile".',
      'Upload index.html and style.css using Git (git add, commit, push).',
      'Go to Repository Settings -> Pages -> Source: main branch -> Save.',
      'Your live site will be accessible worldwide at https://<your-username>.github.io/personal-profile!'
    ],
    rubric: [
      { criterion: 'Semantic HTML', weight: '25%', description: 'Proper usage of semantic HTML5 elements without generic div soup.' },
      { criterion: 'CSS Layout & Styling', weight: '35%', description: 'Clean Flexbox centering, modern typography, padding, and subtle shadows.' },
      { criterion: 'Mobile Responsiveness', weight: '25%', description: 'Flawless display on 375px mobile and 1440px desktop screens.' },
      { criterion: 'Accessibility & Code Cleanliness', weight: '15%', description: 'Valid markup, alt tags on images, and organized CSS rules.' }
    ]
  },
  {
    id: 'proj-calculator-app',
    slug: 'interactive-web-calculator',
    title: 'Interactive Web Calculator',
    level: 'Beginner',
    tagline: 'Build a functioning mathematical calculator using HTML, CSS Grid, and JavaScript event listeners.',
    estimatedHours: 6,
    tags: ['JavaScript', 'CSS Grid', 'DOM Manipulation', 'Event Handling'],
    objective: 'Implement a desktop and mobile calculator supporting addition, subtraction, multiplication, division, decimal points, and clear operations.',
    prerequisites: ['HTML & CSS: The Building Blocks of Every Website', 'JavaScript & The DOM: Making Web Pages Interactive'],
    problemStatement: 'Beginner programmers often struggle to connect UI events with computational state. A calculator bridges user clicks directly with mathematical expressions and edge-case handling (e.g. division by zero).',
    keyFeatures: [
      'CSS Grid keypad layout matching standard scientific/pocket calculators',
      'Display screen showing current entry and cumulative calculation',
      'Support for +, -, *, /, and decimal points',
      'All Clear (AC) and Backspace / Delete button',
      'Error handling for division by zero (e.g. displaying "Error" instead of crashing)'
    ],
    architectureOverview: 'Stateful client application. JavaScript maintains two state variables: previousOperand, currentOperand, and selectedOperation. Button click events trigger a dispatcher function that updates state and refreshes the DOM display.',
    techChoices: {
      frontend: 'HTML5 Buttons & Output Screen',
      styling: 'CSS Grid Keypad Layout',
      deployment: 'GitHub Pages / Netlify'
    },
    milestones: [
      {
        milestoneNumber: 1,
        title: 'Keypad Grid Layout',
        description: 'Build the calculator frame and arrange buttons using CSS Grid.',
        tasks: [
          'Create calculator container with an output display at the top',
          'Use CSS Grid with 4 equal columns (grid-template-columns: repeat(4, 1fr))',
          'Make the zero button span 2 columns (grid-column: span 2)',
          'Style operator buttons (+, -, *, =) with distinct accent colors'
        ]
      },
      {
        milestoneNumber: 2,
        title: 'State & Operation Logic',
        description: 'Implement calculation functions in JavaScript.',
        tasks: [
          'Create function appendNumber(number) to concatenate digits as strings',
          'Create function chooseOperation(operator) to save operation and clear entry',
          'Create function compute() using a switch statement for +, -, *, /',
          'Prevent multiple decimal points (e.g. "12.3.4" should be blocked)'
        ],
        codeLanguage: 'javascript',
        codeSnippet: `function compute() {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  let computation;
  switch (operation) {
    case '+': computation = prev + current; break;
    case '-': computation = prev - current; break;
    case '*': computation = prev * current; break;
    case '/': computation = current === 0 ? "Error" : prev / current; break;
    default: return;
  }
  currentOperand = computation;
  operation = undefined;
  previousOperand = '';
}`
      },
      {
        milestoneNumber: 3,
        title: 'Keyboard Support & Edge Cases',
        description: 'Add physical keyboard listeners and test boundary conditions.',
        tasks: [
          'Listen for window "keydown" events to support numeric keypad typing',
          'Handle division by zero gracefully without displaying "Infinity"',
          'Test rapid successive button presses'
        ]
      }
    ],
    testingGuidelines: [
      'Calculate 12 + 38 = 50.',
      'Test decimals: 0.1 + 0.2 and check formatting.',
      'Divide 10 by 0 and ensure "Error" is displayed without app freezing.'
    ],
    deploymentInstructions: [
      'Push code to GitHub repository.',
      'Deploy to Vercel or GitHub Pages in 1 click.'
    ],
    rubric: [
      { criterion: 'Calculation Accuracy', weight: '40%', description: 'All 4 basic operations and decimals compute correctly.' },
      { criterion: 'Edge Case Handling', weight: '25%', description: 'Handles division by zero, duplicate decimals, and backspacing.' },
      { criterion: 'UI & Grid Layout', weight: '20%', description: 'Clean CSS Grid layout with distinct operator styling.' },
      { criterion: 'Code Modularity', weight: '15%', description: 'Clean separation between UI listeners and mathematical logic.' }
    ]
  },
  {
    id: 'proj-todo-app',
    slug: 'task-tracker-localstorage',
    title: 'Productive Task Tracker with LocalStorage',
    level: 'Beginner',
    tagline: 'Create a personal to-do application with filtering, completion toggles, and browser data persistence.',
    estimatedHours: 8,
    tags: ['JavaScript', 'LocalStorage', 'DOM Events', 'CRUD'],
    objective: 'Build a task manager where users can create, complete, edit, filter, and delete tasks, with changes automatically saved to browser LocalStorage.',
    prerequisites: ['HTML & CSS: The Building Blocks of Every Website', 'JavaScript & The DOM: Making Web Pages Interactive'],
    problemStatement: 'Users need a simple way to track daily study tasks on StackUp that persist even when they close or refresh their browser tab.',
    keyFeatures: [
      'Add new tasks with input validation (no empty tasks allowed)',
      'Mark tasks as completed with strikethrough animation',
      'Filter view: All, Active, Completed',
      'Delete individual tasks or "Clear Completed" in bulk',
      'Persistent data: loads previous tasks from window.localStorage'
    ],
    architectureOverview: 'Client-side CRUD application. Tasks are stored in memory as an array of objects: { id, title, completed, createdAt }. The array is serialized to JSON and stored in window.localStorage whenever mutations occur.',
    techChoices: {
      frontend: 'HTML5 Form & List',
      styling: 'Tailwind CSS / Custom CSS with Dark Mode',
      database: 'Browser window.localStorage',
      deployment: 'Vercel / GitHub Pages'
    },
    milestones: [
      {
        milestoneNumber: 1,
        title: 'Task UI & Form Handling',
        description: 'Build the input form and tasks list container.',
        tasks: [
          'Create form with text input and "Add Task" button',
          'Listen for form submit event and prevent default page reload (e.preventDefault())',
          'Trim input text and validate non-empty string'
        ]
      },
      {
        milestoneNumber: 2,
        title: 'DOM Rendering & LocalStorage Sync',
        description: 'Store tasks in LocalStorage and render list dynamically.',
        tasks: [
          'Create saveTasks() helper that calls localStorage.setItem("tasks", JSON.stringify(tasks))',
          'Create loadTasks() helper that parses localStorage or falls back to empty array',
          'Write renderTasks() function that iterates through tasks and creates HTML elements'
        ],
        codeLanguage: 'javascript',
        codeSnippet: `let tasks = JSON.parse(localStorage.getItem('my_tasks')) || [];

function saveAndRender() {
  localStorage.setItem('my_tasks', JSON.stringify(tasks));
  renderTasks();
}

function addTask(title) {
  const newTask = {
    id: Date.now().toString(),
    title: title.trim(),
    completed: false
  };
  tasks.unshift(newTask);
  saveAndRender();
}`
      },
      {
        milestoneNumber: 3,
        title: 'Completion Toggles & Filter Tabs',
        description: 'Add filters for All, Active, and Completed tasks.',
        tasks: [
          'Add checkbox click event to toggle task.completed boolean',
          'Add filter buttons to filter tasks array before rendering',
          'Add task counter showing "X items left to complete"'
        ]
      }
    ],
    testingGuidelines: [
      'Add 3 tasks, mark 1 completed, refresh browser, and verify all 3 persist.',
      'Click "Active" filter and verify completed task is hidden.',
      'Delete a task, refresh page, and verify it is permanently removed.'
    ],
    deploymentInstructions: [
      'Deploy repository to Vercel or GitHub Pages.'
    ],
    rubric: [
      { criterion: 'CRUD Functionality', weight: '35%', description: 'Create, read, toggle, and delete tasks operate smoothly.' },
      { criterion: 'LocalStorage Persistence', weight: '30%', description: 'State correctly syncs with browser storage across refreshes.' },
      { criterion: 'UX & Input Validation', weight: '20%', description: 'Prevents empty submissions; responsive on mobile.' },
      { criterion: 'Code Quality', weight: '15%', description: 'Clean functions and event delegation.' }
    ]
  },

  // =========================================================================
  // INTERMEDIATE PROJECTS
  // =========================================================================
  {
    id: 'proj-weather-api',
    slug: 'live-weather-radar-api',
    title: 'Live Global Weather Dashboard (External API)',
    level: 'Intermediate',
    tagline: 'Fetch real-time weather and 5-day forecasts from open public APIs with async/await and dynamic icons.',
    estimatedHours: 12,
    tags: ['Async/Await', 'REST API', 'Fetch', 'Error Handling', 'JSON'],
    objective: 'Build a weather application that accepts any city name worldwide, calls the OpenWeatherMap API asynchronously, displays current temperature, wind speed, and humidity, and gracefully handles typos and network failures.',
    prerequisites: ['JavaScript & The DOM: Making Web Pages Interactive', 'Backend & APIs: What Happens Behind the Scenes'],
    problemStatement: 'Developers must master asynchronous programming, handling slow network conditions, loading spinners, and API error codes.',
    keyFeatures: [
      'Live city search with autocomplete / submit',
      'Displays temperature in Celsius or Fahrenheit with 1-click toggle',
      'Dynamic weather icon and background based on condition (sunny, rain, snow, storm)',
      'Loading skeleton state while network request is pending',
      'Friendly error message for misspelled cities ("City not found, please check spelling")'
    ],
    architectureOverview: 'Asynchronous frontend client communicating with third-party REST API via fetch. Uses async/await inside try...catch blocks for error resilience.',
    techChoices: {
      frontend: 'HTML5 / Modern JavaScript (ES6+)',
      styling: 'CSS3 with Dynamic Theme Transitions',
      deployment: 'Vercel / Netlify'
    },
    milestones: [
      {
        milestoneNumber: 1,
        title: 'API Key & Network Fetch Setup',
        description: 'Obtain an API key and fetch weather data asynchronously.',
        tasks: [
          'Register for free OpenWeatherMap / WeatherAPI key',
          'Write async function fetchWeather(city)',
          'Construct request URL with encodeURIComponent(city)',
          'Inspect JSON response in browser console'
        ],
        codeLanguage: 'javascript',
        codeSnippet: `async function fetchWeather(city) {
  try {
    setLoading(true);
    setError(null);
    const apiKey = 'YOUR_API_KEY';
    const res = await fetch(\`https://api.openweathermap.org/data/2.5/weather?q=\${encodeURIComponent(city)}&units=metric&appid=\${apiKey}\`);
    if (!res.ok) {
      if (res.status === 404) throw new Error("City not found. Please verify spelling.");
      throw new Error("Unable to fetch weather. Please try again later.");
    }
    const data = await res.json();
    displayWeather(data);
  } catch (err) {
    showError(err.message);
  } finally {
    setLoading(false);
  }
}`
      },
      {
        milestoneNumber: 2,
        title: 'Dynamic UI & Weather Card',
        description: 'Render weather metrics cleanly onto the dashboard.',
        tasks: [
          'Display city name, country code, temperature, and description',
          'Format secondary cards: Wind Speed (km/h), Humidity (%), and Atmospheric Pressure',
          'Add Celsius / Fahrenheit mathematical toggle button'
        ]
      },
      {
        milestoneNumber: 3,
        title: 'Loading States & Network Error UX',
        description: 'Provide clear visual feedback during loading and offline states.',
        tasks: [
          'Show animated loading spinner while fetch is in-flight',
          'Display red banner when user is offline or city does not exist',
          'Cache last searched city in localStorage so it reloads on return'
        ]
      }
    ],
    testingGuidelines: [
      'Search for "London", "Tokyo", and "Mumbai" and verify accurate metrics.',
      'Search for "NonExistentCity12345" and verify clean 404 error banner without crashing.',
      'Toggle between Celsius and Fahrenheit and verify mathematical conversion ($F = C \\times 9/5 + 32$).'
    ],
    deploymentInstructions: [
      'Deploy to Vercel, adding API credentials in project environment variables.'
    ],
    rubric: [
      { criterion: 'API Integration & Asynchrony', weight: '35%', description: 'Proper async/await usage and response handling.' },
      { criterion: 'Error & Loading States', weight: '30%', description: 'Smooth loading spinner and friendly error handling for invalid cities or network loss.' },
      { criterion: 'Data Visualization & Design', weight: '20%', description: 'Modern dashboard styling and dynamic icons.' },
      { criterion: 'Unit Toggle & Persistence', weight: '15%', description: 'Celsius/Fahrenheit toggle and last city cached.' }
    ]
  },
  {
    id: 'proj-auth-notes',
    slug: 'fullstack-markdown-notes',
    title: 'Authenticated Cloud Markdown Notes App',
    level: 'Intermediate',
    tagline: 'Full-stack note taking app with Supabase authentication, PostgreSQL database, and real-time Markdown preview.',
    estimatedHours: 16,
    tags: ['Full-Stack', 'Supabase', 'PostgreSQL', 'Auth', 'Markdown'],
    objective: 'Build an authenticated web app where users can create private notes, format them using Markdown, search by tag, and have their data synchronized to a cloud PostgreSQL database.',
    prerequisites: ['Web & Software Development (Full-Stack)', 'Databases & SQL: Storing Information Permanently'],
    problemStatement: 'Modern software is collaborative and cloud-connected. Developers need to know how to authenticate users securely with JWT tokens and enforce Row Level Security (RLS) in databases.',
    keyFeatures: [
      'User signup, email login, and secure session management',
      'Split-pane Markdown editor with instant live rendered preview',
      'Cloud synchronization to PostgreSQL table with Row Level Security',
      'Search notes by keyword and tag filtering',
      'Delete and update notes with optimistic UI updates'
    ],
    architectureOverview: 'Full-stack application using Next.js / React frontend connected to Supabase backend (PostgreSQL + Auth). Row Level Security (RLS) ensures users can strictly read and write only their own records.',
    techChoices: {
      frontend: 'React / Next.js with Markdown Parser',
      backend: 'Next.js API Routes / Supabase Auth',
      database: 'PostgreSQL with Row Level Security (RLS)',
      styling: 'Tailwind CSS',
      deployment: 'Vercel'
    },
    milestones: [
      {
        milestoneNumber: 1,
        title: 'Database Schema & Security Policies',
        description: 'Create the notes table and write PostgreSQL Row Level Security rules.',
        tasks: [
          'Create table "notes" (id, user_id, title, content, tags, created_at, updated_at)',
          'Enable Row Level Security (ALTER TABLE notes ENABLE ROW LEVEL SECURITY;)',
          'Create policy allowing users to SELECT and INSERT only their own notes'
        ],
        codeLanguage: 'sql',
        codeSnippet: `CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own notes"
ON notes FOR ALL
USING (auth.uid() = user_id);`
      },
      {
        milestoneNumber: 2,
        title: 'User Authentication Flow',
        description: 'Implement signup, sign-in, and protected session views.',
        tasks: [
          'Add login form with email & password validation',
          'Call supabase.auth.signUp and supabase.auth.signInWithPassword',
          'Protect notes dashboard so unauthenticated users are redirected to /login'
        ]
      },
      {
        milestoneNumber: 3,
        title: 'Split-Pane Markdown Editor',
        description: 'Build text area on left and live HTML preview on right.',
        tasks: [
          'Render live HTML preview using a safe Markdown parser',
          'Implement auto-save debounced every 1 second after typing',
          'Add instant keyword search bar'
        ]
      }
    ],
    testingGuidelines: [
      'Create 2 different user accounts; verify User A cannot view User B notes.',
      'Type Markdown (# Heading, - List, **Bold**) and verify formatting renders live.',
      'Sign out and verify notes dashboard is locked.'
    ],
    deploymentInstructions: [
      'Connect GitHub repository to Vercel and link Supabase project credentials.'
    ],
    rubric: [
      { criterion: 'Security & RLS', weight: '35%', description: 'Row Level Security properly prevents cross-tenant data leakage.' },
      { criterion: 'Auth Flow', weight: '25%', description: 'Signup, login, logout, and token session refresh work reliably.' },
      { criterion: 'Markdown Editing & Preview', weight: '25%', description: 'Split-pane preview with sanitization against XSS.' },
      { criterion: 'Search & Organization', weight: '15%', description: 'Fast keyword search and tag filtering.' }
    ]
  },

  // =========================================================================
  // ADVANCED PROJECTS
  // =========================================================================
  {
    id: 'proj-realtime-collab',
    slug: 'realtime-collaborative-board',
    title: 'Real-Time Collaborative Code & Idea Board',
    level: 'Advanced',
    tagline: 'Multi-user real-time whiteboard and code editor with WebSockets, presence tracking, and conflict-free sync.',
    estimatedHours: 24,
    tags: ['WebSockets', 'Real-Time', 'Concurrency', 'System Design', 'Full-Stack'],
    objective: 'Build a multiplayer interactive workspace where multiple users can type code, sketch system architecture diagrams, and see each other live mouse cursors with sub-50ms latency.',
    prerequisites: ['Web & Software Development (Full-Stack)', 'Computer Networks (CN)', 'System Design Fundamentals'],
    problemStatement: 'Modern software engineering is remote and collaborative. Engineers must understand WebSockets, bidirectional streaming, room-based broadcasting, and state reconciliation.',
    keyFeatures: [
      'Room-based collaboration with shareable join links',
      'Real-time cursor presence showing teammates names and mouse positions',
      'Synchronized code editor updating concurrently across all clients',
      'WebSocket disconnect / reconnect heartbeat resilience',
      'Export session snapshot to Markdown or PNG'
    ],
    architectureOverview: 'Full-duplex WebSocket architecture. Clients connect to room channels, sending ephemeral cursor delta packets and persistent text changes. Server coordinates broadcast to active subscribers with heartbeats to prune dropped connections.',
    techChoices: {
      frontend: 'React / Next.js with Canvas & Monaco Editor',
      backend: 'Node.js WebSocket Server / Supabase Realtime Channels',
      database: 'PostgreSQL for Session Snapshots',
      styling: 'Tailwind CSS',
      deployment: 'Vercel / Render'
    },
    milestones: [
      {
        milestoneNumber: 1,
        title: 'WebSocket Channel & Room Connection',
        description: 'Establish bidirectional socket communication per room ID.',
        tasks: [
          'Create room route /board/[roomId]',
          'Establish WebSocket connection on component mount',
          'Implement join_room and leave_room event handlers'
        ]
      },
      {
        milestoneNumber: 2,
        title: 'Multiplayer Cursor Presence',
        description: 'Broadcast and render live cursor coordinates of all connected peers.',
        tasks: [
          'Throttle mousemove events to 30ms to avoid network congestion',
          'Broadcast cursor { x, y, userName, color } over socket channel',
          'Render floating avatar pills above active teammate cursors'
        ]
      },
      {
        milestoneNumber: 3,
        title: 'State Sync & Conflict Resolution',
        description: 'Synchronize editor text and handle concurrent modifications.',
        tasks: [
          'Implement text delta synchronization',
          'Handle reconnection when internet temporarily disconnects',
          'Save final state to database on host session close'
        ]
      }
    ],
    testingGuidelines: [
      'Open two separate browser windows side-by-side; verify cursor in window A moves smoothly in window B.',
      'Type code in window A and verify instant reflection in window B.',
      'Disconnect Wi-Fi on one client, reconnect 5 seconds later, and verify seamless reconnection.'
    ],
    deploymentInstructions: [
      'Deploy frontend to Vercel and WebSocket backend to containerized Node.js service.'
    ],
    rubric: [
      { criterion: 'Real-Time Concurrency', weight: '40%', description: 'Sub-50ms socket transmission without noticeable lag or dropped packets.' },
      { criterion: 'Presence & UX', weight: '25%', description: 'Smooth cursor interpolation and clear peer identification.' },
      { criterion: 'Network Resilience', weight: '20%', description: 'Graceful reconnection on temporary network drop.' },
      { criterion: 'System Architecture', weight: '15%', description: 'Clean room separation and minimal server CPU overhead.' }
    ]
  }
];
