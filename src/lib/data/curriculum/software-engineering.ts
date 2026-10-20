import type { SectionCategory } from './types';

export const OOPS_CATEGORY: SectionCategory = {
  "id": "oops",
  "slug": "object-oriented-programming",
  "title": "OOPs & Design Patterns",
  "description": "The 4 OOP pillars, SOLID design principles, Singleton, Factory, Observer, and inheritance mechanisms.",
  "icon": "Code2",
  "topics": [
    {
      "id": "oops-pillars",
      "slug": "four-pillars-of-oops",
      "title": "The 4 Pillars of OOP & Polymorphism",
      "description": "Encapsulation, Abstraction, Inheritance, Compile-time vs Runtime Polymorphism, and Virtual Tables.",
      "estimatedMinutes": 18,
      "notesMarkdown": "# The 4 Pillars of Object-Oriented Programming & Polymorphic Dispatch\n\nObject-Oriented Programming (OOP) is an architectural paradigm that structures software as networks of collaborating objects encapsulating state, behavior, and identity.\n\n---\n\n## 1. Architectural Overview & The 4 Pillars\n\n```\n+--------------------------------------------------------------------------+\n|                        THE 4 FOUNDATIONAL PILLARS                        |\n+--------------------------------------------------------------------------+\n| 1. Encapsulation   | Data hiding + bundling data with operations         |\n| 2. Abstraction     | Contract definitions; hiding procedural complexity  |\n| 3. Inheritance     | Subtyping (\"IS-A\") and behavioral specialization    |\n| 4. Polymorphism    | Dynamic dispatch; unified interfaces for behaviors  |\n+--------------------------------------------------------------------------+\n```\n\n### Pillar 1: Encapsulation (Information Hiding)\nEncapsulation groups mutable state together with the operations permitted to mutate that state, restricting direct external mutation through explicit access boundaries (`private`, `protected`, `public`, `package-private`).\n\n- **Internal Invariant Protection:** External callers cannot place an entity into an invalid state (e.g., negative balance, invalid date).\n- **Access Modifiers Contract:**\n  - `private`: Accessible exclusively within the lexical scope of the defining class.\n  - `protected`: Accessible within defining class, derived subclasses, and same-package units.\n  - `public`: Unrestricted universal access.\n\n```java\npublic class BankAccount {\n    private double balance; // Hidden internal state\n\n    public BankAccount(double initialDeposit) {\n        if (initialDeposit < 0) throw new IllegalArgumentException(\"Deposit cannot be negative\");\n        this.balance = initialDeposit;\n    }\n\n    public synchronized void withdraw(double amount) {\n        if (amount <= 0 || amount > balance) {\n            throw new InsufficientFundsException(\"Invalid withdrawal: \" + amount);\n        }\n        this.balance -= amount;\n    }\n\n    public double getBalance() { return balance; } // Read-only accessor\n}\n```\n\n### Pillar 2: Abstraction (Interface Segregation & Complexity Reduction)\nAbstraction models essential domain features while omitting underlying hardware or execution details. It establishes a declarative contract between caller and callee.\n- **Abstract Classes:** Classes that cannot be directly instantiated and may provide partial implementation along with pure abstract method hooks.\n- **Interfaces:** Pure behavioral contracts defining method signatures that adhering concrete classes must implement.\n\n### Pillar 3: Inheritance (Hierarchical Subtyping & Code Reuse)\nInheritance allows a derived class (child/subclass) to inherit attributes and methods from an ancestor class (parent/superclass), modeling an **IS-A** relationship.\n\n```\n       +-----------------------+\n       |     PaymentGateway    |  (Abstract Base)\n       +-----------------------+\n                   ^\n         +---------+---------+\n         |                   |\n+-----------------+ +-----------------+\n|  StripeGateway  | |  PayPalGateway  |  (Concrete Implementations)\n+-----------------+ +-----------------+\n```\n\n#### Pitfalls of Deep Inheritance & The Diamond Problem\nWhen multiple inheritance allows a class to inherit from two parent classes that share a common ancestor:\n```\n       [ Class A ]\n       /         \\\n   [ Class B ]  [ Class C ]\n       \\         /\n       [ Class D ]  <-- Which copy of Class A's fields/methods does D inherit?\n```\n- Languages like C++ resolve this using **Virtual Base Classes** (`virtual public A`).\n- Modern languages like Java, C#, and Go forbid multiple class inheritance, allowing only multiple interface implementation to eliminate state ambiguity.\n- **Architectural Directive:** *\"Favor Object Composition over Class Inheritance.\"* Inheritance creates tight compile-time coupling; composition (HAS-A) permits runtime component swappability.\n\n### Pillar 4: Polymorphism (Static vs. Dynamic Dispatch)\nPolymorphism allows objects belonging to disparate classes to be manipulated through a unified uniform interface.\n\n```\n+--------------------+--------------------------------+--------------------------------+\n| Dimension          | Compile-Time (Static Binding)  | Runtime (Dynamic Binding)      |\n+--------------------+--------------------------------+--------------------------------+\n| Mechanism          | Method Overloading / Generics  | Method Overriding (Inheritance)|\n| Resolution Time    | Compilation phase              | Execution phase via vtable     |\n| Performance Cost   | Zero runtime lookup overhead   | Pointer dereference overhead   |\n| Flexibility        | Fixed signature variations     | Dynamic runtime dispatch       |\n+--------------------+--------------------------------+--------------------------------+\n```\n\n---\n\n## 2. Low-Level Mechanics: Virtual Table (`vtable`) & Virtual Pointer (`vptr`)\n\nWhen a class declares or overrides a virtual function in C++ or any non-final method in Java, the compiler injects runtime type information structures:\n\n```\nObject Instance in Heap:                     Class VTABLE in Text/Data Segment:\n+------------------------+                  +--------------------------------+\n|  vptr (hidden pointer) | ---------------> | Index 0: &Shape::draw()        |\n+------------------------+                  | Index 1: &Circle::area()       |\n|  radius = 5.0          |                  | Index 2: &Circle::perimeter()  |\n+------------------------+                  +--------------------------------+\n```\n\n1. **`vtable` (Virtual Method Table):** An immutable, per-class static array of function pointers storing addresses of the most derived method implementations.\n2. **`vptr` (Virtual Table Pointer):** A hidden pointer injected by the compiler as the first field (offset 0) of every object instance of a polymorphic class, pointing to that class's `vtable`.\n3. **Dispatch Operation:** Calling `shapePtr->draw()` translates in machine code to:\n   ```c\n   // 1. Dereference object to get vtable address\n   void** vtable = *(void***)shapePtr;\n   // 2. Index into vtable to find function pointer for draw() (offset 0)\n   typedef void (*DrawFunc)(Shape*);\n   DrawFunc fn = (DrawFunc)vtable[0];\n   // 3. Execute function passing 'this' pointer as first argument\n   fn(shapePtr);\n   ```\n\n---\n\n## 3. High-Frequency Interview Comparison: Overloading vs Overriding\n\n| Characteristic | Method Overloading | Method Overriding |\n| :--- | :--- | :--- |\n| **Pillar Category** | Static / Compile-Time Polymorphism | Dynamic / Runtime Polymorphism |\n| **Scope** | Same class | Base class and Derived class |\n| **Method Name** | Must be identical | Must be identical |\n| **Parameter List** | **Must differ** in type, number, or order | **Must be strictly identical** |\n| **Return Type** | Can be different | Must match or be covariant (sub-type) |\n| **Private Methods** | Can overload private methods | Cannot override private methods (hidden) |\n| **Static Methods** | Can overload static methods | Cannot override static methods (method hiding) |\n\n---\n\n## 4. Key Architectural Anti-Patterns to Avoid\n\n1. **God Object (Monolithic Class):** Aggregating unrelated domain logic into a single class, violating single responsibility.\n2. **Fragile Base Class Problem:** Changes made to a superclass inadvertently breaking assumptions and logic in deeply nested subclasses.\n3. **Object Slicing:** Occurs when passing a derived class instance by value into a parameter expecting a base class object; derived member fields are sliced off.\n",
      "questions": [
        {
          "id": "oop-1",
          "question": "In C++ and Java, how does the runtime engine determine which overridden method implementation to execute for a polymorphic base pointer/reference?",
          "options": [
            "Using the compiler symbol table",
            "Using the virtual method table (vtable) and virtual pointer (vptr)",
            "By recompiling bytecode at runtime",
            "By examining thread local storage"
          ],
          "correct_option": 1,
          "explanation": "Each class with virtual/overridden methods has a vtable containing pointers to the most derived implementations. Each object instance stores a hidden vptr pointing to its class vtable."
        },
        {
          "id": "oops-2",
          "question": "What is the key difference between Method Overloading and Method Overriding?",
          "options": [
            "Overloading occurs in the same class at compile time (same name, different parameter signature); Overriding occurs in a subclass at runtime (same signature)",
            "Overloading requires virtual functions while Overriding does not",
            "Overriding can only be performed on private methods",
            "Overloading is runtime dynamic dispatch while Overriding is compile-time static binding"
          ],
          "correct_option": 0,
          "explanation": "Overloading (compile-time polymorphism) allows multiple methods in the same class to share a name with different signatures. Overriding (runtime polymorphism) allows a subclass to provide a specific implementation of a parent method with identical signature."
        },
        {
          "id": "oops-3",
          "question": "Why do modern software architecture guidelines advise: \"Favor Composition over Inheritance\"?",
          "options": [
            "Composition enables dynamic behavior changes at runtime and avoids rigid class hierarchies and tight coupling",
            "Composition completely eliminates heap memory allocations",
            "Inheritance is not supported in modern programming languages like Java or C#",
            "Composition automatically implements all abstract methods"
          ],
          "correct_option": 0,
          "explanation": "Composition (HAS-A) creates loose coupling, permits swapping internal delegate components at runtime, and avoids the fragile base class problem inherent in deep inheritance trees."
        }
      ],
      "difficulty": "Easy",
      "companyTags": [
        "Amazon",
        "Microsoft",
        "Google",
        "Adobe"
      ],
      "keyTakeaways": [
        "Encapsulation: Bundling data and methods, restricting direct access via access modifiers.",
        "Abstraction: Hiding internal implementation details and exposing clear interfaces.",
        "Inheritance: IS-A relationship; favor Composition (HAS-A) for flexible architectures.",
        "Polymorphism: Compile-time (Overloading) vs Run-time (Overriding / Virtual dispatch)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=The+4+Pillars+of+OOP+%26+Polymorphism+OOPs+%26+Design+Patterns+lecture",
      "prerequisites": [
        "Basic Class and Object Syntax",
        "Procedural vs Object-Oriented Paradigms"
      ],
      "externalResources": [
        {
          "title": "Object-Oriented Programming Concepts — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "Java Object-Oriented Programming — W3Schools",
          "provider": "W3Schools",
          "url": "https://www.w3schools.com/java/java_oop.asp",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "Software Construction in Java: OOP — MIT OpenCourseWare",
          "provider": "MIT OpenCourseWare",
          "url": "https://ocw.mit.edu/courses/6-005-software-construction-spring-2016/",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "solid-principles",
      "slug": "solid-principles",
      "title": "SOLID Design Principles with Code Patterns",
      "description": "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.",
      "estimatedMinutes": 20,
      "notesMarkdown": "# SOLID Principles of Object-Oriented Software Architecture\n\nThe SOLID principles are five foundational design guidelines formulated by Robert C. Martin (\"Uncle Bob\") to create understandable, flexible, and maintainable software systems that adapt gracefully to evolving requirements.\n\n---\n\n## 1. Overview of the 5 Principles\n\n```\n+--------------------------------------------------------------------------+\n|                             SOLID PRINCIPLES                             |\n+--------------------------------------------------------------------------+\n| S - Single Responsibility Principle (SRP)                                |\n|     A class should have one, and only one, reason to change.             |\n|                                                                          |\n| O - Open/Closed Principle (OCP)                                          |\n|     Software entities should be open for extension, closed for mod.      |\n|                                                                          |\n| L - Liskov Substitution Principle (LSP)                                  |\n|     Subtypes must be substitutable for their base types seamlessly.       |\n|                                                                          |\n| I - Interface Segregation Principle (ISP)                                |\n|     Clients should not be forced to depend upon methods they do not use. |\n|                                                                          |\n| D - Dependency Inversion Principle (DIP)                                 |\n|     High-level modules must depend on abstractions, not concretions.     |\n+--------------------------------------------------------------------------+\n```\n\n---\n\n## 2. In-Depth Principle Breakdown with Code Examples\n\n### 1. Single Responsibility Principle (SRP)\n> *\"A class should have one, and only one, reason to change.\"*\n\n- **The Problem:** A class that handles user business logic, generates PDF reports, and manages SQL database writes has three actors/reasons to change. Modifying the PDF layout risks breaking user authentication or database transactions.\n- **Refactoring:** Decouple into discrete cohesive units: `UserService`, `UserPdfReportGenerator`, and `UserRepository`.\n\n```java\n// VIOLATION: Mixed responsibilities\nclass UserAccount {\n    public void registerUser() { /* business logic */ }\n    public void saveToDatabase() { /* SQL persistence logic */ }\n    public void sendWelcomeEmail() { /* SMTP network protocol */ }\n}\n\n// COMPLIANT: Segregated responsibilities\nclass UserAccount { /* Core domain state & invariants */ }\nclass UserRepository { public void save(UserAccount user) { /* DB */ } }\nclass NotificationService { public void sendWelcomeEmail(UserAccount user) { /* Mail */ } }\n```\n\n---\n\n### 2. Open/Closed Principle (OCP)\n> *\"Software entities (classes, modules, functions) should be open for extension, but closed for modification.\"*\n\n- **The Problem:** Using giant `switch(type)` or `if-else` chains. Adding a new payment provider requires editing and risking regressions across existing battle-tested code.\n- **Refactoring:** Leverage polymorphism with strategy interfaces.\n\n```java\n// COMPLIANT: Open for new gateways via extension, closed for modification\npublic interface PaymentStrategy {\n    void processPayment(double amount);\n}\n\npublic class CreditCardPayment implements PaymentStrategy {\n    public void processPayment(double amount) { /* Card gateway */ }\n}\n\npublic class CryptoPayment implements PaymentStrategy {\n    public void processPayment(double amount) { /* Web3 blockchain */ }\n}\n\npublic class CheckoutService {\n    public void completeOrder(PaymentStrategy payment, double amount) {\n        payment.processPayment(amount); // Agnostic of concrete payment type\n    }\n}\n```\n\n---\n\n### 3. Liskov Substitution Principle (LSP)\n> *\"Subtypes must be substitutable for their base types without altering program correctness.\"*\n\n- **Formal Definition (Barbara Liskov):** If $S$ is a subtype of $T$, then objects of type $T$ in a program may be replaced with objects of type $S$ without altering any of the desirable properties of that program.\n- **The Classic Square-Rectangle Violation:**\n  ```java\n  class Rectangle {\n      protected int width, height;\n      public void setWidth(int w) { this.width = w; }\n      public void setHeight(int h) { this.height = h; }\n      public int getArea() { return width * height; }\n  }\n\n  class Square extends Rectangle {\n      @Override public void setWidth(int w) { this.width = this.height = w; }\n      @Override public void setHeight(int h) { this.width = this.height = h; }\n  }\n  ```\n  If client code assumes:\n  ```java\n  void resize(Rectangle r) {\n      r.setWidth(5);\n      r.setHeight(10);\n      assert r.getArea() == 50; // FAILS FOR SQUARE (Area becomes 100)!\n  }\n  ```\n- **Correction:** `Square` should not inherit from `Rectangle` if dimension independence is an invariant. Both can implement a common `Shape` interface providing `int getArea()`.\n\n---\n\n### 4. Interface Segregation Principle (ISP)\n> *\"Clients should not be forced to depend upon interfaces that they do not use.\"*\n\n- **The Problem (\"Fat Interface\"):** An interface with 20 methods forcing lightweight implementers to write empty dummy stubs (`throw new UnsupportedOperationException()`).\n- **Refactoring:** Decompose into lean, role-focused interfaces.\n\n```java\n// Fat interface violation\ninterface MultiFunctionPrinter {\n    void print();\n    void scan();\n    void fax();\n}\n\n// Segregated interfaces\ninterface Printer { void print(); }\ninterface Scanner { void scan(); }\ninterface Fax { void fax(); }\n\nclass SimplePrinter implements Printer {\n    public void print() { System.out.println(\"Printing...\"); }\n}\n```\n\n---\n\n### 5. Dependency Inversion Principle (DIP)\n> *\"High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions.\"*\n\n```\nTraditional Bad Coupling:\n[ High-Level Business Logic ] ----> [ Low-Level MySQL Driver ]  (Fragile)\n\nDIP Inversion:\n[ High-Level Business Logic ] ----> [ Repository Interface ]  (Abstraction)\n                                              ^\n[ Low-Level MySQL / Mongo ] ------------------+              (Implementation)\n```\n\n- **Dependency Injection (DI):** The technique by which instances of dependency implementations are supplied (injected via constructor or setter) into client classes by an external container (e.g. Spring, Guice) rather than being instantiated using `new MySqlDriver()`.\n\n---\n\n## 3. High-Yield Architectural Summary Cheatsheet\n\n| Principle | Primary Goal | Smells & Symptoms of Violation |\n| :--- | :--- | :--- |\n| **SRP** | High Cohesion | Monolithic 2000-line \"Manager\" or \"God\" classes with many unrelated imports. |\n| **OCP** | Seamless Extensibility | Cascading `switch(type)` or `instanceof` blocks that require manual edits on every new feature. |\n| **LSP** | True Behavioral Subtyping | Overridden methods throwing `NotSupportedException` or overriding base class invariants. |\n| **ISP** | Decoupled Interfaces | Implementing classes leaving half the methods blank with empty bodies. |\n| **DIP** | Loose Coupling | Widespread direct instantiation with `new ConcreteService()` making unit testing and mocking impossible. |\n",
      "questions": [
        {
          "id": "oop-2",
          "question": "Which SOLID principle is violated when a Square class inherits from a Rectangle class and overrides setWidth/setHeight in a way that breaks caller expectations?",
          "options": [
            "Single Responsibility Principle (SRP)",
            "Liskov Substitution Principle (LSP)",
            "Open/Closed Principle (OCP)",
            "Interface Segregation Principle (ISP)"
          ],
          "correct_option": 1,
          "explanation": "LSP requires that derived classes preserve the behavioral invariants of base classes. A Square altering width when height is set violates the independent dimension contract of Rectangle."
        },
        {
          "id": "solid-2",
          "question": "Which SOLID principle is violated when a derived Square class overrides setWidth() and setHeight() from a Rectangle class, breaking code that assumes width and height vary independently?",
          "options": [
            "Liskov Substitution Principle (LSP)",
            "Single Responsibility Principle (SRP)",
            "Interface Segregation Principle (ISP)",
            "Dependency Inversion Principle (DIP)"
          ],
          "correct_option": 0,
          "explanation": "The classic Rectangle-Square problem violates LSP because a client expecting a Rectangle cannot substitute a Square without altering the expected invariant (independent width and height)."
        },
        {
          "id": "solid-3",
          "question": "What does the Dependency Inversion Principle (DIP) mandate?",
          "options": [
            "High-level modules should depend on abstractions (interfaces), not on low-level concrete implementations",
            "Classes should invert the order of inheritance hierarchies",
            "Dependencies must always be instantiated inside constructors using the new operator",
            "Singletons must be passed as global dependencies"
          ],
          "correct_option": 0,
          "explanation": "DIP states that high-level business logic should not depend on low-level modules (e.g. database, I/O); both should depend on abstractions (interfaces/abstract classes)."
        }
      ],
      "difficulty": "Medium",
      "companyTags": [
        "Microsoft",
        "Amazon",
        "Meta",
        "Uber"
      ],
      "keyTakeaways": [
        "Single Responsibility: A class should have one, and only one, reason to change.",
        "Open/Closed: Open for extension, closed for modification (use interfaces/strategies).",
        "Liskov Substitution: Subtypes must be substitutable for their base types without breaking code.",
        "Interface Segregation: Clients should not be forced to depend on interfaces they do not use.",
        "Dependency Inversion: High-level modules should depend on abstractions, not concrete implementations."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=SOLID+Design+Principles+with+Code+Patterns+OOPs+%26+Design+Patterns+lecture",
      "prerequisites": [
        "The 4 Pillars of OOP",
        "Interfaces and Abstract Classes"
      ],
      "externalResources": [
        {
          "title": "SOLID Principles in Software Design — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/solid-principles-in-software-design/",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "Software Engineering Design Principles — MIT OpenCourseWare",
          "provider": "MIT OpenCourseWare",
          "url": "https://ocw.mit.edu/courses/6-005-software-construction-spring-2016/",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "design-patterns",
      "slug": "essential-design-patterns",
      "title": "Essential Gang of Four (GoF) Design Patterns",
      "description": "Singleton (thread safety), Factory Method, Observer (Pub/Sub), Adapter, and Strategy patterns.",
      "estimatedMinutes": 18,
      "notesMarkdown": "# Essential Gang of Four (GoF) Design Patterns\n\nDesign patterns represent proven, battle-tested architectural templates for solving recurring software engineering challenges in object-oriented system design.\n\n---\n\n## 1. The Gang of Four (GoF) Taxonomy\n\n```\n+--------------------------------------------------------------------------+\n|                        THE 3 PATTERN CATEGORIES                          |\n+--------------------------------------------------------------------------+\n| 1. Creational    | Abstract the instantiation process; control creation  |\n|                  | (Singleton, Factory Method, Abstract Factory, Builder)|\n|                                                                          |\n| 2. Structural    | Compose classes and objects into larger structures    |\n|                  | (Adapter, Decorator, Facade, Proxy, Composite)        |\n|                                                                          |\n| 3. Behavioral    | Organize object interaction, algorithms & control flow|\n|                  | (Observer, Strategy, Command, State, Iterator)        |\n+--------------------------------------------------------------------------+\n```\n\n---\n\n## 2. Core Creational Patterns\n\n### Singleton Pattern\nGuarantees a class has **strictly one instance** throughout the application lifecycle and provides a global access point.\n\n- **Thread-Safe Double-Checked Locking in Java:**\n```java\npublic class DatabaseManager {\n    // volatile ensures write is visible across threads before read\n    private static volatile DatabaseManager instance;\n\n    private DatabaseManager() {\n        // Prevent reflection instantiation attack\n        if (instance != null) throw new RuntimeException(\"Use getInstance()\");\n    }\n\n    public static DatabaseManager getInstance() {\n        if (instance == null) { // 1st check (avoids synchronization cost once initialized)\n            synchronized (DatabaseManager.class) {\n                if (instance == null) { // 2nd check (ensures thread-safety)\n                    instance = new DatabaseManager();\n                }\n            }\n        }\n        return instance;\n    }\n}\n```\n- **Interview Critique:** Singletons create global shared mutable state, act as hidden dependencies, and make isolated unit testing difficult (mocking challenges). Prefer Dependency Injection singletons managed by an IoC container.\n\n---\n\n## 3. Core Structural Patterns\n\n### Adapter Pattern (Wrapper)\nConverts the interface of a legacy or third-party class into an interface expected by the client, allowing incompatible interfaces to collaborate.\n\n```\n+---------------+        +-------------------+        +--------------------+\n| Client Code   | -----> | <<Target>> Target |        | Adaptee (Legacy)   |\n+---------------+        +-------------------+        +--------------------+\n                                   ^                            ^\n                                   | implements                 | delegates\n                         +-------------------+                  |\n                         | Adapter           | -----------------+\n                         +-------------------+\n```\n\n### Facade Pattern\nProvides a unified, simplified high-level interface to a complex subsystem of interacting classes, libraries, or microservices.\n- **Example:** An `OrderPlacementFacade` coordinates inventory reservation, payment charging, shipping label generation, and confirmation email dispatch through a single method: `placeOrder(orderId)`.\n\n### Decorator Pattern\nAttaches additional responsibilities and behaviors to an object dynamically at runtime without modifying the underlying class or using subclass inheritance.\n- **Example:** Java's `InputStream`:\n  ```java\n  InputStream stream = new BufferedInputStream(new GZIPInputStream(new FileInputStream(\"data.gz\")));\n  ```\n\n---\n\n## 4. Core Behavioral Patterns\n\n### Observer Pattern (Publisher-Subscriber)\nDefines a one-to-many relationship where when one subject object changes state, all registered observers are automatically notified and updated.\n\n```\n       +-----------------------+\n       |   Subject (Publisher) |\n       +-----------------------+\n       | +attach(Observer)     |\n       | +notifyObservers()    |\n       +-----------------------+\n                   | notifies\n         +---------+---------+\n         |                   |\n+-----------------+ +-----------------+\n| EmailNotifier   | | PushNotifier    |  (Concrete Observers)\n+-----------------+ +-----------------+\n```\n\n### Strategy Pattern\nDefines a family of interchangeable algorithms, encapsulates each one into a standalone class, and makes them swappable at runtime based on context.\n\n- **Example:** Route navigation in a GPS application: selecting `DrivingStrategy`, `WalkingStrategy`, or `PublicTransitStrategy` without changing the navigator UI.\n\n---\n\n## 5. Architectural Pattern Decision Matrix\n\n| Requirement / Scenario | Recommended Pattern | Category |\n| :--- | :--- | :--- |\n| Constructing an object with 15+ optional configuration parameters | **Builder** | Creational |\n| Decoupling object creation logic from concrete class types | **Factory Method** | Creational |\n| Interfacing with a third-party payment API whose method names differ | **Adapter** | Structural |\n| Adding logging, metrics, or caching around a service call transparently | **Proxy / Decorator** | Structural |\n| Simplifying a multi-step checkout workflow involving 5 microservices | **Facade** | Structural |\n| Implementing real-time event distribution to decoupled UI listeners | **Observer** | Behavioral |\n| Dynamically switching sorting or compression algorithms at runtime | **Strategy** | Behavioral |\n| Implementing an undo/redo stack for text editing or transaction rollback | **Command** | Behavioral |\n",
      "questions": [
        {
          "id": "oop-3",
          "question": "Which design pattern is best suited for decoupling an event producer from multiple subscribers that need to update automatically when state changes?",
          "options": [
            "Observer Pattern",
            "Singleton Pattern",
            "Adapter Pattern",
            "Factory Method Pattern"
          ],
          "correct_option": 0,
          "explanation": "The Observer pattern defines a one-to-many relationship where subjects notify registered observers of state changes without knowing their concrete types."
        },
        {
          "id": "dp-2",
          "question": "Which Gang of Four (GoF) design pattern provides a unified, simplified high-level interface to a complex subsystem of classes and libraries?",
          "options": [
            "Facade Pattern",
            "Decorator Pattern",
            "Adapter Pattern",
            "Proxy Pattern"
          ],
          "correct_option": 0,
          "explanation": "The Facade pattern defines a higher-level interface that makes a complex subsystem easier to use by wrapping multiple internal subsystems behind a clean, unified API."
        },
        {
          "id": "dp-3",
          "question": "What is a major criticism and testing drawback associated with the Singleton pattern in enterprise codebases?",
          "options": [
            "It introduces global shared mutable state, making unit testing difficult and hindering parallel test execution",
            "It cannot be instantiated in multithreaded environments",
            "It forces classes to use multiple inheritance",
            "It consumes exponential stack space"
          ],
          "correct_option": 0,
          "explanation": "Singletons act like global state, creating hidden dependencies across classes and making it hard to mock or isolate components in unit tests."
        }
      ],
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "Google",
        "Uber",
        "Microsoft"
      ],
      "keyTakeaways": [
        "Creational: Deal with object creation mechanisms (Singleton, Factory, Builder, Prototype).",
        "Structural: Deal with object composition and structure (Adapter, Decorator, Facade, Proxy).",
        "Behavioral: Deal with communication and responsibility between objects (Observer, Strategy, State)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Essential+Gang+of+Four+%28GoF%29+Design+Patterns+OOPs+%26+Design+Patterns+lecture",
      "prerequisites": [
        "The 4 Pillars of OOP",
        "SOLID Principles"
      ],
      "externalResources": [
        {
          "title": "Software Design Patterns — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/software-design-patterns/",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "Design Patterns and Object-Oriented Design — MIT OpenCourseWare",
          "provider": "MIT OpenCourseWare",
          "url": "https://ocw.mit.edu/courses/6-005-software-construction-spring-2016/",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "creational-patterns",
      "slug": "creational-design-patterns",
      "title": "Creational Design Patterns: Factory, Builder & Singleton",
      "description": "Object instantiation abstraction, thread-safe Singleton, Builder pattern, and Factory Method.",
      "estimatedMinutes": 20,
      "notesMarkdown": "# Creational Design Patterns: Factory, Builder, Singleton & Prototype\n\nCreational design patterns abstract the object instantiation process, decoupling systems from how objects are created, configured, and represented in memory.\n\n---\n\n## 1. Why Creational Abstraction Matters\n\nDirect instantiation using `new ConcreteClass()` binds client code tightly to a specific concrete implementation, violating the Dependency Inversion Principle and creating testing roadblocks.\n\n```\nTight Coupling (Anti-Pattern):\nClient Class ------------------> new MySQLConnection()\n\nCreational Abstraction:\nClient Class ----> ConnectionFactory ----> <<Connection>> (Interface)\n                                                ^\n                                                |\n                                        MySQLConnection\n```\n\n---\n\n## 2. In-Depth Examination of Core Patterns\n\n### 1. Singleton Pattern\nEnsures a class has only one instance and provides a global point of access.\n\n- **Meyers Singleton (Thread-safe in C++11 and later):**\n  ```cpp\n  class Singleton {\n  public:\n      static Singleton& getInstance() {\n          static Singleton instance; // Initialized exactly once in a thread-safe manner\n          return instance;\n      }\n      Singleton(const Singleton&) = delete;\n      Singleton& operator=(const Singleton&) = delete;\n  private:\n      Singleton() = default;\n  };\n  ```\n\n### 2. Factory Method vs. Abstract Factory\n- **Factory Method:** Relies on inheritance; subclasses override the factory method to create specific product instances.\n- **Abstract Factory:** Relies on composition; provides an interface to create entire families of related or dependent objects without specifying their concrete classes.\n\n```\nAbstract Factory Hierarchy:\n                       +-----------------------+\n                       |    UIFactory (IFace)  |\n                       +-----------------------+\n                       | +createButton()       |\n                       | +createCheckbox()     |\n                       +-----------------------+\n                                   ^\n            +----------------------+----------------------+\n            |                                             |\n+-----------------------+                     +-----------------------+\n|   WindowsUIFactory    |                     |     MacUIFactory      |\n+-----------------------+                     +-----------------------+\n| creates WindowsButton |                     | creates MacButton     |\n| creates WindowsCheck  |                     | creates MacCheck      |\n+-----------------------+                     +-----------------------+\n```\n\n### 3. Builder Pattern\nSolves the **Telescoping Constructor Anti-Pattern** (constructors with 10+ overloaded arguments) and mutable setter anti-patterns.\n\n```java\npublic class HttpRequest {\n    private final String url;\n    private final String method;\n    private final Map<String, String> headers;\n    private final int timeoutMs;\n\n    private HttpRequest(Builder b) {\n        this.url = b.url;\n        this.method = b.method;\n        this.headers = b.headers;\n        this.timeoutMs = b.timeoutMs;\n    }\n\n    public static class Builder {\n        private final String url; // Mandatory\n        private String method = \"GET\"; // Default\n        private Map<String, String> headers = new HashMap<>();\n        private int timeoutMs = 5000;\n\n        public Builder(String url) { this.url = url; }\n        public Builder method(String method) { this.method = method; return this; }\n        public Builder header(String k, String v) { this.headers.put(k, v); return this; }\n        public Builder timeout(int ms) { this.timeoutMs = ms; return this; }\n        public HttpRequest build() { return new HttpRequest(this); }\n    }\n}\n\n// Fluent Invocation:\nHttpRequest req = new HttpRequest.Builder(\"https://api.stackup.com/v1/users\")\n    .method(\"POST\")\n    .header(\"Authorization\", \"Bearer token123\")\n    .timeout(3000)\n    .build();\n```\n\n---\n\n## 3. Creational Patterns Comparison Matrix\n\n| Pattern | Creational Mechanism | Primary Use Case | Key Trade-off |\n| :--- | :--- | :--- | :--- |\n| **Singleton** | Static factory + private constructor | Global shared hardware/driver access | Difficult unit testing / global mutable state |\n| **Factory Method** | Subclass polymorphism | Decoupling caller from product subclasses | Proliferation of subclass boilerplate |\n| **Abstract Factory** | Object composition | Cross-platform UI widget suites | Adding new product types alters every factory |\n| **Builder** | Step-by-step assembly | Complex objects with many optional configs | Additional Builder inner class overhead |\n| **Prototype** | Cloning (`clone()` / serialization) | Expensive initialization (e.g. 3D meshes) | Deep copy vs shallow copy complexities |\n",
      "questions": [
        {
          "id": "dp-1",
          "question": "Which design pattern is best suited for constructing a complex object with dozens of optional configuration parameters without telescoping constructors?",
          "options": [
            "Singleton",
            "Factory Method",
            "Builder",
            "Prototype"
          ],
          "correct_option": 2,
          "explanation": "The Builder pattern provides a fluent API to configure optional attributes step-by-step, avoiding anti-pattern telescoping constructors."
        },
        {
          "id": "cp-2",
          "question": "When should the Builder design pattern be chosen over telescoping constructors?",
          "options": [
            "When an object has numerous optional parameters or complex multi-step construction logic",
            "When only a single instance of a class should ever exist",
            "When objects need to be cloned without calling constructors",
            "When decoupling legacy class interfaces"
          ],
          "correct_option": 0,
          "explanation": "The Builder pattern eliminates telescoping constructor anti-patterns with 5+ arguments and allows constructing immutable objects cleanly step-by-step."
        },
        {
          "id": "cp-3",
          "question": "How does the Prototype design pattern instantiate new objects?",
          "options": [
            "By cloning an existing prototype instance (e.g. clone() / shallow or deep copy)",
            "By using reflection to discover private constructors",
            "By invoking an abstract factory method on a remote server",
            "By deserializing hardcoded XML templates"
          ],
          "correct_option": 0,
          "explanation": "The Prototype pattern specifies the kind of objects to create using a prototypical instance, creating new objects by copying or cloning this prototype."
        }
      ],
      "difficulty": "Medium",
      "companyTags": [
        "Google",
        "Meta",
        "Amazon",
        "Apple"
      ],
      "keyTakeaways": [
        "Factory Method: Defines an interface for creating an object, but lets subclasses decide which class to instantiate.",
        "Builder: Separates the construction of a complex object from its representation (fluent API).",
        "Prototype: Creates new objects by cloning an existing instance."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Creational+Design+Patterns%3A+Factory%2C+Builder+%26+Singleton+OOPs+%26+Design+Patterns+lecture",
      "prerequisites": [
        "Object-Oriented Programming Fundamentals",
        "Memory Management and Constructors"
      ],
      "externalResources": [
        {
          "title": "Creational Design Patterns — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/creational-design-patterns/",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "Factory and Builder Design Patterns — W3Schools",
          "provider": "W3Schools",
          "url": "https://www.w3schools.com/java/java_oop.asp",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    },
    {
      "id": "structural-patterns",
      "slug": "structural-design-patterns",
      "title": "Structural Design Patterns: Adapter, Decorator, Facade & Proxy",
      "description": "Object composition, interface adaptation, dynamic responsibility decoration, and surrogate proxy controls.",
      "estimatedMinutes": 20,
      "notesMarkdown": "# Structural Design Patterns: Adapter, Facade, Decorator & Proxy\n\nStructural design patterns explain how to assemble objects and classes into larger structures while keeping these structures flexible and efficient.\n\n---\n\n## 1. Adapter Pattern (Wrapper)\n\nThe Adapter pattern acts as a translator between two incompatible interfaces.\n\n```\n+-------------+         +---------------------+         +--------------------+\n| Client Code | ------> | <<Target Interface>>|         | Adaptee (Legacy)   |\n+-------------+         +---------------------+         +--------------------+\n                                   ^                               ^\n                                   | implements                    | calls internally\n                        +----------------------+                   |\n                        | Concrete Adapter     | ------------------+\n                        +----------------------+\n```\n\n### Types of Adapters:\n1. **Object Adapter (Composition-based):** Holds an instance of the Adaptee inside the Adapter (`has-a`). Compatible with all programming languages and works with Adaptee subclasses.\n2. **Class Adapter (Inheritance-based):** Multiple-inherits from both Target interface and Adaptee class. Requires multiple inheritance support (e.g. C++).\n\n---\n\n## 2. Facade Pattern (Subsystem Simplifier)\n\nA Facade provides a simple, unified interface to a complex subsystem containing dozens of interdependent classes, network calls, or third-party SDKs.\n\n- **Real-World System Design Scenario:** Ordering an item in e-commerce:\n  ```java\n  public class OrderProcessingFacade {\n      private InventoryService inventory;\n      private PaymentProcessor payment;\n      private ShippingService shipping;\n      private AnalyticsService analytics;\n\n      public OrderResult placeOrder(String userId, String itemId, PaymentDetails pd) {\n          if (!inventory.checkStock(itemId)) return OrderResult.OUT_OF_STOCK;\n          inventory.lockStock(itemId);\n          PaymentResult pr = payment.charge(userId, pd);\n          if (!pr.isSuccessful()) {\n              inventory.unlockStock(itemId);\n              return OrderResult.PAYMENT_FAILED;\n          }\n          String trackingId = shipping.generateLabel(userId, itemId);\n          analytics.logEvent(\"order_completed\", userId, itemId);\n          return OrderResult.success(trackingId);\n      }\n  }\n  ```\n\n---\n\n## 3. Decorator Pattern (Dynamic Behavior Augmentation)\n\nExtends functionality dynamically at runtime by wrapping the original object inside a decorator object that implements the same interface.\n\n```\n       +-----------------------+\n       |   <<VisualComponent>> |\n       +-----------------------+\n                   ^\n         +---------+---------+\n         |                   |\n+-----------------+ +-----------------------+\n|  TextView       | |  DecoratorBase        |  (has-a VisualComponent)\n+-----------------+ +-----------------------+\n                               ^\n                     +---------+---------+\n                     |                   |\n            +-----------------+ +-----------------+\n            | BorderDecorator | | ScrollDecorator |\n            +-----------------+ +-----------------+\n```\n\n- **Decorator vs Inheritance:** Subclassing adds behavior statically at compile time for the entire class. Decorators add behavior dynamically at runtime to individual object instances without class explosion ($2^N$ subclass combinations avoided).\n\n---\n\n## 4. Proxy Pattern (Surrogate & Access Controller)\n\nProvides a surrogate or placeholder for another object to control access, perform lazy loading, manage remote calls, or execute cross-cutting concerns.\n\n### Proxy Variants:\n1. **Virtual Proxy:** Defers expensive object creation until the first actual method call (e.g., loading high-resolution image only when scrolled into view).\n2. **Protection Proxy:** Enforces role-based permissions before forwarding calls to the underlying sensitive service.\n3. **Remote Proxy:** Marshals arguments over TCP/RPC to represent an object residing in a different address space (e.g. Java RMI, gRPC stubs).\n4. **Caching Proxy:** Intercepts identical read queries and returns cached responses without invoking the backend database.\n",
      "questions": [
        {
          "id": "struct-1",
          "question": "Which structural design pattern dynamically attaches new responsibilities to an individual object without subclassing the entire class hierarchy?",
          "options": [
            "Facade Pattern",
            "Decorator Pattern",
            "Adapter Pattern",
            "Flyweight Pattern"
          ],
          "correct_option": 1,
          "explanation": "The Decorator pattern wraps an object and forwards calls while injecting additional behaviors dynamically, avoiding combinatorial explosion of subclasses."
        },
        {
          "id": "struct-2",
          "question": "What is the primary difference between the Adapter and Facade patterns?",
          "options": [
            "Adapter makes existing incompatible interfaces match; Facade defines a new simplified interface over an entire complex subsystem",
            "Adapter is behavioral; Facade is creational",
            "Facade requires inheritance; Adapter strictly uses composition",
            "Adapter can only be used with network sockets"
          ],
          "correct_option": 0,
          "explanation": "Adapter bridges two incompatible existing interfaces so they can communicate; Facade creates a higher-level simplified interface to hide subsystem complexity."
        },
        {
          "id": "sp-3",
          "question": "What is the primary difference in intent between the Decorator pattern and the Proxy pattern?",
          "options": [
            "Decorator adds new behaviors or responsibilities to an object dynamically; Proxy controls or manages access to the object (e.g. lazy loading, security check)",
            "Decorator can only be applied to interfaces while Proxy applies only to abstract classes",
            "Proxy converts incompatible interfaces while Decorator modifies data formats",
            "They are identical in design and purpose"
          ],
          "correct_option": 0,
          "explanation": "While both wrap an underlying target object, Decorator’s intent is to augment functionality dynamically, whereas Proxy’s intent is to control, defer, or restrict access to the target."
        }
      ],
      "difficulty": "Hard",
      "companyTags": [
        "Amazon",
        "Microsoft",
        "Netflix",
        "Spotify"
      ],
      "keyTakeaways": [
        "Adapter: Converts the interface of a class into another interface clients expect.",
        "Decorator: Attaches additional responsibilities dynamically to an object without subclassing.",
        "Proxy: Provides a placeholder or surrogate for another object to control access (lazy loading, security)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Structural+Design+Patterns%3A+Adapter%2C+Decorator%2C+Facade+%26+Proxy+OOPs+%26+Design+Patterns+lecture",
      "prerequisites": [
        "Object-Oriented Interfaces",
        "Composition vs Inheritance"
      ],
      "externalResources": [
        {
          "title": "Structural Design Patterns — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/structural-design-patterns/",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "behavioral-patterns",
      "slug": "behavioral-design-patterns",
      "title": "Behavioral Design Patterns: Strategy, Observer, Command & State",
      "description": "Algorithms as interchangeable strategies, pub/sub event distribution, command encapsulation, and finite state machines.",
      "estimatedMinutes": 20,
      "notesMarkdown": "# Behavioral Design Patterns: Strategy, Observer, Command & State\n\nBehavioral design patterns are concerned with algorithms and the assignment of responsibilities between objects, characterizing complex control flow and message passing.\n\n---\n\n## 1. Strategy Pattern (Interchangeable Algorithms)\n\nDefines a family of algorithms, encapsulates each algorithm into a standalone class, and makes them interchangeable at runtime based on caller parameters.\n\n```java\npublic interface CompressionStrategy {\n    byte[] compress(byte[] data);\n}\n\npublic class ZipCompression implements CompressionStrategy {\n    public byte[] compress(byte[] data) { /* Deflate algorithm */ return data; }\n}\n\npublic class ZstdCompression implements CompressionStrategy {\n    public byte[] compress(byte[] data) { /* Zstandard algorithm */ return data; }\n}\n\npublic class FileArchiver {\n    private CompressionStrategy strategy;\n    public void setStrategy(CompressionStrategy s) { this.strategy = s; }\n    public void archive(File file) {\n        byte[] compressed = strategy.compress(file.readBytes());\n        // write to disk...\n    }\n}\n```\n\n---\n\n## 2. Observer Pattern (Event Emitter / Pub-Sub)\n\nDefines a subscription mechanism to notify multiple objects simultaneously about events happening to the object they are observing.\n\n- **Pull vs. Push Model:**\n  - *Push Model:* Subject broadcasts detailed event payload in the notification call. Observers receive everything directly, but coupling increases.\n  - *Pull Model:* Subject sends minimal notification; observer queries subject for specific fields needed. Loose coupling, but requires extra round-trip queries.\n\n---\n\n## 3. Command Pattern (Request Encapsulation & Undo/Redo)\n\nEncapsulates a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.\n\n```java\npublic interface Command {\n    void execute();\n    void undo();\n}\n\npublic class CopyTextCommand implements Command {\n    private final TextEditor editor;\n    private String backup;\n\n    public CopyTextCommand(TextEditor editor) { this.editor = editor; }\n    public void execute() {\n        backup = editor.getSelectedText();\n        Clipboard.set(backup);\n    }\n    public void undo() { /* no mutation to undo */ }\n}\n\npublic class CommandHistory {\n    private final Stack<Command> history = new Stack<>();\n    public void push(Command cmd) { cmd.execute(); history.push(cmd); }\n    public void undo() {\n        if (!history.isEmpty()) history.pop().undo();\n    }\n}\n```\n\n---\n\n## 4. State Pattern (Dynamic Behavior Transitions)\n\nAllows an object to alter its behavior when its internal state changes. The object will appear to change its class.\n\n- **Finite State Machine (FSM) Implementation:** Instead of gigantic `switch(state)` statements in every method, delegate method execution to a current `State` object.\n- **Example:** TCP Connection Lifecycle (`ListenState`, `SynSentState`, `EstablishedState`, `ClosedState`).\n",
      "questions": [
        {
          "id": "behav-1",
          "question": "Which behavioral design pattern is specifically engineered to support undo/redo stacks and transactional command queues?",
          "options": [
            "Command Pattern",
            "Strategy Pattern",
            "State Pattern",
            "Template Method Pattern"
          ],
          "correct_option": 0,
          "explanation": "The Command pattern encapsulates all information needed to perform or reverse an action inside a standalone object, making it trivial to store in history stacks for undo/redo."
        },
        {
          "id": "bp-2",
          "question": "Which behavioral pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime?",
          "options": [
            "Strategy Pattern",
            "State Pattern",
            "Template Method Pattern",
            "Visitor Pattern"
          ],
          "correct_option": 0,
          "explanation": "The Strategy pattern enables selecting an algorithm’s implementation at runtime (e.g., choosing between PaymentStrategy: CreditCard, PayPal, UPI)."
        },
        {
          "id": "bp-3",
          "question": "In the Command design pattern, what is the role of the Command object?",
          "options": [
            "It encapsulates a request as a standalone object containing all information needed to execute the action",
            "It acts as an event bus broadcasting changes to all registered subscribers",
            "It caches results of idempotent database queries",
            "It validates SQL queries before sending them to the database"
          ],
          "correct_option": 0,
          "explanation": "The Command pattern packages a request into an object, enabling delayed execution, queuing, remote execution, and undoable operations."
        }
      ],
      "difficulty": "Medium",
      "companyTags": [
        "Google",
        "Amazon",
        "Meta",
        "Uber"
      ],
      "keyTakeaways": [
        "Strategy: Defines a family of interchangeable algorithms and selects one at runtime.",
        "Observer: Defines a one-to-many dependency between objects so when one changes state, all dependents are notified.",
        "Command: Encapsulates a request as an object, allowing parameterizing clients with queues, logs, and undo operations."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Behavioral+Design+Patterns%3A+Strategy%2C+Observer%2C+Command+%26+State+OOPs+%26+Design+Patterns+lecture",
      "prerequisites": [
        "Polymorphism and Dynamic Dispatch",
        "SOLID Principles"
      ],
      "externalResources": [
        {
          "title": "Behavioral Design Patterns — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/behavioral-design-patterns/",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    }
  ]
};

export const SYSTEM_DESIGN_CATEGORY: SectionCategory = {
  "id": "system-design",
  "slug": "system-design-fundamentals",
  "title": "System Design Fundamentals",
  "description": "High-level architectures, load balancing, caching tiers, database replication, and message queues.",
  "icon": "Cpu",
  "topics": [
    {
      "id": "scaling-load-balancing",
      "slug": "scaling-and-load-balancing",
      "title": "Scaling Strategies & Load Balancing",
      "description": "Vertical vs Horizontal scaling, stateless architecture, Layer 4 vs Layer 7 load balancers, and Consistent Hashing.",
      "estimatedMinutes": 20,
      "notesMarkdown": "# Scaling Strategies, Load Balancing & Consistent Hashing\n\nScalability measures a system's ability to handle growing workloads gracefully by provisioning additional computational resources without redesigning core architecture.\n\n---\n\n## 1. Vertical vs. Horizontal Scaling\n\n```\nVertical Scaling (Scale-Up):               Horizontal Scaling (Scale-Out):\n+-------------------------------+          +-------------+  +-------------+  +-------------+\n|        Monolithic Host        |          |  Server 1   |  |  Server 2   |  |  Server 3   |\n|  64 Cores, 512GB RAM, 10TB SSD|          | 8 Cores 32G |  | 8 Cores 32G |  | 8 Cores 32G |\n+-------------------------------+          +-------------+  +-------------+  +-------------+\n- Hardware ceiling (maximum physical specs) - Near linear capacity expansion\n- Extreme cost curve (specialized hardware)  - Commodity cloud virtual machines\n- Single Point of Failure (SPOF)            - High availability & redundancy\n```\n\n### Invariant for Horizontal Scaling: Stateless Application Tiers\nFor web application servers to scale horizontally behind a load balancer, individual servers must not store stateful user sessions (e.g., HTTP session memory). Sessions must be offloaded to distributed stores (Redis, Memcached) or client-side signed tokens (JWTs).\n\n---\n\n## 2. Load Balancer Taxonomy: Layer 4 vs. Layer 7\n\nLoad balancers distribute incoming client traffic evenly across an upstream cluster of target servers.\n\n```\n                  +----------------------------------+\n                  |         Incoming Traffic         |\n                  +----------------------------------+\n                                    |\n                  +----------------------------------+\n                  |      Load Balancer Tier          |\n                  +----------------------------------+\n                   /                |               \\\n        /api/users/            /api/video/          /static/\n           v                        v                   v\n+---------------------+  +---------------------+  +---------------------+\n| User Microservice   |  | Video Transcoder    |  | Object CDN Storage  |\n+---------------------+  +---------------------+  +---------------------+\n```\n\n### Comprehensive Comparison Matrix: L4 vs L7\n\n| Attribute | Layer 4 (Transport Layer) | Layer 7 (Application Layer) |\n| :--- | :--- | :--- |\n| **Inspection Depth** | IP addresses, TCP/UDP ports | Full HTTP/HTTPS request (Headers, URL, Cookies, Body) |\n| **Routing Decisions** | Packet source & destination | Content-aware (URL paths, Host headers, JWT claims) |\n| **Latency & Overhead** | Ultra-low (sub-millisecond wire speed) | Higher (must terminate TCP, decrypt TLS, parse HTTP) |\n| **TLS/SSL Termination**| TCP passthrough (encrypted to backend) | Can terminate SSL/TLS at edge, offloading servers |\n| **Smart Routing** | Cannot inspect path or auth tokens | Can route `/checkout` to high-memory cluster |\n| **Prominent Examples** | AWS NLB, Linux IPVS, HAProxy (TCP mode)| AWS ALB, Nginx, Envoy, Traefik, HAProxy (HTTP mode) |\n\n---\n\n## 3. Load Balancing Scheduling Algorithms\n\n1. **Round Robin:** Cycles sequentially through upstream servers ($S_1, S_2, S_3, S_1 \\dots$). Best when all requests and servers have identical capacities.\n2. **Weighted Round Robin:** Assigns requests proportionally based on server hardware capacity weights.\n3. **Least Connections:** Forwards traffic to the server currently maintaining the fewest active open connections. Best for long-lived sessions (WebSockets, database transactions).\n4. **Weighted Least Connections:** Combines connection count with configured server capability weights.\n5. **IP Hash (Source Affinity):** Hashes client IP to assign fixed servers, creating pseudo-sticky sessions (disrupted by NAT gateways).\n\n---\n\n## 4. Consistent Hashing & Virtual Nodes\n\nIn traditional modulo hashing, a key is mapped to server index:\n$$\\text{server\\_idx} = \\text{hash}(\\text{key}) \\pmod N$$\n\n### The Modulo Re-hashing Disaster\nIf the cluster grows from $N$ to $N+1$ servers (or one fails), almost **100% of keys change server destinations**:\n$$\\text{Keys moved} = \\frac{N}{N+1} \\approx 99\\% \\text{ for large } N$$\nThis triggers a catastrophic **Cache Stampede**, crashing backend databases.\n\n### The Consistent Hashing Ring\nConsistent Hashing maps both **Servers** and **Data Keys** to a shared $32$-bit or $64$-bit integer ring ($0 \\dots 2^{32}-1$):\n\n```\n                       Hash Ring (0 to 2^32 - 1)\n                               [ Node A ]\n                              /          \\\n                       (Key 1)            [ Node B ]\n                             |                 |\n                         [ Node C ] ------- (Key 2)\n```\n\n1. **Routing Rule:** To locate a key, calculate $\\text{hash}(\\text{key})$ and walk clockwise along the ring until encountering the first server node.\n2. **Addition/Removal Impact:** When a node is added or removed, **only $\\frac{K}{N}$ keys are relocated on average** ($K = \\text{total keys}$, $N = \\text{servers}$).\n3. **Hotspots & Virtual Nodes (Vnodes):**\n   - Non-uniform hash distributions can create massive data imbalances (hotspots).\n   - **Solution:** Each physical server is assigned $V$ virtual positions along the ring (e.g., `NodeA#1`, `NodeA#2` $\\dots$ `NodeA#100`). This ensures uniform key distribution (standard deviation $< 5\\%$) and graceful rebalancing.\n",
      "questions": [
        {
          "id": "sd-1",
          "question": "Why is Consistent Hashing preferred over simple hash modulo (hash(key) % N) in distributed caching clusters?",
          "options": [
            "Consistent hashing guarantees zero hash collisions",
            "When nodes are added or removed, only a small fraction (K/N) of keys need remapping, avoiding massive cache invalidation",
            "Consistent hashing runs in O(1) space across all nodes",
            "It encrypts cached data automatically"
          ],
          "correct_option": 1,
          "explanation": "In simple modulo hashing, changing N shifts almost 100% of keys to new servers, causing complete cache stampedes. Consistent hashing minimizes remapped keys to K/N."
        },
        {
          "id": "slb-2",
          "question": "Why is Consistent Hashing critical for distributed caching clusters (like Memcached or Redis) compared to simple modulo hashing (hash(key) % N)?",
          "options": [
            "Adding or removing a server node only requires remapping K/N keys on average, avoiding catastrophic cluster-wide cache invalidation",
            "It guarantees zero memory fragmentation across cache nodes",
            "It converts all key queries to O(1) direct hardware lookups",
            "It eliminates the need for replication"
          ],
          "correct_option": 0,
          "explanation": "With hash(key) % N, changing N (adding/removing a node) invalidates almost 100% of cached keys. Consistent Hashing places nodes and keys on a virtual ring, remapping only K/N keys."
        },
        {
          "id": "slb-3",
          "question": "What is the primary difference between a Layer 4 (L4) and a Layer 7 (L7) load balancer?",
          "options": [
            "L4 routes traffic based on IP address and TCP/UDP ports without inspecting packet payload; L7 inspects HTTP headers, cookies, and URLs for smart routing",
            "L4 can terminate SSL while L7 cannot",
            "L4 runs in user space while L7 runs exclusively in kernel space",
            "L7 has higher throughput and lower CPU overhead than L4"
          ],
          "correct_option": 0,
          "explanation": "Layer 4 load balancers make routing decisions purely at transport layer (IP/port) with high speed. Layer 7 load balancers parse application-layer data (HTTP path, auth headers) to make content-aware routing decisions."
        }
      ],
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "Google",
        "Meta",
        "Uber",
        "Netflix"
      ],
      "keyTakeaways": [
        "Vertical scaling (scale up) hits physical hardware limits; Horizontal scaling (scale out) adds more commodity nodes.",
        "Load balancing algorithms: Round Robin, Least Connections, IP Hash, Weighted Round Robin.",
        "Consistent Hashing minimizes key redistribution when nodes are added or removed (only K/N keys remapped)."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Scaling+Strategies+%26+Load+Balancing+System+Design+Fundamentals+lecture",
      "prerequisites": [
        "Client-Server Architecture",
        "TCP/IP Networking Basics",
        "DNS Resolution"
      ],
      "externalResources": [
        {
          "title": "Scalability and Load Balancing in System Design — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/load-balancing-in-system-design/",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "Consistent Hashing Fundamentals — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/consistent-hashing/",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "Distributed Systems: Scalability — MIT OpenCourseWare",
          "provider": "MIT OpenCourseWare",
          "url": "https://ocw.mit.edu/courses/6-824-distributed-computer-systems-engineering-spring-2006/",
          "difficulty": "Advanced",
          "isFree": true
        }
      ]
    },
    {
      "id": "caching-strategies",
      "slug": "caching-strategies-and-eviction",
      "title": "Caching Strategies & Eviction Policies",
      "description": "Cache-Aside, Write-Through, Write-Behind, eviction policies (LRU, LFU), and Redis in-memory storage.",
      "estimatedMinutes": 18,
      "notesMarkdown": "# Caching Strategies, Eviction Policies & High-Concurrency Patterns\n\nCaching stores high-frequency or computationally expensive data in high-speed volatile storage (DRAM, SRAM) to reduce read latency from tens of milliseconds (disk/network) to sub-millisecond ranges.\n\n---\n\n## 1. Latency Hierarchy & Caching Tiers\n\n```\nStorage Medium        | Typical Access Latency | Bandwidth\n----------------------|------------------------|----------------\nL1/L2/L3 CPU Cache    | 0.5 - 10 ns            | 1000+ GB/s\nMain Memory (DRAM)    | 50 - 100 ns            | 50 - 100 GB/s\nDistributed Cache     | 0.5 - 2 ms (Redis)     | Network bound\nNVMe Solid State Disk | 20 - 100 μs            | 3 - 7 GB/s\nRelational DB Disk IO | 5 - 50 ms              | Disk head bound\n```\n\n---\n\n## 2. Core Caching Architectural Patterns\n\n```\n1. Cache-Aside (Lazy):       2. Write-Through:            3. Write-Behind (Write-Back):\n   App ---> Cache (Miss)        App ---> Cache               App ---> Cache (Ack)\n    |                             \\        \\                            \\\n    v (DB read)                    v        v                            v (Async batch)\n   Database                        Database (Sync write)                 Database\n```\n\n### 1. Cache-Aside (Lazy Loading)\n- **Read Path:** Application queries cache. On hit, return data. On miss, application queries database, stores result in cache with a TTL, and returns data to client.\n- **Write Path:** Application updates database, then explicitly invalidates/deletes the cached key.\n- **Trade-offs:** Highly resilient (cache crash does not stop reads); cold-start latency penalty on new records; potential stale reads between DB write and cache eviction.\n\n### 2. Read-Through\n- Application treats cache as the primary data store. The cache engine itself intercepts misses, transparently fetches from the database, updates itself, and returns data.\n\n### 3. Write-Through\n- Application writes directly to cache. The cache engine synchronously writes to the backing database before acknowledging success to the caller.\n- **Advantage:** Cache is guaranteed to stay synchronized with the database; zero stale reads.\n- **Disadvantage:** Write latency is high (sum of cache write + synchronous database disk flush).\n\n### 4. Write-Behind (Write-Back)\n- Application writes to cache, which acknowledges immediately. The cache asynchronously batches and flushes writes to the database in background worker queues.\n- **Advantage:** Ultra-fast write throughput; write absorption (multiple updates to same key merged into single DB write).\n- **Disadvantage:** **Risk of permanent data loss** if volatile cache instances crash before flushing to persistent disk.\n\n---\n\n## 3. Cache Eviction Policies\n\nWhen memory capacity limit is reached (`maxmemory`), the cache must evict entries:\n\n| Eviction Policy | Data Structure | Best Used For |\n| :--- | :--- | :--- |\n| **LRU (Least Recently Used)** | HashMap + Doubly Linked List ($O(1)$) | General web workloads; access recency correlates with future access |\n| **LFU (Least Frequently Used)** | Frequency Buckets + Doubly Linked Lists | Stable workloads with distinct hot power-law distributions |\n| **FIFO (First In, First Out)** | Queue ($O(1)$) | Simple sequential logging / pipeline processing |\n| **TTL / Random Eviction** | Min-Heap / Random sampling | Ephemeral tokens, sessions with natural expiration |\n\n---\n\n## 4. Concurrency Pitfalls in High-Traffic Caches\n\n### 1. Cache Stampede (Thundering Herd)\n- **Symptom:** A popular hot key (e.g., breaking news article) expires. Tens of thousands of concurrent requests miss cache simultaneously and slam the database.\n- **Mitigation:**\n  - **Distributed Mutex Lock:** The first missing thread acquires a lock to recompute; other threads wait or return slightly stale cached data.\n  - **Probabilistic Early Expiration (XFetch Algorithm):** Background threads randomly recompute keys slightly before TTL expiration based on request frequency:\n    $$\\Delta \\cdot \\beta \\cdot \\ln(\\text{rand}()) > \\text{expiry} - \\text{now}$$\n\n### 2. Cache Penetration\n- **Symptom:** Malicious or buggy clients query non-existent IDs (e.g. `userId=-9999`). Every request bypasses cache and hits the database.\n- **Mitigation:**\n  - **Bloom Filters:** A space-efficient probabilistic filter at cache entry. If the Bloom filter says the key does not exist, return 404 immediately.\n  - **Cache Null Values:** Store `key: null` in cache with a short TTL (e.g., 60 seconds).\n\n### 3. Cache Avalanche\n- **Symptom:** Hundreds of thousands of cached items expire at the exact same second (e.g., midnight batch sync), knocking down the database tier.\n- **Mitigation:** Add random jitter to key TTLs:\n  $$\\text{Actual TTL} = \\text{Base TTL} + \\text{rand}(0, 300) \\text{ seconds}$$\n",
      "questions": [
        {
          "id": "sd-2",
          "question": "Which caching strategy offers the lowest write latency to the client but carries a risk of data loss if the cache crashes before syncing?",
          "options": [
            "Cache-Aside",
            "Write-Through",
            "Write-Behind (Write-Back)",
            "Read-Through"
          ],
          "correct_option": 2,
          "explanation": "Write-Behind acknowledges writes immediately after writing to volatile cache memory, delaying asynchronous persistence to the database."
        },
        {
          "id": "cs-strat-2",
          "question": "In the Cache-Aside (Lazy Loading) pattern, what steps are taken when a read operation encounters a cache miss?",
          "options": [
            "The application reads the data from the database, writes it into the cache, and returns it to the client",
            "The cache engine automatically queries the database directly via internal triggers",
            "The request fails with a 404 error",
            "The database updates the cache asynchronously using Change Data Capture"
          ],
          "correct_option": 0,
          "explanation": "In Cache-Aside, the application coordinates reads: checks cache -> misses -> queries database -> populates cache -> returns data to client."
        },
        {
          "id": "cs-strat-3",
          "question": "What is the \"Cache Stampede\" (Thundering Herd) problem in high-traffic web architectures, and how is it prevented?",
          "options": [
            "A popular cached key expires, causing massive concurrent requests to hit the database simultaneously; mitigated with mutex locking or probabilistic early recomputation",
            "Cache memory fills up, causing random key deletions",
            "Network partitions cause cache servers to duplicate keys",
            "Redis instances crashing due to memory leak"
          ],
          "correct_option": 0,
          "explanation": "When a hot key expires in a system serving tens of thousands of requests per second, all requests bypass cache simultaneously, overloading the database. Mutex locks or XFetch probabilistic algorithms prevent this."
        }
      ],
      "difficulty": "Hard",
      "companyTags": [
        "Netflix",
        "Meta",
        "Amazon",
        "Twitter"
      ],
      "keyTakeaways": [
        "Cache-Aside (Lazy Loading): App reads cache first; on miss, reads DB, writes to cache.",
        "Write-Through: App writes to cache; cache synchronously writes to DB before confirming.",
        "Write-Back (Write-Behind): App writes to cache; cache asynchronously writes to DB in batches.",
        "Thundering Herd / Cache Stampede: Millions of concurrent requests hit DB simultaneously when popular cache key expires."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Caching+Strategies+%26+Eviction+Policies+System+Design+Fundamentals+lecture",
      "prerequisites": [
        "Scaling Strategies & Load Balancing",
        "Database Indexing and I/O Latency"
      ],
      "externalResources": [
        {
          "title": "Caching Strategies and System Design — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/caching-system-design-concept-for-interviews/",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "Redis In-Memory Architecture Documentation",
          "provider": "Official Documentation",
          "url": "https://redis.io/docs/latest/develop/get-started/",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "db-sharding-replication",
      "slug": "database-sharding-and-replication",
      "title": "Database Sharding, Partitioning & Replication",
      "description": "Horizontal sharding, shard keys, master-replica replication lag, read/write splitting, and rebalancing strategies.",
      "estimatedMinutes": 20,
      "notesMarkdown": "# Database Sharding, Replication & Distributed Partitioning\n\nWhen data volumes and transaction concurrency exceed the storage and IOPS limits of a single enterprise server, database architectures partition and replicate data across distributed clusters.\n\n---\n\n## 1. Database Replication Strategies\n\n```\nPrimary-Replica (Single Master):             Multi-Primary (Multi-Master):\n+-------------------+                        +-------------------+       +-------------------+\n|   Primary (Write) |                        |  Primary Node A   | <---> |  Primary Node B   |\n+-------------------+                        +-------------------+       +-------------------+\n    | WAL replication                            \\                       /\n    v                                             \\                     /\n+-------------------+                              v                   v\n|  Replica (Read)   |                             Conflict Resolution Engine\n+-------------------+                             (Last-Write-Wins / CRDTs)\n```\n\n### Primary-Replica (Leader-Follower)\n- All writes are processed by the single Primary node and recorded to a Write-Ahead Log (WAL). Replicas apply WAL streams to serve read queries.\n- **Replication Lag:** Asynchronous replication allows read replicas to fall hundreds of milliseconds behind the primary, resulting in **Eventual Consistency** (reading stale data immediately after a write).\n- **Read-Your-Own-Writes Guarantee:** Route reads for a specific user to the primary for 5 seconds after they perform a mutation.\n\n---\n\n## 2. Partitioning vs. Horizontal Sharding\n\n```\nVertical Partitioning:                        Horizontal Sharding:\nSplitting columns across tables               Splitting rows across separate database nodes\n+--------------------+--------------------+   +--------------------+  +--------------------+\n| Table 1: Core User | Table 2: User Blob |   | Shard 1 (ID 1-1M)  |  | Shard 2 (ID 1M-2M) |\n| id, email, pass    | bio, avatar_binary |   | id, name, balance  |  | id, name, balance  |\n+--------------------+--------------------+   +--------------------+  +--------------------+\n```\n\n---\n\n## 3. Sharding Strategies & Key Selection\n\n### 1. Range-Based Sharding\n- Rows partitioned based on discrete contiguous ranges of a key (e.g., `userId` 1–10,000,000 $\\to$ Shard 1; 10,000,001–20,000,000 $\\to$ Shard 2).\n- **Pitfall:** Severe write hotspots on the latest range (e.g., auto-incrementing IDs or timestamps always hit the newest shard).\n\n### 2. Hash-Based Sharding\n- Shard determined by hashing key: $\\text{Shard} = \\text{hash}(\\text{key}) \\pmod N$.\n- **Advantage:** Perfectly uniform distribution of data and write IOPS.\n- **Disadvantage:** Range queries (`SELECT WHERE age BETWEEN 20 AND 30`) require scatter-gather queries across **all** shards.\n\n### 3. Directory-Based (Lookup) Sharding\n- A centralized lookup service maps entity IDs to specific physical database nodes. Allows dynamic partition movement without changing sharding algorithms.\n\n---\n\n## 4. Distributed Sharding Challenges\n\n1. **Cross-Shard Joins:** Relational SQL joins between tables partitioned on different keys require fetching datasets across the network into application memory, destroying performance.\n2. **Distributed Transactions (Two-Phase Commit - 2PC):** Coordinating atomic updates across multiple physical database instances requires 2PC coordinators, introducing blocking locks and high latency.\n3. **Resharding:** Splitting an overloaded shard into two without taking the cluster offline requires live CDC (Change Data Capture) replication and dual-writing.\n",
      "questions": [
        {
          "id": "shard-1",
          "question": "Which sharding strategy is most susceptible to severe hot-spotting when data features sequential autoincrementing IDs or timestamps?",
          "options": [
            "Hash-based sharding",
            "Range-based sharding",
            "Consistent hashing with virtual nodes",
            "Geographic proximity sharding"
          ],
          "correct_option": 1,
          "explanation": "Range-based sharding places consecutive values on the same physical node, directing all latest writes and reads to the newest active shard while older shards sit idle."
        },
        {
          "id": "shard-2",
          "question": "What is the primary operational trade-off of asynchronous master-replica replication?",
          "options": [
            "Lower write latency on primary at the risk of replication lag and stale reads on replicas",
            "Replicas cannot service read traffic",
            "Primary node locks on every read query",
            "Transactions cannot use primary keys"
          ],
          "correct_option": 0,
          "explanation": "Asynchronous replication allows the primary to confirm writes immediately without waiting for replicas to confirm, reducing latency but exposing replicas to replication lag."
        },
        {
          "id": "dbs-3",
          "question": "What is the primary risk associated with asynchronous replication between a database primary and its read replicas?",
          "options": [
            "Replication lag can cause clients to read stale data, and un-replicated commits are lost if the primary crashes before sync",
            "Write latency increases proportionally with the number of replicas",
            "Write operations must be approved by a 2/3 quorum",
            "Foreign key constraints cannot be enforced"
          ],
          "correct_option": 0,
          "explanation": "In async replication, the primary confirms writes before sending them to replicas. Replicas may serve stale reads (replication lag), and if the primary dies before replicating, data loss occurs."
        }
      ],
      "difficulty": "Hard",
      "companyTags": [
        "Amazon",
        "Google",
        "Meta",
        "Salesforce"
      ],
      "keyTakeaways": [
        "Replication: Replicating identical data across replicas for read scaling and fault tolerance.",
        "Sharding: Horizontal partitioning of table rows across different database instances using a shard key.",
        "Split-Brain: When network partition causes two nodes to both believe they are the active leader."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Database+Sharding%2C+Partitioning+%26+Replication+System+Design+Fundamentals+lecture",
      "prerequisites": [
        "Relational Database Management Systems",
        "ACID Transactions and Indexing"
      ],
      "externalResources": [
        {
          "title": "Database Sharding and Replication — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/database-sharding-system-design/",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "CAP Theorem and Distributed Databases — MIT OpenCourseWare",
          "provider": "MIT OpenCourseWare",
          "url": "https://ocw.mit.edu/courses/6-824-distributed-computer-systems-engineering-spring-2006/",
          "difficulty": "Advanced",
          "isFree": true
        }
      ]
    },
    {
      "id": "message-queues-kafka",
      "slug": "message-queues-and-kafka",
      "title": "Message Queues & Event-Driven Architecture (Kafka vs. RabbitMQ)",
      "description": "Decoupled asynchronous processing, publish-subscribe, consumer groups, Kafka partition offsets, and Dead-Letter Queues (DLQ).",
      "estimatedMinutes": 22,
      "notesMarkdown": "# Distributed Message Queues & Event Streaming: RabbitMQ & Apache Kafka\n\nMessage queues and distributed event streaming platforms decouple producer and consumer services, absorb high-traffic spikes (load leveling), and guarantee reliable asynchronous communication.\n\n---\n\n## 1. Message Queue vs. Distributed Event Log\n\n```\nTraditional Message Queue (e.g., RabbitMQ):\nProducer ---> [ Broker Queue ] ---> Consumer A\n                               ---> Consumer B (Message consumed & DELETED)\n\nDistributed Append-Only Commit Log (e.g., Apache Kafka):\nProducer ---> [ Partition Log: [0|1|2|3|4|5|6...] ] (PERSISTED ON DISK)\n                               ^           ^\n                        Consumer Group 1   Consumer Group 2 (Offset tracking)\n```\n\n| Dimension | Message Queue (RabbitMQ) | Distributed Event Log (Apache Kafka) |\n| :--- | :--- | :--- |\n| **Model** | Smart broker, dumb consumer | Dumb broker, smart consumer |\n| **Persistence** | Messages deleted upon consumer ack | Messages retained on disk according to retention policy (days/weeks)|\n| **Replayability** | Cannot replay consumed messages | Consumers can rewind offsets to replay historical events |\n| **Ordering** | FIFO within single queue | Strictly ordered **within a single partition** |\n| **Throughput** | 10k - 50k msgs/sec | 1,000,000+ msgs/sec via zero-copy OS disk writes |\n\n---\n\n## 2. Apache Kafka Architectural Core\n\n1. **Topic & Partitions:** A topic is split into multiple parallel partitions. Partitions represent the fundamental unit of parallelism and horizontal scalability.\n2. **Partition Keys:** Producers provide a key with each record:\n   $$\\text{Partition} = \\text{hash}(\\text{key}) \\pmod{\\text{NumPartitions}}$$\n   Records sharing the same key are guaranteed to land on the same partition, preserving **strict FIFO sequence order**.\n3. **Consumer Groups:** Multiple worker instances belong to a single consumer group. Each partition in a topic is assigned to strictly one consumer within a group.\n4. **Offsets:** Consumers maintain a sequentially increasing integer pointer (offset) representing their progress through the partition log.\n\n---\n\n## 3. Message Delivery Semantics\n\n```\n1. At-Most-Once:\n   Consumer commits offset BEFORE processing message. Crash => Message LOST.\n\n2. At-Least-Once (Most Common):\n   Consumer processes message, THEN commits offset. Crash => Message REPROCESSED.\n   *Requirement: Consumers must be IDEMPOTENT.*\n\n3. Exactly-Once Processing (EOS):\n   Requires transactional producers + atomic read-process-write state commits (Kafka Streams/Flink).\n```\n\n### Designing Idempotent Consumers\nSince network timeouts can duplicate messages during delivery, consumers must handle repeated deliveries without side-effects:\n- **Idempotency Key:** Producers generate a UUID with each transaction. The consumer stores processed keys in an atomic Redis/SQL table (`INSERT ... ON CONFLICT DO NOTHING`).\n",
      "questions": [
        {
          "id": "mq-1",
          "question": "How does Apache Kafka guarantee strict chronological ordering of events for an individual user?",
          "options": [
            "By using a global lock across all partitions",
            "By hashing the user ID as the partition key, routing all user events to the same partition",
            "By running Kafka on a single CPU core",
            "By setting consumer group size to zero"
          ],
          "correct_option": 1,
          "explanation": "Kafka guarantees FIFO message ordering strictly within individual partitions. Assigning the user ID as the key routes all that user's events to the exact same partition."
        },
        {
          "id": "mq-2",
          "question": "What is the primary role of a Dead-Letter Queue (DLQ) in an asynchronous distributed pipeline?",
          "options": [
            "To accelerate message compression algorithms",
            "To store unprocessable or poisoned messages that fail repeatedly, preventing queue congestion",
            "To encrypt consumer authentication passwords",
            "To replicate the primary database WAL"
          ],
          "correct_option": 1,
          "explanation": "A DLQ isolates malformed or failing messages after a threshold of retries, allowing the main processing pipeline to continue without getting stuck on a single message."
        },
        {
          "id": "mq-3",
          "question": "How does Apache Kafka achieve extreme throughput and low latency even when persisting billions of messages to physical disk?",
          "options": [
            "Sequential append-only disk I/O, OS page cache utilization, and kernel sendfile() zero-copy data transfer",
            "By storing all messages strictly in RAM without disk commits",
            "By encrypting messages with symmetric AES hardware acceleration",
            "By bypassing consumer acknowledgments completely"
          ],
          "correct_option": 0,
          "explanation": "Sequential disk access is nearly as fast as random memory access. Kafka writes sequentially to immutable commit logs and uses the Linux kernel sendfile() system call to transfer data directly from OS page cache to network sockets without user-space buffer copies."
        }
      ],
      "difficulty": "Hard",
      "companyTags": [
        "LinkedIn",
        "Netflix",
        "Uber",
        "Stripe"
      ],
      "keyTakeaways": [
        "Kafka is an append-only commit log partitioned across topics, enabling sequential disk I/O and zero-copy OS paging.",
        "Delivery semantics: At-most-once (zero duplicates, possible loss), At-least-once (no loss, possible duplicates), Exactly-once (idempotent producer + transactional API).",
        "Consumer groups allow multiple workers to consume partitions in parallel."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Message+Queues+%26+Event-Driven+Architecture+%28Kafka+vs.+RabbitMQ%29+System+Design+Fundamentals+lecture",
      "prerequisites": [
        "Publish-Subscribe Architectural Pattern",
        "Concurrency and Threading"
      ],
      "externalResources": [
        {
          "title": "Message Queues and Event Streaming — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/message-queues-system-design/",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "Apache Kafka Architecture Documentation",
          "provider": "Official Documentation",
          "url": "https://kafka.apache.org/documentation/",
          "difficulty": "Advanced",
          "isFree": true
        }
      ]
    },
    {
      "id": "rate-limiting",
      "slug": "rate-limiting-algorithms",
      "title": "Rate Limiting & Throttling Algorithms",
      "description": "Protecting microservices from DDoS and abuse using Token Bucket, Leaky Bucket, Sliding Window Log, and distributed Redis counters.",
      "estimatedMinutes": 18,
      "notesMarkdown": "# API Rate Limiting & Traffic Shaping Algorithms\n\nRate limiting controls the rate of traffic sent or received by an API network interface, protecting upstream services against DoS attacks, brute-force credential stuffing, resource starvation, and billing spikes.\n\n---\n\n## 1. The 5 Classic Rate Limiting Algorithms\n\n```\n1. Token Bucket:              2. Leaky Bucket:             3. Sliding Window Counter:\n+-------------------+         +-------------------+        +--------------------+\n| Capacity: B tokens|         | Constant leak rate|        | Prev Win  | Curr Win|\n| Refill: R / sec   |         | Overflow dropped  |        | 70 reqs   | 30 reqs |\n+-------------------+         +-------------------+        +--------------------+\n```\n\n### 1. Token Bucket\n- A bucket holds up to $B$ tokens. Tokens are continuously added at a fixed rate of $R$ tokens/sec.\n- Incoming request consumes 1 token. If tokens available, request passes; otherwise rejected with `HTTP 429 Too Many Requests`.\n- **Advantage:** Allows sudden bursts of traffic up to bucket capacity $B$ while maintaining average rate $R$.\n\n### 2. Leaky Bucket\n- Incoming requests enter a FIFO buffer of fixed size. Requests are pulled and processed at a constant strictly regulated rate.\n- **Advantage:** Smooths out traffic spikes; perfect for systems requiring predictable downstream throughput.\n\n### 3. Fixed Window Counter\n- Divides timeline into fixed 1-minute blocks (e.g., 12:00:00–12:01:00). Counter tracks requests per window.\n- **Vulnerability (Boundary Burst Problem):** An attacker sends 100 requests at 12:00:59 and another 100 at 12:01:01. Both windows record 100 requests (under limit), but 200 requests hit within a 2-second span (2x burst).\n\n### 4. Sliding Window Log\n- Stores timestamp of every request in a sorted set (e.g., Redis ZSET). On each request, remove timestamps older than $(\\text{now} - \\text{window})$.\n- **Disadvantage:** Memory prohibitive at scale (storing millions of timestamps).\n\n### 5. Sliding Window Counter (Industry Standard)\n- Approximates traffic rate by blending counts from current and previous windows:\n  $$\\text{Estimated Rate} = \\text{PrevCount} \\times (1 - \\text{Weight}) + \\text{CurrCount}$$\n  Where $\\text{Weight} = \\frac{\\text{Time elapsed in current window}}{\\text{Window duration}}$.\n\n---\n\n## 2. Distributed Rate Limiting with Redis & Lua Scripts\n\nIn distributed systems, race conditions occur if multiple API gateways read and write rate limit keys concurrently.\n- **Solution:** Execute rate limit checks atomically inside Redis using a single **Lua Script**, eliminating network round-trips and race conditions.\n\n---\n\n## 3. Standard HTTP Headers for Rate Limiting\n\n- `X-RateLimit-Limit`: Maximum requests permitted within window.\n- `X-RateLimit-Remaining`: Remaining request quota in current window.\n- `X-RateLimit-Reset`: Unix timestamp when the quota resets.\n- `Retry-After`: Number of seconds to wait before retrying when receiving `HTTP 429`.\n",
      "questions": [
        {
          "id": "rl-1",
          "question": "Which rate limiting algorithm allows bursts of requests up to maximum bucket capacity while enforcing a constant average token generation rate?",
          "options": [
            "Leaky Bucket",
            "Token Bucket",
            "Fixed Window Counter",
            "Round Robin Throttling"
          ],
          "correct_option": 1,
          "explanation": "Token Bucket permits requests as long as tokens remain in the bucket, allowing temporary bursts up to capacity while refilling at a steady rate."
        },
        {
          "id": "rl-2",
          "question": "Why is the Fixed Window Counter algorithm often insufficient for security-critical API rate limiting?",
          "options": [
            "It consumes too much memory on Redis",
            "A burst of requests right at the boundary between two adjacent windows can allow double the intended rate limit",
            "It cannot run in distributed environments",
            "It only supports IPv6 addresses"
          ],
          "correct_option": 1,
          "explanation": "Clients can concentrate maximum requests right before a window closes and right after the next window opens, generating twice the allowed requests in a short time frame."
        },
        {
          "id": "rl-3",
          "question": "Which rate limiting algorithm allows temporary bursts of traffic up to a predefined capacity while maintaining a steady long-term average rate?",
          "options": [
            "Token Bucket",
            "Leaky Bucket",
            "Fixed Window Counter",
            "Round Robin"
          ],
          "correct_option": 0,
          "explanation": "The Token Bucket algorithm accumulates tokens up to its maximum capacity. A burst of requests can consume all available tokens instantly, but subsequent requests are restricted by the token refill rate."
        }
      ],
      "difficulty": "Hard",
      "companyTags": [
        "Stripe",
        "Cloudflare",
        "Twitter",
        "GitHub"
      ],
      "keyTakeaways": [
        "Token Bucket: Tokens added at constant rate; allows bursts up to bucket capacity.",
        "Leaky Bucket: Requests enter bucket; leaked out to processing at fixed, smooth rate.",
        "Sliding Window Log: Precise timestamp tracking; high memory overhead.",
        "Sliding Window Counter: Combines fixed window counters with weighted ratio for smooth, low-memory rate limiting."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Rate+Limiting+%26+Throttling+Algorithms+System+Design+Fundamentals+lecture",
      "prerequisites": [
        "HTTP Headers and Status Codes",
        "Redis Key-Value Operations"
      ],
      "externalResources": [
        {
          "title": "API Rate Limiting Algorithms — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/rate-limiting-system-design/",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "api-paradigms",
      "slug": "api-architectures-and-protocols",
      "title": "API Architectures: REST vs. GraphQL vs. gRPC vs. WebSockets",
      "description": "Network communication protocols, over-fetching vs under-fetching, Protocol Buffers binary serialization, HTTP/2 multiplexing, and bi-directional real-time duplex.",
      "estimatedMinutes": 20,
      "notesMarkdown": "# Modern API Architectures: REST, GraphQL, gRPC & WebSockets\n\nModern distributed systems select API communication paradigms based on latency budgets, network constraints, payload size, client diversity, and real-time streaming requirements.\n\n---\n\n## 1. Architectural Comparison Matrix\n\n| Dimension | REST | GraphQL | gRPC | WebSockets |\n| :--- | :--- | :--- | :--- | :--- |\n| **Transport Protocol**| HTTP/1.1 or HTTP/2 | HTTP/1.1 or HTTP/2 | HTTP/2 (Multiplexed) | TCP (Full-duplex WebSocket) |\n| **Data Format** | JSON, XML | JSON | Protocol Buffers (Binary) | Text (JSON) or Binary |\n| **Contract / Schema** | OpenAPI / Swagger | GraphQL Schema (SDL) | `.proto` Definition | Custom framing protocol |\n| **Over/Under-Fetching**| Common (Fixed schemas)| Eliminated (Client selects fields) | Solved by specific RPC calls | Irrelevant (Event streams) |\n| **Streaming Support** | Polling / SSE | Subscriptions | Unary, Client, Server, Bi-directional | Full Bi-directional duplex |\n| **Primary Domain** | Public Web APIs / CRUD | Mobile frontends / Aggregators | Internal Microservices | Real-time chat / Trading |\n\n---\n\n## 2. In-Depth Architectural Evaluation\n\n### 1. REST (Representational State Transfer)\n- **Core Principles (Roy Fielding):** Stateless, client-server, cacheable, uniform interface, resource-oriented URIs (`GET /users/123/orders`).\n- **Strengths:** Universally supported across every programming language, browser, and CDN; native HTTP caching (`Cache-Control`, `ETags`).\n- **Weaknesses:** Over-fetching (fetching 50 unused fields) and Under-fetching (requiring 5 serial HTTP roundtrips to assemble a dashboard).\n\n### 2. GraphQL\n- Allows clients to declare the exact shape and fields of data required in a single request query:\n  ```graphql\n  query {\n    user(id: \"123\") {\n      name\n      orders(limit: 3) { id total status }\n    }\n  }\n  ```\n- **Strengths:** Solves frontend over/under-fetching; ideal for bandwidth-constrained mobile apps.\n- **Weaknesses:** Complex server-side query parsing; susceptible to $N+1$ database query traps (mitigated with Facebook DataLoader); hard to cache at HTTP CDN layer.\n\n### 3. gRPC (Google Remote Procedure Call)\n- High-performance, low-latency framework using **Protocol Buffers (Protobuf)** over HTTP/2 multiplexed streams.\n- **Strengths:** Compact binary payloads (up to 10x smaller and 7x faster serialization than JSON); compile-time type-safe code generation for 12+ languages; built-in streaming.\n- **Weaknesses:** Limited direct web browser support without gRPC-Web proxy; binary payloads are not human-readable without schema.\n\n### 4. WebSockets\n- Upgrades an HTTP connection to a persistent, bi-directional, full-duplex TCP socket connection.\n- **Strengths:** Near-zero per-message framing overhead (2–10 bytes vs 1KB HTTP headers); instantaneous push capability.\n- **Use Cases:** Live financial ticker updates, collaborative real-time document editing, multiplayer gaming, chat messaging.\n",
      "questions": [
        {
          "id": "api-1",
          "question": "What primary performance advantage makes gRPC faster and more bandwidth-efficient than REST APIs for microservices?",
          "options": [
            "gRPC runs without TCP connections",
            "Protocol Buffers binary serialization and multiplexed streaming over HTTP/2",
            "gRPC eliminates database indexing",
            "gRPC avoids using CPU caches"
          ],
          "correct_option": 1,
          "explanation": "gRPC encodes data into compact binary Protocol Buffers and uses HTTP/2 multiplexing over a single persistent TCP connection, drastically cutting payload size and latency."
        },
        {
          "id": "api-2",
          "question": "What major problem associated with traditional REST APIs does GraphQL specifically solve?",
          "options": [
            "Over-fetching and Under-fetching of data (clients specify exact fields needed in a single request)",
            "High latency caused by TCP handshakes",
            "Lack of support for JSON responses",
            "Inability to authenticate requests using JWT tokens"
          ],
          "correct_option": 0,
          "explanation": "In REST, endpoints return fixed payloads (over-fetching) or require multiple endpoint calls to assemble related data (under-fetching). GraphQL lets clients declare the exact fields required in one query."
        },
        {
          "id": "api-3",
          "question": "Why is gRPC predominantly favored over REST for high-throughput internal microservice-to-microservice communication?",
          "options": [
            "Compact binary serialization via Protocol Buffers over HTTP/2 multiplexed streams with built-in code generation",
            "It is easier to inspect in web browser developer tools",
            "It eliminates the need for schema definitions",
            "It runs directly over raw Ethernet frames without TCP"
          ],
          "correct_option": 0,
          "explanation": "gRPC uses Protocol Buffers (Protobuf) for compact binary payloads and HTTP/2 for multiplexing, streaming, and header compression, providing significantly lower CPU and network overhead than REST/JSON."
        }
      ],
      "difficulty": "Medium",
      "companyTags": [
        "Netflix",
        "Meta",
        "Stripe",
        "Amazon"
      ],
      "keyTakeaways": [
        "REST: Resource-oriented, standard HTTP verbs, stateless, JSON payloads.",
        "GraphQL: Single endpoint, client requests exact fields, solves over-fetching and under-fetching.",
        "gRPC: Protocol Buffers over HTTP/2, high performance binary serialization, streaming.",
        "WebSockets: Full-duplex persistent bidirectional TCP connection for real-time events."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=API+Architectures%3A+REST+vs.+GraphQL+vs.+gRPC+vs.+WebSockets+System+Design+Fundamentals+lecture",
      "prerequisites": [
        "HTTP/1.1 and HTTP/2 Protocols",
        "JSON and Serialization Formats"
      ],
      "externalResources": [
        {
          "title": "REST vs GraphQL vs gRPC — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/rest-vs-graphql-vs-grpc-which-api-architecture-to-choose/",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "MDN Web Docs: WebSockets API",
          "provider": "MDN Web Docs",
          "url": "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    }
  ]
};

export const SWE_GIT_CATEGORY: SectionCategory = {
  "id": "swe-git",
  "slug": "software-engineering-and-git",
  "title": "Software Engineering, Git & Version Control",
  "description": "Git internal object graph, branching workflows, merge vs rebase, Agile Scrum ceremonies, test pyramids, and CI/CD pipelines.",
  "icon": "GitBranch",
  "topics": [
    {
      "id": "git-internals-workflows",
      "slug": "git-internals-and-branching",
      "title": "Git Internals, Object Graph & Branching Workflows",
      "description": "Blob, Tree, Commit, Tag objects, HEAD pointer, Fast-Forward Merge vs Rebase, Cherry-Pick, and resolving conflicts.",
      "estimatedMinutes": 20,
      "notesMarkdown": "# Git Internals, Object Storage & Branching Workflows\n\nGit is a distributed version control system architected as a content-addressable directed acyclic graph (DAG) filesystem.\n\n---\n\n## 1. Git's 4 Core Object Types\n\nAll objects in `.git/objects/` are compressed with zlib and addressed by their 40-character SHA-1 (or SHA-256) hash:\n\n```\n+--------------------------------------------------------------------------+\n|                             GIT OBJECT DAG                               |\n+--------------------------------------------------------------------------+\n| 1. Blob      | Stores raw file contents (NO filename, NO permissions)   |\n| 2. Tree      | Directory structure: maps filenames to Blob or Tree SHA1s |\n| 3. Commit    | Points to top-level Tree, Parent Commit SHA1, Author, Msg |\n| 4. Tag       | Permanent pointer to a specific commit with GPG signature |\n+--------------------------------------------------------------------------+\n```\n\n```\nCommit Object (SHA: a1b2c3)\n  ├── tree: 7d8e9f (Root Tree)\n  │     ├── blob 4a5b6c: index.html\n  │     └── tree 1f2e3d: src/\n  │           └── blob 9c8b7a: app.js\n  └── parent: 0e9d8c (Previous Commit)\n```\n\n---\n\n## 2. Git Architecture: The Three Trees\n\n```\n+--------------------+      git add      +--------------------+      git commit    +--------------------+\n|  Working Directory | ----------------> |  Staging Area      | -----------------> |    Git Repository  |\n|  (Local disk files)|                   |  (Index file)      |                    |    (Commit History)|\n+--------------------+ <---------------- +--------------------+ <----------------- +--------------------+\n                            git checkout                             git reset\n```\n\n---\n\n## 3. High-Frequency Branching Operations: Merge vs. Rebase\n\n| Characteristic | `git merge` | `git rebase` |\n| :--- | :--- | :--- |\n| **History Style** | Preserves exact chronological timeline with merge commits | Creates a clean, linear, flat commit history |\n| **Commit Hashes** | Original commit hashes remain unchanged | **Rewrites commit hashes** for rebased commits |\n| **Golden Rule** | Safe on public shared branches | **NEVER rebase a public/shared branch!** |\n| **Conflict Resolution**| Resolve all conflicts once in the merge commit | Resolve conflicts step-by-step for each replayed commit |\n\n---\n\n## 4. Branching Strategies: GitFlow vs. GitHub Flow vs. Trunk-Based\n\n- **GitFlow:** Strict model with long-lived branches (`main`, `develop`, `feature/*`, `release/*`, `hotfix/*`). Best for scheduled enterprise releases.\n- **GitHub Flow:** Simple, lightweight model with only `main` and short-lived feature branches merged via Pull Requests. Best for web apps.\n- **Trunk-Based Development:** Engineers merge small, frequent commits directly into the `main` branch multiple times a day behind feature flags. Required for elite DevOps velocity (DORA metrics).\n",
      "questions": [
        {
          "id": "git-1",
          "question": "Which internal Git object represents directory structures, mapping file names to blob SHA hashes?",
          "options": [
            "Blob Object",
            "Tree Object",
            "Commit Object",
            "Index Cache"
          ],
          "correct_option": 1,
          "explanation": "A Tree object represents a directory listing, containing mode, type, SHA hash, and filename for all child files and subdirectories."
        },
        {
          "id": "git-2",
          "question": "What is the primary architectural difference between git merge and git rebase?",
          "options": [
            "Merge deletes the branch; rebase keeps it",
            "Merge creates a 3-way merge commit preserving history; rebase rewrites commits to create a linear graph",
            "Rebase works without a working tree",
            "Merge can only be used on remote repositories"
          ],
          "correct_option": 1,
          "explanation": "git merge combines histories with a merge commit having two parents; git rebase replays your commits atop the target branch, rewriting commit hashes for a linear history."
        },
        {
          "id": "git-3",
          "question": "If a developer accidentally executes \"git reset --hard HEAD~1\" and loses unpushed commits, which Git tool allows them to find the discarded commit hash and restore it?",
          "options": [
            "git reflog",
            "git log --stat",
            "git status -v",
            "git revert HEAD"
          ],
          "correct_option": 0,
          "explanation": "git reflog tracks every update made to the local HEAD pointer across checkouts, merges, resets, and commits. Even after a hard reset, the previous commit's SHA is logged in the reflog and can be restored using git checkout or git cherry-pick."
        }
      ],
      "difficulty": "Medium",
      "companyTags": [
        "GitHub",
        "GitLab",
        "Atlassian",
        "Microsoft"
      ],
      "keyTakeaways": [
        "Git objects: Blobs (file contents), Trees (directories), Commits (commit metadata + root tree), Annotated Tags.",
        "Git merge preserves branch history with a merge commit; Git rebase rewrites commit history on top of base.",
        "git cherry-pick applies the changes from an existing commit onto the current branch."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Git+Internals%2C+Object+Graph+%26+Branching+Workflows+Software+Engineering%2C+Git+%26+Version+Control+lecture",
      "prerequisites": [
        "Command Line Interface Basics",
        "Hashing and SHA Algorithms"
      ],
      "externalResources": [
        {
          "title": "Git Internals and Architecture — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/git-internals/",
          "difficulty": "Intermediate",
          "isFree": true
        },
        {
          "title": "Pro Git Book (Official Free Edition)",
          "provider": "Official Documentation",
          "url": "https://git-scm.com/book/en/v2",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    },
    {
      "id": "agile-scrum-sdlc",
      "slug": "agile-scrum-and-sdlc",
      "title": "Agile, Scrum & Software Development Life Cycles (SDLC)",
      "description": "Waterfall vs Agile, Scrum roles (Product Owner, Scrum Master), Sprint ceremonies, Story points, and Kanban flow.",
      "estimatedMinutes": 16,
      "notesMarkdown": "# Agile Methodologies, Scrum Framework & SDLC Models\n\nThe Software Development Life Cycle (SDLC) defines the structured sequence of stages through which software applications are conceptualized, built, verified, and maintained.\n\n---\n\n## 1. Waterfall vs. Agile Paradigm Shift\n\n```\nWaterfall Model (Sequential & Rigid):\n[ Requirements ] -> [ Architecture ] -> [ Implementation ] -> [ Verification ] -> [ Deployment ]\n- High risk: Late client feedback; changes late in development are exponentially expensive.\n\nAgile Framework (Iterative & Empirical):\nSprint 1: [ Plan -> Build -> Test -> Review ] -> Incremental Shippable Product\nSprint 2: [ Plan -> Build -> Test -> Review ] -> Incremental Shippable Product\n- High adaptability: Rapid feedback cycles, continuous requirement refinement.\n```\n\n---\n\n## 2. The Scrum Framework: Roles, Artifacts & Ceremonies\n\n### The 3 Core Roles\n1. **Product Owner (PO):** Defines product vision, prioritizes the Product Backlog based on business ROI, and accepts/rejects work outputs.\n2. **Scrum Master:** Servant leader who facilitates ceremonies, protects the team from external distractions, and removes organizational impediments.\n3. **Development Team:** Cross-functional, self-organizing engineers responsible for delivering a potentially shippable increment each sprint.\n\n### The 4 Scrum Ceremonies\n1. **Sprint Planning:** Team commits to a set of backlog items for the upcoming sprint (typically 1–4 weeks).\n2. **Daily Standup (Daily Scrum):** 15-minute timeboxed synchronization answering:\n   - What did I accomplish yesterday?\n   - What will I accomplish today?\n   - Are there any blockers or impediments?\n3. **Sprint Review:** Live demo of the working product increment to stakeholders for feedback.\n4. **Sprint Retrospective:** Continuous improvement meeting focusing on team processes, communication, and tooling.\n\n---\n\n## 3. Agile Metrics & Story Points\n\n- **Story Points:** Relative measure of effort, complexity, and uncertainty, commonly estimated using the Fibonacci sequence ($1, 2, 3, 5, 8, 13$).\n- **Velocity:** The average number of story points completed by the engineering team per sprint.\n- **Burndown Chart:** Visual plot comparing remaining sprint work against time, tracking whether the sprint commitment will be completed on schedule.\n",
      "questions": [
        {
          "id": "scrum-1",
          "question": "In the Scrum framework, who has sole authority and responsibility for managing and prioritizing the Product Backlog?",
          "options": [
            "Scrum Master",
            "Product Owner",
            "Lead Software Architect",
            "Engineering Manager"
          ],
          "correct_option": 1,
          "explanation": "The Product Owner is responsible for maximizing product value and prioritizing backlog user stories based on customer and business needs."
        },
        {
          "id": "agile-2",
          "question": "What is the primary objective of a Sprint Retrospective meeting in Scrum?",
          "options": [
            "For the team to inspect how the last sprint went with regards to people, processes, and tools, and identify continuous improvements",
            "To demonstrate completed features to external stakeholders and customers",
            "To estimate story points for the next 6 months of backlog items",
            "To conduct performance appraisals of software engineers"
          ],
          "correct_option": 0,
          "explanation": "The Sprint Retrospective is an internal team inspection meeting focused on identifying what went well, what went wrong, and concrete improvements for the upcoming sprint."
        },
        {
          "id": "agile-3",
          "question": "In Scrum, who is solely responsible for prioritizing and managing the Product Backlog?",
          "options": [
            "Product Owner",
            "Scrum Master",
            "Lead Software Architect",
            "Engineering Manager"
          ],
          "correct_option": 0,
          "explanation": "The Product Owner owns the Product Backlog and is responsible for ordering items to maximize product value delivered by the development team."
        }
      ],
      "difficulty": "Easy",
      "companyTags": [
        "Amazon",
        "Microsoft",
        "Accenture",
        "TCS"
      ],
      "keyTakeaways": [
        "Scrum ceremonies: Sprint Planning, Daily Standup, Sprint Review (demo), Sprint Retrospective (process improvement).",
        "Sprint backlog is owned by the developers; Product backlog is prioritized by the Product Owner.",
        "Definition of Done (DoD) specifies quality criteria for a story to be considered shippable."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Agile%2C+Scrum+%26+Software+Development+Life+Cycles+%28SDLC%29+Software+Engineering%2C+Git+%26+Version+Control+lecture",
      "prerequisites": [
        "Software Engineering Lifecycle Fundamentals"
      ],
      "externalResources": [
        {
          "title": "Agile Methodologies and Scrum Framework — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/scrum-in-software-engineering/",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    },
    {
      "id": "testing-code-quality",
      "slug": "software-testing-methodologies",
      "title": "Software Testing Methodologies, TDD & Code Coverage",
      "description": "Test Pyramid (Unit, Integration, E2E), Test-Driven Development (Red-Green-Refactor), Mocks vs Stubs, and code coverage metrics.",
      "estimatedMinutes": 18,
      "notesMarkdown": "# Software Testing Pyramid, TDD & Code Quality Metrics\n\nEffective automated testing enables teams to refactor fearlessly, ship features at high velocity, and maintain production reliability.\n\n---\n\n## 1. The Automated Testing Pyramid (Mike Cohn)\n\n```\n             / \\\n            /   \\\n           / E2E \\         End-to-End Tests (Cypress, Playwright)\n          /-------\\        - Slow, brittle, expensive, tests full user journeys\n         /  Integ  \\       Integration Tests (Database, API endpoints)\n        /-----------\\      - Verifies inter-component collaboration\n       /    Unit     \\     Unit Tests (Jest, Vitest, JUnit)\n      /---------------\\    - Fast (milliseconds), isolated, highly deterministic\n```\n\n---\n\n## 2. Test Doubles: Mocks, Stubs, and Fakes\n\nWhen testing in isolation, external dependencies (databases, network APIs) are replaced with test doubles:\n\n- **Dummy:** Passed around but never actually used (e.g., filling parameter lists).\n- **Stub:** Returns hardcoded canned answers to method calls without logic.\n- **Mock:** Pre-programmed with expectations regarding calls it should receive; verifies behavioral interactions.\n- **Fake:** Working implementation with a shortcut that makes it unsuitable for production (e.g., In-Memory H2 DB instead of PostgreSQL).\n\n---\n\n## 3. Test-Driven Development (TDD) Cycle\n\n```\n+------------+       Write failing test       +------------+\n|  RED       | -----------------------------> |   GREEN    |  Write minimal code to pass\n+------------+                                +------------+\n      ^                                             |\n      |             Clean code, preserve passing    v\n      +--------------------------------------- +------------+\n                                               |  REFACTOR  |\n                                               +------------+\n```\n\n---\n\n## 4. Code Quality & Static Analysis\n\n1. **Code Coverage:**\n   - **Line Coverage:** Percentage of executable lines invoked by test suite.\n   - **Branch Coverage:** Percentage of conditional decision paths (if/else true and false) evaluated.\n   - *Rule of Thumb:* 80% branch coverage is typically healthy; 100% line coverage does not prevent logical edge-case bugs.\n2. **Cyclomatic Complexity (Thomas McCabe):**\n   $$M = E - N + 2P$$\n   Measures the number of linearly independent paths through program code. Complexity $> 10$ indicates high defect probability and requires refactoring.\n",
      "questions": [
        {
          "id": "test-1",
          "question": "What is the primary difference between a Mock and a Stub in unit testing?",
          "options": [
            "Stubs provide canned data; Mocks verify specific method calls and parameter interactions",
            "Mocks can only be used with network sockets",
            "Stubs require end-to-end browser automation",
            "There is no difference"
          ],
          "correct_option": 0,
          "explanation": "A stub returns fixed responses to queries, while a mock verifies the behavior and method invocations made on the dependency."
        },
        {
          "id": "test-2",
          "question": "What are the three steps of the Test-Driven Development (TDD) cycle in exact sequence?",
          "options": [
            "Red (Write failing test) -> Green (Make test pass) -> Refactor (Improve code quality)",
            "Design -> Code -> Test",
            "Write code -> Write test -> Deploy",
            "Unit test -> Integration test -> E2E test"
          ],
          "correct_option": 0,
          "explanation": "TDD follows the Red-Green-Refactor cycle: write an automated test that fails initially (Red), implement the minimum code to satisfy the test (Green), and clean up design while keeping tests green (Refactor)."
        },
        {
          "id": "test-3",
          "question": "Why does 100% code coverage NOT guarantee that a software application is bug-free?",
          "options": [
            "Coverage measures lines executed, not whether edge cases, unexpected user inputs, or invalid states were asserted",
            "Because compilers optimize out test assertions in release builds",
            "Code coverage only applies to frontend JavaScript code",
            "Tests cannot execute concurrent code paths"
          ],
          "correct_option": 0,
          "explanation": "Line coverage tracks which statements executed during a test suite, but a statement can execute without asserting correct business invariants or testing missing edge cases."
        }
      ],
      "difficulty": "Medium",
      "companyTags": [
        "Google",
        "Meta",
        "Amazon",
        "Microsoft"
      ],
      "keyTakeaways": [
        "Testing pyramid: Broad base of Unit Tests -> Integration Tests -> Few E2E / UI Tests.",
        "TDD cycle: Red (write failing test) -> Green (write minimal code to pass) -> Refactor.",
        "Code coverage measures executed code paths; 100% coverage does NOT prove absence of logical bugs."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Software+Testing+Methodologies%2C+TDD+%26+Code+Coverage+Software+Engineering%2C+Git+%26+Version+Control+lecture",
      "prerequisites": [
        "Modular Programming",
        "Debugging Fundamentals"
      ],
      "externalResources": [
        {
          "title": "Software Testing Pyramid and Methodologies — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/types-software-testing/",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "cicd-devops-basics",
      "slug": "cicd-and-containerization-basics",
      "title": "CI/CD Pipelines, DevOps & Containerization Basics",
      "description": "Continuous Integration vs Continuous Delivery/Deployment, GitHub Actions, Docker containers vs Virtual Machines, Blue-Green deployments.",
      "estimatedMinutes": 18,
      "notesMarkdown": "# CI/CD Pipelines, Containerization & Zero-Downtime Deployments\n\nContinuous Integration and Continuous Deployment (CI/CD) automates the path from code commit to production release.\n\n---\n\n## 1. CI vs. CD Pipeline Stages\n\n```\n[ Developer Commit ]\n         |\n         v\n+------------------+\n|    CI STAGE      | -> 1. Build Compilation\n|  (Verification)  | -> 2. Linting & Formatting Check\n|                  | -> 3. Automated Unit & Integration Tests\n|                  | -> 4. Docker Image Container Build\n+------------------+\n         |\n         v\n+------------------+\n|    CD STAGE      | -> Continuous Delivery: Deploys automatically to Staging;\n|   (Deployment)   |                         Manual gate to Production.\n|                  | -> Continuous Deployment: Fully automated push to Production.\n+------------------+\n```\n\n---\n\n## 2. Zero-Downtime Deployment Strategies\n\n### 1. Blue-Green Deployment\n- Maintains two identical production environments: **Blue** (active live traffic) and **Green** (idle standby).\n- New version deployed and tested on Green. Once verified, router/load balancer switches traffic from Blue to Green instantaneously.\n- **Rollback:** Instantaneous switch back to Blue if errors are detected.\n\n### 2. Canary Deployment\n- Routes a small percentage of real production traffic (e.g. 2% $\\to$ 10% $\\to$ 50% $\\to$ 100%) to the new version while monitoring error rates and latency metrics.\n\n### 3. Rolling Deployment\n- Progressively replaces instances of previous application versions with new version across the server fleet one node at a time.\n",
      "questions": [
        {
          "id": "cicd-1",
          "question": "Why do Docker containers start in seconds and require far less RAM than traditional Virtual Machines?",
          "options": [
            "Containers do not use memory",
            "Containers share the host operating system kernel instead of running a full guest OS through a hypervisor",
            "Containers run only in user space without processes",
            "Containers require hardware GPU support"
          ],
          "correct_option": 1,
          "explanation": "Containers virtualize at the OS level, sharing the underlying host kernel via cgroups and namespaces rather than virtualizing physical hardware and booting full guest operating systems."
        },
        {
          "id": "cicd-2",
          "question": "What is the defining distinction between Continuous Delivery and Continuous Deployment?",
          "options": [
            "Continuous Delivery automates release readiness up to staging, requiring human approval to deploy to production; Continuous Deployment deploys every passing build directly to production automatically",
            "Continuous Delivery requires Docker while Continuous Deployment requires Kubernetes",
            "Continuous Deployment does not run unit tests",
            "Continuous Delivery is for open-source repositories only"
          ],
          "correct_option": 0,
          "explanation": "Continuous Delivery produces an artifact verified and ready for deployment with a manual \"push to prod\" approval gate. Continuous Deployment eliminates the manual gate, releasing verified code automatically."
        },
        {
          "id": "cicd-3",
          "question": "What is the primary benefit of Containerization (e.g. Docker) in modern software delivery pipelines?",
          "options": [
            "It bundles application code, runtime, system libraries, and settings into an immutable image, ensuring consistent execution across dev, test, and production",
            "It provides faster execution speed than bare-metal hardware",
            "It completely removes the need for operating system kernels",
            "It allows running x86 binaries on ARM without performance loss"
          ],
          "correct_option": 0,
          "explanation": "Containers eliminate the \"works on my machine\" problem by encapsulating code with all required runtime dependencies into an immutable image that runs identically everywhere."
        }
      ],
      "difficulty": "Medium",
      "companyTags": [
        "Amazon",
        "Netflix",
        "Google",
        "GitLab"
      ],
      "keyTakeaways": [
        "Continuous Integration (CI): Developers merge code frequently; automated build and test suites run on every commit.",
        "Continuous Delivery (CD): Code is automatically tested and ready to release to production at any time.",
        "Continuous Deployment: Every change that passes automated tests is automatically deployed to production without manual gate."
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=CI%2FCD+Pipelines%2C+DevOps+%26+Containerization+Basics+Software+Engineering%2C+Git+%26+Version+Control+lecture",
      "prerequisites": [
        "Git Workflows",
        "Linux Shell Scripting Basics"
      ],
      "externalResources": [
        {
          "title": "CI/CD Pipeline Architecture — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/continuous-integration-and-continuous-deployment-ci-cd/",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    }
  ]
};
