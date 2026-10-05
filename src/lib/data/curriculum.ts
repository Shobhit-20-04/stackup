export interface Question {
  id: string;
  question: string;
  options: string[];
  correct_option: number; // 0-based
  explanation: string;
}

export interface Topic {
  id: string;
  slug: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  notesMarkdown: string;
  questions: Question[];
}

export interface SectionCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: 'BookOpen' | 'Cpu' | 'Database' | 'Network' | 'Code2';
  topics: Topic[];
}

export const CURRICULUM_DATA: Record<string, {
  name: string;
  slug: string;
  description: string;
  categories: SectionCategory[];
}> = {
  "aptitude": {
    "name": "Quantitative & Logical Aptitude",
    "slug": "aptitude",
    "description": "Master quantitative aptitude, logical reasoning, and data interpretation for campus placements and technical screening tests.",
    "categories": [
      {
        "id": "quant",
        "slug": "quantitative-aptitude",
        "title": "Quantitative Aptitude",
        "description": "Arithmetic, algebra, and numerical problem solving.",
        "icon": "BookOpen",
        "topics": [
          {
            "id": "time-work",
            "slug": "time-and-work",
            "title": "Time and Work",
            "description": "Efficiency, individual and group completion rates, and pipe & cistern problems.",
            "estimatedMinutes": 15,
            "notesMarkdown": "\n# Time and Work — High-Yield Formulas & Shortcuts\n\nTime and Work questions evaluate your ability to compute individual and collective work rates.\n\n---\n\n## 1. Core Mathematical Concept\nIf a person can finish a piece of work in **$N$ days**, then in **$1$ day**, they complete:\n$$\\text{Work per day} = \\frac{1}{N}$$\n\nConversely, if $1$ day's work is $\\frac{1}{N}$, the total time to complete the entire work is **$N$ days**.\n\n---\n\n## 2. Combined Work Shortcut\nIf Person A can finish a job in $A$ days and Person B can finish in $B$ days:\n- Work done together in $1$ day = $\\frac{1}{A} + \\frac{1}{B} = \\frac{A + B}{A \\times B}$\n- **Total days taken together:**\n$$T = \\frac{A \\times B}{A + B}$$\n\n### Three Workers:\nIf A, B, and C take $A$, $B$, and $C$ days respectively:\n$$T = \\frac{A \\times B \\times C}{AB + BC + CA}$$\n\n---\n\n## 3. The LCM Method (Best for Speed)\nInstead of dealing with fractions, assume total work = **LCM of individual days**.\n\n> **Example:**\n> - A finishes in $10$ days.\n> - B finishes in $15$ days.\n> - **Total Work = LCM(10, 15) = 30 units.**\n> - Efficiency of A = $30 / 10 = 3$ units/day.\n> - Efficiency of B = $30 / 15 = 2$ units/day.\n> - Combined efficiency = $3 + 2 = 5$ units/day.\n> - Time taken together = $30 / 5 = 6$ days.\n\n---\n\n## 4. Efficiency and Wages\nWages are directly proportional to the amount of work done. If time is identical:\n$$\\text{Ratio of wages} = \\text{Ratio of efficiencies} = \\frac{1}{T_A} : \\frac{1}{T_B}$$\n\n---\n\n## 5. Pipes and Cisterns Variant\n- **Inlet Pipe:** Work done is positive ($+1/A$).\n- **Outlet / Leak Pipe:** Work done is negative ($-1/B$).\n- If Inlet takes $A$ hours and Outlet takes $B$ hours ($B > A$), net fill time is:\n$$T = \\frac{A \\times B}{B - A}$$\n",
            "questions": [
              {
                "id": "tw-1",
                "question": "A can do a piece of work in 12 days and B can do it in 24 days. How many days will they take working together?",
                "options": [
                  "6 days",
                  "8 days",
                  "10 days",
                  "16 days"
                ],
                "correct_option": 1,
                "explanation": "Using the shortcut formula: T = (A * B) / (A + B) = (12 * 24) / (12 + 24) = 288 / 36 = 8 days."
              },
              {
                "id": "tw-2",
                "question": "A pipe can fill a tank in 6 hours, while a leak empties it in 10 hours. How long will it take to fill the tank if both are open?",
                "options": [
                  "15 hours",
                  "12 hours",
                  "8 hours",
                  "16 hours"
                ],
                "correct_option": 0,
                "explanation": "Net fill rate per hour = 1/6 - 1/10 = (5 - 3) / 30 = 2/30 = 1/15. Hence, tank fills in 15 hours."
              },
              {
                "id": "tw-3",
                "question": "A is twice as efficient as B. If A and B together finish a job in 14 days, in how many days can A alone complete it?",
                "options": [
                  "21 days",
                  "28 days",
                  "18 days",
                  "42 days"
                ],
                "correct_option": 0,
                "explanation": "Efficiency of A = 2 units/day, B = 1 unit/day. Together = 3 units/day. Total work = 3 * 14 = 42 units. Time for A alone = 42 / 2 = 21 days."
              }
            ]
          },
          {
            "id": "prob-perm",
            "slug": "probability-and-combinations",
            "title": "Permutations, Combinations & Probability",
            "description": "Selection vs arrangement, fundamental counting principle, independent events, and Bayes theorem.",
            "estimatedMinutes": 20,
            "notesMarkdown": "\n# Permutations & Probability — Campus Cheat Sheet\n\nFrequently tested in quantitative screening tests for software engineering and analytical roles.\n\n---\n\n## 1. Permutations vs. Combinations\n- **Permutation ($^n P_r$):** Order **matters** (arrangements, passwords, ranks).\n$$^n P_r = \\frac{n!}{(n - r)!}$$\n- **Combination ($^n C_r$):** Order **does not matter** (selections, committee, handshakes).\n$$^n C_r = \\frac{n!}{r!(n - r)!}$$\n\n---\n\n## 2. Key Identities\n- $^n C_0 = ^n C_n = 1$\n- $^n C_r = ^n C_{n-r}$\n- $^n C_1 = n$\n\n---\n\n## 3. Probability Fundamentals\n$$P(E) = \\frac{\\text{Number of favorable outcomes}}{\\text{Total number of possible outcomes}}$$\n\n- **Complementary Rule:** $P(E') = 1 - P(E)$ *(Often easier to compute \"none\" and subtract from 1)*.\n- **Independent Events:** $P(A \\cap B) = P(A) \\times P(B)$\n- **Mutually Exclusive:** $P(A \\cup B) = P(A) + P(B)$\n",
            "questions": [
              {
                "id": "pp-1",
                "question": "In how many ways can a team of 4 members be selected from 6 men and 4 women such that exactly 2 are men?",
                "options": [
                  "60",
                  "90",
                  "120",
                  "45"
                ],
                "correct_option": 1,
                "explanation": "Ways to choose 2 men from 6 = 6C2 = 15. Ways to choose 2 women from 4 = 4C2 = 6. Total = 15 * 6 = 90 ways."
              },
              {
                "id": "pp-2",
                "question": "Two dice are rolled simultaneously. What is the probability of getting a sum equal to 7?",
                "options": [
                  "1/6",
                  "7/36",
                  "1/12",
                  "5/36"
                ],
                "correct_option": 0,
                "explanation": "Favorable pairs for sum 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) -> 6 outcomes. Total outcomes = 36. Probability = 6/36 = 1/6."
              }
            ]
          },
          {
            "id": "speed-time-distance",
            "slug": "speed-time-distance",
            "title": "Speed, Time & Distance (Trains & Streams)",
            "description": "Relative speed, train crossing times, average speed harmonic mean, and upstream/downstream boats.",
            "estimatedMinutes": 18,
            "notesMarkdown": "\n# Speed, Time & Distance — Master Formulas\n\nCore concepts for campus aptitude tests and speed calculation rounds.\n\n---\n\n## 1. Fundamental Conversions & Relationships\n- $\\text{Distance} = \\text{Speed} \\times \\text{Time}$\n- Conversion: $1\\text{ km/hr} = \\frac{5}{18}\\text{ m/s}$ and $1\\text{ m/s} = \\frac{18}{5}\\text{ km/hr}$\n- **Average Speed** for equal distances at speeds $x$ and $y$:\n$$\\text{Average Speed} = \\frac{2xy}{x + y}$$\n\n---\n\n## 2. Relative Speed\n- **Opposite Directions:** $S_{\\text{rel}} = S_1 + S_2$\n- **Same Direction:** $S_{\\text{rel}} = |S_1 - S_2|$\n\n---\n\n## 3. Train Scenarios\n- **Crossing a point object (pole, standing man):** Distance covered = Length of train $L_T$.\n- **Crossing a platform/bridge of length $L_P$:** Distance covered = $L_T + L_P$.\n\n---\n\n## 4. Boats and Streams\n- Downstream Speed ($D$) = $U + V$ (Boat speed in still water + Stream speed)\n- Upstream Speed ($U$) = $U - V$\n- Speed of boat in still water = $\\frac{D + U}{2}$\n- Speed of stream = $\\frac{D - U}{2}$\n",
            "questions": [
              {
                "id": "std-1",
                "question": "A train 150m long is running at 54 km/h. How many seconds will it take to pass a stationary telegraph post?",
                "options": [
                  "10 sec",
                  "12 sec",
                  "15 sec",
                  "8 sec"
                ],
                "correct_option": 0,
                "explanation": "Speed in m/s = 54 * (5/18) = 15 m/s. Time = Distance / Speed = 150 / 15 = 10 seconds."
              },
              {
                "id": "std-2",
                "question": "A boat travels 24 km downstream in 2 hours and takes 4 hours to return upstream. What is the speed of the stream?",
                "options": [
                  "2 km/h",
                  "3 km/h",
                  "4 km/h",
                  "1.5 km/h"
                ],
                "correct_option": 1,
                "explanation": "Downstream speed D = 24/2 = 12 km/h. Upstream speed U = 24/4 = 6 km/h. Stream speed = (D - U) / 2 = (12 - 6) / 2 = 3 km/h."
              }
            ]
          },
          {
            "id": "profit-loss",
            "slug": "profit-loss-discount",
            "title": "Profit, Loss & Successive Discounts",
            "description": "Cost Price, Selling Price, Marked Price, Margin, and Successive Percentage Discounts.",
            "estimatedMinutes": 16,
            "notesMarkdown": "\n# Profit, Loss & Discount — Quick Reference\n\n---\n\n## 1. Key Formulas\n- $\\text{Profit} = SP - CP$ (when $SP > CP$)\n- $\\text{Loss} = CP - SP$ (when $CP > SP$)\n- $\\text{Profit Percentage} = \\left(\\frac{SP - CP}{CP}\\right) \\times 100$\n- $\\text{Loss Percentage} = \\left(\\frac{CP - SP}{CP}\\right) \\times 100$\n*(Note: Profit and loss are strictly calculated on CP unless stated otherwise).*\n\n---\n\n## 2. Marked Price & Discount\n- $\\text{Discount} = MP - SP$\n- $\\text{Discount \\%} = \\left(\\frac{MP - SP}{MP}\\right) \\times 100$\n\n---\n\n## 3. Successive Discounts\nTwo successive discounts of $a\\%$ and $b\\%$ are equivalent to a single net discount of:\n$$\\text{Net Discount} = \\left(a + b - \\frac{ab}{100}\\right)\\%$$\n",
            "questions": [
              {
                "id": "pl-1",
                "question": "An item is marked at $500 and sold with two successive discounts of 20% and 10%. What is the final selling price?",
                "options": [
                  "$360",
                  "$350",
                  "$380",
                  "$340"
                ],
                "correct_option": 0,
                "explanation": "Net discount = 20 + 10 - (20 * 10 / 100) = 30 - 2 = 28%. Final SP = 500 * (1 - 0.28) = 500 * 0.72 = $360."
              }
            ]
          },
          {
            "id": "percentages-interest",
            "slug": "percentages-and-interest",
            "title": "Percentages & Simple / Compound Interest",
            "description": "Percentage base shifts, Simple Interest, Compounding frequency, and CI-SI 2-year difference formula.",
            "estimatedMinutes": 15,
            "notesMarkdown": "\n# Percentages & Interest Rates\n\n---\n\n## 1. Percentage Shift Rule\nIf A is $x\\%$ more than B, then B is less than A by:\n$$\\left(\\frac{x}{100 + x}\\right) \\times 100\\%$$\n\n---\n\n## 2. Simple Interest (SI)\n$$SI = \\frac{P \\times R \\times T}{100}$$\n$$A = P + SI = P \\left(1 + \\frac{RT}{100}\\right)$$\n\n---\n\n## 3. Compound Interest (CI)\n$$A = P \\left(1 + \\frac{R}{100}\\right)^T$$\n$$CI = A - P$$\n\n### High-Yield Shortcut:\nDifference between CI and SI for **2 years**:\n$$D_2 = P \\left(\\frac{R}{100}\\right)^2$$\n",
            "questions": [
              {
                "id": "pi-1",
                "question": "The difference between Compound Interest and Simple Interest on a sum of $5,000 for 2 years at 10% per annum is:",
                "options": [
                  "$50",
                  "$25",
                  "$75",
                  "$100"
                ],
                "correct_option": 0,
                "explanation": "Using the shortcut formula: Difference = P * (R/100)^2 = 5000 * (10/100)^2 = 5000 * 0.01 = $50."
              }
            ]
          },
          {
            "id": "ratio-proportion",
            "slug": "ratio-proportion-alligations",
            "title": "Ratio, Proportion & Rule of Alligation",
            "description": "Direct & inverse variation, mean proportional, duplicate ratios, and weighted mixture alligations.",
            "estimatedMinutes": 14,
            "notesMarkdown": "\n# Ratio, Proportion & Mixtures\n\n---\n\n## 1. Proportions\n- Mean proportional between $a$ and $b$: $\\sqrt{ab}$\n- Third proportional to $a$ and $b$: $\\frac{b^2}{a}$\n- Fourth proportional to $a, b, c$: $\\frac{bc}{a}$\n\n---\n\n## 2. Rule of Alligation\nTo find the ratio in which two ingredients of prices $C_1$ (cheaper) and $C_2$ (dearer) are mixed to produce mean price $M$:\n$$\\frac{\\text{Quantity of Cheaper}}{\\text{Quantity of Dearer}} = \\frac{C_2 - M}{M - C_1}$$\n",
            "questions": [
              {
                "id": "rp-1",
                "question": "In what ratio must rice at $30/kg be mixed with rice at $45/kg so that the mixture is worth $35/kg?",
                "options": [
                  "2 : 1",
                  "1 : 2",
                  "3 : 2",
                  "2 : 3"
                ],
                "correct_option": 0,
                "explanation": "Using Alligation: (Dearer - Mean) / (Mean - Cheaper) = (45 - 35) / (35 - 30) = 10 / 5 = 2 : 1."
              }
            ]
          },
          {
            "id": "pipes-cisterns",
            "slug": "pipes-and-cisterns",
            "title": "Pipes and Cisterns",
            "description": "Inlet/outlet flow rates, net filling speed, and alternating pipe opening problems.",
            "estimatedMinutes": 15,
            "notesMarkdown": "# Pipes and Cisterns — High-Yield Formulas & Shortcuts\n\nPipes and cisterns are an immediate application of **Time and Work** principles, with one crucial difference: **inlet pipes perform positive work** (filling) and **outlet pipes perform negative work** (emptying).\n\n---\n\n## 1. Fundamental Flow Equations\n- If an inlet pipe fills a tank in $T$ hours, its filling rate is:\n  $$\\text{Rate} = +\\frac{1}{T} \\text{ tanks/hour}$$\n- If an outlet pipe/leak empties the full tank in $t$ hours, its emptying rate is:\n  $$\\text{Rate} = -\\frac{1}{t} \\text{ tanks/hour}$$\n\n## 2. Combined Work with Inlets and Leaks\nWhen an inlet pipe fills in $A$ hours and a bottom leak empties in $B$ hours ($B > A$):\n$$\\text{Net Rate per hour} = \\frac{1}{A} - \\frac{1}{B} = \\frac{B - A}{A \\times B}$$\n$$\\text{Net Time to fill} = \\frac{A \\times B}{B - A} \\text{ hours}$$\n\n## 3. The LCM Efficiency Shortcut\nInstead of handling fractions:\n1. Take the **LCM** of the individual times as the **Total Tank Capacity (in Liters)**.\n2. Calculate individual flow rates in **Liters/minute**.\n3. Sum the flow rates (inlets positive, outlets negative).\n4. Time taken = $\\frac{\\text{Total Capacity}}{\\text{Net Flow Rate}}$.\n\n### Example:\n- Pipe A fills in 12 min, Pipe B fills in 15 min, Pipe C empties in 20 min.\n- $\\text{LCM}(12, 15, 20) = 60\\text{ Liters}$ (Tank Capacity).\n- Rate of A = $+5\\text{ L/min}$, Rate of B = $+4\\text{ L/min}$, Rate of C = $-3\\text{ L/min}$.\n- Net Rate = $5 + 4 - 3 = 6\\text{ L/min}$.\n- Time to fill = $\\frac{60}{6} = 10\\text{ minutes}$.\n",
            "questions": [
              {
                "id": "pc-1",
                "question": "Pipe A fills a reservoir in 10 hours while Pipe B fills it in 15 hours. If both operate simultaneously, how many hours will it take to fill the reservoir completely?",
                "options": [
                  "5 hours",
                  "6 hours",
                  "7.5 hours",
                  "8 hours"
                ],
                "correct_option": 1,
                "explanation": "LCM(10, 15) = 30 units. Rate of A = 3 units/hr, Rate of B = 2 units/hr. Combined rate = 5 units/hr. Time = 30 / 5 = 6 hours."
              },
              {
                "id": "pc-2",
                "question": "A tank has a leak which empties it in 8 hours. An inlet pipe turns water in at 6 liters per minute and the tank now empties in 12 hours. What is the tank capacity?",
                "options": [
                  "8,640 liters",
                  "7,200 liters",
                  "6,400 liters",
                  "5,760 liters"
                ],
                "correct_option": 0,
                "explanation": "Inlet rate = (1/8 - 1/12) = 1/24 tank/hr. Inlet fills tank alone in 24 hours. Rate = 6 L/min = 360 L/hr. Capacity = 24 * 360 = 8,640 liters."
              }
            ]
          },
          {
            "id": "mixtures-alligations",
            "slug": "mixtures-and-alligations",
            "title": "Mixtures and Alligations",
            "description": "Rule of alligation, successive dilution, and mean concentration ratios.",
            "estimatedMinutes": 15,
            "notesMarkdown": "# Rule of Alligation & Replacement Formulas\n\nAlligation is an arithmetic shortcut to find the ratio in which two or more ingredients at given prices must be mixed to produce a mixture at a given price.\n\n---\n\n## 1. Rule of Alligation\n$$\\frac{\\text{Quantity of Cheaper}}{\\text{Quantity of Dearer}} = \\frac{\\text{Price of Dearer} - \\text{Mean Price}}{\\text{Mean Price} - \\text{Price of Cheaper}}$$\n\n```\n   Cheaper Price (c)              Dearer Price (d)\n              \\                    /\n               \\                  /\n                 Mean Price (m)\n               /                  \\\n              /                    \\\n       (d - m)           :         (m - c)\n```\n\n## 2. Repeated Dilution / Replacement Formula\nIf a container contains $x$ units of pure liquid and $y$ units are taken out and replaced with water $n$ times:\n$$\\text{Quantity of pure liquid remaining} = x \\left(1 - \\frac{y}{x}\\right)^n$$\n$$\\frac{\\text{Pure Liquid Remaining}}{\\text{Total Mixture Volume}} = \\left(1 - \\frac{y}{x}\\right)^n$$\n",
            "questions": [
              {
                "id": "ma-1",
                "question": "In what ratio must tea worth $60/kg be mixed with tea worth $65/kg so that the mixture must be worth $62/kg?",
                "options": [
                  "3 : 2",
                  "2 : 3",
                  "3 : 4",
                  "1 : 2"
                ],
                "correct_option": 0,
                "explanation": "Using alligation: (Dearer - Mean) : (Mean - Cheaper) = (65 - 62) : (62 - 60) = 3 : 2."
              },
              {
                "id": "ma-2",
                "question": "A container contains 40 liters of milk. From this, 4 liters of milk was taken out and replaced by water. This process was repeated further two times. How much milk is now contained by the container?",
                "options": [
                  "29.16 liters",
                  "30.00 liters",
                  "28.24 liters",
                  "26.34 liters"
                ],
                "correct_option": 0,
                "explanation": "Using replacement formula: x * (1 - y/x)^n = 40 * (1 - 4/40)^3 = 40 * (0.9)^3 = 40 * 0.729 = 29.16 liters."
              }
            ]
          },
          {
            "id": "clocks-calendars",
            "slug": "clocks-and-calendars",
            "title": "Clocks and Calendars",
            "description": "Angle between hands, clock gains/losses, leap year rules, and odd days computation.",
            "estimatedMinutes": 15,
            "notesMarkdown": "# Clocks & Calendars — Formulas & Rapid Solving\n\n---\n\n## 1. Clock Speed Relationships\n- Minute hand moves at **$6^\\circ$ per minute** ($360^\\circ / 60\\text{ min}$).\n- Hour hand moves at **$0.5^\\circ$ per minute** ($30^\\circ / 60\\text{ min}$).\n- Relative speed = $6^\\circ - 0.5^\\circ = \\mathbf{5.5^\\circ \\text{ per minute}}$ ($11/2^\\circ$).\n\n### Formula for Angle $\\theta$ between Hands:\n$$\\theta = \\left| 30H - \\frac{11}{2}M \\right|$$\n*(If $\\theta > 180^\\circ$, reflex angle = $360^\\circ - \\theta$)*.\n\n---\n\n## 2. Calendars & Odd Days\n- **Odd Days**: Remainder when total days are divided by 7.\n- **Ordinary Year**: 365 days = 52 weeks + **1 odd day**.\n- **Leap Year**: 366 days = 52 weeks + **2 odd days**.\n- **100 years** has **5 odd days**.\n- **200 years** has **3 odd days**.\n- **300 years** has **1 odd day**.\n- **400 years** has **0 odd days**.\n",
            "questions": [
              {
                "id": "cc-1",
                "question": "What is the angle between the hour hand and minute hand of a clock at 3:40?",
                "options": [
                  "130 degrees",
                  "140 degrees",
                  "125 degrees",
                  "135 degrees"
                ],
                "correct_option": 0,
                "explanation": "theta = |30(3) - (11/2)(40)| = |90 - 220| = |-130| = 130 degrees."
              },
              {
                "id": "cc-2",
                "question": "If January 1, 2007 was a Monday, what day of the week was January 1, 2008?",
                "options": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Sunday"
                ],
                "correct_option": 1,
                "explanation": "2007 is an ordinary year with 365 days, so it has 1 odd day. Jan 1, 2008 is 1 day after Monday = Tuesday."
              }
            ]
          }
        ]
      },
      {
        "id": "logical",
        "slug": "logical-reasoning",
        "title": "Logical Reasoning",
        "description": "Deductive reasoning, pattern recognition, seating arrangements, and relationship graphs.",
        "icon": "Code2",
        "topics": [
          {
            "id": "syllogisms",
            "slug": "syllogisms-and-deduction",
            "title": "Syllogisms & Logical Deductions",
            "description": "Venn diagram approach, \"All/Some/No\" rules, and definite vs possibility conclusions.",
            "estimatedMinutes": 12,
            "notesMarkdown": "\n# Syllogisms — High-Accuracy Venn Method\n\nSyllogisms test your ability to derive strictly true deductions from arbitrary premises.\n\n---\n\n## 1. The 4 Standard Statement Types\n1. **Universal Affirmative (A):** \"All A are B\" (Circle A inside Circle B)\n2. **Universal Negative (E):** \"No A is B\" (Disjoint circles A and B)\n3. **Particular Affirmative (I):** \"Some A are B\" (Intersecting circles A and B)\n4. **Particular Negative (O):** \"Some A are not B\"\n\n---\n\n## 2. Golden Rules for Definite Conclusions\n- Never assume beyond what is stated.\n- A conclusion is **definitely true** only if it holds across **every single valid Venn diagram**.\n- If a conclusion fails in even one valid diagram, it does not follow.\n",
            "questions": [
              {
                "id": "syl-1",
                "question": "Statements: All dogs are mammals. All mammals are animals. Conclusion: (I) All dogs are animals. (II) Some animals are dogs.",
                "options": [
                  "Only I follows",
                  "Only II follows",
                  "Both I and II follow",
                  "Neither follows"
                ],
                "correct_option": 2,
                "explanation": "Dogs is a subset of Mammals, which is a subset of Animals. Therefore, all dogs are animals (I follows) and since dogs exist, some animals are dogs (II follows)."
              }
            ]
          },
          {
            "id": "seating-arrangements",
            "slug": "seating-arrangements",
            "title": "Seating Arrangements & Puzzles",
            "description": "Circular (facing inward vs outward), linear, parallel rows, and multi-attribute grid constraints.",
            "estimatedMinutes": 18,
            "notesMarkdown": "\n# Seating Arrangements & Puzzles\n\nCrucial for campus assessment round 1 logical reasoning sections.\n\n---\n\n## 1. Circular Arrangements\n- **Facing Center:**\n  - Left = Clockwise\n  - Right = Anti-Clockwise\n- **Facing Away from Center:**\n  - Left = Anti-Clockwise\n  - Right = Clockwise\n\n---\n\n## 2. Step-by-Step Strategy\n1. Identify definite clues (e.g. \"A sits 3rd to the left of B\").\n2. Fill relative positions before conditional clues.\n3. Use a 2-case diagram when branching possibilities arise.\n",
            "questions": [
              {
                "id": "sa-1",
                "question": "Six friends A, B, C, D, E, F sit in a circle facing the center. A sits opposite D. B is to the immediate right of A. F is opposite B. Who is to the immediate left of D?",
                "options": [
                  "F",
                  "B",
                  "E",
                  "C"
                ],
                "correct_option": 0,
                "explanation": "Since B is right of A and F is opposite B, F must be to the immediate left of D."
              }
            ]
          },
          {
            "id": "blood-relations",
            "slug": "blood-relations",
            "title": "Blood Relations & Family Trees",
            "description": "Family tree generation symbols, maternal vs paternal lineages, and coded relation statements.",
            "estimatedMinutes": 12,
            "notesMarkdown": "\n# Blood Relations Strategy\n\n---\n\n## 1. Standard Notation\n- Male: $[+]$ or Square\n- Female: $[-]$ or Circle\n- Marriage / Couple: Double line $\\iff$\n- Siblings: Single horizontal line $-$\n- Next Generation (Child): Vertical down arrow $\\downarrow$\n\n---\n\n## 2. Common Terminology\n- Maternal Uncle: Mother's brother\n- Paternal Aunt: Father's sister\n- Nephew / Niece: Sibling's son / daughter\n",
            "questions": [
              {
                "id": "br-1",
                "question": "Pointing to a photograph, a woman says: \"His mother is the only daughter of my mother.\" How is the woman related to the person in the photo?",
                "options": [
                  "Mother",
                  "Aunt",
                  "Sister",
                  "Grandmother"
                ],
                "correct_option": 0,
                "explanation": "Only daughter of the speaker's mother is the woman herself. Therefore, 'His mother is me', meaning she is his mother."
              }
            ]
          },
          {
            "id": "coding-decoding",
            "slug": "coding-decoding-series",
            "title": "Coding-Decoding & Direction Sense",
            "description": "Letter shifts, reverse opposites (A-Z, B-Y), alphanumeric series, and 8-direction navigation paths.",
            "estimatedMinutes": 14,
            "notesMarkdown": "\n# Coding-Decoding & Direction Sense\n\n---\n\n## 1. Reverse Letter Pairs (Sum = 27)\n- A (1) <-> Z (26)\n- B (2) <-> Y (25)\n- C (3) <-> X (24)\n- D (4) <-> W (23)\n- E (5) <-> V (22) (LOVE)\n\n---\n\n## 2. Direction & Pythagoras\n- Remember 8 directions: N, NE, E, SE, S, SW, W, NW.\n- Shortest distance between start and finish = $\\sqrt{\\Delta x^2 + \\Delta y^2}$.\n",
            "questions": [
              {
                "id": "cd-1",
                "question": "A person walks 3 km North, then turns right and walks 4 km. How far is the person from the starting point?",
                "options": [
                  "5 km",
                  "7 km",
                  "6 km",
                  "4.5 km"
                ],
                "correct_option": 0,
                "explanation": "Using the Pythagorean theorem: distance = sqrt(3^2 + 4^2) = sqrt(9 + 16) = sqrt(25) = 5 km."
              }
            ]
          },
          {
            "id": "direction-sense",
            "slug": "direction-sense-and-navigation",
            "title": "Direction Sense & Compass Navigation",
            "description": "Cardinal coordinates, turn angles, shortest distance via Pythagoras theorem, and shadow analysis.",
            "estimatedMinutes": 15,
            "notesMarkdown": "# Direction Sense & Navigation\n\nDirection sense problems test your ability to trace a person or object's path through Euclidean 2D space.\n\n---\n\n## 1. The 8 Cardinal Points\n- Primary: **North (N)**, **South (S)**, **East (E)**, **West (W)**.\n- Secondary: **North-East (NE)**, **North-West (NW)**, **South-East (SE)**, **South-West (SW)**.\n- Right turn = $90^\\circ$ clockwise.\n- Left turn = $90^\\circ$ counter-clockwise.\n\n## 2. Shortest Distance\n$$\\text{Distance} = \\sqrt{(\\Delta x)^2 + (\\Delta y)^2}$$\nAlways draw a Cartesian diagram tracking net displacements along X (East/West) and Y (North/South) axes.\n\n## 3. Shadows Rule of Thumb\n- **Sunrise (East)**: Shadows always fall towards **West**.\n- **Sunset (West)**: Shadows always fall towards **East**.\n- **Noon (12:00 PM)**: The sun is overhead, so **no shadow** is formed.\n",
            "questions": [
              {
                "id": "ds-1",
                "question": "A person walks 12 km North, then turns right and walks 5 km. How far and in which direction is he from his starting point?",
                "options": [
                  "13 km North-East",
                  "17 km North",
                  "13 km South-West",
                  "15 km North-East"
                ],
                "correct_option": 0,
                "explanation": "Distance = sqrt(12^2 + 5^2) = sqrt(144 + 25) = sqrt(169) = 13 km. Direction is North-East."
              }
            ]
          },
          {
            "id": "statements-assumptions",
            "slug": "statements-and-assumptions",
            "title": "Statements, Assumptions & Deductions",
            "description": "Critical verbal reasoning, identifying implicit premises, and testing validity.",
            "estimatedMinutes": 15,
            "notesMarkdown": "# Critical Reasoning: Statements & Assumptions\n\nAn **assumption** is an unstated, implicit belief that the author takes for granted when making a statement.\n\n---\n\n## 1. Golden Rules of Assumptions\n1. **Never go beyond the scope**: An assumption must strictly belong to the context of the statement.\n2. **Beware of extreme words**: Words like *all, only, every, never, always* generally render assumptions invalid unless explicitly stated.\n3. **The Negation Test**: If negating the assumption collapses the argument, the assumption is **valid**.\n",
            "questions": [
              {
                "id": "sa-1",
                "question": "Statement: 'Please consult a specialist doctor for skin allergy.' Assumptions: I. Specialist doctors understand allergies better. II. Skin allergies can be cured.",
                "options": [
                  "Only I is implicit",
                  "Only II is implicit",
                  "Both I and II are implicit",
                  "Neither is implicit"
                ],
                "correct_option": 2,
                "explanation": "Recommending a specialist assumes specialists are more capable (I) and that consultation can help cure the issue (II)."
              }
            ]
          }
        ]
      },
      {
        "id": "verbal-di",
        "slug": "verbal-and-data-interpretation",
        "title": "Verbal & Data Interpretation",
        "description": "Bar charts, pie charts, tables, reading comprehension, and analytical evaluation.",
        "icon": "Database",
        "topics": [
          {
            "id": "data-interpretation",
            "slug": "data-interpretation-charts",
            "title": "Data Interpretation (Pie Charts, Tables & Bar Graphs)",
            "description": "Extracting key percentage shares, compound annual growth, and ratio metrics from dense datasets.",
            "estimatedMinutes": 16,
            "notesMarkdown": "\n# Data Interpretation — Core Techniques\n\n---\n\n## 1. Pie Chart Degree Conversion\n- $360^\\circ = 100\\%$\n- $1\\% = 3.6^\\circ$\n- To convert degrees $D$ to percentage: $P = \\frac{D}{3.6}$\n\n---\n\n## 2. Percentage Growth / Decline\n$$\\text{Growth \\%} = \\left(\\frac{\\text{Final} - \\text{Initial}}{\\text{Initial}}\\right) \\times 100$$\n",
            "questions": [
              {
                "id": "di-1",
                "question": "In a pie chart, a sector represents 72 degrees. What percentage of the total does this sector represent?",
                "options": [
                  "20%",
                  "25%",
                  "15%",
                  "18%"
                ],
                "correct_option": 0,
                "explanation": "Percentage = (72 / 360) * 100 = 1/5 * 100 = 20%."
              }
            ]
          },
          {
            "id": "sentence-correction",
            "slug": "sentence-correction-and-grammar",
            "title": "Sentence Correction & Grammar Rules",
            "description": "Subject-verb agreement, modifier placement, parallelism, and tense consistency.",
            "estimatedMinutes": 15,
            "notesMarkdown": "# Sentence Correction & Placement Grammar\n\nSentence correction questions test standard written English grammar and clarity.\n\n---\n\n## 1. Subject-Verb Agreement\n- Singular subjects take singular verbs; plural subjects take plural verbs.\n- Phrases between subject and verb (e.g. *along with, as well as, accompanied by*) do not change the subject's number.\n  * Example: *The professor, along with his students, **is** attending the seminar.*\n\n## 2. Dangling Modifiers\n- Modifiers must be placed immediately adjacent to the noun they describe.\n  * Incorrect: *Walking through the park, the trees looked majestic.*\n  * Correct: *Walking through the park, I noticed the majestic trees.*\n\n## 3. Parallelism\n- Elements in a list or comparison must share identical grammatical structures (all nouns, all gerunds, or all infinitive phrases).\n",
            "questions": [
              {
                "id": "sc-1",
                "question": "Identify the grammatically correct sentence:",
                "options": [
                  "Neither of the two candidates have completed their interview.",
                  "Neither of the two candidates has completed his or her interview.",
                  "Neither of the two candidate have completed his interview.",
                  "Neither candidate have completed their interview."
                ],
                "correct_option": 1,
                "explanation": "'Neither' is a singular distributive pronoun and requires the singular verb 'has' and singular pronouns."
              }
            ]
          }
        ]
      }
    ]
  },
  "core-cs": {
    "name": "Core CS Subjects",
    "slug": "core-cs",
    "description": "Concise interview revision summaries and question banks across Operating Systems, DBMS, Computer Networks, OOPs, and System Design.",
    "categories": [
      {
        "id": "os",
        "slug": "operating-systems",
        "title": "Operating Systems",
        "description": "Processes, CPU scheduling, deadlocks, virtual memory, and concurrency.",
        "icon": "Cpu",
        "topics": [
          {
            "id": "process-thread",
            "slug": "processes-and-threads",
            "title": "Processes vs. Threads & Context Switching",
            "description": "PCB vs TCB, memory layout, IPC mechanisms, context switch overhead.",
            "estimatedMinutes": 18,
            "notesMarkdown": "\n# Processes vs. Threads — Deep Dive\n\nOne of the top 3 most frequently asked Operating Systems interview topics.\n\n---\n\n## 1. Process vs. Thread\n\n| Attribute | Process | Thread (Lightweight Process) |\n| :--- | :--- | :--- |\n| **Definition** | Program in execution with isolated address space | Independent unit of execution within a process |\n| **Address Space** | Own dedicated virtual address space | Shares code, data, and heap with parent process |\n| **Resources** | Heavyweight; distinct file descriptors & memory | Lightweight; shares resources; has its own Stack & Registers |\n| **Creation Cost** | High (`fork()` / `exec()`) | Low (`pthread_create()`) |\n| **Communication** | IPC required (Pipes, Sockets, Shared Memory) | Direct memory access via shared heap |\n\n---\n\n## 2. Process Memory Layout\nA typical 32/64-bit process memory layout consists of:\n1. **Text (Code) Segment:** Executable machine instructions (Read-Only).\n2. **Data Segment:** Initialized global & static variables.\n3. **BSS Segment:** Uninitialized global & static variables (zeroed).\n4. **Heap Segment:** Dynamically allocated memory (`malloc`, `new`) growing **upwards**.\n5. **Stack Segment:** Local variables, function call frames, return addresses growing **downwards**.\n\n---\n\n## 3. Context Switch\nSaving the context (registers, Program Counter, PCB) of the current running process/thread and loading the context of the next scheduled process/thread.\n- **Process context switch** requires flushing the **TLB (Translation Lookaside Buffer)** due to virtual address space changes.\n- **Thread context switch** avoids TLB invalidation, making it significantly faster.\n",
            "questions": [
              {
                "id": "os-1",
                "question": "Which of the following is NOT shared between threads belonging to the same process?",
                "options": [
                  "Heap memory",
                  "Global variables",
                  "Stack and CPU Registers",
                  "Open file descriptors"
                ],
                "correct_option": 2,
                "explanation": "Each thread has its own private Stack (for function calls and local variables) and Register state (Program Counter, Stack Pointer). The Heap, Code, and open files are shared."
              },
              {
                "id": "os-2",
                "question": "Why is thread context switching faster than process context switching?",
                "options": [
                  "Threads do not use CPU registers",
                  "Threads share the same virtual address space, avoiding TLB cache flush",
                  "Threads do not require kernel scheduling",
                  "Threads run in User mode only"
                ],
                "correct_option": 1,
                "explanation": "Because threads share memory mappings, the CPU TLB (Translation Lookaside Buffer) does not need to be completely invalidated during a thread switch within the same process."
              }
            ]
          },
          {
            "id": "deadlocks",
            "slug": "synchronization-and-deadlocks",
            "title": "Deadlocks & The 4 Coffman Conditions",
            "description": "Mutual exclusion, hold and wait, no preemption, circular wait, Banker’s algorithm.",
            "estimatedMinutes": 20,
            "notesMarkdown": "\n# Deadlocks & Synchronization Cheat Sheet\n\nA **Deadlock** is a state where a set of processes are blocked because each process is holding a resource and waiting for another resource held by some other process.\n\n---\n\n## 1. The 4 Necessary Conditions (Coffman Conditions)\nA deadlock can occur **if and only if** all four conditions hold simultaneously:\n\n1. **Mutual Exclusion:** At least one resource must be non-shareable.\n2. **Hold and Wait:** A process is holding at least one resource and waiting to acquire additional resources held by other processes.\n3. **No Preemption:** Resources cannot be forcibly revoked from a process; they can only be released voluntarily.\n4. **Circular Wait:** A closed chain of processes exists such that $P_0$ waits for resource held by $P_1$, $P_1$ waits for $P_2$, ..., and $P_n$ waits for $P_0$.\n\n---\n\n## 2. Prevention vs. Avoidance\n- **Deadlock Prevention:** Design the system to invalidate at least one of the 4 Coffman conditions (e.g. enforce strict resource ordering to eliminate Circular Wait).\n- **Deadlock Avoidance:** Allow the conditions, but dynamically verify safety states before granting resources (**Banker's Algorithm**).\n",
            "questions": [
              {
                "id": "os-3",
                "question": "Which condition is invalidated by imposing a total ordering on all resource types and requiring processes to request resources in strictly increasing order?",
                "options": [
                  "Mutual Exclusion",
                  "Hold and Wait",
                  "Circular Wait",
                  "No Preemption"
                ],
                "correct_option": 2,
                "explanation": "Strict global numbering and increasing order resource allocation mathematically eliminates the possibility of a circular dependency graph (Circular Wait)."
              }
            ]
          },
          {
            "id": "cpu-scheduling",
            "slug": "cpu-scheduling-algorithms",
            "title": "CPU Scheduling Algorithms",
            "description": "FCFS, SJF (Preemptive SRTF), Round Robin, Priority Scheduling, Convoy Effect, Gantt charts.",
            "estimatedMinutes": 18,
            "notesMarkdown": "\n# CPU Scheduling Algorithms\n\n---\n\n## 1. Key Metrics\n- **Turnaround Time (TAT):** Completion Time - Arrival Time.\n- **Waiting Time (WT):** Turnaround Time - Burst Time.\n- **Response Time:** Time from arrival until the first time the CPU is allocated.\n\n---\n\n## 2. Common Scheduling Algorithms\n- **FCFS (First-Come, First-Served):** Non-preemptive. Suffers from **Convoy Effect** (short jobs wait behind long jobs).\n- **SJF / SRTF (Shortest Job First):** Optimal average waiting time. Preemptive version is Shortest Remaining Time First (SRTF).\n- **Round Robin (RR):** Preemptive based on Time Quantum $q$. If $q$ is too small, context switch overhead dominates; if too large, it degenerates into FCFS.\n- **Multilevel Feedback Queue:** Dynamically demotes CPU-bound processes and promotes I/O-bound processes.\n",
            "questions": [
              {
                "id": "os-4",
                "question": "Which CPU scheduling algorithm achieves the mathematically minimum average waiting time for a given set of stationary processes?",
                "options": [
                  "Round Robin",
                  "Shortest Job First (SJF)",
                  "Priority Scheduling",
                  "First Come First Served (FCFS)"
                ],
                "correct_option": 1,
                "explanation": "SJF is provably optimal because scheduling short jobs first reduces the waiting time of all subsequent jobs the most."
              }
            ]
          },
          {
            "id": "memory-paging",
            "slug": "memory-management-and-paging",
            "title": "Virtual Memory, Paging & Page Replacement",
            "description": "Page tables, TLB hits/misses, page fault sequence, and replacement algorithms (FIFO, LRU, Optimal).",
            "estimatedMinutes": 20,
            "notesMarkdown": "\n# Virtual Memory & Paging\n\n---\n\n## 1. Paging Architecture\n- Virtual address is split into: **Page Number ($p$)** and **Offset ($d$)**.\n- Page Table translates Page Number to **Frame Number ($f$)** in physical RAM.\n- **TLB (Translation Lookaside Buffer):** Fast hardware cache storing recent virtual-to-physical address mappings.\n\n---\n\n## 2. Page Fault Handling\n1. CPU references unmapped page (valid-invalid bit is 0 in page table).\n2. Hardware traps to OS kernel (**Page Fault Interrupt**).\n3. OS locates missing page on secondary storage (swap space).\n4. OS brings page into a free frame (invoking replacement algorithm if full).\n5. Updates page table and restarts the faulting instruction.\n\n---\n\n## 3. Page Replacement Algorithms\n- **FIFO:** Suffers from **Belady's Anomaly** (more frames can produce more page faults).\n- **LRU (Least Recently Used):** High practical performance, approximates optimal replacement.\n- **Optimal (OPT):** Replaces the page that will not be used for the longest future period (benchmark theoretical).\n",
            "questions": [
              {
                "id": "os-5",
                "question": "Which page replacement algorithm can experience Belady's Anomaly, where increasing the number of page frames leads to more page faults?",
                "options": [
                  "Least Recently Used (LRU)",
                  "Optimal (OPT)",
                  "First-In, First-Out (FIFO)",
                  "Least Frequently Used (LFU)"
                ],
                "correct_option": 2,
                "explanation": "FIFO does not satisfy the stack property, meaning the set of pages in memory for n frames is not guaranteed to be a subset of that for n+1 frames, causing Belady's Anomaly."
              }
            ]
          },
          {
            "id": "ipc-synchronization",
            "slug": "ipc-and-synchronization",
            "title": "Process Synchronization & Semaphores",
            "description": "Race conditions, critical sections, Mutex vs Counting Semaphores, and classic sync problems.",
            "estimatedMinutes": 16,
            "notesMarkdown": "\n# Process Synchronization & Semaphores\n\n---\n\n## 1. The Critical Section Problem\nA valid solution must satisfy:\n1. **Mutual Exclusion:** No two processes in critical section simultaneously.\n2. **Progress:** If no process is in CS, selection of next process cannot be delayed indefinitely.\n3. **Bounded Waiting:** A bound must exist on the number of times other processes enter CS after a request is made.\n\n---\n\n## 2. Mutex vs. Semaphore\n- **Mutex (Mutual Exclusion):** Locking mechanism owned by a single thread (ownership).\n- **Counting Semaphore:** Signaling mechanism integer $S$.\n  - `wait(S)` / `P(S)`: Decrements $S$. Blocks if $S \\le 0$.\n  - `signal(S)` / `V(S)`: Increments $S$. Wakes a waiting process.\n",
            "questions": [
              {
                "id": "os-6",
                "question": "What is the primary operational difference between a Binary Semaphore and a Mutex?",
                "options": [
                  "A mutex can only be locked/unlocked by the thread that acquired it (ownership)",
                  "A semaphore can only be used on single-core CPUs",
                  "A mutex cannot prevent race conditions",
                  "A binary semaphore uses hardware spinlocks only"
                ],
                "correct_option": 0,
                "explanation": "A Mutex has an ownership concept: only the thread that locks it may unlock it. A semaphore is a signaling mechanism: any thread can invoke signal(S) to unblock a waiting thread."
              }
            ]
          },
          {
            "id": "disk-scheduling",
            "slug": "disk-scheduling-algorithms",
            "title": "Disk Scheduling Algorithms (FCFS, SSTF, SCAN, C-SCAN)",
            "description": "HDD seek time optimization, head movement comparison, and starvation prevention.",
            "estimatedMinutes": 15,
            "notesMarkdown": "# Disk Scheduling Algorithms\n\nDisk scheduling algorithms decide the order in which disk I/O requests are serviced by the disk head to minimize **Seek Time** (the time required to move the read/write head to the desired cylinder).\n\n---\n\n## 1. Common Disk Scheduling Algorithms\n1. **FCFS (First-Come, First-Served)**: Requests serviced in arrival order. Simple, fair, but causes massive head movement.\n2. **SSTF (Shortest Seek Time First)**: Services request closest to current head position. High throughput, but causes **starvation** for distant requests.\n3. **SCAN (Elevator Algorithm)**: The head moves in one direction servicing all requests until the end of disk, then reverses direction.\n4. **C-SCAN (Circular SCAN)**: Moves in one direction servicing requests. Upon reaching the end, jumps immediately back to cylinder 0 without servicing on the return trip. Provides uniform wait times.\n5. **LOOK & C-LOOK**: Like SCAN/C-SCAN, but the head reverses as soon as the last request in that direction is serviced, rather than traveling to the physical disk edge.\n",
            "questions": [
              {
                "id": "ds-os-1",
                "question": "Which disk scheduling algorithm avoids starvation while providing the most uniform waiting time across cylinders?",
                "options": [
                  "FCFS",
                  "SSTF",
                  "C-SCAN",
                  "Priority Scheduling"
                ],
                "correct_option": 2,
                "explanation": "C-SCAN treats cylinders as a circular list, moving in one direction only and returning directly to start, ensuring uniform wait times without starvation."
              }
            ]
          },
          {
            "id": "system-calls-linux",
            "slug": "linux-system-calls-and-kernel",
            "title": "Linux System Calls, Process Lifecycle & IPC",
            "description": "User mode vs Kernel mode, fork(), exec(), wait(), and inter-process communication.",
            "estimatedMinutes": 20,
            "notesMarkdown": "# Linux System Calls & Kernel Architecture\n\nOperating systems use **dual-mode operation** (User Mode and Kernel Mode) enforced by hardware CPU privilege rings (Ring 3 vs Ring 0) to protect critical system memory.\n\n---\n\n## 1. Process Lifecycle System Calls\n- `fork()`: Creates an exact child process by duplicating the parent's memory using **Copy-on-Write (COW)**.\n  - Returns `0` in child process.\n  - Returns `child_pid` in parent process.\n  - Returns `-1` on failure.\n- `exec()` family: Replaces current process memory, code segment, and stack with a new executable program.\n- `wait()` / `waitpid()`: Parent suspends execution until child terminates, collecting termination status to prevent **zombie processes**.\n\n## 2. Zombie vs Orphan Processes\n- **Zombie Process**: Child terminated, but parent has not yet called `wait()`. Its entry remains in process table with status code.\n- **Orphan Process**: Parent terminates before child. The child is immediately adopted by `init` / `systemd` (PID 1).\n",
            "questions": [
              {
                "id": "sc-os-1",
                "question": "What is the return value of fork() inside the newly created child process?",
                "options": [
                  "Child's PID",
                  "0",
                  "-1",
                  "Parent's PID"
                ],
                "correct_option": 1,
                "explanation": "fork() returns 0 in the child process and the child PID in the parent process, allowing code to branch based on identity."
              }
            ]
          }
        ]
      },
      {
        "id": "dbms",
        "slug": "database-management-systems",
        "title": "Database Management Systems (DBMS)",
        "description": "ACID properties, indexing, SQL normalization, transactions, and concurrency control.",
        "icon": "Database",
        "topics": [
          {
            "id": "acid-transactions",
            "slug": "acid-properties-and-transactions",
            "title": "ACID Properties & Transaction Isolation",
            "description": "Atomicity (WAL), Consistency, Isolation (Dirty Read, Non-repeatable, Phantom), Durability.",
            "estimatedMinutes": 20,
            "notesMarkdown": "\n# ACID Properties & Isolation Levels\n\nThe bedrock of relational database reliability and distributed systems interviews.\n\n---\n\n## 1. The ACID Guarantees\n\n- **Atomicity:** All-or-nothing execution. Achieved using **Write-Ahead Logging (WAL)** and undo logs.\n- **Consistency:** Database transitions from one valid state satisfying all schema constraints, foreign keys, and triggers to another.\n- **Isolation:** Concurrent transactions execute without interfering with one another.\n- **Durability:** Once committed, changes survive system crashes or power failures. Achieved using disk commits and redo logs.\n\n---\n\n## 2. SQL Isolation Levels & Concurrency Phenomena\n\n| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read |\n| :--- | :---: | :---: | :---: |\n| **Read Uncommitted** | ❌ Allowed | ❌ Allowed | ❌ Allowed |\n| **Read Committed** | ✅ Prevented | ❌ Allowed | ❌ Allowed |\n| **Repeatable Read** | ✅ Prevented | ✅ Prevented | ❌ Allowed |\n| **Serializable** | ✅ Prevented | ✅ Prevented | ✅ Prevented |\n\n### Phenomena Explained:\n- **Dirty Read:** Reading uncommitted data written by a concurrent transaction that could still be rolled back.\n- **Non-Repeatable Read:** Re-reading the same row within a transaction produces different column values because another transaction modified and committed it.\n- **Phantom Read:** Re-executing a range query returns new rows added or deleted by another committed transaction.\n",
            "questions": [
              {
                "id": "db-1",
                "question": "Which concurrency phenomenon is prevented by \"Repeatable Read\" that was allowed in \"Read Committed\"?",
                "options": [
                  "Dirty Read",
                  "Non-Repeatable Read",
                  "Phantom Read",
                  "Deadlock"
                ],
                "correct_option": 1,
                "explanation": "Repeatable Read guarantees that if you read a row, subsequent reads of the same row in the same transaction return the exact same data, preventing Non-Repeatable Reads."
              },
              {
                "id": "db-2",
                "question": "Which component ensures durability and atomicity in modern relational databases during a sudden crash?",
                "options": [
                  "Query Optimizer",
                  "Write-Ahead Log (WAL)",
                  "B+ Tree Index",
                  "Buffer Pool Replacement"
                ],
                "correct_option": 1,
                "explanation": "Write-Ahead Logging (WAL) writes changes to non-volatile append-only logs before applying them to data pages, allowing recovery of committed transactions and rollback of incomplete ones."
              }
            ]
          },
          {
            "id": "normalization",
            "slug": "database-normalization",
            "title": "Database Normalization (1NF to BCNF)",
            "description": "Functional dependencies, eliminating insertion/deletion/update anomalies.",
            "estimatedMinutes": 16,
            "notesMarkdown": "\n# Database Normalization Summary\n\nNormalization organizes table columns to reduce data redundancy and eliminate anomalies.\n\n---\n\n## 1. Normal Forms Hierarchy\n1. **1NF (First Normal Form):**\n   - Each column contains atomic (indivisible) values. No repeating groups or arrays.\n2. **2NF (Second Normal Form):**\n   - Must be in 1NF.\n   - **No partial dependency:** Every non-prime attribute must depend on the whole candidate key, not a proper subset of it.\n3. **3NF (Third Normal Form):**\n   - Must be in 2NF.\n   - **No transitive dependency:** Non-prime attributes must not depend on other non-prime attributes ($X \\rightarrow Y$, $X$ must be superkey or $Y$ is prime).\n4. **BCNF (Boyce-Codd Normal Form):**\n   - For every functional dependency $X \\rightarrow Y$, $X$ must strictly be a **Super Key**.\n",
            "questions": [
              {
                "id": "db-3",
                "question": "A table is in 2NF if it is in 1NF and contains no:",
                "options": [
                  "Transitive dependencies",
                  "Partial functional dependencies",
                  "Multi-valued dependencies",
                  "Foreign keys"
                ],
                "correct_option": 1,
                "explanation": "2NF specifically eliminates partial dependencies where a non-prime attribute depends only on part of a composite primary key."
              }
            ]
          },
          {
            "id": "sql-joins-queries",
            "slug": "sql-joins-and-indexing",
            "title": "SQL Joins, Subqueries & Window Functions",
            "description": "Inner vs Outer joins, CROSS joins, GROUP BY vs HAVING, RANK vs DENSE_RANK.",
            "estimatedMinutes": 18,
            "notesMarkdown": "\n# SQL Joins & Window Functions\n\n---\n\n## 1. Join Types\n- **INNER JOIN:** Returns rows when there is a match in both tables.\n- **LEFT (OUTER) JOIN:** Returns all rows from left table, and matched rows from right table (or NULL).\n- **FULL OUTER JOIN:** Returns all rows when there is a match in either table.\n- **CROSS JOIN:** Cartesian product of both tables ($M \\times N$ rows).\n\n---\n\n## 2. Window Functions\n- **`ROW_NUMBER()`:** Unique sequential integer for every row within partition.\n- **`RANK()`:** Assigns same rank to duplicates, leaving gaps (1, 2, 2, 4).\n- **`DENSE_RANK()`:** Assigns same rank to duplicates without gaps (1, 2, 2, 3).\n",
            "questions": [
              {
                "id": "db-4",
                "question": "In SQL, what is the difference between RANK() and DENSE_RANK() when two rows have equal values?",
                "options": [
                  "RANK() skips the next ranking numbers after ties; DENSE_RANK() does not skip",
                  "DENSE_RANK() only works with numeric columns",
                  "RANK() requires an ORDER BY clause whereas DENSE_RANK() does not",
                  "They produce identical results in all SQL engines"
                ],
                "correct_option": 0,
                "explanation": "If two rows tie for rank 1, RANK() gives 1, 1, 3 for the third row, while DENSE_RANK() gives 1, 1, 2."
              }
            ]
          },
          {
            "id": "indexing-btree",
            "slug": "indexing-and-btree",
            "title": "Indexing & B/B+ Tree Data Structures",
            "description": "Clustered vs Non-Clustered index, leaf node linked lists, composite indexing, and index scans.",
            "estimatedMinutes": 18,
            "notesMarkdown": "\n# Database Indexing & B+ Trees\n\n---\n\n## 1. Clustered vs. Non-Clustered Index\n- **Clustered Index:**\n  - Dictates the physical order of data rows on disk.\n  - Exactly **one** clustered index per table (typically Primary Key).\n  - Leaf nodes contain the actual table data pages.\n- **Non-Clustered (Secondary) Index:**\n  - Separate structure with pointers to the physical data rows (row IDs or clustered key).\n  - Can have multiple non-clustered indexes on a table.\n\n---\n\n## 2. Why B+ Trees instead of Binary Trees?\n- **High Fanout:** B+ tree nodes hold hundreds of keys, keeping tree height very shallow (3-4 levels) to minimize disk I/O.\n- **Sequential Leaf Linking:** All leaf nodes in a B+ tree are doubly linked, allowing blazing-fast range queries (`WHERE age BETWEEN 20 AND 30`).\n",
            "questions": [
              {
                "id": "db-5",
                "question": "Why are B+ trees preferred over standard B-trees for relational database indexes?",
                "options": [
                  "B+ trees store data pointers in all nodes",
                  "All data pointers are stored only in the leaf nodes, which are linked for fast range scans",
                  "B+ trees require no balancing operations",
                  "B+ trees use less RAM during compilation"
                ],
                "correct_option": 1,
                "explanation": "B+ tree internal nodes only store navigation keys (increasing fanout), and all leaf nodes form a contiguous linked list, making range queries extremely efficient with sequential disk reads."
              }
            ]
          },
          {
            "id": "nosql-cap",
            "slug": "nosql-and-cap-theorem",
            "title": "CAP Theorem, BASE Model & NoSQL Paradigms",
            "description": "Consistency vs Availability vs Partition tolerance, Document, Key-Value, and Columnar stores.",
            "estimatedMinutes": 20,
            "notesMarkdown": "# CAP Theorem & NoSQL Architecture\n\nDistributed database systems must balance consistency, availability, and network durability across clusters.\n\n---\n\n## 1. Brewer's CAP Theorem\nIn any asynchronous distributed data store with network partitioning, you can choose at most **two of three** properties:\n- **Consistency (C)**: Every read receives the most recent write or an error.\n- **Availability (A)**: Every non-failing node returns a non-error response, without guarantee of latest data.\n- **Partition Tolerance (P)**: System continues operating despite arbitrary dropped or delayed network packets.\n\n> **Crucial Reality**: Network partitions (P) are unavoidable in distributed hardware. Therefore, the architectural choice is always between **CP** (Consistency over Availability) and **AP** (Availability over Consistency).\n\n## 2. ACID vs BASE\n- **ACID** (Relational): Atomicity, Consistency, Isolation, Durability.\n- **BASE** (Distributed NoSQL):\n  - **B**asically **A**vailable: Guaranteed availability.\n  - **S**oft-state: State may change over time without inputs due to replication.\n  - **E**ventual consistency: Nodes will eventually converge to identical data once writes cease.\n",
            "questions": [
              {
                "id": "cap-1",
                "question": "According to the CAP theorem, why is a 'CA' system impractical in modern distributed cloud architectures?",
                "options": [
                  "Databases cannot run without ACID transactions",
                  "Network partitions are physically inevitable across distributed networks",
                  "Hardware memory cannot scale past 1 Terabyte",
                  "SQL engines do not support horizontal sharding"
                ],
                "correct_option": 1,
                "explanation": "Network delays and packet loss will always happen across physical networks, making Partition Tolerance (P) mandatory."
              }
            ]
          },
          {
            "id": "concurrency-2pl",
            "slug": "concurrency-control-and-2pl",
            "title": "Concurrency Control & Two-Phase Locking (2PL)",
            "description": "Conflict serializability, shared vs exclusive locks, and growing/shrinking phases.",
            "estimatedMinutes": 15,
            "notesMarkdown": "# Concurrency Control & Two-Phase Locking (2PL)\n\nTo maintain database consistency when concurrent transactions execute, DBMS engines enforce **Two-Phase Locking (2PL)** to guarantee **conflict serializability**.\n\n---\n\n## 1. Lock Types\n- **Shared Lock (S-Lock)**: For reading. Multiple transactions can hold S-locks concurrently.\n- **Exclusive Lock (X-Lock)**: For writing. Only one transaction can hold X-lock on a data item; blocks all other S and X locks.\n\n## 2. The Two Phases of 2PL\n1. **Growing Phase**: Transaction may acquire locks, but **cannot release any lock**.\n2. **Shrinking Phase**: Transaction may release locks, but **cannot acquire any new locks**.\n\n> **Rigorous/Strict 2PL**: Holds all exclusive locks until transaction commits or aborts. Prevents cascading rollbacks.\n",
            "questions": [
              {
                "id": "2pl-1",
                "question": "What guarantee does Two-Phase Locking (2PL) provide for concurrent transactions?",
                "options": [
                  "Guarantees no deadlocks",
                  "Guarantees Conflict Serializability",
                  "Guarantees maximum throughput",
                  "Eliminates phantom reads"
                ],
                "correct_option": 1,
                "explanation": "2PL guarantees that any concurrent execution schedule is conflict serializable, though it can still suffer from deadlocks."
              }
            ]
          }
        ]
      },
      {
        "id": "cn",
        "slug": "computer-networks",
        "title": "Computer Networks",
        "description": "OSI model, TCP/IP handshake, DNS, HTTP/HTTPS, TLS, and routing protocols.",
        "icon": "Network",
        "topics": [
          {
            "id": "tcp-handshake",
            "slug": "tcp-three-way-handshake",
            "title": "TCP 3-Way Handshake & Connection Teardown",
            "description": "SYN, SYN-ACK, ACK, sequence numbers, TIME_WAIT state, TCP vs UDP.",
            "estimatedMinutes": 15,
            "notesMarkdown": "\n# TCP 3-Way Handshake & Teardown\n\nReliable, connection-oriented transport protocol mechanism.\n\n---\n\n## 1. 3-Way Handshake (Connection Establishment)\n1. **Client -> Server: SYN (Synchronize)**\n   - Client generates initial sequence number $ISN_C$. Sets `SYN=1`.\n2. **Server -> Client: SYN-ACK**\n   - Server acknowledges with `ACK = ISN_C + 1`.\n   - Server provides its own sequence number $ISN_S$. Sets `SYN=1, ACK=1`.\n3. **Client -> Server: ACK**\n   - Client acknowledges with `ACK = ISN_S + 1`.\n   - Connection is now **ESTABLISHED**. Data transfer begins.\n\n---\n\n## 2. 4-Way Handshake (Connection Termination)\n- Client sends **FIN**.\n- Server sends **ACK** (Server enters `CLOSE_WAIT`).\n- Server sends its own **FIN** when finished sending data.\n- Client sends **ACK** and enters **`TIME_WAIT`** state (typically $2 \\times MSL$, ~60-120 seconds) to ensure the server received the final ACK.\n",
            "questions": [
              {
                "id": "cn-1",
                "question": "Why does the TCP client enter the TIME_WAIT state after sending the final ACK during connection termination?",
                "options": [
                  "To allow the client to download remaining files",
                  "To ensure the server received the final ACK and to let delayed packets expire in the network",
                  "To preserve bandwidth for neighboring connections",
                  "To encrypt the remaining session tokens"
                ],
                "correct_option": 1,
                "explanation": "TIME_WAIT lasts 2 * MSL (Maximum Segment Lifetime). It ensures that if the final ACK was lost, retransmitted FIN segments can be answered, and stale duplicate segments cannot interfere with a new connection."
              }
            ]
          },
          {
            "id": "osi-tcpip-model",
            "slug": "osi-and-tcpip-models",
            "title": "OSI vs. TCP/IP Architecture & Layer Responsibilities",
            "description": "The 7 OSI layers, encapsulation headers, PDUs (bits, frames, packets, segments), and protocols.",
            "estimatedMinutes": 16,
            "notesMarkdown": "\n# OSI 7-Layer vs. TCP/IP Protocol Stack\n\n---\n\n## 1. OSI Layers & Protocol Data Units (PDUs)\n1. **Application (Layer 7):** User interface and network services (HTTP, DNS, SMTP). PDU: **Data**.\n2. **Presentation (Layer 6):** Data format, encryption/decryption, compression (SSL, TLS, JPEG).\n3. **Session (Layer 5):** Manages sessions and checkpoints (RPC, NetBIOS).\n4. **Transport (Layer 4):** End-to-end communication, flow control, port numbers (TCP, UDP). PDU: **Segment / Datagram**.\n5. **Network (Layer 3):** Logical addressing and routing (IP, ICMP, OSPF, BGP). PDU: **Packet**.\n6. **Data Link (Layer 2):** Physical addressing, MAC address, framing, error detection (Ethernet, ARP). PDU: **Frame**.\n7. **Physical (Layer 1):** Bit streams across physical medium (Cables, fiber optics, radio). PDU: **Bits**.\n",
            "questions": [
              {
                "id": "cn-2",
                "question": "At which OSI layer do routers primarily operate to make forwarding decisions based on destination IP addresses?",
                "options": [
                  "Data Link Layer (Layer 2)",
                  "Network Layer (Layer 3)",
                  "Transport Layer (Layer 4)",
                  "Session Layer (Layer 5)"
                ],
                "correct_option": 1,
                "explanation": "Routers inspect destination IP headers and consult routing tables at the Network Layer (Layer 3). Switches typically operate at Layer 2 (MAC addresses)."
              }
            ]
          },
          {
            "id": "dns-resolution",
            "slug": "dns-architecture-resolution",
            "title": "DNS Resolution Flow & Hierarchy",
            "description": "Recursive vs Iterative queries, Root servers, TLD servers, Authoritative servers, and DNS record types.",
            "estimatedMinutes": 14,
            "notesMarkdown": "\n# DNS Resolution Architecture\n\n---\n\n## 1. Step-by-Step DNS Query Flow\nWhen you type `https://google.com` in a browser:\n1. Browser cache -> OS resolver cache -> Local Router cache.\n2. Query sent to **Recursive Resolver** (e.g. ISP or `8.8.8.8`).\n3. Recursive resolver queries **Root Nameserver (`.`)** -> Returns TLD server (`.com`).\n4. Resolver queries **TLD Nameserver (`.com`)** -> Returns Authoritative nameserver for `google.com`.\n5. Resolver queries **Authoritative Nameserver** -> Returns actual IP address (`142.250.190.46`).\n6. Resolver caches response with TTL and returns IP to client.\n\n---\n\n## 2. Common DNS Record Types\n- **A Record:** Maps domain name to IPv4 address.\n- **AAAA Record:** Maps domain name to IPv6 address.\n- **CNAME (Canonical Name):** Alias pointing one domain to another domain name.\n- **MX Record:** Mail exchange server routing emails.\n",
            "questions": [
              {
                "id": "cn-3",
                "question": "Which DNS record type is used to map an alias domain name to another domain name rather than directly to an IP address?",
                "options": [
                  "A Record",
                  "CNAME Record",
                  "MX Record",
                  "PTR Record"
                ],
                "correct_option": 1,
                "explanation": "CNAME (Canonical Name) creates an alias pointing to the canonical domain name."
              }
            ]
          },
          {
            "id": "http-https-tls",
            "slug": "http-https-and-tls",
            "title": "HTTP/HTTPS, TLS Handshake & HTTP/2 vs HTTP/3",
            "description": "Asymmetric vs symmetric encryption, TLS handshake steps, multiplexing, and QUIC protocol.",
            "estimatedMinutes": 16,
            "notesMarkdown": "\n# HTTP, HTTPS & TLS Handshake\n\n---\n\n## 1. Why HTTPS?\nHTTP communicates in plaintext over port 80. HTTPS encrypts traffic using TLS (Transport Layer Security) over port 443, guaranteeing **Confidentiality, Integrity, and Authenticity**.\n\n---\n\n## 2. TLS 1.3 Handshake (1-RTT)\n1. **ClientHello:** Supported cipher suites + Client Random + Key Share (Diffie-Hellman public key).\n2. **ServerHello:** Selected cipher suite + Server Random + Server Key Share + Server Digital Certificate.\n3. Both sides independently calculate the shared **Symmetric Session Key** without transmitting it across the wire.\n4. Future communication uses fast symmetric encryption (AES-GCM).\n\n---\n\n## 3. Protocol Evolution\n- **HTTP/1.1:** Head-of-line blocking at application level; one request per TCP connection at a time.\n- **HTTP/2:** Binary framing layer, stream multiplexing over a single TCP connection.\n- **HTTP/3:** Replaces TCP with **QUIC (UDP-based)**, eliminating transport-level head-of-line blocking during packet loss.\n",
            "questions": [
              {
                "id": "cn-4",
                "question": "Which underlying transport protocol powers HTTP/3 to eliminate TCP head-of-line blocking?",
                "options": [
                  "SCTP",
                  "QUIC over UDP",
                  "IPsec",
                  "WebSocket over TLS"
                ],
                "correct_option": 1,
                "explanation": "HTTP/3 uses QUIC running over UDP, allowing independent multiplexed streams where packet loss on one stream does not stall other streams."
              }
            ]
          },
          {
            "id": "ip-subnetting",
            "slug": "ip-addressing-and-subnetting",
            "title": "IP Addressing, Subnetting & CIDR Calculations",
            "description": "IPv4 classes, subnet masks, slash notation (/24), and host capacity calculations.",
            "estimatedMinutes": 20,
            "notesMarkdown": "# IP Addressing, CIDR & Subnetting\n\nEvery device on the internet has a unique IP address. IPv4 addresses are **32-bit numbers** formatted into four 8-bit octets: `A.B.C.D`.\n\n---\n\n## 1. CIDR (Classless Inter-Domain Routing) Notation\nWritten as `IP/Prefix` (e.g. `192.168.1.0/24`):\n- Prefix ($/N$) specifies the **number of network bits**.\n- Remaining bits ($32 - N$) specify **host bits**.\n- Total IP addresses in subnet = $2^{(32 - N)}$.\n- Usable host addresses = $2^{(32 - N)} - 2$ (Subtracting Network ID and Broadcast Address).\n\n### Common CIDR Cheat Sheet:\n| Prefix | Subnet Mask | Usable Hosts |\n| :--- | :--- | :--- |\n| `/24` | `255.255.255.0` | $256 - 2 = 254$ |\n| `/25` | `255.255.255.128` | $128 - 2 = 126$ |\n| `/26` | `255.255.255.192` | $64 - 2 = 62$ |\n| `/30` | `255.255.255.252` | $4 - 2 = 2$ (Point-to-point) |\n",
            "questions": [
              {
                "id": "cidr-1",
                "question": "How many usable host IP addresses are available in a /26 IPv4 subnet?",
                "options": [
                  "64",
                  "62",
                  "30",
                  "126"
                ],
                "correct_option": 1,
                "explanation": "Host bits = 32 - 26 = 6. Total addresses = 2^6 = 64. Usable hosts = 64 - 2 (network & broadcast) = 62."
              }
            ]
          },
          {
            "id": "routing-protocols",
            "slug": "routing-protocols-and-algorithms",
            "title": "Routing Protocols: Distance Vector vs Link State",
            "description": "Bellman-Ford vs Dijkstra, RIP, OSPF, and BGP exterior gateway routing.",
            "estimatedMinutes": 20,
            "notesMarkdown": "# Routing Protocols: Interior & Exterior Gateway\n\nRouters direct packets across complex network topologies using routing algorithms.\n\n---\n\n## 1. Distance Vector vs Link State\n| Feature | Distance Vector (RIP) | Link State (OSPF) |\n| :--- | :--- | :--- |\n| **Algorithm** | Bellman-Ford | Dijkstra's Shortest Path First (SPF) |\n| **Knowledge** | Knows distance/direction to neighbors | Knows entire network topology graph |\n| **Convergence** | Slow, prone to count-to-infinity | Very fast convergence |\n| **Metric** | Hop count (max 15 in RIP) | Cost based on bandwidth |\n\n## 2. BGP (Border Gateway Protocol)\n- BGP is the **Path Vector** protocol that connects the entire global Internet across Autonomous Systems (AS).\n- Handles routing decisions based on network policies, path vectors, and peering agreements rather than pure technical link speed.\n",
            "questions": [
              {
                "id": "rp-1",
                "question": "Which algorithm is used by OSPF (Open Shortest Path First) to calculate the shortest path to all destinations?",
                "options": [
                  "Bellman-Ford Algorithm",
                  "Dijkstra's Algorithm",
                  "Floyd-Warshall Algorithm",
                  "Kruskal's Algorithm"
                ],
                "correct_option": 1,
                "explanation": "OSPF is a link-state routing protocol that maintains a complete topological database and runs Dijkstra's algorithm to compute the shortest-path tree."
              }
            ]
          }
        ]
      },
      {
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
              }
            ]
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
              }
            ]
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
              }
            ]
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
              }
            ]
          }
        ]
      },
      {
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
              }
            ]
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
              }
            ]
          }
        ]
      }
    ]
  }
};
