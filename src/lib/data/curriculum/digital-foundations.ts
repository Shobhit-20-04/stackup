import type { SectionCategory } from './types';

export const DIGITAL_FOUNDATIONS_CATEGORY: SectionCategory = {
  id: 'digital-foundations',
  slug: 'digital-foundations',
  title: 'Digital Foundations & Computer Literacy',
  description: 'Zero-jargon guide to how computers, the internet, software, and developer tools actually work.',
  icon: 'Terminal',
  topics: [
    {
      id: 'computer-hardware-software',
      slug: 'how-computers-work-hardware-software',
      title: 'How Computers Work: Hardware, Memory & Software Foundations',
      description: 'Demystifying the physical parts of a computer, memory, storage, operating systems, and processes in plain English.',
      estimatedMinutes: 15,
      difficulty: 'Easy',
      companyTags: ['Foundations', 'Digital Literacy'],
      keyTakeaways: [
        'A computer takes input, processes it using instructions, stores information, and delivers output.',
        'CPU is the brain that calculates; RAM is fast temporary memory; SSD/Hard Drive is permanent storage.',
        'The Operating System (Windows, macOS, Linux) bridges the gap between physical hardware and your applications.',
        'A program is stored code on disk; a process is a running instance of that code in RAM.'
      ],
      prerequisites: ['No prior technical knowledge required'],
      youtube_url: 'https://www.youtube.com/results?search_query=how+computers+work+hardware+software+explained+for+beginners',
      notesMarkdown: `# How Computers Work: Hardware, Software & Operating Systems

## 1. What Will You Learn?
In this lesson, you will discover what actually happens inside a computer when you turn it on and run an application. You will learn the difference between hardware and software, why computers need both RAM and permanent storage, and what an Operating System does.

---

## 2. Why Is This Important?
Every single program you will ever write—whether a smartphone app, a web page, or an artificial intelligence model—runs on computer hardware managed by an operating system. When code crashes, runs slowly, or runs out of memory, understanding these physical realities allows you to diagnose and solve the problem rather than guessing blindly.

---

## 3. Prerequisites
None! This lesson assumes you have used a smartphone or computer to browse the internet, but have never studied how they work under the hood.

---

## 4. Simple Explanation (Plain Language)
At its core, a computer is a machine that performs four simple actions:
1. **Input:** Receives information from the outside world (keyboard typing, mouse clicks, microphone sound, touchscreen taps).
2. **Processing:** Follows step-by-step instructions to calculate, manipulate, or transform that information.
3. **Storage:** Saves information either temporarily (while working on it) or permanently (so it stays when powered off).
4. **Output:** Displays or delivers the result back to you (screen monitor, speakers, printer, vibration motor).

Hardware refers to physical parts you can touch. Software refers to the instructions and code telling the hardware what to do.

---

## 5. Real-World Analogy: The Chef in a Kitchen
Imagine a restaurant kitchen:
- **The CPU (Central Processing Unit) is the Chef:** The chef does all the chopping, cooking, and thinking. A faster chef can prepare dishes more quickly.
- **RAM (Random Access Memory) is the Countertop:** The chef places ingredients currently being used on the countertop. It is quick to reach, but when the chef leaves and cleans the kitchen at night, the countertop is wiped completely clean (RAM is *volatile*—it loses all data when the computer turns off).
- **Storage (Hard Drive / SSD) is the Pantry / Refrigerator:** All recipe books and non-perishable ingredients are stored here safely. It takes a little longer to open the pantry door, but items remain there even when the kitchen is closed and dark (Storage is *non-volatile*—permanent).
- **The Operating System is the Kitchen Manager:** The manager assigns orders to the chef, decides which food gets cooked first, and ensures the chef does not run out of countertop space.

---

## 6. Technical Explanation
A modern computing architecture consists of several primary subsystems:

\`\`\`
+-------------------------------------------------------------------------+
|                           THE OPERATING SYSTEM                          |
|         (Windows / macOS / Linux - Schedules tasks & manages hardware)   |
+-------------------------------------------------------------------------+
          |                                            |
+----------------------+                     +----------------------+
|     CPU (Compute)    | <--- System Bus ---> |      RAM (Memory)    |
| - Arithmetic Logic   |                      | - Ultra-fast (ns)    |
| - Control Unit       |                      | - Temporary/Volatile |
| - Registers & Cache  |                      +----------------------+
+----------------------+                                 |
          |                                              |
          v                                              v
+----------------------+                     +----------------------+
|  Input / Output Devices|                    |  Secondary Storage   |
| (Keyboard, Display)  |                     |  (SSD / NVMe / HDD)  |
+----------------------+                     +----------------------+
\`\`\`

1. **CPU (Central Processing Unit):** Executes machine instructions (billions of operations per second, measured in Gigahertz / GHz).
2. **RAM (Random Access Memory):** High-speed byte-addressable memory where the OS and currently open programs keep their active data.
3. **Storage (SSD / NVMe):** Magnetic or flash storage that keeps files, photos, operating system files, and installed programs permanently.
4. **Program vs. Process:** A *program* is static code written on your SSD (e.g. \`chrome.exe\`). When you double-click it, the OS loads its code into RAM and creates a *process* (an active executing instance with its own memory space).

---

## 7. Visual or Practical Example
Open Task Manager on Windows (\`Ctrl + Shift + Esc\`) or Activity Monitor on macOS. Look at the **Performance** tab:
- **CPU:** Shows what percentage of calculating power is being used right now.
- **Memory (RAM):** Shows how many Gigabytes (GB) of temporary memory your open apps (browser tabs, Spotify, IDE) are occupying.
- **Disk:** Shows when files are actively being read from or written to your SSD.

---

## 8. Step-by-Step Demonstration: What Happens When You Double-Click an App
1. You double-click an icon on your desktop (e.g., a text editor).
2. The Operating System intercepts the mouse click.
3. The OS reads the program's files from permanent storage (SSD).
4. The OS allocates a block of temporary memory (RAM) and copies the instructions there.
5. The CPU begins executing instructions starting from the program's entry point.
6. The app renders a window onto your display screen via the graphics card.

---

## 9. Hands-On Exercise
**Challenge:** Classify each item below as **Hardware** or **Software**, and note whether memory is **Volatile** (lost on restart) or **Non-Volatile** (retained):
1. A Python file (\`script.py\`) saved on your desktop.
2. A 16 GB DDR5 memory stick inside your laptop.
3. The Chrome browser tab you are currently viewing.
4. A USB flash drive with family photos.

*Solution:*
1. Software / Non-volatile (saved on SSD).
2. Hardware / Volatile (RAM loses content when powered down).
3. Software process in RAM / Volatile (if your battery dies, unsubmitted form input is lost).
4. Hardware / Non-volatile (flash storage holds files safely).

---

## 10. Common Mistakes & Misconceptions
- **Confusion between Memory (RAM) and Storage (Disk Space):** Many beginners say *"My phone ran out of memory"* when they actually mean *"My photo storage is full"*. RAM is temporary thinking space (typically 8GB to 32GB); Storage is the permanent library (typically 256GB to 2TB).
- **Thinking computers understand English:** Computers only understand electric signals: On (1) and Off (0), known as binary. Every photo, video, word, and program is represented by combinations of 1s and 0s.

---

## 11. Knowledge Check
Test your understanding with the quiz questions below!

---

## 12. Summary
- Computers take input, process it with the CPU, store it in RAM and SSD, and deliver output.
- RAM is ultra-fast but temporary; storage is permanent but slower.
- The Operating System acts as the conductor of the orchestra, making sure hardware and software work together safely.

---

## 13. Next Recommended Topic
Ready to see how computers connect with the world? Continue to **How the Internet Works: Websites, Browsers & Servers**.
`,
      questions: [
        {
          id: 'df-hw-1',
          question: 'What is the primary difference between RAM (Random Access Memory) and SSD Storage?',
          options: [
            'RAM is permanent storage; SSD is temporary memory',
            'RAM is fast, temporary memory that loses data when powered off; SSD stores data permanently',
            'RAM is only used for playing music; SSD is only used for games',
            'RAM is external hardware; SSD is software'
          ],
          correct_option: 1,
          explanation: 'RAM is volatile memory used by the CPU for active calculations and open programs; SSD storage is non-volatile and keeps your files permanently even when turned off.'
        },
        {
          id: 'df-hw-2',
          question: 'What is the role of the Operating System (like Windows, macOS, or Linux)?',
          options: [
            'It physically solders computer chips onto the motherboard',
            'It manages computer hardware resources and provides a platform for running software applications',
            'It is a website that you visit in Google Chrome',
            'It converts your computer monitor into a television'
          ],
          correct_option: 1,
          explanation: 'The Operating System sits between the physical hardware and user applications, scheduling CPU time, allocating RAM, and managing files securely.'
        },
        {
          id: 'df-hw-3',
          question: 'What is the difference between a program and a process?',
          options: [
            'A program is stored on disk; a process is that program actively running in memory',
            'A program is written in Python; a process is written in HTML',
            'A process is hardware; a program is software',
            'There is no difference; the two words mean the exact same thing'
          ],
          correct_option: 0,
          explanation: 'A program is passive code stored on permanent storage. When launched, the operating system loads it into memory as an active, running process.'
        }
      ],
      externalResources: [
        {
          title: 'Harvard CS50: Computational Thinking & Hardware Basics',
          provider: 'Harvard CS50',
          url: 'https://cs50.harvard.edu/x/',
          difficulty: 'Beginner',
          isFree: true
        },
        {
          title: 'Crash Course Computer Science: Hardware & Architecture',
          provider: 'freeCodeCamp',
          url: 'https://www.freecodecamp.org/news/crash-course-computer-science/',
          difficulty: 'Beginner',
          isFree: true
        }
      ]
    },
    {
      id: 'how-the-internet-works',
      slug: 'how-the-internet-works-browsers-servers',
      title: 'How the Internet Works: Websites, Browsers & Servers',
      description: 'Understand the journey of a website: URLs, IP addresses, DNS domain lookup, HTTP/HTTPS requests, and client-server communication.',
      estimatedMinutes: 16,
      difficulty: 'Easy',
      companyTags: ['Foundations', 'Web Architecture'],
      keyTakeaways: [
        'The internet is a global network of connected computers communicating with standard rules (protocols).',
        'Your computer is the client (requesting data); remote computers hosting websites are servers (serving data).',
        'DNS (Domain Name System) is the internet phonebook that translates human names (google.com) into IP addresses (142.250.190.46).',
        'HTTP is plain communication; HTTPS encrypts data in transit using SSL/TLS for safety.'
      ],
      prerequisites: ['How Computers Work: Hardware, Software & Operating Systems'],
      youtube_url: 'https://www.youtube.com/results?search_query=how+the+internet+works+explained+simply+for+beginners',
      notesMarkdown: `# How the Internet Works: Websites, Browsers & Servers

## 1. What Will You Learn?
You will learn what happens in the fractional second between typing \`https://stackup-zeta.vercel.app\` in your browser bar and seeing the webpage appear. You will understand clients, servers, IP addresses, DNS, and HTTP/HTTPS.

---

## 2. Why Is This Important?
Nearly all modern software communicates over the internet. Whether building a frontend button, writing a backend database query, or deploying an app to the cloud, you must understand how data travels between devices.

---

## 3. Prerequisites
Completion of **How Computers Work: Hardware, Software & Operating Systems**.

---

## 4. Simple Explanation (Plain Language)
The internet is not a mysterious cloud floating in the sky. It is literally a giant global network of physical cables, fiber optics, satellites, and routers connecting millions of computers together.

When you use the internet, there are two primary roles:
1. **The Client (You):** Your phone or laptop running a web browser (Chrome, Safari, Firefox). You are the *customer* asking for something.
2. **The Server:** A powerful computer in a data center running 24/7 with a fast internet connection. It is the *waiter* that holds the website files and serves them to you upon request.

---

## 5. Real-World Analogy: Ordering Food by Phone
- **The URL (\`google.com\`):** The restaurant's brand name in your memory.
- **The DNS (Domain Name System):** The phone directory. You cannot call the letters "P-I-Z-Z-A"; you need their phone number. DNS translates the name \`google.com\` into the telephone number (an IP address like \`142.250.190.46\`).
- **The Request (HTTP Request):** You calling the restaurant: *"Please send me 1 pepperoni pizza."*
- **The Response (HTTP Response):** The restaurant delivering the pizza box to your doorstep with status: *"Order completed successfully (200 OK)."*
- **The Browser:** You opening the box and enjoying the food (rendering HTML, CSS, and images on screen).

---

## 6. Technical Explanation: The 5-Step Web Page Journey

\`\`\`
[1. User types "example.com"]
             |
             v
[2. DNS Lookup] -----------------> [DNS Server: "example.com is at 93.184.216.34"]
             |
             v
[3. TCP / TLS Handshake] --------> [Establishes secure, encrypted HTTPS tunnel]
             |
             v
[4. HTTP GET / Request] ---------> [Remote Server receives request and sends HTML/CSS/JS]
             |
             v
[5. Browser Rendering] ----------> [Browser parses DOM, applies CSS styles, executes JS]
\`\`\`

1. **DNS Resolution:** Your computer asks a DNS recursive resolver: *"What is the IP address for this domain?"*
2. **TCP / TLS Handshake:** Client and server negotiate a secure connection using SSL/TLS encryption.
3. **HTTP Request:** The browser sends a message:
   \`\`\`http
   GET / HTTP/1.1
   Host: example.com
   User-Agent: Mozilla/5.0
   \`\`\`
4. **HTTP Response:** The server responds with status code \`200 OK\` and the website's HTML file:
   \`\`\`http
   HTTP/1.1 200 OK
   Content-Type: text/html
   \`\`\`
5. **DOM Parsing & Rendering Engine:** The browser reads the HTML (content structure), fetches linked CSS (styling), fetches JavaScript (interactivity), and paints the pixels on your screen.

---

## 7. What Is the Difference Between HTTP and HTTPS?
- **HTTP (HyperText Transfer Protocol):** Transmits data in plain readable text. Anyone listening on your public Wi-Fi network could see your passwords or credit card numbers.
- **HTTPS (HTTP Secure):** Encrypts all traffic using SSL/TLS cryptographic keys. Even if an attacker intercepts the data packets, they only see garbled, uncrackable mathematics. Always look for the padlock icon in your browser!

---

## 8. Common HTTP Status Codes Every Beginner Should Know
- **200 OK:** Success! The server found what you asked for and sent it.
- **301 / 302 Redirect:** The page moved to another URL.
- **401 Unauthorized:** You must log in before you can view this page.
- **404 Not Found:** The URL you typed does not exist on this server.
- **500 Internal Server Error:** The server crashed or has a bug in its code.

---

## 9. Hands-On Exercise
Open your browser developer tools:
1. Press \`F12\` or Right-Click anywhere on this page and click **Inspect**.
2. Click on the **Network** tab at the top.
3. Refresh the page (\`Ctrl + R\` or \`Cmd + R\`).
4. Look at the requests: You will see your browser downloading HTML, CSS stylesheets, images, and fonts, each showing a status code of \`200\`. You are seeing the internet in real time!

---

## 10. Knowledge Check
Test your understanding with the quiz questions below!
`,
      questions: [
        {
          id: 'df-net-1',
          question: 'What is the role of the Domain Name System (DNS)?',
          options: [
            'It deletes viruses from your hard drive',
            'It translates human-friendly domain names (e.g. google.com) into machine-routable IP addresses',
            'It turns off your internet router at night',
            'It generates CSS stylesheets automatically'
          ],
          correct_option: 1,
          explanation: 'DNS acts as the internet phonebook, translating easy-to-remember domain names like "stackup.com" into numerical IP addresses like 192.0.2.1.'
        },
        {
          id: 'df-net-2',
          question: 'Why is HTTPS preferred over HTTP for modern websites?',
          options: [
            'HTTPS makes website text appear in capital letters',
            'HTTPS encrypts data in transit, protecting passwords and sensitive info from eavesdroppers',
            'HTTPS works without any internet cables',
            'HTTP only works on smartphones'
          ],
          correct_option: 1,
          explanation: 'The "S" in HTTPS stands for Secure. It uses cryptographic encryption so that attackers intercepting data packets cannot read your passwords, credit cards, or personal data.'
        },
        {
          id: 'df-net-3',
          question: 'What does a "404 Not Found" HTTP response status code mean?',
          options: [
            'The server is completely broken and on fire',
            'The requested webpage or resource does not exist at that specific URL',
            'Your computer has run out of RAM memory',
            'The user needs to enter a credit card'
          ],
          correct_option: 1,
          explanation: '404 is the universal client-error status code indicating that the server cannot locate the requested URL.'
        }
      ],
      externalResources: [
        {
          title: 'MDN Web Docs: How the Web Works',
          provider: 'MDN Web Docs',
          url: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works',
          difficulty: 'Beginner',
          isFree: true
        },
        {
          title: 'Cloudflare Learning: How Does the Internet Work?',
          provider: 'Official Documentation',
          url: 'https://www.cloudflare.com/learning/network-layer/how-does-the-internet-work/',
          difficulty: 'Beginner',
          isFree: true
        }
      ]
    },
    {
      id: 'what-is-programming',
      slug: 'what-is-programming-languages-algorithms',
      title: 'What Is Programming? Code, Algorithms, Compilers & Interpreters',
      description: 'The complete beginner guide to what code is, how algorithms solve problems, and how programming languages talk to computers.',
      estimatedMinutes: 18,
      difficulty: 'Easy',
      companyTags: ['Foundations', 'Programming Logic'],
      keyTakeaways: [
        'Programming is the craft of writing precise step-by-step instructions for a computer to execute.',
        'An algorithm is a recipe or logical procedure for solving a specific problem.',
        'Computers only understand 0s and 1s; programming languages provide a readable syntax for humans.',
        'Compilers translate entire programs before running; interpreters translate and execute line-by-line.'
      ],
      prerequisites: ['How Computers Work: Hardware, Software & Operating Systems'],
      youtube_url: 'https://www.youtube.com/results?search_query=what+is+programming+algorithms+compilers+explained+for+beginners',
      notesMarkdown: `# What Is Programming? Code, Algorithms, Compilers & Interpreters

## 1. What Will You Learn?
You will learn what programming actually is, why we write code, what an algorithm means, and how high-level human words get translated into electricity inside computer chips.

---

## 2. Why Is This Important?
Many people fear programming because they believe it requires genius-level mathematics. In reality, programming is simply structured logic and problem-solving, much like writing a recipe or building with LEGO bricks. Once you understand the core mechanics, learning any programming language becomes approachable.

---

## 3. Prerequisites
None! We start from absolute scratch.

---

## 4. Simple Explanation: What Is Code?
Computers are very fast, but they are also completely literal. They cannot guess what you meant; they only do exactly what you tell them.

**Programming** is writing a list of instructions in a structured language that a computer can read and execute. Each instruction tells the computer to remember a value, perform a calculation, make a decision, or display a result.

---

## 5. Real-World Analogy: A Baking Recipe
Imagine writing instructions to bake a cake for a robot that knows nothing:
- If your recipe says: *"Put eggs in bowl"*, the robot might drop the uncracked eggs with shells into the bowl!
- A programmer must be precise:
  1. Take two eggs from the refrigerator.
  2. Tap the first egg against the bowl rim until cracked.
  3. Separate the shell halves, letting the yolk and whites drop into the bowl.
  4. Discard the shell into the compost bin.
  5. Repeat for the second egg.

That precise, step-by-step procedure is an **Algorithm**.

---

## 6. How Does Human Code Turn Into Computer Action?

\`\`\`
+-------------------------------------------------------------------------+
| High-Level Code (Written by You in Python/JS/C++)                       |
| e.g.  total_price = item_cost * 1.18                                    |
+-------------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------------+
| Compiler or Interpreter (Translator)                                    |
| Converts readable text into low-level machine instructions              |
+-------------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------------+
| Machine Code (Binary: 0s and 1s)                                        |
| 01001000 01100101 01101100 01101100 01101111                            |
+-------------------------------------------------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------------+
| Hardware Execution (CPU registers & logic gates switch voltage)         |
+-------------------------------------------------------------------------+
\`\`\`

### Compiler vs. Interpreter
How does translation happen?
- **Compiler (e.g. C, C++, Rust, Go):** Translates your entire source code file all at once into an executable machine binary (\`.exe\` or native binary) *before* you run it.
  - *Advantage:* Blazing fast execution speed.
  - *Disadvantage:* Must recompile every time you change a single line of code.
- **Interpreter (e.g. Python, JavaScript):** Reads your code line by line at runtime, translating and executing each instruction on the fly.
  - *Advantage:* Instant feedback, beginner-friendly experimentation.
  - *Disadvantage:* Slightly slower raw execution than compiled binaries.

---

## 7. Which Programming Language Should You Learn First?
- **Python:** The #1 beginner language. Syntax reads almost like English (\`if age > 18: print("Welcome")\`). Used in Web Development, Artificial Intelligence, and Automation.
- **JavaScript:** The language of the web. Every browser runs it. Essential if you want to build interactive websites.
- **C / C++:** Closer to the physical hardware. Teaches you how computer memory and pointers work.

---

## 8. Step-by-Step Demonstration: Your First Mental Program
Look at this basic logic:
\`\`\`python
user_name = "Alex"
account_balance = 50
item_price = 30

if account_balance >= item_price:
    account_balance = account_balance - item_price
    print("Purchase successful! New balance: " + str(account_balance))
else:
    print("Insufficient funds! Please add money.")
\`\`\`
*Trace the steps:*
1. The computer creates a memory slot named \`user_name\` holding "Alex".
2. It creates a slot named \`account_balance\` with 50, and \`item_price\` with 30.
3. It evaluates the condition: Is 50 greater than or equal to 30? **Yes (True)**.
4. It subtracts 30 from 50, leaving 20 in \`account_balance\`.
5. It prints: \`Purchase successful! New balance: 20\`.
6. It skips the \`else\` block completely!

---

## 9. Common Beginner Mistakes
- **Expecting instant perfection:** Code rarely works on the first try. Professional engineers spend more than half their time reading error messages and debugging. Errors are not failures; they are hints guiding you to the solution.
- **Memorizing code instead of understanding logic:** You do not need to memorize every command. Real programmers Google syntax, read documentation, and focus on understanding *how to solve the problem*.

---

## 10. Knowledge Check
Test your understanding with the quiz questions below!
`,
      questions: [
        {
          id: 'df-prog-1',
          question: 'What is an algorithm?',
          options: [
            'A physical microchip inside the keyboard',
            'A step-by-step logical procedure or recipe for solving a specific problem',
            'An error message that crashes your computer',
            'A type of computer screen cable'
          ],
          correct_option: 1,
          explanation: 'An algorithm is simply an unambiguous sequence of steps designed to solve a problem or accomplish a specific task.'
        },
        {
          id: 'df-prog-2',
          question: 'What is the main difference between a Compiler and an Interpreter?',
          options: [
            'A compiler translates the entire code into machine language before execution; an interpreter translates and executes line-by-line at runtime',
            'A compiler is only for mobile phones; an interpreter is for desktop computers',
            'An interpreter makes your computer run out of battery',
            'There is no difference; both are synonyms for a text editor'
          ],
          correct_option: 0,
          explanation: 'Compilers (like in C++ or Rust) convert complete source code into native machine binaries beforehand, whereas interpreters (like in Python) translate instructions on the fly.'
        },
        {
          id: 'df-prog-3',
          question: 'Why is Python frequently recommended as a first programming language for beginners?',
          options: [
            'Because it has clean, English-like syntax that allows learners to focus on logic rather than complex punctuation',
            'Because it is the only programming language in existence',
            'Because it does not require a computer to run',
            'Because it never produces error messages'
          ],
          correct_option: 0,
          explanation: 'Python avoids heavy boilerplate and bracket punctuation, letting beginners master core computational thinking concepts cleanly.'
        }
      ],
      externalResources: [
        {
          title: 'Harvard CS50: What is Code and Algorithms?',
          provider: 'Harvard CS50',
          url: 'https://cs50.harvard.edu/x/',
          difficulty: 'Beginner',
          isFree: true
        },
        {
          title: 'Python for Everybody: Introduction to Programming',
          provider: 'freeCodeCamp',
          url: 'https://www.py4e.com/',
          difficulty: 'Beginner',
          isFree: true
        }
      ]
    },
    {
      id: 'developer-setup-basics',
      slug: 'developer-environment-tools-setup',
      title: 'Your Developer Environment: Editors, Terminals & Running Code',
      description: 'Prepare your computer for programming: code editors (VS Code), file extensions, the command-line terminal, and running your first program.',
      estimatedMinutes: 20,
      difficulty: 'Easy',
      companyTags: ['Foundations', 'Developer Tools'],
      keyTakeaways: [
        'A code editor (like VS Code) is a text editor designed for writing code with syntax highlighting and auto-completion.',
        'File extensions (.py, .js, .html) tell the operating system and editor what language the file is written in.',
        'The command-line terminal allows you to control your computer using text commands instead of clicking icons.',
        'Running a program means asking the language runtime (e.g. `python script.py`) to execute your file.'
      ],
      prerequisites: ['What Is Programming? Code, Algorithms, Compilers & Interpreters'],
      youtube_url: 'https://www.youtube.com/results?search_query=vs+code+terminal+setup+for+absolute+beginners+tutorial',
      notesMarkdown: `# Your Developer Environment: Editors, Terminals & Running Code

## 1. What Will You Learn?
In this lesson, you will learn how developers write and run code on their own machines. We will explore Code Editors (specifically Visual Studio Code), how file extensions work, what the Terminal is, and how to execute your very first program.

---

## 2. Why Is This Important?
Writing code in Microsoft Word or Apple Notes does not work—they add hidden font formatting and curly quotes that break computers. Real software engineers use specialized developer tools. Setting up your developer environment is your official initiation into the world of technology.

---

## 3. Prerequisites
Completion of **What Is Programming? Code, Algorithms, Compilers & Interpreters**.

---

## 4. Simple Explanation: The Developer's Toolkit
A developer's daily workstation relies on three core tools:
1. **The Code Editor:** A clean program where you write and edit code text. The industry standard is **VS Code (Visual Studio Code)** by Microsoft, which is completely free.
2. **The Terminal (Command Line):** A text-based window where you can navigate folders, run programs, and install software by typing short commands.
3. **The Language Runtime / Compiler:** The software engine (like Python or Node.js) that reads your code file and executes it.

---

## 5. Real-World Analogy: The Writer's Desk
Think of a traditional author:
- The **Code Editor** is your specialized typewriter. It gives you line numbers, highlights grammar in different colors, and catches typos.
- The **Terminal** is your courier. You give it a typed instruction (*"Take this manuscript to the printer"*), and it executes the delivery immediately without you having to walk there.
- The **Runtime** is the printing press that takes your words and turns them into a printed, readable book.

---

## 6. Understanding File Extensions
A file extension is the suffix at the end of a filename after the dot (\`.\`). It tells the computer which program knows how to read it:
- \`index.html\` &rarr; Web page structure (read by web browsers).
- \`style.css\` &rarr; Visual design and colors (Cascading Style Sheets).
- \`script.js\` &rarr; JavaScript code for web interactivity.
- \`main.py\` &rarr; Python source code.
- \`app.cpp\` &rarr; C++ source code.

*Tip:* By default, Windows hides file extensions. In Windows File Explorer, click **View &rarr; Show &rarr; File name extensions** so you always see the full filename!

---

## 7. The 5 Terminal Commands Every Beginner Must Know
Whether on Windows (PowerShell), macOS, or Linux, the terminal lets you navigate your folders with text commands:

| Command | What it stands for | What it does | Example |
| :--- | :--- | :--- | :--- |
| **\`pwd\`** | *Print Working Directory* | Shows what folder you are currently inside | \`pwd\` |
| **\`ls\`** (or \`dir\`) | *List* | Lists all files and folders inside your current location | \`ls\` |
| **\`cd\`** | *Change Directory* | Moves into another folder | \`cd Documents\` |
| **\`cd ..\`** | *Change Directory Up* | Moves back up one folder level | \`cd ..\` |
| **\`mkdir\`** | *Make Directory* | Creates a brand-new folder | \`mkdir my-first-project\` |

---

## 8. Step-by-Step Guide: Running Your First Program
Let's trace how you run a Python program:
1. Open your terminal or VS Code.
2. Create a project folder:
   \`\`\`bash
   mkdir hello-world
   cd hello-world
   \`\`\`
3. Create a file named \`app.py\` with this line inside:
   \`\`\`python
   print("Hello, World! I am officially a programmer.")
   \`\`\`
4. Run the file by typing:
   \`\`\`bash
   python app.py
   \`\`\`
5. The terminal prints:
   \`\`\`
   Hello, World! I am officially a programmer.
   \`\`\`
Congratulations! You have written and executed code.

---

## 9. Hands-On Exercise
Try running code right here in StackUp! Head over to the **Practice / Coding Workspace** in the top navigation bar. Select Python or JavaScript, type \`print(2026 + 10)\`, and click **Run Code**. You will see the computer calculate and print \`2036\` in under a second!

---

## 10. Knowledge Check
Test your understanding with the quiz questions below!
`,
      questions: [
        {
          id: 'df-tool-1',
          question: 'Why do programmers write code in dedicated code editors (like VS Code) instead of Microsoft Word?',
          options: [
            'Word processors insert hidden rich text styling and smart quotes that break computer code syntax',
            'Code editors are only available on supercomputers',
            'Microsoft Word is illegal to use for programming',
            'Code editors can only write in black and white'
          ],
          correct_option: 0,
          explanation: 'Word processors format text with proprietary fonts, margins, and curved punctuation that cause syntax errors. Code editors save raw, unformatted plain text and provide syntax highlighting.'
        },
        {
          id: 'df-tool-2',
          question: 'What does the terminal command "cd" stand for?',
          options: [
            'Compact Disk',
            'Change Directory (move into another folder)',
            'Computer Diagnostics',
            'Copy Document'
          ],
          correct_option: 1,
          explanation: '"cd" stands for Change Directory. It is the universal command used to navigate between folders in the command-line interface.'
        },
        {
          id: 'df-tool-3',
          question: 'If you have a file named "calculator.py", what does the ".py" extension indicate?',
          options: [
            'It is a Photoshop graphic file',
            'It is a Python source code file',
            'It is a printed document',
            'It is an audio file'
          ],
          correct_option: 1,
          explanation: 'The ".py" file extension identifies the file as Python code, signaling to the OS and code editor to run it using the Python interpreter.'
        }
      ],
      externalResources: [
        {
          title: 'Visual Studio Code: Getting Started Documentation',
          provider: 'Official Documentation',
          url: 'https://code.visualstudio.com/docs',
          difficulty: 'Beginner',
          isFree: true
        },
        {
          title: 'The Command Line for Beginners — freeCodeCamp',
          provider: 'freeCodeCamp',
          url: 'https://www.freecodecamp.org/news/command-line-for-beginners/',
          difficulty: 'Beginner',
          isFree: true
        }
      ]
    }
  ]
};
