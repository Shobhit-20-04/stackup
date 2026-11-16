export interface GlossaryEntry {
  id: string;
  term: string;
  category: 'Foundations' | 'Programming' | 'Web & Cloud' | 'Computer Science' | 'Databases' | 'DevOps & Tools';
  simpleDefinition: string;
  technicalDefinition: string;
  realWorldAnalogy: string;
  example: string;
  relatedTerms: string[];
  lessonUrl: string;
}

export const TECHNICAL_GLOSSARY: GlossaryEntry[] = [
  {
    id: 'algorithm',
    term: 'Algorithm',
    category: 'Computer Science',
    simpleDefinition: 'A step-by-step recipe or set of instructions for solving a specific problem or completing a task.',
    technicalDefinition: 'A finite, unambiguous sequence of well-defined computer-implementable instructions to solve a class of specific problems or perform a computation.',
    realWorldAnalogy: 'A baking recipe for chocolate cake. If you follow the exact steps in order, you reliably get a cake every single time.',
    example: 'Binary Search is an algorithm that finds a target value in a sorted list in O(log n) time.',
    relatedTerms: ['Data Structure', 'Time Complexity', 'Function'],
    lessonUrl: '/core-cs#what-is-programming-languages-algorithms'
  },
  {
    id: 'api',
    term: 'API (Application Programming Interface)',
    category: 'Web & Cloud',
    simpleDefinition: 'A software messenger that allows two different computer programs to talk to each other and share data.',
    technicalDefinition: 'A set of subroutine definitions, communication protocols, and tools for building software. In web applications, typically HTTP-based REST or GraphQL endpoints exchanging JSON payloads.',
    realWorldAnalogy: 'A restaurant waiter who takes your order from the table, tells the kitchen chefs what to cook, and brings the food back to you.',
    example: 'fetch("/api/dsa/potd") sends a GET request to the StackUp backend to retrieve today\'s coding challenge.',
    relatedTerms: ['REST', 'HTTP', 'JSON', 'Server', 'Client'],
    lessonUrl: '/core-cs#backend-apis-rest-servers-databases'
  },
  {
    id: 'authentication',
    term: 'Authentication (Auth)',
    category: 'Web & Cloud',
    simpleDefinition: 'The process of verifying who you are (e.g. logging in with your email and password or Google account).',
    technicalDefinition: 'The verification of the claimed identity of a user, device, or system entity via credentials (passwords, biometrics, public keys, or cryptographic JWT tokens).',
    realWorldAnalogy: 'Showing your passport at the airport border control to prove that you are indeed the person named on the ticket.',
    example: 'supabase.auth.signInWithPassword({ email, password }) validates credentials and returns a secure session.',
    relatedTerms: ['Authorization', 'JWT', 'Security', 'Session'],
    lessonUrl: '/core-cs#backend-apis-rest-servers-databases'
  },
  {
    id: 'authorization',
    term: 'Authorization',
    category: 'Web & Cloud',
    simpleDefinition: 'The process of determining what you are allowed to do after you log in (e.g. student vs. teacher vs. administrator).',
    technicalDefinition: 'The security mechanism that grants or denies specific access privileges and permissions to authenticated entities (e.g., RBAC, RLS policies).',
    realWorldAnalogy: 'Your passport gets you into the country, but only people with a VIP security badge are permitted inside the control tower.',
    example: 'Row Level Security (RLS) ensures students can only delete their own notes, not notes belonging to other students.',
    relatedTerms: ['Authentication', 'Security', 'Database'],
    lessonUrl: '/core-cs#databases-sql-relational-data-tables'
  },
  {
    id: 'boolean',
    term: 'Boolean',
    category: 'Programming',
    simpleDefinition: 'A binary value that can only be either True or False.',
    technicalDefinition: 'A primitive data type in computer science having one of two possible values (true or false), representing the two truth values of logic and Boolean algebra.',
    realWorldAnalogy: 'A light switch on the wall: it is either switched ON (True) or switched OFF (False). There is no middle state.',
    example: 'let isStudent = true; if (isStudent) { applyStudentDiscount(); }',
    relatedTerms: ['Variables', 'Conditionals', 'Data Types'],
    lessonUrl: '/core-cs#variables-data-types-memory-boxes'
  },
  {
    id: 'bug',
    term: 'Bug',
    category: 'Programming',
    simpleDefinition: 'An error, flaw, or mistake in computer software that causes it to produce incorrect results or crash.',
    technicalDefinition: 'An error, fault, or unintended flaw in a computer program or system that causes it to produce an unexpected or incorrect result or behave in unintended ways.',
    realWorldAnalogy: 'A typo in a printed GPS navigation map that tells you to turn left into a river.',
    example: 'A division-by-zero error that occurs when a user enters 0 in the denominator of a calculator.',
    relatedTerms: ['Debugging', 'Compiler', 'Syntax Error'],
    lessonUrl: '/core-cs#what-is-programming-languages-algorithms'
  },
  {
    id: 'client',
    term: 'Client',
    category: 'Web & Cloud',
    simpleDefinition: 'The computer, phone, or browser requesting information from a remote computer.',
    technicalDefinition: 'A piece of computer hardware or software that accesses a service made available by a server as part of the client-server model of computer networks.',
    realWorldAnalogy: 'The customer ordering food at a restaurant drive-through window.',
    example: 'Google Chrome running on your laptop acts as the client requesting web pages from vercel.app servers.',
    relatedTerms: ['Server', 'HTTP', 'Browser'],
    lessonUrl: '/core-cs#how-the-internet-works-browsers-servers'
  },
  {
    id: 'compiler',
    term: 'Compiler',
    category: 'Foundations',
    simpleDefinition: 'A special program that translates your entire human-written code file into machine language (0s and 1s) all at once before running it.',
    technicalDefinition: 'A computer program that translates computer code written in one programming language (source code) into another language (often target machine binary) prior to execution.',
    realWorldAnalogy: 'A professional book translator who reads an entire 300-page English novel and publishes a complete German edition of the book.',
    example: 'gcc program.c -o program compiles C source code into a native executable binary.',
    relatedTerms: ['Interpreter', 'Machine Code', 'Runtime'],
    lessonUrl: '/core-cs#what-is-programming-languages-algorithms'
  },
  {
    id: 'css',
    term: 'CSS (Cascading Style Sheets)',
    category: 'Web & Cloud',
    simpleDefinition: 'The code used to style, color, format, and lay out web pages.',
    technicalDefinition: 'A style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML, including layout, colors, and fonts.',
    realWorldAnalogy: 'The interior design and paint colors of a house. The house structure is built with bricks (HTML), while CSS paints the walls and arranges the furniture.',
    example: 'button { background-color: #0D08CB; color: white; padding: 12px; border-radius: 8px; }',
    relatedTerms: ['HTML', 'DOM', 'Frontend'],
    lessonUrl: '/core-cs#html-css-structure-and-styling'
  },
  {
    id: 'database',
    term: 'Database (DB)',
    category: 'Databases',
    simpleDefinition: 'A high-speed, secure digital filing cabinet where software permanently stores and queries large amounts of structured data.',
    technicalDefinition: 'An organized collection of structured data, typically stored electronically in a computer system and controlled by a Database Management System (DBMS) such as PostgreSQL or MySQL.',
    realWorldAnalogy: 'A bank vault with thousands of organized safe-deposit boxes, each with an exact account number so money can be deposited or retrieved instantly.',
    example: 'PostgreSQL storing user records, solved DSA questions, and resume scores in StackUp.',
    relatedTerms: ['SQL', 'Table', 'Primary Key', 'CRUD'],
    lessonUrl: '/core-cs#databases-sql-relational-data-tables'
  },
  {
    id: 'data-structure',
    term: 'Data Structure',
    category: 'Computer Science',
    simpleDefinition: 'A specialized format for organizing, storing, and accessing data in computer memory so it can be used efficiently.',
    technicalDefinition: 'A data organization, management, and storage format that enables efficient access and modification of data elements (e.g. Arrays, Linked Lists, Trees, Hash Tables, Graphs).',
    realWorldAnalogy: 'The difference between throwing clean laundry into a messy pile vs. folding shirts into labeled drawers. In drawers, you can find your favorite blue shirt in 2 seconds.',
    example: 'A Hash Map allows searching for a user by email in O(1) constant time, while an unsorted array takes O(n) time.',
    relatedTerms: ['Algorithm', 'Array', 'Hash Map', 'Time Complexity'],
    lessonUrl: '/core-cs#variables-data-types-memory-boxes'
  },
  {
    id: 'debugging',
    term: 'Debugging',
    category: 'Programming',
    simpleDefinition: 'The process of finding and fixing mistakes or unexpected behavior in code.',
    technicalDefinition: 'The systematic process of detecting, analyzing, and resolving defects, bugs, or anomalies within software to ensure correct program execution.',
    realWorldAnalogy: 'A detective looking for clues at a crime scene to figure out why the safe won\'t unlock.',
    example: 'Using console.log() or a debugger breakpoint to inspect variable values when an algorithm returns an incorrect answer.',
    relatedTerms: ['Bug', 'Syntax Error', 'Terminal'],
    lessonUrl: '/core-cs#what-is-programming-languages-algorithms'
  },
  {
    id: 'dns',
    term: 'DNS (Domain Name System)',
    category: 'Foundations',
    simpleDefinition: 'The internet telephone directory that translates human website names (google.com) into machine IP addresses.',
    technicalDefinition: 'A hierarchical and decentralized naming system for computers, services, or other resources connected to the Internet or a private network, translating domain names to numerical IP addresses.',
    realWorldAnalogy: 'Your phone\'s contacts list: you tap on "Mom" instead of memorizing her 10-digit telephone number.',
    example: 'When you type stackup-zeta.vercel.app, DNS resolves it to the IP address 76.76.21.21.',
    relatedTerms: ['IP Address', 'Server', 'HTTP'],
    lessonUrl: '/core-cs#how-the-internet-works-browsers-servers'
  },
  {
    id: 'dom',
    term: 'DOM (Document Object Model)',
    category: 'Web & Cloud',
    simpleDefinition: 'The browser in-memory live tree representing everything on a web page, which JavaScript can change dynamically.',
    technicalDefinition: 'A cross-platform and language-neutral application programming interface that treats an HTML or XML document as a tree structure wherein each node is an object representing a part of the document.',
    realWorldAnalogy: 'A theater stage with actors and props. JavaScript is the stage director who can tell actors to move, change their clothes, or turn off the lights.',
    example: 'document.getElementById("login-btn").textContent = "Sign Out" updates the button label in the DOM.',
    relatedTerms: ['HTML', 'CSS', 'JavaScript'],
    lessonUrl: '/core-cs#javascript-dom-events-interactivity'
  },
  {
    id: 'frontend',
    term: 'Frontend (Client-Side)',
    category: 'Web & Cloud',
    simpleDefinition: 'Everything you see, click, and interact with on a website in your browser.',
    technicalDefinition: 'The client-facing presentation layer of software architecture responsible for user interaction, visual rendering, and local state management using HTML, CSS, and JavaScript/TypeScript.',
    realWorldAnalogy: 'The cockpit of an airplane: the dashboard dials, switches, and steering controls that the pilot touches.',
    example: 'The buttons, animations, code editor, and dark-mode toggle in StackUp make up its frontend.',
    relatedTerms: ['Backend', 'HTML', 'CSS', 'DOM'],
    lessonUrl: '/core-cs#html-css-structure-and-styling'
  },
  {
    id: 'function',
    term: 'Function',
    category: 'Programming',
    simpleDefinition: 'A named, reusable block of code that performs a specific job and can return a result.',
    technicalDefinition: 'A self-contained block of instructions that takes inputs (arguments), executes a defined computation or side effect, and optionally returns an output value to the caller.',
    realWorldAnalogy: 'A microwave oven: you put in a cold slice of pizza, set 60 seconds, and it gives you back hot, melted pizza.',
    example: 'def add(a, b): return a + b creates a reusable function to sum two numbers.',
    relatedTerms: ['Variables', 'Algorithm', 'Scope'],
    lessonUrl: '/core-cs#functions-reusable-code-blocks'
  },
  {
    id: 'git',
    term: 'Git',
    category: 'DevOps & Tools',
    simpleDefinition: 'A free time-machine tool for programmers that tracks every change made to your files so you can recover earlier versions and collaborate.',
    technicalDefinition: 'A distributed version control system designed to track changes in source code during software development, enabling non-linear workflows via branching and merging.',
    realWorldAnalogy: 'A video game checkpoint save system. If you fight a boss and lose, you can reload your checkpoint from 10 minutes ago without losing your game.',
    example: 'git commit -m "Fix login bug" creates a permanent snapshot of your project changes.',
    relatedTerms: ['GitHub', 'Repository', 'Branch', 'Commit'],
    lessonUrl: '/core-cs#git-github-version-control-collaboration'
  },
  {
    id: 'github',
    term: 'GitHub',
    category: 'DevOps & Tools',
    simpleDefinition: 'A website where developers upload their Git projects to share them with teammates, backup their code, and show recruiters their portfolio.',
    technicalDefinition: 'A cloud-based hosting platform for Git repositories providing distributed version control, pull requests, issue tracking, continuous integration (CI/CD), and social coding features.',
    realWorldAnalogy: 'Google Drive or Dropbox, but specially designed for software source code and team collaboration.',
    example: 'https://github.com/Shobhit-20-04/stackup is the public GitHub repository hosting StackUp\'s source code.',
    relatedTerms: ['Git', 'Repository', 'Pull Request'],
    lessonUrl: '/core-cs#git-github-version-control-collaboration'
  },
  {
    id: 'html',
    term: 'HTML (HyperText Markup Language)',
    category: 'Web & Cloud',
    simpleDefinition: 'The standard markup language used to build the skeleton and content of web pages.',
    technicalDefinition: 'The standard markup language for documents designed to be displayed in a web browser, defining the structure of web content using tags, elements, and attributes.',
    realWorldAnalogy: 'The wooden framing and drywall of a house before any paint, lights, or furniture are added.',
    example: '<button class="primary-btn">Click Me</button> creates an interactive button element.',
    relatedTerms: ['CSS', 'DOM', 'Frontend'],
    lessonUrl: '/core-cs#html-css-structure-and-styling'
  },
  {
    id: 'http',
    term: 'HTTP & HTTPS',
    category: 'Foundations',
    simpleDefinition: 'The protocol (rules) used by web browsers and servers to talk to each other. HTTPS adds encryption so nobody can spy on your passwords.',
    technicalDefinition: 'HyperText Transfer Protocol: an application-layer protocol for distributed, collaborative, hypermedia information systems. HTTPS layers HTTP on top of SSL/TLS cryptographic encryption.',
    realWorldAnalogy: 'HTTP is like sending a postcard where the mail carrier can read your message. HTTPS is like locking the letter inside a titanium padlock box before mailing.',
    example: 'Every secure website URL begins with https://, ensuring your communication is private.',
    relatedTerms: ['API', 'Client', 'Server', 'DNS'],
    lessonUrl: '/core-cs#how-the-internet-works-browsers-servers'
  },
  {
    id: 'ide',
    term: 'IDE (Integrated Development Environment)',
    category: 'Foundations',
    simpleDefinition: 'A supercharged software application where programmers write, debug, and run code (e.g. Visual Studio Code).',
    technicalDefinition: 'A software application providing comprehensive facilities to computer programmers for software development, typically consisting of a source code editor, build automation tools, and a debugger.',
    realWorldAnalogy: 'A master carpenter\'s workbench that has all the chisels, saws, measuring tapes, and safety goggles neatly arranged within arm\'s reach.',
    example: 'VS Code, PyCharm, and IntelliJ are popular IDEs used by professional developers.',
    relatedTerms: ['Compiler', 'Terminal', 'Debugging'],
    lessonUrl: '/core-cs#developer-environment-tools-setup'
  },
  {
    id: 'interpreter',
    term: 'Interpreter',
    category: 'Foundations',
    simpleDefinition: 'A program that reads your code and runs it line-by-line in real time, rather than translating the whole file ahead of time.',
    technicalDefinition: 'A computer program that directly executes instructions written in a programming or scripting language, without requiring them previously to have been compiled into a machine language program.',
    realWorldAnalogy: 'A live speech interpreter who listens to an ambassador speaking French and translates each sentence into English into an earpiece line by line.',
    example: 'The Python interpreter reads script.py and executes each line sequentially.',
    relatedTerms: ['Compiler', 'Runtime', 'Variables'],
    lessonUrl: '/core-cs#what-is-programming-languages-algorithms'
  },
  {
    id: 'json',
    term: 'JSON (JavaScript Object Notation)',
    category: 'Web & Cloud',
    simpleDefinition: 'A simple, human-readable text format used by websites and apps to send structured information back and forth.',
    technicalDefinition: 'An open standard file format and data interchange format that uses human-readable text to store and transmit data objects consisting of attribute-value pairs and arrays.',
    realWorldAnalogy: 'A standardized shipping manifest taped to a delivery box listing what is inside.',
    example: '{ "name": "Jane", "score": 95, "skills": ["Python", "SQL"] }',
    relatedTerms: ['API', 'Frontend', 'Backend'],
    lessonUrl: '/core-cs#backend-apis-rest-servers-databases'
  },
  {
    id: 'loop',
    term: 'Loop',
    category: 'Programming',
    simpleDefinition: 'A programming command that repeats a block of code multiple times automatically.',
    technicalDefinition: 'A sequence of instructions that is continually repeated until a certain condition of termination is reached (e.g. for loop, while loop).',
    realWorldAnalogy: 'A factory conveyor belt: as each soda can passes, the robotic arm caps it, repeating the exact same motion 10,000 times a day.',
    example: 'for i in range(5): print("Hello") prints Hello 5 times.',
    relatedTerms: ['Conditionals', 'Variables', 'Algorithm'],
    lessonUrl: '/core-cs#loops-and-iteration-for-while'
  },
  {
    id: 'operating-system',
    term: 'Operating System (OS)',
    category: 'Foundations',
    simpleDefinition: 'The core software running on your computer (like Windows, macOS, or Linux) that manages memory, files, and physical hardware.',
    technicalDefinition: 'System software that manages computer hardware, software resources, and provides common services for computer programs, performing scheduling, memory allocation, and I/O management.',
    realWorldAnalogy: 'The conductor of a symphony orchestra: making sure the violins, trumpets, and drums play at the right time without crashing into each other.',
    example: 'Windows 11, macOS Sequoia, and Ubuntu Linux are major operating systems.',
    relatedTerms: ['RAM', 'CPU', 'Process'],
    lessonUrl: '/core-cs#how-computers-work-hardware-software'
  },
  {
    id: 'primary-key',
    term: 'Primary Key (PK)',
    category: 'Databases',
    simpleDefinition: 'A unique identifier (like an ID number or passport number) given to each row in a database table so it can never be confused with another.',
    technicalDefinition: 'A specific choice of a minimal set of attributes (columns) that uniquely specify a tuple (row) in a relational database table.',
    realWorldAnalogy: 'Your Social Security Number or Aadhaar Number: even if someone has the exact same name and birthday, your number is 100% unique to you.',
    example: 'id UUID PRIMARY KEY DEFAULT gen_random_uuid() guarantees each user row has a unique identifier.',
    relatedTerms: ['Database', 'SQL', 'Foreign Key'],
    lessonUrl: '/core-cs#databases-sql-relational-data-tables'
  },
  {
    id: 'ram',
    term: 'RAM (Random Access Memory)',
    category: 'Foundations',
    simpleDefinition: 'Fast, temporary thinking memory inside your computer that holds active apps while your computer is on, but empties when powered off.',
    technicalDefinition: 'A form of computer memory that can be read and changed in any order, typically used to store working data and machine code currently in use; it is volatile memory.',
    realWorldAnalogy: 'The top of your study desk: you place the open textbooks and notebook you are working on right now. When you go to sleep, the desk is wiped clean.',
    example: 'A laptop with 16 GB of RAM can keep multiple browser tabs, a code editor, and Spotify open simultaneously without slowing down.',
    relatedTerms: ['CPU', 'Storage', 'Operating System'],
    lessonUrl: '/core-cs#how-computers-work-hardware-software'
  },
  {
    id: 'repository',
    term: 'Repository (Repo)',
    category: 'DevOps & Tools',
    simpleDefinition: 'A project folder managed by Git that contains all your code files, photos, and the complete recorded history of changes.',
    technicalDefinition: 'A digital storage location where code, assets, and version control metadata (including commit logs, branch pointers, and commit objects) are stored.',
    realWorldAnalogy: 'A digital binder for your novel that holds every draft, discarded scene, and final chapter ever written.',
    example: 'The "stackup" repository contains all files, tests, and documentation for the StackUp web application.',
    relatedTerms: ['Git', 'GitHub', 'Commit'],
    lessonUrl: '/core-cs#git-github-version-control-collaboration'
  },
  {
    id: 'server',
    term: 'Server',
    category: 'Web & Cloud',
    simpleDefinition: 'A powerful computer running 24/7 in a data center that waits for requests from clients (browsers) and sends back web pages or data.',
    technicalDefinition: 'A computer program or device that provides a service to another computer program and its user, also known as the client, in response to requests over a computer network.',
    realWorldAnalogy: 'A library reference librarian sitting at the desk waiting for visitors to ask questions and handing them the requested books.',
    example: 'When you visit StackUp, Vercel\'s cloud servers receive your request and deliver the HTML, CSS, and JavaScript files to your browser.',
    relatedTerms: ['Client', 'API', 'HTTP', 'Database'],
    lessonUrl: '/core-cs#how-the-internet-works-browsers-servers'
  },
  {
    id: 'sql',
    term: 'SQL (Structured Query Language)',
    category: 'Databases',
    simpleDefinition: 'The universal language used to ask questions, read, insert, update, and delete information from databases.',
    technicalDefinition: 'A domain-specific language used in programming and designed for managing data held in a relational database management system (RDBMS) or for stream processing.',
    realWorldAnalogy: 'Asking a librarian: "Please bring me all history books published after 2020 sorted by author name."',
    example: 'SELECT * FROM users WHERE ats_score >= 80 ORDER BY created_at DESC;',
    relatedTerms: ['Database', 'Primary Key', 'CRUD'],
    lessonUrl: '/core-cs#databases-sql-relational-data-tables'
  },
  {
    id: 'variable',
    term: 'Variable',
    category: 'Programming',
    simpleDefinition: 'A labeled box in computer memory that stores a piece of data (like a name, number, or score) so you can use it later.',
    technicalDefinition: 'A symbolic name associated with a memory location that contains some known or unknown quantity or information, referred to as a value, which can be modified during program execution.',
    realWorldAnalogy: 'A labeled storage container in your kitchen marked "Coffee". The box can be full, half-empty, or refilled with decaf.',
    example: 'user_score = 100 assigns the number 100 to the variable named user_score.',
    relatedTerms: ['Data Types', 'Boolean', 'Function'],
    lessonUrl: '/core-cs#variables-data-types-memory-boxes'
  }
];
