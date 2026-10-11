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
      "notesMarkdown": "\n# The 4 Core Pillars of OOP\n\n---\n\n## 1. Encapsulation\nBundling data (attributes) and methods that operate on that data into a single unit (class), while restricting direct access using access specifiers (`private`, `protected`, `public`).\n\n---\n\n## 2. Abstraction\nHiding internal implementation details and exposing only the essential interface to the user. Achieved via **Abstract Classes** and **Interfaces**.\n\n---\n\n## 3. Inheritance\nMechanism where a subclass inherits properties and behaviors from a parent class (IS-A relationship), promoting code reuse.\n\n---\n\n## 4. Polymorphism\nAbility of an object to take on many forms:\n- **Compile-time (Static) Polymorphism:** Method Overloading and Operator Overloading. Resolved at compile time.\n- **Run-time (Dynamic) Polymorphism:** Method Overriding. Resolved at runtime using **vtable (Virtual Method Table)** and **vptr**.\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=The+4+Pillars+of+OOP+%26+Polymorphism+OOPs+%26+Design+Patterns+lecture"
    },
    {
      "id": "solid-principles",
      "slug": "solid-principles",
      "title": "SOLID Design Principles with Code Patterns",
      "description": "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.",
      "estimatedMinutes": 20,
      "notesMarkdown": "\n# SOLID Design Principles\n\nFive essential principles for architecting maintainable, scalable object-oriented software.\n\n---\n\n## 1. Single Responsibility Principle (SRP)\nA class should have **one, and only one, reason to change**. Avoid \"God Objects\".\n\n---\n\n## 2. Open/Closed Principle (OCP)\nSoftware entities should be **open for extension, but closed for modification**. Use polymorphism and interfaces instead of sprawling `if/switch` branches.\n\n---\n\n## 3. Liskov Substitution Principle (LSP)\nSubtypes must be substitutable for their base types without altering program correctness (e.g. Classic violation: `Square` subclassing `Rectangle`).\n\n---\n\n## 4. Interface Segregation Principle (ISP)\nClients should not be forced to depend upon interfaces that they do not use. Prefer many small, cohesive interfaces over one fat interface.\n\n---\n\n## 5. Dependency Inversion Principle (DIP)\nHigh-level modules should not depend on low-level modules; both should depend on abstractions. Abstractions should not depend on details.\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=SOLID+Design+Principles+with+Code+Patterns+OOPs+%26+Design+Patterns+lecture"
    },
    {
      "id": "design-patterns",
      "slug": "essential-design-patterns",
      "title": "Essential Gang of Four (GoF) Design Patterns",
      "description": "Singleton (thread safety), Factory Method, Observer (Pub/Sub), Adapter, and Strategy patterns.",
      "estimatedMinutes": 18,
      "notesMarkdown": "\n# High-Frequency Design Patterns\n\n---\n\n## 1. Creational Patterns\n- **Singleton:** Guarantees a class has only one instance and provides a global point of access. (Use double-checked locking with `volatile` in multi-threaded Java).\n- **Factory Method:** Defines an interface for creating objects, letting subclasses decide which class to instantiate.\n\n---\n\n## 2. Structural Patterns\n- **Adapter:** Converts the interface of a class into another interface clients expect (wrapper).\n- **Decorator:** Attaches additional responsibilities to an object dynamically without subclassing.\n\n---\n\n## 3. Behavioral Patterns\n- **Observer:** One-to-many dependency where state changes automatically notify all subscribed dependents (event emitters).\n- **Strategy:** Defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime.\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=Essential+Gang+of+Four+%28GoF%29+Design+Patterns+OOPs+%26+Design+Patterns+lecture"
    },
    {
      "id": "creational-patterns",
      "slug": "creational-design-patterns",
      "title": "Creational Design Patterns: Factory, Builder & Singleton",
      "description": "Object instantiation abstraction, thread-safe Singleton, Builder pattern, and Factory Method.",
      "estimatedMinutes": 20,
      "notesMarkdown": "# Creational Design Patterns\n\nCreational design patterns abstract the instantiation process, making systems independent of how their objects are created, composed, and represented.\n\n---\n\n## 1. Singleton Pattern\nEnsures a class has only one instance and provides a global access point to it.\n```java\npublic class DatabaseConnection {\n    private static volatile DatabaseConnection instance;\n    private DatabaseConnection() {}\n    public static DatabaseConnection getInstance() {\n        if (instance == null) {\n            synchronized (DatabaseConnection.class) {\n                if (instance == null) {\n                    instance = new DatabaseConnection();\n                }\n            }\n        }\n        return instance;\n    }\n}\n```\n\n## 2. Factory Method\nDefines an interface for creating an object, but lets subclasses decide which class to instantiate.\n\n## 3. Builder Pattern\nSeparates the construction of a complex object from its representation so that the same construction process can create different representations.\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=Creational+Design+Patterns%3A+Factory%2C+Builder+%26+Singleton+OOPs+%26+Design+Patterns+lecture"
    },
    {
      "id": "structural-patterns",
      "slug": "structural-design-patterns",
      "title": "Structural Design Patterns: Adapter, Decorator, Facade & Proxy",
      "description": "Object composition, interface adaptation, dynamic responsibility decoration, and surrogate proxy controls.",
      "estimatedMinutes": 20,
      "notesMarkdown": "# Structural Design Patterns\n\nStructural design patterns explain how to assemble objects and classes into larger structures while keeping these structures flexible and efficient.\n\n---\n\n## 1. Adapter Pattern (Wrapper)\nAllows incompatible interfaces to work together. Converts the interface of an existing class into another interface expected by clients.\n- **Real-World Analogy:** Power socket converter when traveling abroad.\n- **Use Case:** Wrapping legacy third-party payment gateways with your standard internal `PaymentProcessor` interface.\n\n## 2. Decorator Pattern\nAttaches new behaviors to objects dynamically by placing them inside special wrapper objects that contain the behaviors.\n- **Alternative to:** Class inheritance explosion (subclassing for every combination of features).\n- **Example:** Java I/O streams (`new BufferedReader(new FileReader(\"file.txt\"))`) or adding toppings to a Pizza order.\n\n## 3. Facade Pattern\nProvides a simplified, high-level interface to a complex subsystem with many moving parts.\n- **Use Case:** Placing an order via a single `OrderFacade.placeOrder()` that coordinates Inventory, Payment, Shipping, and Email notification subsystems internally.\n\n## 4. Proxy Pattern\nProvides a surrogate or placeholder for another object to control access to it.\n- **Virtual Proxy:** Lazy initialization of expensive heavy objects (e.g. high-resolution image loading on scroll).\n- **Protection Proxy:** Checks caller permissions before forwarding requests (access control).\n- **Remote Proxy:** Encapsulates network communication to remote services (RPC/RMI).\n",
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
          "explanation": "While both wrap an underlying target object, Decorator\u2019s intent is to augment functionality dynamically, whereas Proxy\u2019s intent is to control, defer, or restrict access to the target."
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
      "youtube_url": "https://www.youtube.com/results?search_query=Structural+Design+Patterns%3A+Adapter%2C+Decorator%2C+Facade+%26+Proxy+OOPs+%26+Design+Patterns+lecture"
    },
    {
      "id": "behavioral-patterns",
      "slug": "behavioral-design-patterns",
      "title": "Behavioral Design Patterns: Strategy, Observer, Command & State",
      "description": "Algorithms as interchangeable strategies, pub/sub event distribution, command encapsulation, and finite state machines.",
      "estimatedMinutes": 20,
      "notesMarkdown": "# Behavioral Design Patterns\n\nBehavioral design patterns identify common communication patterns between objects and distribute responsibility cleanly.\n\n---\n\n## 1. Strategy Pattern\nDefines a family of algorithms, encapsulates each one in a separate class, and makes their objects interchangeable at runtime.\n- **Example:** A navigation app switching routes dynamically between `CarRouteStrategy`, `WalkingRouteStrategy`, and `PublicTransitStrategy`.\n- **Replaces:** Messy nested `switch` or `if-else` branches.\n\n## 2. Command Pattern\nEncapsulates a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.\n- **Components:** `Command` interface, `ConcreteCommand`, `Invoker` (UI button), `Receiver` (business service).\n- **Key Superpower:** Transactional history, batch execution, and reversible `undo()` / `redo()`.\n\n## 3. State Pattern\nAllows an object to alter its behavior when its internal state changes. The object will appear to change its class.\n- **Example:** TCP connection state (`Closed`, `Listen`, `Established`) or Media Player state (`Playing`, `Paused`, `Stopped`).\n- **Contrast with Strategy:** In State pattern, the states themselves know about transitions to other states; in Strategy, strategies are generally unaware of each other.\n",
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
          "explanation": "The Strategy pattern enables selecting an algorithm\u2019s implementation at runtime (e.g., choosing between PaymentStrategy: CreditCard, PayPal, UPI)."
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
      "youtube_url": "https://www.youtube.com/results?search_query=Behavioral+Design+Patterns%3A+Strategy%2C+Observer%2C+Command+%26+State+OOPs+%26+Design+Patterns+lecture"
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
      "notesMarkdown": "\n# Scaling & Load Balancing Fundamentals\n\n---\n\n## 1. Vertical vs. Horizontal Scaling\n- **Vertical Scaling (Scale-Up):** Adding more CPU/RAM to a single machine. Hard hardware ceiling and single point of failure (SPOF).\n- **Horizontal Scaling (Scale-Out):** Adding more commodity machines to the pool. Requires stateless application tiers.\n\n---\n\n## 2. Load Balancers (L4 vs L7)\n- **Layer 4 (Transport):** Routes traffic based on IP address and port (TCP/UDP level) without inspecting application payloads. Ultra-low latency.\n- **Layer 7 (Application):** Inspects HTTP headers, cookies, and URL paths. Can route `/api/video` and `/api/auth` to specialized worker clusters.\n\n---\n\n## 3. Consistent Hashing\nMaps servers and keys to a virtual ring ($0 \\dots 2^{32}-1$). When a server node is added or removed, only $K/N$ keys need remapping on average, preventing cache stampedes.\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=Scaling+Strategies+%26+Load+Balancing+System+Design+Fundamentals+lecture"
    },
    {
      "id": "caching-strategies",
      "slug": "caching-strategies-and-eviction",
      "title": "Caching Strategies & Eviction Policies",
      "description": "Cache-Aside, Write-Through, Write-Behind, eviction policies (LRU, LFU), and Redis in-memory storage.",
      "estimatedMinutes": 18,
      "notesMarkdown": "\n# Caching Strategies & Eviction Policies\n\n---\n\n## 1. Caching Access Patterns\n- **Cache-Aside (Lazy Loading):** App queries cache first. On miss, queries DB, populates cache, and returns. Good for read-heavy workloads.\n- **Write-Through:** App writes to cache, and cache synchronously writes to DB before returning success. Higher write latency, but ensures consistency.\n- **Write-Behind (Write-Back):** App writes to cache immediately; cache asynchronously batches updates to DB. Fastest writes, risk of data loss on crash.\n\n---\n\n## 2. Eviction Policies\n- **LRU (Least Recently Used):** Discards least recently accessed items using a Doubly Linked List + HashMap.\n- **LFU (Least Frequently Used):** Discards items with the lowest access count frequency.\n- **TTL (Time to Live):** Keys expire after a predefined duration.\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=Caching+Strategies+%26+Eviction+Policies+System+Design+Fundamentals+lecture"
    },
    {
      "id": "db-sharding-replication",
      "slug": "database-sharding-and-replication",
      "title": "Database Sharding, Partitioning & Replication",
      "description": "Horizontal sharding, shard keys, master-replica replication lag, read/write splitting, and rebalancing strategies.",
      "estimatedMinutes": 20,
      "notesMarkdown": "# Database Sharding, Partitioning & Replication\n\nWhen a single database node reaches CPU, memory, or disk storage limits, distributed data strategies allow horizontal scaling.\n\n---\n\n## 1. Sharding vs. Partitioning\n- **Vertical Partitioning:** Splitting a table by columns (e.g. separating frequently queried user profile info from heavy biographical blobs).\n- **Horizontal Partitioning (Sharding):** Splitting rows of a table across multiple distinct physical database servers.\n\n## 2. Sharding Strategies\n- **Hash-Based Sharding:** `shard = hash(shard_key) % num_shards`. Provides uniform data distribution, but resharding when adding nodes requires expensive rehash (solved by Consistent Hashing).\n- **Range-Based Sharding:** Data partitioned by value ranges (e.g. IDs 1-10,000 on Node 1; 10,001-20,000 on Node 2). Prone to **hotspots** if newer data receives all traffic.\n- **Directory-Based Sharding:** Lookup service maintains mapping of shard keys to database nodes. Flexible, but adds a network hop and potential single point of failure.\n\n## 3. Master-Replica Replication\n- **Primary (Master):** Handles all write queries (`INSERT`, `UPDATE`, `DELETE`). Logs mutations to WAL.\n- **Secondary (Replica):** Asynchronously copies WAL from primary and services read queries (`SELECT`).\n- **Replication Lag:** Delay between write committing on primary and updating on replicas. Reading immediately after writing can return stale data (read-your-own-writes inconsistency).\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=Database+Sharding%2C+Partitioning+%26+Replication+System+Design+Fundamentals+lecture"
    },
    {
      "id": "message-queues-kafka",
      "slug": "message-queues-and-kafka",
      "title": "Message Queues & Event-Driven Architecture (Kafka vs. RabbitMQ)",
      "description": "Decoupled asynchronous processing, publish-subscribe, consumer groups, Kafka partition offsets, and Dead-Letter Queues (DLQ).",
      "estimatedMinutes": 22,
      "notesMarkdown": "# Message Queues & Event-Driven Architecture\n\nSynchronous HTTP requests couple services and create cascading timeouts. Asynchronous message brokers decouple producers from consumers, absorb traffic spikes (buffering), and guarantee eventual consistency.\n\n---\n\n## 1. RabbitMQ vs. Apache Kafka\n| Feature | RabbitMQ (Message Broker) | Apache Kafka (Distributed Event Log) |\n| :--- | :--- | :--- |\n| **Model** | Smart broker, dumb consumer (AMQP exchanges & queues) | Dumb broker, smart consumer (Distributed commit log) |\n| **Persistence** | Messages deleted once acknowledged | Messages retained on disk by retention policy (days/weeks) |\n| **Replayability** | No (messages disappear after consumption) | Yes (consumers can reset offset to replay historic events) |\n| **Throughput** | ~10k-50k msgs/sec | >1,000,000 msgs/sec (zero-copy OS transfer) |\n\n## 2. Kafka Partitions & Ordering Guarantees\n- A Kafka **Topic** is divided into multiple **Partitions** for horizontal scalability.\n- Messages with the **same partition key** are guaranteed to land on the same partition and be consumed in **strict FIFO order**.\n- Within a **Consumer Group**, each partition is consumed by exactly one consumer thread at any given time.\n\n## 3. Delivery Semantics & Dead-Letter Queues (DLQ)\n- **At-most-once:** Message acknowledged before processing. No duplicates, but risk of lost data.\n- **At-least-once:** Message acknowledged only after successful processing. No lost data, but requires **idempotent consumers** to handle retries.\n- **Dead-Letter Queue (DLQ):** Unprocessable \"poison pill\" messages that exhaust retry attempts are shunted to a DLQ for isolated debugging without blocking the main event pipeline.\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=Message+Queues+%26+Event-Driven+Architecture+%28Kafka+vs.+RabbitMQ%29+System+Design+Fundamentals+lecture"
    },
    {
      "id": "rate-limiting",
      "slug": "rate-limiting-algorithms",
      "title": "Rate Limiting & Throttling Algorithms",
      "description": "Protecting microservices from DDoS and abuse using Token Bucket, Leaky Bucket, Sliding Window Log, and distributed Redis counters.",
      "estimatedMinutes": 18,
      "notesMarkdown": "# Rate Limiting & Throttling Algorithms\n\nRate limiting protects backend APIs against denial-of-service (DDoS) attacks, brute-force credential stuffing, noisy neighbors, and runaway cascading failures.\n\n---\n\n## 1. Common Rate Limiting Algorithms\n\n### A. Token Bucket\n- Tokens added to bucket at constant refill rate $r$ up to capacity $b$.\n- Each request consumes 1 token. If bucket is empty, request dropped (HTTP 429 Too Many Requests).\n- **Pros:** Allows sudden **bursts** of traffic up to capacity $b$, simple and memory efficient.\n\n### B. Leaky Bucket\n- Requests enter a FIFO queue. Requests leak out of the queue at a **constant, smooth rate**.\n- If queue is full, incoming requests overflow and are dropped.\n- **Pros:** Guarantees completely smooth, non-bursty downstream traffic flow.\n\n### C. Fixed Window Counter\n- Divides timeline into fixed intervals (e.g. 1 minute). Counts requests in window.\n- **Weakness (Boundary Burst):** A client can send $N$ requests at second 59 and $N$ requests at second 01 of the next minute, resulting in $2N$ requests in a 2-second span.\n\n### D. Sliding Window Log / Counter\n- Tracks timestamped requests in a sorted set (Redis ZSET) or blends weighted counts from current and previous window.\n- Prevents boundary burst spikes while keeping memory usage bounded.\n\n## 2. Distributed Rate Limiting with Redis\nIn multi-instance microservices, rate limits are enforced centrally via Redis using atomic **Lua scripts** or `INCR` + `EXPIRE` transactions to eliminate race conditions between servers.\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=Rate+Limiting+%26+Throttling+Algorithms+System+Design+Fundamentals+lecture"
    },
    {
      "id": "api-paradigms",
      "slug": "api-architectures-and-protocols",
      "title": "API Architectures: REST vs. GraphQL vs. gRPC vs. WebSockets",
      "description": "Network communication protocols, over-fetching vs under-fetching, Protocol Buffers binary serialization, HTTP/2 multiplexing, and bi-directional real-time duplex.",
      "estimatedMinutes": 20,
      "notesMarkdown": "# API Architectures: REST, GraphQL, gRPC & WebSockets\n\nSelecting the appropriate communication protocol is foundational to latency, client bandwidth, and system evolution.\n\n---\n\n## 1. Architectural Comparison\n\n| Attribute | REST | GraphQL | gRPC | WebSockets |\n| :--- | :--- | :--- | :--- | :--- |\n| **Protocol** | HTTP/1.1 or HTTP/2 | HTTP/1.1 or HTTP/2 | HTTP/2 (Multiplexed) | TCP (Full-duplex) |\n| **Payload** | JSON / XML (Text) | JSON (Text) | Protocol Buffers (Binary) | Raw Text / Binary |\n| **Flexibility** | Fixed endpoints (`GET /users`) | Client queries exact fields | Strict contract (`.proto` schema) | Bi-directional streams |\n| **Best For** | Public web APIs, CRUD | Mobile apps, diverse UI clients | Inter-microservice RPC | Live chat, stocks, gaming |\n\n## 2. Over-Fetching & Under-Fetching in REST\n- **Over-Fetching:** Client needs only a username, but `GET /users/42` returns 40 fields including address, billing, and settings.\n- **Under-Fetching:** Client needs user and recent orders; must make separate calls to `GET /users/42` and `GET /users/42/orders` (the $N+1$ API problem). Solved by GraphQL in a single query.\n\n## 3. Why gRPC for Internal Microservices?\n1. **Protocol Buffers:** Compact binary format, 5-10x smaller and 7x faster serialization than JSON.\n2. **HTTP/2 Transport:** Multiplexes dozens of concurrent requests over a single TCP connection, eliminating connection handshake overhead.\n3. **Code Generation:** Native client/server stubs generated automatically in Go, Java, Python, and TypeScript from a single `.proto` definition.\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=API+Architectures%3A+REST+vs.+GraphQL+vs.+gRPC+vs.+WebSockets+System+Design+Fundamentals+lecture"
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
      "notesMarkdown": "# Git Internals & Branching Strategies\n\nGit is a distributed content-addressable storage system that models repository history as a **Directed Acyclic Graph (DAG)** of immutable snapshot objects.\n\n---\n\n## 1. The 4 Git Internal Objects\nEvery object in `.git/objects/` is identified by a 40-character SHA-1 hash:\n1. **Blob (Binary Large Object):** Stores raw file contents (does not store file name or permissions).\n2. **Tree:** Represents a directory. Stores file names, permissions, and hashes pointing to Blobs or child Trees.\n3. **Commit:** Stores pointer to the root Tree, parent commit hashes, author/committer info, timestamp, and commit message.\n4. **Annotated Tag:** Permanent reference pointing directly to a specific commit object with tagger notes.\n\n## 2. Git Merge vs. Git Rebase\n- **`git merge`:**\n  - Preserves exact historical chronology.\n  - Creates a **3-way merge commit** with two parents when branches diverge.\n  - Non-destructive: never alters existing commits.\n- **`git rebase`:**\n  - Replays feature branch commits one-by-one on top of the target base branch.\n  - Produces a clean, strictly **linear history** without extra merge commits.\n  - **Golden Rule:** Never rebase commits that have already been pushed to a shared public branch.\n\n## 3. Essential Troubleshooting Commands\n- `git cherry-pick <commit>`: Applies the diff of a specific commit onto the current branch.\n- `git reset --soft HEAD~1`: Undoes the last commit but keeps staged changes.\n- `git reset --hard HEAD~1`: Discards the last commit and all working tree changes.\n- `git reflog`: Shows all reference movements, allowing recovery of \"lost\" deleted commits.\n",
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
          "question": "What is the key difference between \"git merge\" and \"git rebase\"?",
          "options": [
            "git merge creates a new merge commit preserving branching history; git rebase rewrites commit history linearly by replaying commits onto the target base",
            "git merge deletes the feature branch while rebase preserves it",
            "git rebase is non-destructive and cannot cause conflicts",
            "git merge only works on remote repositories"
          ],
          "correct_option": 0,
          "explanation": "git merge creates a 3-way merge commit that preserves exact historical branching context. git rebase reapplies feature commits one by one on top of the base branch, producing a clean, linear commit history."
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
      "youtube_url": "https://www.youtube.com/results?search_query=Git+Internals%2C+Object+Graph+%26+Branching+Workflows+Software+Engineering%2C+Git+%26+Version+Control+lecture"
    },
    {
      "id": "agile-scrum-sdlc",
      "slug": "agile-scrum-and-sdlc",
      "title": "Agile, Scrum & Software Development Life Cycles (SDLC)",
      "description": "Waterfall vs Agile, Scrum roles (Product Owner, Scrum Master), Sprint ceremonies, Story points, and Kanban flow.",
      "estimatedMinutes": 16,
      "notesMarkdown": "# Agile, Scrum & SDLC Methodologies\n\nSoftware engineering teams use structured methodologies to deliver software reliably while adapting to shifting product requirements.\n\n---\n\n## 1. Waterfall vs. Agile\n- **Waterfall:** Sequential phases (Requirements -> Design -> Implementation -> Verification -> Maintenance). Rigorous documentation, but rigid and slow to adapt.\n- **Agile:** Iterative, incremental cycles producing working software every 1-4 weeks. Emphasizes customer collaboration over rigid plans.\n\n## 2. Scrum Framework\n- **The 3 Roles:**\n  1. **Product Owner:** Defines product vision, prioritizes the Product Backlog, represents stakeholder value.\n  2. **Scrum Master:** Facilitates process, removes team blockers, protects the team from external distractions.\n  3. **Development Team:** Cross-functional engineers responsible for delivering sprint increments.\n- **The 4 Core Ceremonies:**\n  1. **Sprint Planning:** Commit to backlog user stories for the upcoming sprint.\n  2. **Daily Standup:** 15-minute sync (What did I do yesterday? What will I do today? Any blockers?).\n  3. **Sprint Review / Demo:** Showcase working software increment to stakeholders.\n  4. **Sprint Retrospective:** Inspect team process and agree on improvements for next cycle.\n\n## 3. Kanban vs Scrum\n- **Scrum:** Fixed time-boxed sprints, commit to batch scope.\n- **Kanban:** Continuous flow, visual board (To Do, In Progress, Done), strictly enforces **WIP (Work In Progress) Limits** to prevent team overload.\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=Agile%2C+Scrum+%26+Software+Development+Life+Cycles+%28SDLC%29+Software+Engineering%2C+Git+%26+Version+Control+lecture"
    },
    {
      "id": "testing-code-quality",
      "slug": "software-testing-methodologies",
      "title": "Software Testing Methodologies, TDD & Code Coverage",
      "description": "Test Pyramid (Unit, Integration, E2E), Test-Driven Development (Red-Green-Refactor), Mocks vs Stubs, and code coverage metrics.",
      "estimatedMinutes": 18,
      "notesMarkdown": "# Software Testing Methodologies & Code Quality\n\nAutomated testing ensures software works as expected and prevents regressions during refactoring.\n\n---\n\n## 1. The Martin Fowler Test Pyramid\n- **Unit Tests (Base - ~70%):** Test single functions/classes in isolation. Fast execution (milliseconds), highly deterministic.\n- **Integration Tests (Middle - ~20%):** Verify interaction between modules (e.g. Service + Database queries, HTTP handlers).\n- **End-to-End (E2E) Tests (Peak - ~10%):** Simulate real user journeys across the entire deployed system. High confidence, but slow and prone to flaky failures.\n\n## 2. Test-Driven Development (TDD)\nTDD follows the **Red-Green-Refactor** cycle:\n1. **Red:** Write a failing automated unit test before writing production code.\n2. **Green:** Write minimal code necessary to make the test pass.\n3. **Refactor:** Clean up code, remove duplication, and optimize architecture while keeping tests green.\n\n## 3. Test Doubles: Mocks vs. Stubs\n- **Stub:** Provides predetermined, canned answers to calls made during the test (state verification).\n- **Mock:** Registers expectations on which methods will be called and with what parameters. Verifies behavioral interactions (behavior verification).\n- **Fake:** Working implementation with a shortcut (e.g. in-memory SQLite database instead of PostgreSQL).\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=Software+Testing+Methodologies%2C+TDD+%26+Code+Coverage+Software+Engineering%2C+Git+%26+Version+Control+lecture"
    },
    {
      "id": "cicd-devops-basics",
      "slug": "cicd-and-containerization-basics",
      "title": "CI/CD Pipelines, DevOps & Containerization Basics",
      "description": "Continuous Integration vs Continuous Delivery/Deployment, GitHub Actions, Docker containers vs Virtual Machines, Blue-Green deployments.",
      "estimatedMinutes": 18,
      "notesMarkdown": "# CI/CD Pipelines & Containerization Basics\n\nDevOps bridges software development and IT operations to deliver frequent, high-reliability releases.\n\n---\n\n## 1. CI vs. CD\n- **Continuous Integration (CI):** Developers frequently merge code into a shared repository. Every push triggers automated builds, linters, and unit/integration tests.\n- **Continuous Delivery (CD):** Validated code is automatically packaged and staged in a deployable state for production; release requires one manual approval click.\n- **Continuous Deployment:** Every code change passing all test gates is deployed directly to production automatically without human intervention.\n\n## 2. Docker Containers vs. Virtual Machines\n- **Virtual Machines (VMs):** Emulate full hardware. Run a complete guest OS on top of a hypervisor. Heavyweight (gigabytes), slower startup.\n- **Containers (Docker):** Package application and its dependencies, sharing the **host OS kernel**. Isolated via Linux **namespaces** (PID, NET) and **cgroups** (CPU/RAM limits). Lightweight (megabytes), sub-second boot.\n\n## 3. Zero-Downtime Deployment Strategies\n- **Blue-Green Deployment:** Two identical production environments. Blue is live; Green receives the new release. Once tested, router/load balancer instantly flips traffic to Green. Rollback is instant.\n- **Canary Deployment:** Rolls out the update to a small subset of servers (e.g. 5% of users), monitors error rates and latency, and gradually scales to 100%.\n",
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
      "youtube_url": "https://www.youtube.com/results?search_query=CI%2FCD+Pipelines%2C+DevOps+%26+Containerization+Basics+Software+Engineering%2C+Git+%26+Version+Control+lecture"
    }
  ]
};
