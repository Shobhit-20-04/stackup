import type { SectionCategory } from './types';

export const PROGRAMMING_FUNDAMENTALS_CATEGORY: SectionCategory = {
  id: 'programming-fundamentals',
  slug: 'programming-fundamentals',
  title: 'Programming Fundamentals & Logic Building',
  description: 'Master core programming thinking: variables, data types, conditionals, loops, functions, and collections using clean Python and JavaScript examples.',
  icon: 'Code2',
  topics: [
    {
      id: 'variables-and-data-types',
      slug: 'variables-data-types-memory-boxes',
      title: 'Variables & Data Types: How Code Remembers Information',
      description: 'Understand variables as labeled storage boxes, primitive data types (integers, floats, strings, booleans), and naming conventions.',
      estimatedMinutes: 16,
      difficulty: 'Easy',
      companyTags: ['Foundations', 'Programming Logic'],
      keyTakeaways: [
        'A variable is a labeled container in memory holding a value that can be read or changed.',
        'Primary data types include integers (whole numbers), floats (decimals), strings (text), and booleans (true/false).',
        'Variables must have descriptive names using conventions like snake_case (Python) or camelCase (JavaScript).',
        'Types dictate what operations are valid (e.g. you can add two numbers, but cannot subtract a word from a number).'
      ],
      prerequisites: ['What Is Programming? Code, Algorithms, Compilers & Interpreters'],
      youtube_url: 'https://www.youtube.com/results?search_query=variables+and+data+types+programming+for+beginners+python',
      notesMarkdown: `# Variables & Data Types: How Code Remembers Information

## 1. What Will You Learn?
You will learn how programs store and remember data using variables, what the fundamental data types are (numbers, text, and true/false states), and how to avoid type errors.

---

## 2. Why Is This Important?
Without variables, programs would have no memory. A video game would not remember your player score, an e-commerce website would forget what is in your shopping cart, and a banking app could not track your balance. Variables are the building blocks of all logic.

---

## 3. Prerequisites
Completion of **What Is Programming? Code, Algorithms, Compilers & Interpreters**.

---

## 4. Simple Explanation (Plain Language)
Think of a variable as a **labeled cardboard box** in your computer's memory.
- The **label** on the box is the variable's name (e.g. \`player_name\` or \`user_age\`).
- The **item inside** the box is the value (e.g. \`"Sarah"\` or \`24\`).
- When you want to see what is inside, you reference the label. When you want to put something new inside, you assign it with the \`=\` operator.

---

## 5. Real-World Analogy: Labeled Jars in a Pantry
Imagine glass jars on a kitchen shelf:
- One jar is labeled \`sugar\`. You fill it with white sugar.
- Another jar is labeled \`cookies_count\`. It holds the number \`12\`.
- If someone eats two cookies, you cross out 12 and write \`10\`. The label stays the same, but the value inside changes. That is why it is called a *variable*—its content varies!

---

## 6. Technical Explanation: The Core Data Types
Every programming language categorizes values into **types**:

| Type Name | What It Represents | Python Example | JavaScript Example |
| :--- | :--- | :--- | :--- |
| **Integer (\`int\`)** | Whole numbers without decimals | \`score = 150\` | \`let score = 150;\` |
| **Float (\`float\`)** | Numbers with fractional decimal points | \`price = 19.99\` | \`let price = 19.99;\` |
| **String (\`str\`)** | Text characters enclosed in quotes | \`name = "Maya"\` | \`let name = "Maya";\` |
| **Boolean (\`bool\`)** | Binary logical state: Yes or No | \`is_active = True\` | \`let isActive = true;\` |

\`\`\`
Computer Memory (RAM):
+--------------------+------------------------+--------------------+
| Address: 0x10A     | Address: 0x110         | Address: 0x118     |
| Name: "user_age"   | Name: "account_balance"| Name: "user_name"  |
| Type: Integer      | Type: Float            | Type: String       |
| Value: [ 25 ]      | Value: [ 104.50 ]      | Value: [ "Priya" ] |
+--------------------+------------------------+--------------------+
\`\`\`

---

## 7. How Variable Assignment Works
The \`=\` symbol in programming does **not** mean algebraic equality. It means **assignment**: *"Take the value on the right, and store it into the variable on the left."*

\`\`\`python
# Storing initial value
gems = 10

# Adding 5 more gems
gems = gems + 5  # Evaluates (10 + 5 = 15), then puts 15 into gems
print(gems)      # Output: 15
\`\`\`

---

## 8. Common Variable Naming Rules
1. Must start with a letter (or underscore). Cannot start with a number (\`user1\` is valid; \`1user\` will cause an error).
2. Cannot contain spaces (use \`student_score\` or \`studentScore\`).
3. Case-sensitive: \`age\`, \`Age\`, and \`AGE\` are three completely separate variables!
4. **Style Guide:**
   - **Python:** Uses \`snake_case\` (e.g. \`total_items_in_cart\`).
   - **JavaScript / Java / C++:** Uses \`camelCase\` (e.g. \`totalItemsInCart\`).

---

## 9. Hands-On Exercise
Predict what this code will output:
\`\`\`python
first_name = "Alex"
age = 20
age = age + 1
is_enrolled = True

print(first_name + " is " + str(age) + " years old.")
\`\`\`
*Answer:* \`Alex is 21 years old.\`
Notice that \`age\` changed from 20 to 21 when we re-assigned it.

---

## 10. Common Mistakes & Misconceptions
- **Type Mismatch Error:** Trying to add a number to text without conversion:
  \`\`\`python
  # BAD - Causes a TypeError:
  "Total: " + 50
  # GOOD:
  "Total: " + str(50)  # Output: "Total: 50"
  \`\`\`
- **Using quotes on numbers:** \`"25"\` is a String (text), while \`25\` is an Integer. If you do \`"25" + "25"\`, the computer glues the text together to produce \`"2525"\`, not \`50\`!

---

## 11. Knowledge Check
Test your understanding with the quiz questions below!
`,
      questions: [
        {
          id: 'pf-var-1',
          question: 'What does the single equals sign (=) mean in programming?',
          options: [
            'It checks if two values are equal in mathematics',
            'It assigns the value on the right into the variable container on the left',
            'It deletes the variable from memory',
            'It prints the value to the screen'
          ],
          correct_option: 1,
          explanation: 'In code, "=" is the assignment operator. It evaluates the expression on the right-hand side and saves the resulting value into the variable on the left.'
        },
        {
          id: 'pf-var-2',
          question: 'What is the output of the expression: "10" + "20" (both in quotes)?',
          options: [
            '30',
            '"1020"',
            'An error',
            '10'
          ],
          correct_option: 1,
          explanation: 'Because both values are Strings (enclosed in quotes), the "+" operator performs string concatenation (glueing text together), resulting in "1020".'
        },
        {
          id: 'pf-var-3',
          question: 'Which of the following is an example of a Boolean data type?',
          options: [
            '"True"',
            'True',
            '42.5',
            '0'
          ],
          correct_option: 1,
          explanation: 'A Boolean is a primitive binary state that can only be True or False (without quotes). "True" in quotes is a String.'
        }
      ],
      externalResources: [
        {
          title: 'W3Schools: Python Variables & Data Types',
          provider: 'W3Schools',
          url: 'https://www.w3schools.com/python/python_variables.asp',
          difficulty: 'Beginner',
          isFree: true
        },
        {
          title: 'MDN Web Docs: JavaScript Grammar and Types',
          provider: 'MDN Web Docs',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types',
          difficulty: 'Beginner',
          isFree: true
        }
      ]
    },
    {
      id: 'control-flow-conditionals',
      slug: 'conditionals-decision-making-if-else',
      title: 'Conditionals & Decision Making: If, Else If & Else',
      description: 'Teach programs how to make choices: comparison operators, logical operators (AND/OR/NOT), if-elif-else branching, and real-world decision trees.',
      estimatedMinutes: 18,
      difficulty: 'Easy',
      companyTags: ['Foundations', 'Programming Logic'],
      keyTakeaways: [
        'Conditionals allow code to execute different instructions based on whether a condition is True or False.',
        'Comparison operators (==, !=, <, >, <=, >=) test relationships between values.',
        'Logical operators (and, or, not) combine multiple conditions together.',
        'An if-elif-else chain checks conditions from top to bottom and runs only the first matching branch.'
      ],
      prerequisites: ['Variables & Data Types: How Code Remembers Information'],
      youtube_url: 'https://www.youtube.com/results?search_query=if+else+conditionals+programming+for+beginners+python',
      notesMarkdown: `# Conditionals & Decision Making: If, Else If & Else

## 1. What Will You Learn?
You will learn how to make your programs intelligent by giving them the ability to make decisions. You will master \`if\`, \`else\`, and \`elif\` (else if) structures, comparison operators, and logical operators.

---

## 2. Why Is This Important?
Without decision-making, a program can only run the exact same sequence of instructions top-to-bottom every time. Conditionals are what allow YouTube to show you a video if you are logged in, or ask you to sign up if you are not. Every login check, game rule, and recommendation relies on conditionals.

---

## 3. Prerequisites
Understanding **Variables & Data Types**.

---

## 4. Simple Explanation & Real-World Analogy: Fork in the Road
Imagine you are walking down a path:
- **IF** it is raining, you open your umbrella.
- **ELSE IF** it is very sunny, you wear sunglasses.
- **ELSE** (it is cloudy), you just walk normally.

You only perform one of these actions depending on the weather. That is exactly how computers evaluate conditions.

---

## 5. Comparison Operators
To compare two numbers or text values, we use comparison operators that always evaluate to either \`True\` or \`False\`:

| Operator | Meaning | Example | Result |
| :--- | :--- | :--- | :--- |
| **\`==\`** | Is equal to? | \`5 == 5\` | \`True\` |
| **\`!=\`** | Is NOT equal to? | \`5 != 3\` | \`True\` |
| **\`>\`** | Greater than | \`10 > 20\` | \`False\` |
| **\`<\`** | Less than | \`10 < 20\` | \`True\` |
| **\`>=\`** | Greater than or equal to | \`18 >= 18\` | \`True\` |
| **\`<=\`** | Less than or equal to | \`15 <= 10\` | \`False\` |

*Crucial Note:* Single \`=\` is for assignment (\`x = 5\`); double \`==\` is for comparison (\`if x == 5\`).

---

## 6. Logical Operators: Combining Conditions
What if you need to check two things at the same time?
- **\`and\` (Both must be True):**
  \`\`\`python
  if user_has_ticket and has_id_proof:
      print("Allowed into stadium")
  \`\`\`
- **\`or\` (At least one must be True):**
  \`\`\`python
  if is_weekend or is_holiday:
      print("Can sleep in late!")
  \`\`\`
- **\`not\` (Flips True to False, or False to True):**
  \`\`\`python
  if not is_game_over:
      print("Continue playing...")
  \`\`\`

---

## 7. Step-by-Step Code Walkthrough: Grading System
\`\`\`python
exam_score = 85

if exam_score >= 90:
    grade = "A+"
elif exam_score >= 80:
    grade = "A"
elif exam_score >= 70:
    grade = "B"
elif exam_score >= 60:
    grade = "C"
else:
    grade = "Needs Improvement"

print("Your final grade is: " + grade)
\`\`\`
*How the computer reads this:*
1. Checks \`exam_score >= 90\` &rarr; Is 85 >= 90? **False**. Moves to next branch.
2. Checks \`exam_score >= 80\` &rarr; Is 85 >= 80? **True**!
3. Assigns \`grade = "A"\`.
4. It immediately skips the rest of the \`elif\` and \`else\` branches!
5. Prints: \`Your final grade is: A\`.

---

## 8. Common Mistakes
- **Using \`=\` instead of \`==\` in an if statement:**
  \`\`\`python
  # SYNTAX ERROR in Python:
  if age = 18:
  # CORRECT:
  if age == 18:
  \`\`\`
- **Indentation errors:** In Python, the code inside an \`if\` statement must be indented (typically 4 spaces or 1 tab).

---

## 9. Knowledge Check
Test your understanding with the quiz questions below!
`,
      questions: [
        {
          id: 'pf-cond-1',
          question: 'What is the difference between = and == in programming?',
          options: [
            'There is no difference',
            '= assigns a value to a variable; == compares two values to see if they are equal',
            '== creates a new variable; = deletes a variable',
            '= is only used in Python; == is only used in C++'
          ],
          correct_option: 1,
          explanation: '"=" is the assignment operator (stores a value), while "==" is the equality comparison operator (returns True or False).'
        },
        {
          id: 'pf-cond-2',
          question: 'If is_admin is False and has_passcode is True, what does (is_admin or has_passcode) evaluate to?',
          options: [
            'False',
            'True',
            'None',
            'Error'
          ],
          correct_option: 1,
          explanation: 'The "or" operator evaluates to True if at least one of the conditions is True. Since has_passcode is True, the result is True.'
        },
        {
          id: 'pf-cond-3',
          question: 'In an if-elif-else block, when does the "else" branch run?',
          options: [
            'Always, regardless of conditions',
            'Only when all preceding if and elif conditions evaluated to False',
            'Before any if conditions are checked',
            'Only on Tuesdays'
          ],
          correct_option: 1,
          explanation: 'The "else" branch is the final fallback; it executes only if none of the preceding if or elif conditions matched.'
        }
      ],
      externalResources: [
        {
          title: 'W3Schools: Python If...Else Statements',
          provider: 'W3Schools',
          url: 'https://www.w3schools.com/python/python_conditions.asp',
          difficulty: 'Beginner',
          isFree: true
        },
        {
          title: 'Harvard CS50: Conditionals and Boolean Expressions',
          provider: 'Harvard CS50',
          url: 'https://cs50.harvard.edu/x/',
          difficulty: 'Beginner',
          isFree: true
        }
      ]
    },
    {
      id: 'loops-and-iteration',
      slug: 'loops-and-iteration-for-while',
      title: 'Loops & Iteration: Automating Repetitive Tasks',
      description: 'Learn how to automate tasks with while loops and for loops, avoid infinite loops, loop through lists, and use break and continue.',
      estimatedMinutes: 18,
      difficulty: 'Easy',
      companyTags: ['Foundations', 'Programming Logic'],
      keyTakeaways: [
        'Loops repeat a block of code multiple times without needing to write duplicate code.',
        'A for loop repeats a specific number of times or iterates over items in a collection.',
        'A while loop repeats as long as a certain condition remains True.',
        'Infinite loops occur when a loop condition never becomes False; always ensure an exit path.'
      ],
      prerequisites: ['Conditionals & Decision Making: If, Else If & Else'],
      youtube_url: 'https://www.youtube.com/results?search_query=loops+for+while+programming+explained+simply+for+beginners',
      notesMarkdown: `# Loops & Iteration: Automating Repetitive Tasks

## 1. What Will You Learn?
You will learn how to make computers do what they do best: perform repetitive work millions of times without getting tired or making human careless errors. You will master \`for\` loops, \`while\` loops, counters, and loop control.

---

## 2. Why Is This Important?
If you needed to send an email to 10,000 customers, writing 10,000 lines of code would take weeks. With a loop, you write 3 lines of code, and the computer processes all 10,000 in seconds. Loops are the engine of data processing and automation.

---

## 3. Prerequisites
Variables, Data Types, and Conditionals.

---

## 4. Simple Explanation
A loop says: *"Keep doing this task until I tell you to stop."*
There are two main types of loops:
1. **\`for\` loop (Known count or items):** *"For every item in this grocery list, put it in the cart."*
2. **\`while\` loop (Condition-based):** *"While my water glass is not full, keep pouring water."*

---

## 5. Real-World Analogy: Doing Push-Ups
Imagine your gym trainer says:
- *"Do 10 push-ups."* &rarr; You count 1, 2, 3 ... up to 10, then stop. (This is a \`for\` loop: you know the target count).
- *"Keep doing push-ups until the whistle blows."* &rarr; You keep going. After each push-up, you check: Did the whistle blow? If no, do another. (This is a \`while\` loop: you stop when a condition changes).

---

## 6. The \`for\` Loop in Action
In Python, \`range(start, end)\` generates numbers:
\`\`\`python
# Count from 1 to 5
for number in range(1, 6):
    print("Lap number: " + str(number))

print("Race finished!")
\`\`\`
*Output:*
\`\`\`
Lap number: 1
Lap number: 2
Lap number: 3
Lap number: 4
Lap number: 5
Race finished!
\`\`\`

---

## 7. The \`while\` Loop and the Danger of Infinite Loops
A \`while\` loop runs as long as its condition is \`True\`:
\`\`\`python
countdown = 3

while countdown > 0:
    print(countdown)
    countdown = countdown - 1  # Crucial! Decreases the counter

print("Blast off! 🚀")
\`\`\`

### ⚠️ What Is an Infinite Loop?
If you forget to change the variable inside the loop:
\`\`\`python
# DANGEROUS CODE:
count = 1
while count > 0:
    print("This will run forever!")
    # count is never changed, so count > 0 is ALWAYS True!
\`\`\`
Your computer fans will spin fast, memory usage will spike, and the program will freeze. Always make sure your loop has a way to finish!

---

## 8. Loop Control: \`break\` and \`continue\`
- **\`break\` (Emergency Stop):** Exits the loop immediately.
  \`\`\`python
  for num in [1, 2, 3, 4, 5]:
      if num == 3:
          break  # Stops the entire loop when it hits 3
      print(num)
  # Output: 1, 2
  \`\`\`
- **\`continue\` (Skip this turn):** Skips the rest of the current turn and jumps to the next iteration.
  \`\`\`python
  for num in [1, 2, 3, 4, 5]:
      if num == 3:
          continue  # Skips 3, but continues with 4 and 5
      print(num)
  # Output: 1, 2, 4, 5
  \`\`\`

---

## 9. Knowledge Check
Test your understanding with the quiz questions below!
`,
      questions: [
        {
          id: 'pf-loop-1',
          question: 'What is an infinite loop and why should you avoid it?',
          options: [
            'A loop that plays audio infinitely',
            'A loop whose exit condition is never reached, causing the program to freeze or consume CPU indefinitely',
            'A loop that solves all math problems automatically',
            'A loop that runs on both Mac and Windows'
          ],
          correct_option: 1,
          explanation: 'An infinite loop repeats endlessly because its stopping condition is never satisfied, freezing the program.'
        },
        {
          id: 'pf-loop-2',
          question: 'What does the "break" statement do inside a loop?',
          options: [
            'Pauses the computer for 5 seconds',
            'Terminates the loop immediately and jumps to the code following the loop',
            'Restarts the computer',
            'Prints an error message'
          ],
          correct_option: 1,
          explanation: '"break" forces an immediate early exit from the nearest enclosing loop.'
        },
        {
          id: 'pf-loop-3',
          question: 'How many times will this loop execute: for i in range(0, 5)?',
          options: [
            '4 times',
            '5 times (0, 1, 2, 3, 4)',
            '6 times',
            'Infinite times'
          ],
          correct_option: 1,
          explanation: 'range(0, 5) generates values starting at 0 up to, but not including, 5: [0, 1, 2, 3, 4], which is exactly 5 iterations.'
        }
      ],
      externalResources: [
        {
          title: 'W3Schools: Python For Loops',
          provider: 'W3Schools',
          url: 'https://www.w3schools.com/python/python_for_loops.asp',
          difficulty: 'Beginner',
          isFree: true
        },
        {
          title: 'freeCodeCamp: JavaScript While & For Loops Guide',
          provider: 'freeCodeCamp',
          url: 'https://www.freecodecamp.org/news/javascript-loops-explained-for-while-do-while/',
          difficulty: 'Beginner',
          isFree: true
        }
      ]
    },
    {
      id: 'functions-and-modularity',
      slug: 'functions-reusable-code-blocks',
      title: 'Functions: Writing Reusable, Modular Code',
      description: 'Learn how to define functions, pass arguments, return values, understand variable scope, and follow the DRY (Do not Repeat Yourself) principle.',
      estimatedMinutes: 20,
      difficulty: 'Easy',
      companyTags: ['Foundations', 'Programming Logic'],
      keyTakeaways: [
        'A function is a named, reusable block of code designed to perform a specific task.',
        'Parameters (inputs) allow you to pass custom data into a function.',
        'The return statement sends the calculated result back to the caller.',
        'Scope defines where variables are accessible: local variables inside a function cannot be accessed outside.'
      ],
      prerequisites: ['Variables & Data Types: How Code Remembers Information'],
      youtube_url: 'https://www.youtube.com/results?search_query=functions+in+python+programming+explained+for+beginners',
      notesMarkdown: `# Functions: Writing Reusable, Modular Code

## 1. What Will You Learn?
You will learn how professional engineers avoid writing the same code over and over again. You will master functions: how to define them, pass information into them, and receive results back.

---

## 2. Why Is This Important?
One of the most sacred rules in software engineering is **DRY: Don't Repeat Yourself**. If you write the same 10 lines of code in 5 different places and find a bug, you have to fix it 5 times. By wrapping those 10 lines into a function, you write it once, test it once, and reuse it everywhere.

---

## 3. Prerequisites
Variables, Conditionals, and basic operators.

---

## 4. Simple Explanation & Real-World Analogy: A Vending Machine
Think of a function like a **vending machine**:
1. **Input (Arguments):** You insert $2.00 and press button B4.
2. **Internal Process:** The machine rotates the coil and dispenses the item.
3. **Output (Return Value):** The cold soda bottle drops into your hand.

You do not need to understand the gears or motors inside the vending machine; you only care about what goes in and what comes out.

---

## 5. Anatomy of a Function

\`\`\`python
# 1. Defining the function (the recipe)
def calculate_tax(subtotal, tax_rate):
    tax_amount = subtotal * tax_rate
    return tax_amount

# 2. Calling the function (using the recipe)
item_tax = calculate_tax(100, 0.08)
print("Tax owed: $" + str(item_tax))  # Output: Tax owed: $8.0
\`\`\`

- **\`def\` keyword:** Tells Python: *"I am creating a new function."*
- **Function Name (\`calculate_tax\`):** The label used to call it later.
- **Parameters (\`subtotal, tax_rate\`):** Placeholders for the inputs.
- **\`return\` statement:** Sends the answer back to whoever called the function.

---

## 6. Return vs. Print: A Critical Distinction
Many beginners confuse \`print()\` and \`return\`:
- **\`print()\`** shows text on your monitor screen for a human to read. The computer cannot use printed text in further calculations.
- **\`return\`** passes the actual value back to your program so another calculation can use it!

\`\`\`python
def add_with_print(a, b):
    print(a + b)

def add_with_return(a, b):
    return a + b

# Using the result:
result1 = add_with_print(5, 5)   # Prints 10, but result1 is None!
# result1 * 2 would CRASH with an error!

result2 = add_with_return(5, 5)  # result2 holds the number 10
total = result2 * 2              # Works perfectly! total is 20
\`\`\`

---

## 7. Variable Scope (Local vs. Global)
Variables created inside a function are **local** to that function. They are born when the function runs and disappear when it finishes:

\`\`\`python
def prepare_greeting():
    secret_code = "ABC-123"  # Local variable
    return "Welcome!"

prepare_greeting()
# print(secret_code)  # ERROR! secret_code does not exist out here.
\`\`\`

---

## 8. Knowledge Check
Test your understanding with the quiz questions below!
`,
      questions: [
        {
          id: 'pf-func-1',
          question: 'What is the primary purpose of writing functions in code?',
          options: [
            'To make code run without needing electricity',
            'To write reusable, modular blocks of logic that avoid code duplication (DRY principle)',
            'To rename files on your hard drive',
            'To force the user to restart the browser'
          ],
          correct_option: 1,
          explanation: 'Functions bundle reusable logic into named units, making programs clean, modular, and easy to maintain.'
        },
        {
          id: 'pf-func-2',
          question: 'What is the difference between print() and return in a function?',
          options: [
            'print() is for Python, return is for C++',
            'print() displays text on the screen for humans; return sends data back to the program for further calculation',
            'return crashes the computer; print() saves the file',
            'There is no difference'
          ],
          correct_option: 1,
          explanation: 'print() is purely an output side-effect for human eyes. return hands the computed value back to caller variables in code.'
        },
        {
          id: 'pf-func-3',
          question: 'What happens to a variable created inside a function after the function finishes running?',
          options: [
            'It is permanently saved to your desktop',
            'Its local memory is cleaned up and it cannot be accessed from outside the function',
            'It becomes a global variable accessible everywhere',
            'It is emailed to the developer'
          ],
          correct_option: 1,
          explanation: 'Variables defined inside a function have local scope; they only exist during the execution of that specific function call.'
        }
      ],
      externalResources: [
        {
          title: 'Python Official Tutorial: Defining Functions',
          provider: 'Official Documentation',
          url: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions',
          difficulty: 'Beginner',
          isFree: true
        },
        {
          title: 'MDN Web Docs: Functions in JavaScript',
          provider: 'MDN Web Docs',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions',
          difficulty: 'Beginner',
          isFree: true
        }
      ]
    },
    {
      id: 'lists-and-dictionaries',
      slug: 'collections-lists-arrays-dictionaries',
      title: 'Collections: Lists, Arrays & Dictionaries',
      description: 'Group and organize data: ordered lists (arrays), zero-based indexing, appending, and key-value dictionaries (hash maps).',
      estimatedMinutes: 20,
      difficulty: 'Easy',
      companyTags: ['Foundations', 'Programming Logic'],
      keyTakeaways: [
        'A list (or array) is an ordered collection of values accessed by a numerical index.',
        'Computer indexing is zero-based: the first item is at index 0, not index 1.',
        'A dictionary (or object/hash map) stores pairs of keys and values for lightning-fast lookup by name.',
        'Collections can hold numbers, strings, booleans, or even other collections nested inside.'
      ],
      prerequisites: ['Variables & Data Types: How Code Remembers Information'],
      youtube_url: 'https://www.youtube.com/results?search_query=python+lists+and+dictionaries+for+beginners+tutorial',
      notesMarkdown: `# Collections: Lists, Arrays & Dictionaries

## 1. What Will You Learn?
So far, each variable has held only one piece of data at a time. In this lesson, you will learn how to store hundreds or thousands of items together in **Lists** (ordered sequences) and **Dictionaries** (key-value address books).

---

## 2. Why Is This Important?
Real-world software deals with collections: a Spotify playlist of songs, an Instagram feed of photos, or an online store inventory of products. Lists and dictionaries are the bread and butter of all data structures.

---

## 3. Prerequisites
Variables and Data Types.

---

## 4. Simple Explanation & Real-World Analogy: Lists vs. Dictionaries
1. **List (Array):** An ordered checklist numbered from 0. Like a grocery list where item #0 is milk, #1 is eggs, and #2 is bread.
2. **Dictionary (Key-Value Map):** An address book. Instead of looking up by a number, you look up by a **key** (a name). For example, looking up \`"email"\` gives you \`"user@example.com"\`.

---

## 5. Working with Lists & Zero-Based Indexing
In programming, we count starting from **0**, not 1:

\`\`\`python
# Creating a list of fruits
fruits = ["Apple", "Banana", "Cherry", "Mango"]

# Accessing by index:
print(fruits[0])  # Prints: Apple (the first item!)
print(fruits[1])  # Prints: Banana
print(fruits[3])  # Prints: Mango

# Adding an item:
fruits.append("Orange")

# Checking length:
print(len(fruits))  # Output: 5
\`\`\`

\`\`\`
Index:       0          1          2          3          4
Value:   ["Apple",  "Banana",  "Cherry",  "Mango",   "Orange"]
\`\`\`

---

## 6. Working with Dictionaries (Key-Value Pairs)
A dictionary pairs a **Key** with a **Value**:

\`\`\`python
# Creating a student profile dictionary
student = {
    "name": "Priya Sharma",
    "major": "Computer Science",
    "year": 2,
    "gpa": 3.85,
    "is_graduated": False
}

# Accessing a value by key:
print(student["name"])   # Output: Priya Sharma
print(student["gpa"])    # Output: 3.85

# Updating a value:
student["year"] = 3

# Adding a new key-value pair:
student["city"] = "Bangalore"
\`\`\`

---

## 7. Looping Through Collections
Combining loops with collections gives you immense power:
\`\`\`python
scores = [88, 92, 79, 95, 100]
total = 0

for s in scores:
    total = total + s

average = total / len(scores)
print("Class Average: " + str(average))  # Output: 90.8
\`\`\`

---

## 8. Common Mistakes
- **IndexError: list index out of range:** If a list has 3 items (indices 0, 1, 2), trying to access \`fruits[3]\` will crash because there is no 4th item! Always remember that the last item index is \`length - 1\`.
- **KeyError:** Trying to access a dictionary key that does not exist (\`student["phone_number"]\`). You can safely check using \`student.get("phone_number")\`.

---

## 9. Knowledge Check
Test your understanding with the quiz questions below!
`,
      questions: [
        {
          id: 'pf-list-1',
          question: 'If a list has 4 elements: colors = ["red", "blue", "green", "yellow"], what is colors[0]?',
          options: [
            '"blue"',
            '"red"',
            '"yellow"',
            '0'
          ],
          correct_option: 1,
          explanation: 'In zero-based indexing used by Python and JavaScript, index 0 references the very first element in the list, which is "red".'
        },
        {
          id: 'pf-list-2',
          question: 'How does a dictionary store and retrieve information?',
          options: [
            'Using alphabetical page numbers',
            'Using Key-Value pairs, allowing retrieval of values by their unique key name',
            'By deleting values randomly',
            'Only through audio commands'
          ],
          correct_option: 1,
          explanation: 'Dictionaries (or hash maps) associate unique keys (like "username") with values (like "alex99"), enabling rapid lookup by key name.'
        },
        {
          id: 'pf-list-3',
          question: 'What error occurs if you try to access my_list[5] on a list containing only 3 items?',
          options: [
            'SyntaxError',
            'IndexError (out of range)',
            'MemoryError',
            'NetworkError'
          ],
          correct_option: 1,
          explanation: 'An IndexError is raised when attempting to access a sequence subscript that is out of range of existing items.'
        }
      ],
      externalResources: [
        {
          title: 'W3Schools: Python Lists Guide',
          provider: 'W3Schools',
          url: 'https://www.w3schools.com/python/python_lists.asp',
          difficulty: 'Beginner',
          isFree: true
        },
        {
          title: 'W3Schools: Python Dictionaries Guide',
          provider: 'W3Schools',
          url: 'https://www.w3schools.com/python/python_dictionaries.asp',
          difficulty: 'Beginner',
          isFree: true
        }
      ]
    }
  ]
};
