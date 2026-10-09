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
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  companyTags?: string[];
  keyTakeaways?: string[];
  questions: Question[];
}

export interface SectionCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: 'BookOpen' | 'Cpu' | 'Database' | 'Network' | 'Code2' | 'Server' | 'GitBranch' | 'Terminal' | 'Layers';
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
              },
              {
                "id": "tw-4",
                "question": "A can do a work in 15 days and B in 20 days. If they work on it together for 4 days, what fraction of the work is left?",
                "options": [
                  "7/15",
                  "8/15",
                  "1/3",
                  "11/15"
                ],
                "correct_option": 1,
                "explanation": "Work done by A and B in 1 day = 1/15 + 1/20 = 7/60. In 4 days, work done = 4 * (7/60) = 7/15. Fraction of work remaining = 1 - 7/15 = 8/15."
              }
            ],
            "difficulty": "Medium",
            "companyTags": [
              "TCS Digital",
              "Infosys SP",
              "Amazon",
              "Wipro Turbo"
            ],
            "keyTakeaways": [
              "Work per day = 1 / N days.",
              "Combined time for A and B = (A * B) / (A + B).",
              "Assume Total Work = LCM(A, B, C) to avoid fractions.",
              "Wages ratio = Efficiency ratio = 1/TimeA : 1/TimeB."
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
              },
              {
                "id": "pp-3",
                "question": "A committee of 5 is to be formed from 5 men and 4 women. What is the probability that the committee consists of at least 3 men?",
                "options": [
                  "81/126",
                  "65/126",
                  "50/126",
                  "91/126"
                ],
                "correct_option": 0,
                "explanation": "Total ways = 9C5 = 126. Favorable: (3M, 2W) = 5C3 * 4C2 = 10 * 6 = 60; (4M, 1W) = 5C4 * 4C1 = 5 * 4 = 20; (5M, 0W) = 5C5 * 4C0 = 1. Total favorable = 60 + 20 + 1 = 81. Probability = 81/126."
              },
              {
                "id": "pp-4",
                "question": "In how many different ways can the letters of the word \"CORPORATION\" be arranged so that all the vowels always come together?",
                "options": [
                  "50,400",
                  "12,600",
                  "75,600",
                  "25,200"
                ],
                "correct_option": 0,
                "explanation": "Vowels: O, O, A, I, O (5 vowels: three O, one A, one I). Consonants: C, R, P, R, T, N (6 consonants: two R). Group vowels as 1 unit: 7 units can be arranged in 7! / 2! ways = 2,520. Vowels internally arranged in 5! / 3! ways = 20. Total = 2,520 * 20 = 50,400."
              }
            ],
            "difficulty": "Hard",
            "companyTags": [
              "Google",
              "Microsoft",
              "Goldman Sachs",
              "Amazon"
            ],
            "keyTakeaways": [
              "Permutation (nPr): Order matters (arrangements, passwords).",
              "Combination (nCr): Order does not matter (committees, groups).",
              "Complementary rule: P(E) = 1 - P(none).",
              "Independent events: P(A ∩ B) = P(A) * P(B)."
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
              },
              {
                "id": "std-3",
                "question": "Two trains 140m and 160m long run at speeds of 60 km/h and 40 km/h respectively in opposite directions. How long will they take to cross each other completely?",
                "options": [
                  "10.8 seconds",
                  "12 seconds",
                  "9.5 seconds",
                  "15 seconds"
                ],
                "correct_option": 0,
                "explanation": "Total distance = 140 + 160 = 300m. Relative speed = 60 + 40 = 100 km/h = 100 * (5/18) = 250/9 m/s. Time = Distance / Speed = 300 / (250/9) = (300 * 9) / 250 = 10.8 seconds."
              },
              {
                "id": "std-4",
                "question": "A person travels a distance at 20 km/h and returns at 30 km/h. If the total time taken is 5 hours, what is the one-way distance?",
                "options": [
                  "60 km",
                  "50 km",
                  "75 km",
                  "40 km"
                ],
                "correct_option": 0,
                "explanation": "Average speed = 2 * 20 * 30 / (20 + 30) = 1200 / 50 = 24 km/h. Total round-trip distance = 24 * 5 = 120 km. One-way distance = 120 / 2 = 60 km."
              }
            ],
            "difficulty": "Medium",
            "companyTags": [
              "TCS Digital",
              "Cognizant GenC Next",
              "Amazon",
              "Accenture"
            ],
            "keyTakeaways": [
              "Conversion: 1 km/h = 5/18 m/s; 1 m/s = 18/5 km/h.",
              "Average Speed for equal distances = 2xy / (x + y).",
              "Relative Speed: Opposite = S1 + S2; Same direction = |S1 - S2|.",
              "Boat Speed = (Downstream + Upstream) / 2."
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
              },
              {
                "id": "pl-2",
                "question": "A dishonest dealer professes to sell his goods at cost price, but uses a false weight of 900 grams for a 1 kg (1000g) weight. Find his actual gain percentage.",
                "options": [
                  "11.11%",
                  "10%",
                  "12.5%",
                  "9.09%"
                ],
                "correct_option": 0,
                "explanation": "Gain % = [Error / (True Value - Error)] * 100 = [100 / (1000 - 100)] * 100 = (100 / 900) * 100 = 11.11% (or 11 1/9%)."
              },
              {
                "id": "pl-3",
                "question": "By selling 33 meters of cloth, a merchant gains the selling price of 11 meters. Find the merchant’s profit percentage.",
                "options": [
                  "50%",
                  "33.33%",
                  "25%",
                  "20%"
                ],
                "correct_option": 0,
                "explanation": "Gain = SP(11) = SP(33) - CP(33) => CP(33) = SP(22). Profit % = [SP(33) - SP(22)] / SP(22) * 100 = (11 / 22) * 100 = 50%."
              }
            ],
            "difficulty": "Easy",
            "companyTags": [
              "Infosys",
              "Capgemini",
              "Wipro",
              "TCS"
            ],
            "keyTakeaways": [
              "Profit % = ((SP - CP) / CP) * 100.",
              "Marked Price (MP) Discount % = ((MP - SP) / MP) * 100.",
              "Successive discounts of a% and b% = (a + b - ab/100)%.",
              "Dishonest dealer profit % = (Error / (True Value - Error)) * 100."
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
              },
              {
                "id": "pi-2",
                "question": "If the price of petrol increases by 25%, by what percentage must a car owner reduce fuel consumption to keep overall expenditure constant?",
                "options": [
                  "20%",
                  "25%",
                  "16.67%",
                  "15%"
                ],
                "correct_option": 0,
                "explanation": "Reduction % = [x / (100 + x)] * 100% = [25 / 125] * 100% = (1/5) * 100% = 20%."
              },
              {
                "id": "pi-3",
                "question": "A sum of money doubles itself in 5 years at a certain rate of simple interest. In how many years will it become 4 times its original principal?",
                "options": [
                  "15 years",
                  "10 years",
                  "20 years",
                  "12 years"
                ],
                "correct_option": 0,
                "explanation": "In 5 years, interest earned = P (amount = 2P). To become 4P, interest needed = 3P. Since simple interest grows linearly: Time = 3 * 5 = 15 years."
              }
            ],
            "difficulty": "Medium",
            "companyTags": [
              "TCS Digital",
              "Infosys",
              "Accenture",
              "Tech Mahindra"
            ],
            "keyTakeaways": [
              "If A is x% more than B, B is less than A by [x / (100 + x)] * 100%.",
              "Simple Interest = (P * R * T) / 100.",
              "Compound Interest A = P * (1 + R/100)^T.",
              "Difference between CI and SI for 2 years: D2 = P * (R / 100)^2."
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
              },
              {
                "id": "rp-2",
                "question": "If A : B = 2 : 3 and B : C = 4 : 5, what is the combined ratio A : B : C?",
                "options": [
                  "8 : 12 : 15",
                  "6 : 8 : 10",
                  "2 : 4 : 5",
                  "8 : 10 : 15"
                ],
                "correct_option": 0,
                "explanation": "Multiply first ratio by 4 and second by 3 to equalize B: A:B = 8:12, B:C = 12:15. Combined A:B:C = 8 : 12 : 15."
              },
              {
                "id": "rp-3",
                "question": "The ratio of boys to girls in a college is 5 : 3. If 50 boys leave and 50 girls join, the ratio becomes 9 : 7. What was the original number of boys?",
                "options": [
                  "500",
                  "400",
                  "300",
                  "600"
                ],
                "correct_option": 0,
                "explanation": "Let boys = 5x, girls = 3x. (5x - 50) / (3x + 50) = 9 / 7 => 35x - 350 = 27x + 450 => 8x = 800 => x = 100. Original boys = 5 * 100 = 500."
              }
            ],
            "difficulty": "Easy",
            "companyTags": [
              "Cognizant",
              "Capgemini",
              "Wipro",
              "TCS"
            ],
            "keyTakeaways": [
              "Mean proportional of a and b = sqrt(ab).",
              "If A:B = a:b and B:C = c:d, then A:B:C = (a*c) : (b*c) : (b*d).",
              "Alligation formula: (Cheaper / Dearer) = (Dearer Price - Mean) / (Mean - Cheaper Price)."
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
              },
              {
                "id": "pc-3",
                "question": "Three pipes A, B, and C together fill a tank in 6 hours. After working together for 2 hours, pipe C is closed and pipes A and B fill the remaining tank in 7 hours. How long would pipe C alone take to fill the tank?",
                "options": [
                  "14 hours",
                  "12 hours",
                  "16 hours",
                  "18 hours"
                ],
                "correct_option": 0,
                "explanation": "Work done by A, B, C in 2 hours = 2/6 = 1/3. Remaining work = 2/3. A and B do 2/3 work in 7 hours => A+B do full work in 7 * (3/2) = 10.5 hours = 21/2 hours. Rate of C = 1/6 - 2/21 = (7 - 4) / 42 = 3/42 = 1/14. C takes 14 hours."
              }
            ],
            "difficulty": "Medium",
            "companyTags": [
              "Infosys",
              "TCS Digital",
              "Accenture"
            ],
            "keyTakeaways": [
              "Inlet flow rate is positive (+1/A); leak rate is negative (-1/B).",
              "Net time to fill with leak = (A * B) / (B - A).",
              "Use LCM method to find total capacity units and individual hourly rates."
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
              },
              {
                "id": "ma-3",
                "question": "A container contains 40 liters of milk. From this, 4 liters of milk is taken out and replaced by water. This process is repeated 2 more times. How much pure milk remains in the container?",
                "options": [
                  "29.16 liters",
                  "30.24 liters",
                  "28.50 liters",
                  "32.40 liters"
                ],
                "correct_option": 0,
                "explanation": "Formula: Remaining = Initial * (1 - x/V)^n = 40 * (1 - 4/40)^3 = 40 * (9/10)^3 = 40 * 0.729 = 29.16 liters."
              }
            ],
            "difficulty": "Medium",
            "companyTags": [
              "Amazon",
              "Flipkart",
              "TCS Digital"
            ],
            "keyTakeaways": [
              "Repeated replacement formula: Final Liquid = Initial * (1 - x / V)^n.",
              "Alligation ratio = (Dearer Price - Mean) / (Mean - Cheaper Price)."
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
              },
              {
                "id": "cc-3",
                "question": "At what time between 3 o’clock and 4 o’clock will the minute hand and hour hand of a clock coincide?",
                "options": [
                  "16 (4/11) minutes past 3",
                  "15 (5/11) minutes past 3",
                  "18 minutes past 3",
                  "16 (2/11) minutes past 3"
                ],
                "correct_option": 0,
                "explanation": "At 3 o'clock, hands are 15 minute spaces apart. Relative speed = 55 min spaces gained in 60 min = 11/12 min spaces per min. Time to gain 15 spaces = 15 * (12/11) = 180 / 11 = 16 (4/11) minutes past 3."
              }
            ],
            "difficulty": "Easy",
            "companyTags": [
              "Wipro",
              "Capgemini",
              "Infosys",
              "Cognizant"
            ],
            "keyTakeaways": [
              "Angle between clock hands: θ = |30H - (11/2)M|.",
              "Normal year has 1 odd day; leap year has 2 odd days.",
              "Hands of clock coincide 22 times in 24 hours (not 24!)."
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
              },
              {
                "id": "syl-2",
                "question": "Statements: All cats are dogs. No dog is a bird. Conclusions: I. No cat is a bird. II. Some dogs are cats.",
                "options": [
                  "Both conclusions I and II follow",
                  "Only conclusion I follows",
                  "Only conclusion II follows",
                  "Neither conclusion follows"
                ],
                "correct_option": 0,
                "explanation": "Since all cats are dogs and no dog is a bird, no cat can possibly be a bird (I follows). Since all cats are dogs, some dogs must be cats (II follows). Both follow."
              },
              {
                "id": "syl-3",
                "question": "Statements: Some papers are pens. All pens are scales. Conclusions: I. Some scales are papers. II. All scales are pens.",
                "options": [
                  "Only conclusion I follows",
                  "Only conclusion II follows",
                  "Both follow",
                  "Neither follows"
                ],
                "correct_option": 0,
                "explanation": "Some papers are pens, and all pens are scales, so the papers that are pens are definitely scales (I follows). However, all scales are pens is invalid (II does not follow)."
              }
            ],
            "difficulty": "Medium",
            "companyTags": [
              "Amazon",
              "TCS Digital",
              "Infosys",
              "Capgemini"
            ],
            "keyTakeaways": [
              "Universal Affirmative: All A are B. (Does NOT imply All B are A).",
              "Negative Premise: No A is B. Combines to yield negative conclusions.",
              "Either-Or condition: Same elements, one affirmative + one negative, neither individually certain."
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
              },
              {
                "id": "sa-2",
                "question": "Six persons A, B, C, D, E, and F sit around a circular table facing the center. A is opposite to D. B is to the immediate right of A. E is between D and F. Who is sitting opposite to B?",
                "options": [
                  "E",
                  "C",
                  "F",
                  "D"
                ],
                "correct_option": 0,
                "explanation": "Placing A at bottom: D is at top. B is immediately right of A. E is between D and F. That leaves C to complete the circle between A and D. Looking across the circle: opposite of B is E."
              },
              {
                "id": "sa-3",
                "question": "In a linear row of 7 people facing North, P sits fourth from the left end. Q is second to the right of P. R is to the immediate left of Q. What is R’s position from the left end?",
                "options": [
                  "5th",
                  "6th",
                  "4th",
                  "3rd"
                ],
                "correct_option": 0,
                "explanation": "P is at index 4 (1-based). Q is 2 places to right => index 4 + 2 = 6th. R is immediately left of Q => index 5 (5th from left end)."
              }
            ],
            "difficulty": "Hard",
            "companyTags": [
              "Amazon",
              "Microsoft",
              "Goldman Sachs",
              "TCS Digital"
            ],
            "keyTakeaways": [
              "In circular seating facing center: clockwise is left, anti-clockwise is right.",
              "Identify definite statements first (e.g., fixed corner or extreme end).",
              "Map secondary clues relative to already-anchored members."
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
              },
              {
                "id": "br-2",
                "question": "Pointing to a photograph, a woman says: \"He is the only son of the father of my daughter’s father.\" How is the man in the photograph related to the woman?",
                "options": [
                  "Husband",
                  "Brother",
                  "Father",
                  "Father-in-law"
                ],
                "correct_option": 0,
                "explanation": "\"My daughter’s father\" is the woman’s husband. \"Father of my daughter’s father\" is her father-in-law. \"Only son of her father-in-law\" is her husband."
              },
              {
                "id": "br-3",
                "question": "If A + B means A is the brother of B; A - B means A is the sister of B; and A * B means A is the father of B. Which expression indicates that M is the niece of N?",
                "options": [
                  "N + K * M - P",
                  "N - M * K",
                  "N + M - K",
                  "M - P * N"
                ],
                "correct_option": 0,
                "explanation": "In N + K * M - P: N is brother of K, K is father of M, and M is sister of P (female). Since K is brother of N, K's daughter M is the niece of N."
              }
            ],
            "difficulty": "Easy",
            "companyTags": [
              "Infosys",
              "Wipro",
              "Cognizant",
              "TCS"
            ],
            "keyTakeaways": [
              "Break statement backwards from the speaker (\"my mother's only son\").",
              "Draw generational tree: Horizontal for siblings/spouses, Vertical for parent/child.",
              "Never assume gender purely from name unless explicitly stated."
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
              },
              {
                "id": "cd-2",
                "question": "If in a code language, ROSE is written as 6821, CHAIR is written as 73456, and PREACH is written as 961473, what is the code for SEARCH?",
                "options": [
                  "214673",
                  "214573",
                  "216473",
                  "241673"
                ],
                "correct_option": 0,
                "explanation": "Direct letter substitution: S=2, E=1, A=4, R=6, C=7, H=3. Hence SEARCH = 214673."
              },
              {
                "id": "cd-3",
                "question": "In a certain code, COMPUTER is written as RFUVQNPC. Following the same rule, how will MEDICINE be written?",
                "options": [
                  "EOJDJEFM",
                  "EOJDEJFM",
                  "MFEJDJOE",
                  "EOJDJFEM"
                ],
                "correct_option": 0,
                "explanation": "The word is reversed, and each intermediate letter is replaced by its next alphabet (+1): R -> R, E+1=F, T+1=U, U+1=V, P+1=Q, M+1=N, O+1=P, C -> C. For MEDICINE: First and last swapped (E ... M), middle letters +1: E, N+1=O, I+1=J, C+1=D, I+1=J, D+1=E, E+1=F, M => EOJDJEFM."
              }
            ],
            "difficulty": "Easy",
            "companyTags": [
              "Accenture",
              "Capgemini",
              "TCS",
              "Infosys"
            ],
            "keyTakeaways": [
              "Number alphabetical ranks: A=1, Z=26; reverse rank: 27 - rank.",
              "Check standard shift patterns (+1, -1, +2, reverse sequence).",
              "Cross-check direct letter-to-symbol substitutions."
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
              },
              {
                "id": "ds-2",
                "question": "A man walks 30m North, then turns right and walks 40m. How far and in which direction is he from his original starting point?",
                "options": [
                  "50m North-East",
                  "70m North-East",
                  "50m South-East",
                  "40m North"
                ],
                "correct_option": 0,
                "explanation": "Forms a right-angled triangle: Distance = sqrt(30^2 + 40^2) = sqrt(900 + 1600) = sqrt(2500) = 50m. Direction from origin is North-East."
              },
              {
                "id": "ds-3",
                "question": "One morning after sunrise, Gopal was standing facing a pole. The shadow of the pole fell exactly to Gopal’s right. Which direction was Gopal facing?",
                "options": [
                  "South",
                  "North",
                  "East",
                  "West"
                ],
                "correct_option": 0,
                "explanation": "In the morning, the sun is in the East, so shadows fall toward the West. For the shadow to fall to Gopal's right, West must be to his right, which means Gopal is facing South."
              }
            ],
            "difficulty": "Easy",
            "companyTags": [
              "Cognizant",
              "Wipro",
              "Tech Mahindra",
              "TCS"
            ],
            "keyTakeaways": [
              "Right turn is 90° clockwise; Left turn is 90° anti-clockwise.",
              "Pythagorean theorem: Distance = sqrt(Δx^2 + Δy^2).",
              "Morning shadow falls towards West; evening shadow falls towards East."
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
              },
              {
                "id": "sa-assump-2",
                "question": "Statement: \"Please do not lean out of the train window while the train is in motion.\" Assumptions: I. Leaning out of moving trains can cause severe injury. II. Passengers generally adhere to safety notices.",
                "options": [
                  "Both assumptions I and II are implicit",
                  "Only assumption I is implicit",
                  "Only assumption II is implicit",
                  "Neither is implicit"
                ],
                "correct_option": 0,
                "explanation": "The authority puts the warning because the act carries risk (I is implicit) and expects passengers to read and comply (II is implicit). Both are implicit."
              },
              {
                "id": "sa-assump-3",
                "question": "Statement: \"Enroll in StackUp’s core curriculum to crack Tier-1 software engineering technical screening tests.\" Assumptions: I. Students aspire to crack software engineering tests. II. StackUp provides targeted interview preparation.",
                "options": [
                  "Both I and II are implicit",
                  "Only I is implicit",
                  "Only II is implicit",
                  "Neither is implicit"
                ],
                "correct_option": 0,
                "explanation": "The statement assumes people have the goal of cracking tech interviews (I) and that the platform delivers the relevant preparation for that goal (II). Both are implicit."
              }
            ],
            "difficulty": "Medium",
            "companyTags": [
              "TCS Digital",
              "Infosys SP",
              "Amazon"
            ],
            "keyTakeaways": [
              "An assumption is something presupposed, taken for granted, before making the statement.",
              "Assumptions must be logically implicit, not external speculation.",
              "Words like \"only\", \"always\", \"best\" usually weaken an assumption unless explicit."
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
              },
              {
                "id": "di-2",
                "question": "In a company pie chart, Engineering accounts for 108° of the total 360°. If the company has 2,400 employees, how many work in Engineering?",
                "options": [
                  "720",
                  "640",
                  "800",
                  "750"
                ],
                "correct_option": 0,
                "explanation": "Fraction = 108 / 360 = 3 / 10 = 30%. Engineering employees = 30% of 2,400 = 720."
              },
              {
                "id": "di-3",
                "question": "A company’s revenue grew from $200k in 2021 to $320k in 2024. What was the total percentage increase in revenue over this 3-year period?",
                "options": [
                  "60%",
                  "50%",
                  "40%",
                  "65%"
                ],
                "correct_option": 0,
                "explanation": "Percentage increase = ((320 - 200) / 200) * 100% = (120 / 200) * 100% = 60%."
              }
            ],
            "difficulty": "Medium",
            "companyTags": [
              "Amazon",
              "Flipkart",
              "TCS Digital",
              "Cognizant"
            ],
            "keyTakeaways": [
              "Pie chart degree to percentage: % = (Degrees / 360) * 100.",
              "Percentage Growth = ((Final - Initial) / Initial) * 100%.",
              "Always simplify ratios before calculating large multiplied values."
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
              },
              {
                "id": "sc-2",
                "question": "Identify the sentence with the correct subject-verb agreement:",
                "options": [
                  "Neither the manager nor the engineers were aware of the production outage.",
                  "Neither the manager nor the engineers was aware of the production outage.",
                  "Neither the engineers nor the manager were aware of the production outage.",
                  "Neither the manager or the engineers was aware of the production outage."
                ],
                "correct_option": 0,
                "explanation": "In \"neither...nor\" constructions, the verb agrees with the subject closest to it. Here \"engineers\" is plural and adjacent to the verb, so the plural verb \"were\" is grammatically correct."
              },
              {
                "id": "sc-3",
                "question": "Choose the grammatically correct option to complete: \"The lead architect, together with his entire development team, ______ attending the conference.\"",
                "options": [
                  "is",
                  "are",
                  "were",
                  "have been"
                ],
                "correct_option": 0,
                "explanation": "Parenthetical phrases introduced by \"together with\", \"as well as\", or \"along with\" do not compound the subject. The true subject is \"The lead architect\" (singular), so the verb must be singular \"is\"."
              }
            ],
            "difficulty": "Easy",
            "companyTags": [
              "TCS",
              "Infosys",
              "Accenture",
              "Cognizant"
            ],
            "keyTakeaways": [
              "Neither...nor takes the verb agreeing with the closest subject.",
              "Collective nouns (team, group) take singular verbs when acting as a single unit.",
              "Modifier placement: Modifying phrases must be right next to the noun they modify."
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
              },
              {
                "id": "pt-3",
                "question": "Which of the following resources is NOT shared between multiple threads belonging to the same process?",
                "options": [
                  "Call stack & registers",
                  "Heap memory",
                  "Global variables",
                  "Open file descriptors"
                ],
                "correct_option": 0,
                "explanation": "Each thread executes its own sequence of function calls and requires an independent call stack and set of CPU registers. Heap, global variables, and open file descriptors are shared across the process."
              },
              {
                "id": "pt-4",
                "question": "What is a \"Zombie Process\" in Unix/Linux operating systems?",
                "options": [
                  "A process that has terminated, but its exit status has not yet been read by its parent via wait()",
                  "A process whose parent terminated, leaving it adopted by init/systemd",
                  "A process blocked indefinitely waiting on a deadlocked mutex",
                  "A process consuming 100% CPU in an infinite loop"
                ],
                "correct_option": 0,
                "explanation": "A zombie process has finished execution but remains in the OS process table to allow its parent process to read its exit code via wait(). An orphan process is one whose parent died before it did."
              }
            ],
            "difficulty": "Medium",
            "companyTags": [
              "Google",
              "Microsoft",
              "Amazon",
              "Meta"
            ],
            "keyTakeaways": [
              "Processes have isolated virtual address spaces; threads share heap, code, data, and open files.",
              "Threads have private program counters, registers, and stacks.",
              "Thread context switching is significantly faster due to shared page table caches (no TLB flush).",
              "Zombie process: finished execution but retains entry in process table until parent calls wait()."
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
              },
              {
                "id": "dl-2",
                "question": "Which algorithm is famously employed by operating systems for Deadlock Avoidance by checking if granting a request leaves the system in a \"Safe State\"?",
                "options": [
                  "Banker's Algorithm",
                  "Round Robin Algorithm",
                  "SSTF Algorithm",
                  "Peterson's Algorithm"
                ],
                "correct_option": 0,
                "explanation": "Dijkstra's Banker's Algorithm tests for safety by simulating the allocation of predetermined maximum possible amounts of all resources, preventing entering an unsafe state."
              },
              {
                "id": "dl-3",
                "question": "In a Resource Allocation Graph (RAG) where every resource type has exactly one instance, what does the existence of a directed cycle indicate?",
                "options": [
                  "Deadlock is guaranteed to exist",
                  "Deadlock may or may not exist",
                  "System is in a starvation state only",
                  "Deadlock is impossible"
                ],
                "correct_option": 0,
                "explanation": "For single-instance resource types, a cycle in the Resource Allocation Graph is both a necessary and sufficient condition for deadlock."
              }
            ],
            "difficulty": "Hard",
            "companyTags": [
              "Amazon",
              "Microsoft",
              "Oracle",
              "Adobe"
            ],
            "keyTakeaways": [
              "4 Coffman Conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.",
              "Banker's Algorithm: Used for deadlock avoidance by verifying safe states before allocation.",
              "In single-instance RAG, a cycle is necessary and sufficient for deadlock."
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
              },
              {
                "id": "cs-2",
                "question": "Which CPU scheduling algorithm is prone to the \"Convoy Effect\", where short CPU-bound processes queue behind a long CPU-burst process?",
                "options": [
                  "First-Come, First-Served (FCFS)",
                  "Round Robin (RR)",
                  "Shortest Remaining Time First (SRTF)",
                  "Multi-level Feedback Queue"
                ],
                "correct_option": 0,
                "explanation": "In FCFS, when a long process holds the CPU, all subsequent shorter I/O-bound or CPU-bound processes are delayed, causing the convoy effect and low resource utilization."
              },
              {
                "id": "cs-3",
                "question": "What is the primary practical drawback of the Shortest Job First (SJF) scheduling algorithm in real operating systems?",
                "options": [
                  "It is impossible to know the exact length of the next CPU burst in advance",
                  "It causes excessive thrashing in virtual memory",
                  "It cannot be implemented with preemption",
                  "It has the highest context switching overhead"
                ],
                "correct_option": 0,
                "explanation": "SJF requires knowing the exact duration of upcoming CPU bursts beforehand, which is impossible in general-purpose computing and must instead be approximated using exponential smoothing."
              }
            ],
            "difficulty": "Medium",
            "companyTags": [
              "Google",
              "Amazon",
              "Cisco",
              "Qualcomm"
            ],
            "keyTakeaways": [
              "SJF (Shortest Job First) is provably optimal for minimizing average waiting time.",
              "FCFS suffers from the Convoy Effect (short processes waiting behind long CPU bursts).",
              "Round Robin (RR) with time quantum provides minimum average response time for interactive systems."
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
              },
              {
                "id": "mp-2",
                "question": "What is Bélády’s Anomaly in operating systems virtual memory management?",
                "options": [
                  "The phenomenon where increasing the number of page frames results in an increase in page faults under FIFO",
                  "A page fault occurring while servicing another page fault",
                  "Memory thrashing caused by excessive thread creation",
                  "Fragmentation occurring when segment sizes exceed page frame boundaries"
                ],
                "correct_option": 0,
                "explanation": "Bélády's Anomaly proves that for certain page reference strings, the FIFO page replacement algorithm experiences more page faults when given more physical memory frames."
              },
              {
                "id": "mp-3",
                "question": "What is the primary function of the Translation Lookaside Buffer (TLB)?",
                "options": [
                  "High-speed hardware cache for page table translations (Virtual Page Number to Frame Number)",
                  "Secondary storage partition for inactive process pages (swap space)",
                  "Registers holding process state during context switches",
                  "L1 cache holding instruction code for pipelined execution"
                ],
                "correct_option": 0,
                "explanation": "The TLB is an associative, high-speed hardware cache on the MMU that stores recent virtual-to-physical address mappings, drastically speeding up memory address translation."
              }
            ],
            "difficulty": "Hard",
            "companyTags": [
              "Google",
              "Microsoft",
              "Intel",
              "Apple"
            ],
            "keyTakeaways": [
              "Paging eliminates external fragmentation but introduces internal fragmentation within frames.",
              "TLB (Translation Lookaside Buffer) caches recent Virtual-to-Physical page translations in hardware.",
              "Bélády's Anomaly: In FIFO page replacement, allocating MORE page frames can cause MORE page faults."
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
              },
              {
                "id": "ipc-2",
                "question": "What is the key functional difference between a Binary Semaphore and a Mutex?",
                "options": [
                  "A Mutex has ownership semantics (only the thread that locked it can unlock it); a Semaphore can be signaled by any thread",
                  "A Mutex can take integer values up to N; a Semaphore can only take 0 and 1",
                  "A Semaphore cannot be used for inter-process synchronization",
                  "A Mutex is implemented purely in user space without kernel support"
                ],
                "correct_option": 0,
                "explanation": "A mutex enforces ownership: only the thread that acquired the mutex is permitted to release it. Semaphores are signaling primitives where one thread can signal (V/post) a semaphore that was locked (P/wait) by another."
              },
              {
                "id": "ipc-3",
                "question": "What protocol solves the \"Priority Inversion\" problem in real-time operating systems?",
                "options": [
                  "Priority Inheritance Protocol",
                  "Round Robin Scheduling",
                  "Banker's Protocol",
                  "Peterson’s Lockout"
                ],
                "correct_option": 0,
                "explanation": "Under Priority Inheritance, when a lower-priority task holds a resource requested by a higher-priority task, the lower-priority task temporarily inherits the higher priority until it releases the resource."
              }
            ],
            "difficulty": "Hard",
            "companyTags": [
              "Microsoft",
              "Amazon",
              "Meta",
              "Uber"
            ],
            "keyTakeaways": [
              "Mutex: Mutual exclusion locking mechanism with ownership (thread that locks must unlock).",
              "Semaphore: Signaling mechanism without ownership; can be binary (0/1) or counting (0..N).",
              "Priority Inversion: Low-priority thread holding lock needed by high-priority thread gets preempted by medium-priority thread."
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
              },
              {
                "id": "ds-disk-2",
                "question": "Why is C-SCAN (Circular SCAN) often preferred over standard SCAN in busy disk subsystems?",
                "options": [
                  "It provides a more uniform waiting time across all track cylinders",
                  "It completely eliminates rotational latency",
                  "It guarantees zero starvation without needing elevator algorithms",
                  "It moves the disk arm faster on return strokes"
                ],
                "correct_option": 0,
                "explanation": "In SCAN, cylinders near the ends are visited less frequently than middle cylinders. C-SCAN treats cylinders as a circular list, servicing in one direction and returning to the beginning, yielding a uniform waiting time distribution."
              },
              {
                "id": "ds-disk-3",
                "question": "What is the main drawback of the Shortest Seek Time First (SSTF) disk scheduling algorithm?",
                "options": [
                  "Starvation of requests located far from the current head position",
                  "Excessive head movement compared to FCFS",
                  "Inability to handle read requests while writing",
                  "High rotational latency on solid-state drives"
                ],
                "correct_option": 0,
                "explanation": "SSTF always picks the closest request to the current head position. If a stream of close requests arrives, distant cylinders may starve indefinitely."
              }
            ],
            "difficulty": "Medium",
            "companyTags": [
              "Western Digital",
              "Cisco",
              "Amazon"
            ],
            "keyTakeaways": [
              "Seek time is the dominant factor in mechanical disk access latency.",
              "SSTF minimizes seek time locally but can cause starvation for far tracks.",
              "SCAN (Elevator algorithm) sweeps back and forth; C-SCAN sweeps in one direction and resets."
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
              },
              {
                "id": "sc-linux-2",
                "question": "In Unix/Linux, what does the fork() system call return to the newly created child process upon success?",
                "options": [
                  "0",
                  "The PID of the parent",
                  "The PID of the child",
                  "1"
                ],
                "correct_option": 0,
                "explanation": "fork() returns 0 to the child process, allowing it to determine its role, and returns the child’s new non-zero PID to the parent process."
              },
              {
                "id": "sc-linux-3",
                "question": "Why is the Linux epoll system call significantly more scalable than select() and poll() for high-concurrency servers?",
                "options": [
                  "epoll uses an event-driven kernel callback mechanism with O(1) readiness lookups instead of scanning all file descriptors O(N)",
                  "epoll runs entirely in kernel space without user-space buffer copying",
                  "epoll automatically handles thread pooling and CPU core pinning",
                  "epoll does not require non-blocking sockets"
                ],
                "correct_option": 0,
                "explanation": "select() and poll() require the operating system to iterate over all monitored file descriptors O(N) every poll. epoll registers callbacks and returns only the descriptors with ready I/O events in O(1) time."
              }
            ],
            "difficulty": "Medium",
            "companyTags": [
              "Google",
              "Meta",
              "Netflix",
              "Red Hat"
            ],
            "keyTakeaways": [
              "fork() creates an identical child process; returns 0 to child, child PID to parent, -1 on error.",
              "execve() replaces the current process image with a new executable without changing the PID.",
              "epoll is O(1) event notification scaling to tens of thousands of concurrent connections."
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
              },
              {
                "id": "acid-3",
                "question": "Which ANSI SQL transaction isolation level prevents Dirty Reads and Non-Repeatable Reads, but may still permit Phantom Reads?",
                "options": [
                  "Repeatable Read",
                  "Read Committed",
                  "Serializable",
                  "Read Uncommitted"
                ],
                "correct_option": 0,
                "explanation": "Repeatable Read locks all rows read by queries so other transactions cannot modify them, preventing dirty and non-repeatable reads. However, range queries may still encounter newly inserted rows (phantoms)."
              },
              {
                "id": "acid-4",
                "question": "What fundamental logging protocol ensures both Atomicity and Durability in relational database crash recovery?",
                "options": [
                  "Write-Ahead Logging (WAL)",
                  "Shadow Paging",
                  "Two-Phase Commit",
                  "Event Sourcing"
                ],
                "correct_option": 0,
                "explanation": "Write-Ahead Logging dictates that changes and commit records must be appended and flushed to non-volatile disk logs before dirty database data pages are written to disk, ensuring complete recovery."
              }
            ],
            "difficulty": "Hard",
            "companyTags": [
              "Amazon",
              "Google",
              "Stripe",
              "Oracle"
            ],
            "keyTakeaways": [
              "Atomicity: All operations succeed or all roll back (WAL protocol).",
              "Consistency: Transactions move DB from one valid state to another satisfying constraints.",
              "Isolation levels: Read Uncommitted < Read Committed < Repeatable Read < Serializable.",
              "Durability: Committed updates survive system crashes (fsync to disk / WAL)."
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
              },
              {
                "id": "norm-2",
                "question": "What condition distinguishes Boyce-Codd Normal Form (BCNF) from Third Normal Form (3NF)?",
                "options": [
                  "For every functional dependency X -> Y, X must strictly be a Superkey",
                  "Table must not contain foreign keys",
                  "All columns must have unique constraints",
                  "Every attribute must be a prime attribute"
                ],
                "correct_option": 0,
                "explanation": "In 3NF, for X -> Y, either X is a superkey OR Y is a prime attribute. BCNF removes the second relaxation: X must strictly be a superkey for every non-trivial functional dependency."
              },
              {
                "id": "norm-3",
                "question": "Elimination of partial dependency (where a non-prime attribute depends on a proper subset of a composite candidate key) transitions a table into which normal form?",
                "options": [
                  "Second Normal Form (2NF)",
                  "Third Normal Form (3NF)",
                  "First Normal Form (1NF)",
                  "BCNF"
                ],
                "correct_option": 0,
                "explanation": "A relation is in 2NF if it is in 1NF and contains no partial functional dependencies on any candidate key."
              }
            ],
            "difficulty": "Medium",
            "companyTags": [
              "Microsoft",
              "Oracle",
              "TCS",
              "Infosys"
            ],
            "keyTakeaways": [
              "1NF: Atomic values, no repeating groups.",
              "2NF: 1NF + No partial dependencies (every non-key attribute fully dependent on composite primary key).",
              "3NF: 2NF + No transitive dependencies.",
              "BCNF: For every functional dependency X -> Y, X must be a superkey."
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
              },
              {
                "id": "sql-2",
                "question": "What is the key difference between the SQL window functions RANK() and DENSE_RANK() when duplicate values occur?",
                "options": [
                  "RANK() skips ranks following duplicate ties (e.g. 1, 2, 2, 4); DENSE_RANK() leaves no gaps (1, 2, 2, 3)",
                  "DENSE_RANK() only works with descending orders",
                  "RANK() requires an explicit PARTITION BY clause while DENSE_RANK() does not",
                  "DENSE_RANK() returns fractional percentiles instead of integer ranks"
                ],
                "correct_option": 0,
                "explanation": "When ties occur, RANK() produces gaps equal to the tie count (e.g., 1, 2, 2, 4). DENSE_RANK() increments sequentially without gaps (e.g., 1, 2, 2, 3)."
              },
              {
                "id": "sql-3",
                "question": "What is the correct logical order of query execution in a standard SQL SELECT statement?",
                "options": [
                  "FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT",
                  "SELECT -> FROM -> WHERE -> GROUP BY -> ORDER BY",
                  "FROM -> SELECT -> WHERE -> HAVING -> ORDER BY",
                  "WHERE -> FROM -> GROUP BY -> SELECT -> ORDER BY"
                ],
                "correct_option": 0,
                "explanation": "The SQL query engine evaluates tables (FROM/JOIN), filters rows (WHERE), aggregates (GROUP BY), filters groups (HAVING), extracts projections (SELECT), sorts (ORDER BY), and limits pagination (LIMIT)."
              }
            ],
            "difficulty": "Medium",
            "companyTags": [
              "Amazon",
              "Uber",
              "Goldman Sachs",
              "Meta"
            ],
            "keyTakeaways": [
              "SQL logical execution order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT.",
              "RANK() leaves gaps in sequence for ties (1, 2, 2, 4); DENSE_RANK() leaves no gaps (1, 2, 2, 3).",
              "COUNT(column) ignores NULLs; COUNT(*) counts all rows including NULLs."
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
              },
              {
                "id": "idx-2",
                "question": "Why are B+ Trees overwhelmingly preferred over standard B-Trees for relational database disk indexing?",
                "options": [
                  "All records are stored in leaf nodes linked sequentially, making range queries and full table scans fast",
                  "B+ trees do not require disk rebalancing during insertions",
                  "B+ trees have O(1) worst-case lookup time",
                  "B+ trees consume zero memory cache overhead"
                ],
                "correct_option": 0,
                "explanation": "In B+ trees, all record pointers are confined to leaf nodes linked in sequence, allowing rapid range scans by following leaf pointers, while internal nodes hold only keys, maximizing branching fanout."
              },
              {
                "id": "idx-3",
                "question": "What is a \"Covering Index\" in SQL databases?",
                "options": [
                  "An index that contains all columns requested by a query, allowing the DB to resolve the query without accessing table heap pages",
                  "An index applied across all tables in a schema",
                  "A clustered index covering the primary key alone",
                  "An index that covers NULL values exclusively"
                ],
                "correct_option": 0,
                "explanation": "A covering index includes all fields in the SELECT, WHERE, and JOIN clauses. The engine satisfies the entire query directly from index memory without performing secondary lookups into the heap."
              }
            ],
            "difficulty": "Hard",
            "companyTags": [
              "Google",
              "Amazon",
              "Microsoft",
              "Databricks"
            ],
            "keyTakeaways": [
              "B+ Tree stores all actual data records/pointers in leaf nodes linked as a doubly-linked list.",
              "Internal nodes store only routing keys, allowing high fan-out and shallow tree height (3-4 I/O lookups).",
              "Covering index satisfies query entirely from index leaf nodes without fetching table heap pages."
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
              },
              {
                "id": "cap-2",
                "question": "According to Brewer’s CAP Theorem, when a network partition (P) occurs in a distributed database cluster, what trade-off must be made?",
                "options": [
                  "Choose between Consistency (rejecting updates to keep state identical) or Availability (accepting updates that may diverge)",
                  "Choose between Relational normalization and NoSQL document storage",
                  "Choose between disk storage and in-memory caching",
                  "Choose between horizontal and vertical scaling"
                ],
                "correct_option": 0,
                "explanation": "Network partitions are inevitable in real networks. When nodes cannot communicate, the system must either refuse writes to guarantee consistency (CP) or accept writes on isolated nodes sacrificing immediate consistency (AP)."
              },
              {
                "id": "cap-3",
                "question": "What does the acronym BASE stand for in distributed NoSQL database architectures?",
                "options": [
                  "Basically Available, Soft state, Eventual consistency",
                  "Binary Access, Scalable Execution, Encrypted",
                  "Buffered Asynchronous Synchronized Entities",
                  "Balanced Allocation, Segmented Execution"
                ],
                "correct_option": 0,
                "explanation": "BASE contrasts with ACID: Basically Available (system remains functional), Soft state (state may change over time without inputs due to replication), and Eventual consistency."
              }
            ],
            "difficulty": "Hard",
            "companyTags": [
              "Netflix",
              "Meta",
              "Amazon",
              "Uber"
            ],
            "keyTakeaways": [
              "CAP Theorem: In the event of a network partition (P), a distributed system must choose Consistency (C) or Availability (A).",
              "BASE model: Basically Available, Soft state, Eventual consistency.",
              "Cassandra and DynamoDB are AP (high availability + partition tolerance + eventual consistency)."
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
              },
              {
                "id": "c2pl-2",
                "question": "Does standard Two-Phase Locking (2PL) prevent deadlocks in relational databases?",
                "options": [
                  "No, 2PL guarantees serializability but can still result in deadlocks",
                  "Yes, 2PL completely prevents deadlocks by design",
                  "Yes, because locks are acquired simultaneously at transaction start",
                  "No, 2PL causes starvation but never deadlock"
                ],
                "correct_option": 0,
                "explanation": "2PL guarantees conflict serializable schedules, but transactions can still request locks in conflicting orders, leading to deadlocks that require timeout or wait-for graph cycle detection."
              },
              {
                "id": "c2pl-3",
                "question": "What distinguishes Strict Two-Phase Locking (Strict 2PL) from standard 2PL?",
                "options": [
                  "All Exclusive (X) locks must be held until the transaction explicitly commits or rolls back",
                  "Transactions cannot acquire Shared locks",
                  "No locks can be acquired after the first read operation",
                  "Locking is managed entirely without database recovery logs"
                ],
                "correct_option": 0,
                "explanation": "In Strict 2PL, a transaction must hold all its exclusive (write) locks until it terminates (commits or aborts), which eliminates cascading rollbacks."
              }
            ],
            "difficulty": "Hard",
            "companyTags": [
              "Oracle",
              "Microsoft",
              "Amazon"
            ],
            "keyTakeaways": [
              "Two-Phase Locking (2PL): Growing Phase (acquires locks, no releases) -> Shrinking Phase (releases locks, no acquisitions).",
              "2PL guarantees conflict serializability but DOES NOT prevent deadlocks.",
              "Strict 2PL: All exclusive (X) locks held until transaction commits or aborts (prevents cascading rollbacks)."
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
              },
              {
                "id": "tcp-2",
                "question": "What is the purpose of the TIME_WAIT state in the TCP connection termination process?",
                "options": [
                  "To ensure the final ACK was received by the remote endpoint and to allow lingering duplicate segments to expire (2 MSL)",
                  "To keep the socket buffer warm for immediate reconnection",
                  "To calculate round-trip time (RTT) for future packets",
                  "To renegotiate encryption keys before closing"
                ],
                "correct_option": 0,
                "explanation": "TIME_WAIT holds the connection closed for 2 * Maximum Segment Lifetime (2 MSL) so that the remote peer receives the final ACK, and prevents late-arriving packets from interfering with a future new connection on the same port."
              },
              {
                "id": "tcp-3",
                "question": "What mechanism in TCP prevents a fast sender from overwhelming a slow receiver’s buffer capacity?",
                "options": [
                  "Flow Control (Sliding Window)",
                  "Congestion Control (Slow Start)",
                  "DNS Throttling",
                  "Nagle’s Algorithm"
                ],
                "correct_option": 0,
                "explanation": "Flow Control uses the TCP Receive Window (rwnd) field advertised by the receiver to inform the sender how many bytes of buffer capacity remain available."
              }
            ],
            "difficulty": "Medium",
            "companyTags": [
              "Cisco",
              "Cloudflare",
              "Google",
              "Amazon"
            ],
            "keyTakeaways": [
              "TCP 3-Way Handshake: SYN -> SYN-ACK -> ACK.",
              "TCP 4-Way Teardown: FIN -> ACK -> FIN -> ACK.",
              "TIME_WAIT state lasts 2 * MSL (Maximum Segment Lifetime) to ensure delayed packets clear and final ACK is received."
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
              },
              {
                "id": "osi-2",
                "question": "What is the Protocol Data Unit (PDU) at the Transport Layer of the OSI model called?",
                "options": [
                  "Segment (or Datagram for UDP)",
                  "Packet",
                  "Frame",
                  "Bit"
                ],
                "correct_option": 0,
                "explanation": "At Layer 4 (Transport), data is encapsulated into Segments (TCP) or Datagrams (UDP). Layer 3 uses Packets, Layer 2 uses Frames, and Layer 1 transmits Bits."
              },
              {
                "id": "osi-3",
                "question": "Which layer of the OSI model handles data format translation, character encoding, and encryption/compression?",
                "options": [
                  "Presentation Layer (Layer 6)",
                  "Session Layer (Layer 5)",
                  "Application Layer (Layer 7)",
                  "Transport Layer (Layer 4)"
                ],
                "correct_option": 0,
                "explanation": "The Presentation Layer is responsible for syntax conversion, data formatting (e.g., ASCII, UTF-8, JPEG), and encryption/decryption between the application and network."
              }
            ],
            "difficulty": "Easy",
            "companyTags": [
              "Cisco",
              "Juniper",
              "TCS",
              "Infosys"
            ],
            "keyTakeaways": [
              "OSI 7 Layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.",
              "PDUs: Bits (Physical), Frames (Data Link), Packets (Network), Segments (Transport), Data (Application).",
              "Routers operate at Layer 3; traditional switches operate at Layer 2."
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
              },
              {
                "id": "dns-2",
                "question": "Which DNS record type maps a domain name directly to an IPv6 address?",
                "options": [
                  "AAAA record",
                  "A record",
                  "CNAME record",
                  "PTR record"
                ],
                "correct_option": 0,
                "explanation": "An \"A\" record maps a hostname to a 32-bit IPv4 address, whereas a \"AAAA\" (quad-A) record maps a hostname to a 128-bit IPv6 address."
              },
              {
                "id": "dns-3",
                "question": "What is the role of an Authoritative DNS Server in the DNS lookup process?",
                "options": [
                  "It holds the definitive, verified DNS records for a specific domain zone",
                  "It caches queries for client ISPs",
                  "It is the 13 root servers coordinating global top-level domains",
                  "It encrypts browser HTTPS traffic"
                ],
                "correct_option": 0,
                "explanation": "Authoritative DNS servers are the source of truth for specific domain names; they provide the final IP answer to the recursive resolver."
              }
            ],
            "difficulty": "Medium",
            "companyTags": [
              "Cloudflare",
              "Google",
              "Amazon",
              "Meta"
            ],
            "keyTakeaways": [
              "Resolution hierarchy: Browser Cache -> OS Cache -> Recursive Resolver -> Root Server -> TLD Server -> Authoritative Server.",
              "A record = IPv4; AAAA record = IPv6; CNAME = Canonical Name alias; MX = Mail exchange.",
              "TTL (Time to Live) governs how long resolvers cache DNS records."
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
              },
              {
                "id": "http-2",
                "question": "Why was HTTP/3 designed to operate over UDP (via the QUIC protocol) rather than traditional TCP?",
                "options": [
                  "To eliminate TCP-level Head-of-Line (HoL) blocking across multiplexed streams and enable fast 0-RTT handshakes",
                  "Because UDP is encrypted by default at the kernel level",
                  "Because TCP cannot support audio/video streaming",
                  "To bypass firewall port 443 restrictions"
                ],
                "correct_option": 0,
                "explanation": "In HTTP/2 over TCP, if a single packet is lost, all multiplexed streams stall until TCP retransmits it (HoL blocking). HTTP/3 over QUIC handles packet loss independently per stream over UDP."
              },
              {
                "id": "http-3",
                "question": "During a TLS 1.3 handshake, how is the symmetric encryption session key established securely?",
                "options": [
                  "Diffie-Hellman Key Exchange (ECDHE)",
                  "The client encrypts the key with the server’s private key",
                  "The server sends the secret key in plain text over HTTPS",
                  "The certificate authority transmits the key via DNS"
                ],
                "correct_option": 0,
                "explanation": "Modern TLS uses Elliptic Curve Diffie-Hellman Ephemeral (ECDHE) key exchange to establish a shared symmetric session key with Forward Secrecy."
              }
            ],
            "difficulty": "Medium",
            "companyTags": [
              "Cloudflare",
              "Google",
              "Meta",
              "Netflix"
            ],
            "keyTakeaways": [
              "HTTP/1.1 introduced persistent connections but suffers from Head-of-Line (HoL) blocking on single TCP streams.",
              "HTTP/2 multiplexes multiple binary requests/streams over a single TCP connection.",
              "HTTP/3 runs over UDP using QUIC, eliminating TCP-level Head-of-Line blocking and enabling zero-RTT handshakes."
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
              },
              {
                "id": "sub-2",
                "question": "How many usable host IP addresses are available in an IPv4 subnet with CIDR notation /28?",
                "options": [
                  "14",
                  "16",
                  "30",
                  "12"
                ],
                "correct_option": 0,
                "explanation": "Host bits = 32 - 28 = 4. Total IP addresses = 2^4 = 16. Subtract 2 for the Network address and Broadcast address = 16 - 2 = 14 usable hosts."
              },
              {
                "id": "sub-3",
                "question": "What is the dotted decimal subnet mask corresponding to CIDR prefix /26?",
                "options": [
                  "255.255.255.192",
                  "255.255.255.128",
                  "255.255.255.224",
                  "255.255.255.240"
                ],
                "correct_option": 0,
                "explanation": "26 bits set: First 3 octets are 255.255.255. Fourth octet has top 2 bits set: 128 + 64 = 192. Thus, 255.255.255.192."
              }
            ],
            "difficulty": "Medium",
            "companyTags": [
              "Cisco",
              "Amazon AWS",
              "Microsoft Azure",
              "Google Cloud"
            ],
            "keyTakeaways": [
              "Usable hosts in a /N subnet = 2^(32 - N) - 2 (subtract Network ID and Broadcast Address).",
              "/24 = 256 addresses (254 hosts); /28 = 16 addresses (14 hosts); /30 = 4 addresses (2 hosts).",
              "Private IP ranges (RFC 1918): 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16."
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
              },
              {
                "id": "rp-net-2",
                "question": "Which routing algorithm is used by OSPF (Open Shortest Path First) to calculate the shortest path tree from a router to all destinations?",
                "options": [
                  "Dijkstra's Shortest Path Algorithm",
                  "Bellman-Ford Algorithm",
                  "Floyd-Warshall Algorithm",
                  "Kruskal's Algorithm"
                ],
                "correct_option": 0,
                "explanation": "OSPF is a link-state routing protocol where each router constructs a complete topological map of the autonomous system and executes Dijkstra’s algorithm to calculate the lowest-cost paths."
              },
              {
                "id": "rp-net-3",
                "question": "Which routing protocol serves as the standard Exterior Gateway Protocol (EGP) powering inter-domain routing between Autonomous Systems on the global Internet?",
                "options": [
                  "BGP (Border Gateway Protocol)",
                  "OSPF",
                  "RIP",
                  "EIGRP"
                ],
                "correct_option": 0,
                "explanation": "BGP is the path-vector exterior gateway protocol that enables routing decisions across independent Autonomous Systems (ASes) constituting the global Internet backbone."
              }
            ],
            "difficulty": "Hard",
            "companyTags": [
              "Cisco",
              "Juniper",
              "Cloudflare",
              "Google"
            ],
            "keyTakeaways": [
              "Distance Vector (RIP): Uses hop count (max 15), Bellman-Ford algorithm, split-horizon rule.",
              "Link State (OSPF): Uses Dijkstra shortest path algorithm, floods link-state advertisements (LSAs).",
              "BGP (Border Gateway Protocol): Path-vector protocol connecting Autonomous Systems across the Internet."
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
            ]
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
            ]
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
            ]
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
            ]
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
            ]
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
            ]
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
            ]
          }
        ]
      },
      {
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
            ]
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
            ]
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
            ]
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
            ]
          }
        ]
      },
      {
        "id": "coa",
        "slug": "computer-organization-and-architecture",
        "title": "Computer Organization & Architecture (COA)",
        "description": "Instruction pipelining, pipeline hazards, memory hierarchy, cache mapping, and cache coherence protocols.",
        "icon": "Server",
        "topics": [
          {
            "id": "cpu-pipelining-hazards",
            "slug": "cpu-instruction-pipelining",
            "title": "CPU Instruction Pipelining & Pipeline Hazards",
            "description": "5-stage RISC pipeline (IF, ID, EX, MEM, WB), Structural, Data (RAW, WAR, WAW) hazards, Branch hazards, and Forwarding.",
            "estimatedMinutes": 20,
            "notesMarkdown": "# CPU Instruction Pipelining & Hazards\n\nInstruction pipelining overlaps the execution of multiple instructions to increase CPU throughput.\n\n---\n\n## 1. Classical 5-Stage RISC Pipeline\n1. **IF (Instruction Fetch):** Fetch instruction from cache/memory into IR; increment Program Counter (PC).\n2. **ID (Instruction Decode / Register Read):** Decode opcode and read source registers.\n3. **EX (Execute / ALU Operation):** Perform arithmetic/logic computation or calculate memory address.\n4. **MEM (Memory Access):** Read or write data operand in data cache (for `LOAD` / `STORE`).\n5. **WB (Write Back):** Write execution result back into the register file.\n\n$$\\text{Theoretical Speedup} = \\frac{n \\times k}{k + n - 1} \\approx k \\quad (\\text{for large } n)$$\nwhere $k$ is number of stages and $n$ is number of instructions.\n\n## 2. Pipeline Hazards\nA hazard prevents the next instruction from executing in its designated clock cycle:\n\n1. **Structural Hazard:** Hardware resource conflict (e.g. single memory bus accessed for both instruction fetch and data read simultaneously). Solved by separate L1 Instruction and Data caches (Harvard Architecture).\n2. **Data Hazard:** Dependent instructions need operands not yet written:\n   - **RAW (Read After Write - True Dependency):** Instruction $J$ tries to read before instruction $I$ writes back. Solved by **Operand Forwarding / Bypassing** or inserting stall bubbles.\n   - **WAR (Write After Read - Anti-dependency):** Out-of-order execution hazard. Solved by register renaming.\n   - **WAW (Write After Write - Output dependency):** Out-of-order execution hazard.\n3. **Control (Branch) Hazard:** Pipeline does not know which instruction to fetch until branch condition is evaluated in EX stage. Mitigated by **Branch Prediction** and branch delay slots.\n",
            "questions": [
              {
                "id": "coa-1",
                "question": "Which data hazard occurs when an instruction attempts to read a register operand before an earlier instruction has finished writing its updated value?",
                "options": [
                  "Write After Read (WAR)",
                  "Read After Write (RAW)",
                  "Write After Write (WAW)",
                  "Structural Hazard"
                ],
                "correct_option": 1,
                "explanation": "A RAW (Read After Write) hazard represents a true data dependency where an instruction depends on the result of an antecedent instruction."
              },
              {
                "id": "coa-2",
                "question": "What hardware technique resolves Read After Write (RAW) data hazards without inserting pipeline stall bubbles?",
                "options": [
                  "Branch Prediction",
                  "Operand Forwarding (Bypassing)",
                  "Memory Paging",
                  "Virtual Memory Swapping"
                ],
                "correct_option": 1,
                "explanation": "Operand Forwarding routes the computed ALU result directly from the output of the EX stage to the input of the dependent instruction's EX stage, avoiding stalls."
              },
              {
                "id": "pip-3",
                "question": "What are the three fundamental types of hazards encountered in CPU instruction pipelining?",
                "options": [
                  "Structural Hazards, Data Hazards, and Control Hazards",
                  "Cache Misses, Page Faults, and Memory Leaks",
                  "Compilation Errors, Linker Errors, and Runtime Exceptions",
                  "Paging Hazards, Segmentation Hazards, and Deadlocks"
                ],
                "correct_option": 0,
                "explanation": "Pipelining hazards stall instruction execution: Structural hazards (resource conflicts), Data hazards (data dependencies between instructions), and Control hazards (branching and jumps)."
              }
            ],
            "difficulty": "Hard",
            "companyTags": [
              "Intel",
              "ARM",
              "Qualcomm",
              "AMD"
            ],
            "keyTakeaways": [
              "Instruction pipeline phases: IF (Fetch), ID (Decode), EX (Execute), MEM (Memory), WB (Write-back).",
              "Structural hazards: Hardware resource conflict (e.g. single memory port for instruction and data).",
              "Data hazards: Read-After-Write (RAW), Write-After-Read (WAR), Write-After-Write (WAW); mitigated with Forwarding/Bypassing.",
              "Control hazards: Caused by branch and jump instructions; mitigated with Branch Prediction."
            ]
          },
          {
            "id": "cache-memory-coherence",
            "slug": "memory-hierarchy-and-cache",
            "title": "Memory Hierarchy, Cache Mapping & Cache Coherence",
            "description": "L1/L2/L3 caches, Direct Mapped vs Set Associative, spatial/temporal locality, Write-Through vs Write-Back, and MESI protocol.",
            "estimatedMinutes": 20,
            "notesMarkdown": "# Memory Hierarchy & Cache Coherence\n\nDue to the significant speed gap between CPU clock cycles (~0.3 ns) and main DRAM (~50-100 ns), modern architectures employ hierarchical caching.\n\n---\n\n## 1. Principles of Locality\n- **Temporal Locality:** If a memory location was accessed, it is likely to be accessed again soon (e.g. loop counters, local variables).\n- **Spatial Locality:** If a memory location was accessed, adjacent addresses are likely to be accessed soon (e.g. traversing an array).\n\n## 2. Cache Mapping Techniques\n- **Direct Mapped:** Each memory block maps to exactly one cache line: `line = block_address % num_lines`. Fast, cheap hardware, but suffers from conflict misses.\n- **Fully Associative:** A memory block can be placed in any cache line. Eliminates conflict misses, but requires expensive parallel comparator hardware.\n- **Set Associative ($N$-way):** Cache divided into sets of $N$ lines. Balance between speed and conflict reduction.\n\n## 3. Write Policies\n- **Write-Through:** Every write updates both the cache and main memory simultaneously. Consistent, but higher write bus traffic.\n- **Write-Back:** Writes update only the cache line (marked with a **Dirty bit**); written to main memory only when evicted.\n\n## 4. Multi-Core Cache Coherence: The MESI Protocol\nIn multi-core processors with private L1/L2 caches, the **MESI** snooping protocol maintains coherence across 4 states:\n1. **Modified (M):** Cache line is present only in current core, dirty (modified relative to RAM).\n2. **Exclusive (E):** Cache line present only in current core, clean (matches RAM).\n3. **Shared (S):** Cache line present in multiple cores' caches, clean.\n4. **Invalid (I):** Cache line is stale or unused.\n",
            "questions": [
              {
                "id": "coa-3",
                "question": "In the MESI cache coherence protocol, what state does a cache line enter when it is present only in one core and matches main memory?",
                "options": [
                  "Modified (M)",
                  "Exclusive (E)",
                  "Shared (S)",
                  "Invalid (I)"
                ],
                "correct_option": 1,
                "explanation": "The Exclusive (E) state denotes that the block is cached exclusively by this one core and has not yet been modified (it is clean with respect to main RAM)."
              },
              {
                "id": "cache-2",
                "question": "What critical hardware problem does the MESI (Modified, Exclusive, Shared, Invalid) protocol solve in multi-core CPU architectures?",
                "options": [
                  "Cache Coherence: Ensuring all CPU cores observe consistent and up-to-date values for shared memory locations across private L1/L2 caches",
                  "Virtual memory page swapping",
                  "Instruction branch prediction",
                  "Thermal throttling and fan speed regulation"
                ],
                "correct_option": 0,
                "explanation": "In multi-core systems, each core has private L1 caches. If one core updates a memory location, the MESI protocol snoops or invalidates other cores’ cached copies to ensure coherence."
              },
              {
                "id": "cache-3",
                "question": "Iterating through a 2D array row-by-row in C/C++ (row-major order) is dramatically faster than column-by-column due to which hardware caching principle?",
                "options": [
                  "Spatial Locality",
                  "Temporal Locality",
                  "Instruction Pipelining",
                  "Virtual Address Translation"
                ],
                "correct_option": 0,
                "explanation": "In row-major languages, contiguous row elements reside adjacently in memory. Accessing row-by-row exploits Spatial Locality because fetching one element pulls an entire cache line (64 bytes) into L1 cache."
              }
            ],
            "difficulty": "Hard",
            "companyTags": [
              "Intel",
              "AMD",
              "Apple",
              "NVIDIA"
            ],
            "keyTakeaways": [
              "Memory hierarchy: Registers < L1 Cache < L2 Cache < L3 Cache < Main Memory (RAM) < SSD/Disk.",
              "Cache Coherence protocols (like MESI: Modified, Exclusive, Shared, Invalid) ensure multiple CPU cores see consistent memory values.",
              "Spatial Locality (accessing nearby addresses) vs Temporal Locality (accessing same address repeatedly)."
            ]
          },
          {
            "id": "risc-cisc-registers",
            "slug": "risc-vs-cisc-architectures",
            "title": "RISC vs. CISC Architectures & CPU Registers",
            "description": "Instruction set philosophy, Load/Store architecture, Program Counter, Stack Pointer, and Little-Endian vs Big-Endian byte order.",
            "estimatedMinutes": 16,
            "notesMarkdown": "# RISC vs. CISC Architectures & CPU Registers\n\nInstruction Set Architectures (ISA) define the programming contract between hardware and software.\n\n---\n\n## 1. RISC vs. CISC\n| Attribute | RISC (ARM, RISC-V, MIPS) | CISC (x86, x86-64) |\n| :--- | :--- | :--- |\n| **Philosophy** | Simple, fixed-length instructions | Complex, variable-length instructions |\n| **Execution** | Most instructions execute in 1 clock cycle | Instructions may take multiple clock cycles |\n| **Memory Access** | **Load/Store only** (ALU only operates on registers) | ALU instructions can operate directly on memory |\n| **Registers** | Large general-purpose register file (32+) | Fewer architectural registers (8-16) |\n| **Code Size** | Larger binary code size | Compact binary code size |\n\n## 2. Fundamental CPU Registers\n- **Program Counter (PC):** Holds the memory address of the next instruction to fetch.\n- **Instruction Register (IR):** Holds the current instruction being decoded.\n- **Stack Pointer (SP):** Points to the top of the current call stack.\n- **Status / Flags Register:** Stores condition flags (Zero flag `Z`, Carry flag `C`, Overflow `O`, Sign `S`).\n\n## 3. Endianness (Byte Ordering)\nFor multi-byte value `0x12345678` at base address `0x00`:\n- **Big-Endian:** Most significant byte stored first (`0x00: 12`, `0x01: 34`, `0x02: 56`, `0x03: 78`). Natural network byte order.\n- **Little-Endian:** Least significant byte stored first (`0x00: 78`, `0x01: 56`, `0x02: 34`, `0x03: 12`). Standard on modern x86 and ARM processors.\n",
            "questions": [
              {
                "id": "coa-4",
                "question": "Which architectural constraint is a core requirement of RISC (Reduced Instruction Set Computer) designs?",
                "options": [
                  "Variable length instructions",
                  "Load/Store architecture where ALU operations strictly use registers",
                  "Support for memory-to-memory arithmetic instructions",
                  "Only one general purpose register"
                ],
                "correct_option": 1,
                "explanation": "RISC architectures use a strict Load/Store model: memory is only accessed via LOAD and STORE instructions, while arithmetic operations strictly operate on registers."
              },
              {
                "id": "rc-2",
                "question": "What is the hallmark architectural characteristic of a RISC (e.g. ARM, RISC-V) processor compared to a CISC (x86) processor?",
                "options": [
                  "Load/Store architecture where memory access is strictly restricted to LOAD and STORE instructions, and all arithmetic operations occur between registers",
                  "Variable instruction length with complex addressing modes directly operating on RAM",
                  "Absence of hardware registers",
                  "Inability to execute pipelined instructions"
                ],
                "correct_option": 0,
                "explanation": "RISC processors enforce a strict Load/Store architecture: arithmetic/logic instructions operate exclusively on CPU registers; memory is only accessed via explicit load and store instructions."
              },
              {
                "id": "rc-3",
                "question": "What is the role of the Program Counter (PC) register in a CPU?",
                "options": [
                  "It holds the memory address of the next instruction to be fetched and executed",
                  "It counts the total number of clock cycles since system boot",
                  "It stores the result of the most recent ALU computation",
                  "It tracks the memory address of the bottom of the stack"
                ],
                "correct_option": 0,
                "explanation": "The Program Counter (PC) is a dedicated CPU register that holds the memory address of the instruction that is to be fetched and executed next."
              }
            ],
            "difficulty": "Medium",
            "companyTags": [
              "ARM",
              "Apple",
              "Intel",
              "Qualcomm"
            ],
            "keyTakeaways": [
              "RISC (Reduced Instruction Set Computer): Fixed instruction length, single-cycle execution, Load/Store architecture (ARM, RISC-V).",
              "CISC (Complex Instruction Set Computer): Variable-length instructions, complex multi-clock instructions that access memory directly (x86).",
              "Program Counter (PC) stores the address of the next instruction to be fetched."
            ]
          }
        ]
      },
      {
        "id": "compiler-toc",
        "slug": "theory-of-computation-and-compilers",
        "title": "Theory of Computation & Compiler Design",
        "description": "Chomsky hierarchy, DFA vs NFA, lexical analysis, context-free grammars, LL vs LR parsing, and Abstract Syntax Trees.",
        "icon": "Terminal",
        "topics": [
          {
            "id": "finite-automata-dfa-nfa",
            "slug": "finite-automata-and-regular-languages",
            "title": "Finite Automata: DFA, NFA & Regular Languages",
            "description": "Deterministic vs Non-Deterministic Finite Automata, epsilon transitions, subset construction, state minimization, and pumping lemma.",
            "estimatedMinutes": 20,
            "notesMarkdown": "# Finite Automata & Regular Languages\n\nFinite Automata are mathematical models of computation used in lexical analyzers, pattern matching engines, and protocol verification.\n\n---\n\n## 1. DFA vs. NFA\n- **DFA (Deterministic Finite Automaton):**\n  - For each state and input symbol, there is **exactly one** valid transition: $\\delta: Q \\times \\Sigma \\rightarrow Q$.\n  - No $\\epsilon$ (empty/epsilon) transitions.\n  - Highly efficient in software ($O(N)$ execution time).\n- **NFA (Non-Deterministic Finite Automaton):**\n  - Can transition to zero, one, or multiple states on an input symbol: $\\delta: Q \\times \\Sigma \\rightarrow 2^Q$.\n  - Can transition without consuming input ($\\\\epsilon$-moves).\n- **Equivalence:** For every NFA, there exists an equivalent DFA accepting the exact same language (constructed via **Subset Construction / Powerset algorithm**).\n\n## 2. Chomsky Hierarchy of Grammars\n1. **Type 3 (Regular):** Recognized by **Finite Automata** (Regex, Lexical tokens).\n2. **Type 2 (Context-Free):** Recognized by **Pushdown Automata (PDA)** (Programming language syntax, balanced brackets).\n3. **Type 1 (Context-Sensitive):** Recognized by **Linear Bounded Automata (LBA)**.\n4. **Type 0 (Unrestricted):** Recognized by **Turing Machines** (General computation).\n",
            "questions": [
              {
                "id": "toc-1",
                "question": "Can every Non-Deterministic Finite Automaton (NFA) be converted into an equivalent Deterministic Finite Automaton (DFA)?",
                "options": [
                  "Yes, via the Subset Construction algorithm",
                  "No, NFAs are fundamentally more expressive than DFAs",
                  "Only if the NFA has no loops",
                  "Only for alphabets of size 2"
                ],
                "correct_option": 0,
                "explanation": "DFAs and NFAs recognize the exact same class of regular languages; the Subset Construction algorithm can transform any NFA with n states into an equivalent DFA with up to 2^n states."
              },
              {
                "id": "toc-2",
                "question": "According to the Chomsky Hierarchy, what computational model recognizes Context-Free Languages used to describe programming language syntax?",
                "options": [
                  "Deterministic Finite Automaton (DFA)",
                  "Pushdown Automaton (PDA)",
                  "Linear Bounded Automaton (LBA)",
                  "Turing Machine only"
                ],
                "correct_option": 1,
                "explanation": "Pushdown Automata (PDA), which augment a finite automaton with a stack memory, recognize Context-Free Languages (Type 2)."
              },
              {
                "id": "fa-3",
                "question": "Can every Non-Deterministic Finite Automaton (NFA) be converted into an equivalent Deterministic Finite Automaton (DFA)?",
                "options": [
                  "Yes, using the Subset Construction (Powerset Construction) algorithm, although the DFA may have up to 2^N states in the worst case",
                  "No, NFAs are fundamentally more powerful than DFAs and can accept non-regular languages",
                  "Only if the NFA contains zero epsilon transitions",
                  "Only for finite alphabets with size equal to 1"
                ],
                "correct_option": 0,
                "explanation": "By the Subset Construction algorithm, every NFA can be transformed into an equivalent DFA recognizing the exact same regular language, with at most 2^N states."
              }
            ],
            "difficulty": "Hard",
            "companyTags": [
              "Google",
              "Microsoft",
              "Adobe"
            ],
            "keyTakeaways": [
              "DFA (Deterministic Finite Automaton): Exactly one transition for every state and input symbol; no epsilon moves.",
              "NFA (Non-deterministic): Multiple or zero transitions per state and symbol; allows epsilon transitions.",
              "DFA and NFA have identical computational power: both recognize precisely the class of Regular Languages (Subset Construction Algorithm)."
            ]
          },
          {
            "id": "compiler-phases-parsing",
            "slug": "compiler-phases-and-parsing",
            "title": "Phases of a Compiler: Lexical, Syntax & Semantic Analysis",
            "description": "Tokens, Lexer, Context-Free Grammars, Ambiguity, Top-Down LL(1) vs Bottom-Up LR(0)/LALR, AST, and intermediate code generation.",
            "estimatedMinutes": 20,
            "notesMarkdown": "# Compiler Phases & Parsing Techniques\n\nA compiler translates high-level source code into efficient target machine code across sequential analysis and synthesis phases.\n\n---\n\n## 1. The 6 Compiler Phases\n1. **Lexical Analysis (Scanner):** Converts stream of characters into tokens (`KEYWORD`, `IDENTIFIER`, `NUMBER`), discarding whitespace and comments.\n2. **Syntax Analysis (Parser):** Verifies tokens against language Context-Free Grammar (CFG), generating a parse tree or Abstract Syntax Tree (AST).\n3. **Semantic Analysis:** Type checking, variable scope resolution, array bounds checking.\n4. **Intermediate Code Generation (ICG):** Produces machine-independent representation (e.g. Three-Address Code, LLVM IR).\n5. **Code Optimization:** Dead code elimination, constant folding, loop unrolling.\n6. **Target Code Generation:** Produces assembly/machine code with register allocation.\n\n## 2. Top-Down vs. Bottom-Up Parsing\n- **Top-Down Parsing (LL):** Builds parse tree from root to leaves.\n  - **LL(1):** Left-to-right scan, Leftmost derivation, 1 token lookahead. Cannot handle **left-recursive** grammars.\n- **Bottom-Up Parsing (LR):** Builds parse tree from leaves to root using **Shift-Reduce** actions.\n  - Handles a wider range of grammars than LL; used by Yacc/Bison parser generators.\n",
            "questions": [
              {
                "id": "comp-1",
                "question": "Which phase of a compiler performs type checking and verifies that variables are declared before being referenced in expressions?",
                "options": [
                  "Lexical Analysis",
                  "Syntax Analysis",
                  "Semantic Analysis",
                  "Code Optimization"
                ],
                "correct_option": 2,
                "explanation": "Semantic analysis ensures program meaning adheres to language rules, checking type compatibility, declaration scoping, and function argument signatures."
              },
              {
                "id": "comp-2",
                "question": "Why can an LL(1) parser not parse a grammar containing direct left recursion (e.g. A -> A alpha | beta)?",
                "options": [
                  "It causes the parser to loop infinitely without consuming tokens",
                  "LL(1) parsers do not support terminal symbols",
                  "Left recursion requires a Turing machine",
                  "Grammars cannot contain recursion"
                ],
                "correct_option": 0,
                "explanation": "Direct left recursion causes a top-down predictive LL parser to recursively expand the left non-terminal without advancing the input pointer, triggering an infinite recursive loop."
              },
              {
                "id": "cp-parse-3",
                "question": "What data structure is produced by the Syntax Analysis (Parsing) phase of a modern compiler to represent the grammatical structure of the source code?",
                "options": [
                  "Abstract Syntax Tree (AST)",
                  "Symbol Table",
                  "Three-Address Code (TAC)",
                  "Bytecode Object File"
                ],
                "correct_option": 0,
                "explanation": "The parser takes the linear sequence of tokens from the lexical analyzer and builds an Abstract Syntax Tree (AST) or Parse Tree capturing the syntactic hierarchy defined by the grammar."
              }
            ],
            "difficulty": "Hard",
            "companyTags": [
              "Google",
              "Microsoft",
              "Meta",
              "Apple"
            ],
            "keyTakeaways": [
              "Phases: Lexical Analysis (Scanner -> Tokens) -> Syntax Analysis (Parser -> Parse Tree / AST) -> Semantic Analysis (Type checking) -> Intermediate Code Generation -> Optimization -> Target Code Generation.",
              "Top-down parsing (LL): Starts from Start symbol and derives string; uses lookahead tokens.",
              "Bottom-up parsing (LR): Starts from string tokens and reduces to Start symbol (shift-reduce)."
            ]
          }
        ]
      }
    ]
  }
};
