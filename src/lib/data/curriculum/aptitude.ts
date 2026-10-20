import type { SectionCategory } from './types';

export const QUANTITATIVE_APTITUDE_CATEGORY: SectionCategory = {
  "id": "quant",
  "slug": "quantitative-aptitude",
  "title": "Quantitative Aptitude",
  "description": "Percentages, ratios, profit & loss, time & work, speed & distance, number systems, and combinatorics.",
  "icon": "BookOpen",
  "topics": [
    {
      "id": "percentages-interest",
      "slug": "percentages-and-interest",
      "title": "Percentages & Simple / Compound Interest",
      "description": "Percentage base shifts, Simple Interest, Compounding frequency, and CI-SI 2-year difference formula.",
      "estimatedMinutes": 15,
      "notesMarkdown": "# Percentages, Simple Interest & Compound Interest\n\nPercentages and interest calculations form the bedrock of numerical aptitude assessments across competitive and placement examinations.\n\n---\n\n## 1. Percentage Foundations & Multiplier Method\n\nA percentage represents a fraction with denominator $100$: $x\\% = \\frac{x}{100}$.\n\n### Standard Fraction to Percentage Conversions\n| Fraction | Percent | Fraction | Percent | Fraction | Percent |\n| :---: | :---: | :---: | :---: | :---: | :---: |\n| $1/2$ | $50\\%$ | $1/6$ | $16.67\\%$ | $1/11$ | $9.09\\%$ |\n| $1/3$ | $33.33\\%$ | $1/7$ | $14.28\\%$ | $1/12$ | $8.33\\%$ |\n| $1/4$ | $25\\%$ | $1/8$ | $12.5\\%$ | $1/15$ | $6.67\\%$ |\n| $1/5$ | $20\\%$ | $1/9$ | $11.11\\%$ | $1/16$ | $6.25\\%$ |\n\n### The Decimal Multiplier Concept\n- Increase by $x\\%$: Multiply original by $\\left(1 + \\frac{x}{100}\\right)$\n- Decrease by $x\\%$: Multiply original by $\\left(1 - \\frac{x}{100}\\right)$\n- **Net Successive Change Formula:**\n  If a quantity changes by $+a\\%$ and then by $+b\\%$, the net percentage change is:\n  $$\\text{Net Change} = a + b + \\frac{a \\cdot b}{100} \\%$$\n\n---\n\n## 2. Simple Interest (SI)\n\nSimple Interest is computed strictly on the original principal $P$ over time $T$ years at rate $R\\%$ per annum:\n\n$$\\text{SI} = \\frac{P \\cdot R \\cdot T}{100}$$\n$$\\text{Total Amount } A = P + \\text{SI} = P \\left(1 + \\frac{R \\cdot T}{100}\\right)$$\n\n---\n\n## 3. Compound Interest (CI)\n\nCompound Interest compounds accumulated interest into principal at the end of each compounding interval.\n\n$$\\text{Total Amount } A = P \\left(1 + \\frac{R}{100 \\cdot n}\\right)^{n \\cdot T}$$\nWhere $n$ is compounding frequency per year ($n=1$ annual, $n=2$ semi-annual, $n=4$ quarterly).\n\n$$\\text{CI} = A - P = P \\left[ \\left(1 + \\frac{R}{100}\\right)^T - 1 \\right]$$\n\n### Key Difference Formula ($CI - SI$):\n- **For 2 Years ($T = 2$):**\n  $$\\text{CI}_2 - \\text{SI}_2 = P \\left(\\frac{R}{100}\\right)^2$$\n- **For 3 Years ($T = 3$):**\n  $$\\text{CI}_3 - \\text{SI}_3 = P \\left(\\frac{R}{100}\\right)^2 \\left(\\frac{300 + R}{100}\\right)$$\n",
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
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Percentages+%26+Simple+%2F+Compound+Interest+Quantitative+Aptitude+lecture",
      "prerequisites": [
        "Basic Arithmetic and Fractions",
        "Decimals and Ratio Concepts"
      ],
      "externalResources": [
        {
          "title": "Percentages and Interest Formulas — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/quantitative-aptitude/",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "Simple and Compound Interest Guide — InterviewBit",
          "provider": "InterviewBit",
          "url": "https://www.interviewbit.com/quantitative-aptitude-interview-questions/",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    },
    {
      "id": "ratio-proportion",
      "slug": "ratio-proportion-alligations",
      "title": "Ratio, Proportion & Rule of Alligation",
      "description": "Direct & inverse variation, mean proportional, duplicate ratios, and weighted mixture alligations.",
      "estimatedMinutes": 14,
      "notesMarkdown": "# Ratio, Proportion & Compounding Principles\n\nA ratio represents the quantitative relation between two amounts showing how many times one value contains or is contained within the other.\n\n---\n\n## 1. Core Mathematical Properties\n\n- **Ratio Invariance:** For any non-zero constant $k$:\n  $$\\frac{a}{b} = \\frac{k \\cdot a}{k \\cdot b}$$\n- **Proportion Equality:** If $a : b = c : d$ ($a/b = c/d$), then:\n  - Product of Extremes $=$ Product of Means: $a \\cdot d = b \\cdot c$\n  - Invertendo: $b : a = d : c$\n  - Alternando: $a : c = b : d$\n  - Componendo & Dividendo: $\\frac{a + b}{a - b} = \\frac{c + d}{c - d}$\n\n---\n\n## 2. Compounding Compound Ratios ($A:B$ and $B:C$)\n\nTo combine $A : B = x : y$ and $B : C = z : w$:\n1. Scale so the shared term $B$ matches in both ratios:\n   - Multiply $A : B$ by $z \\implies (x \\cdot z) : (y \\cdot z)$\n   - Multiply $B : C$ by $y \\implies (y \\cdot z) : (y \\cdot w)$\n2. Result:\n   $$A : B : C = (x \\cdot z) : (y \\cdot z) : (y \\cdot w)$$\n\n### Worked Example:\nIf $A : B = 2 : 3$ and $B : C = 4 : 5$:\n- $A : B : C = (2 \\times 4) : (3 \\times 4) : (3 \\times 5) = \\mathbf{8 : 12 : 15}$.\n\n---\n\n## 3. Dynamic Ratio Transitions (Add/Subtract Entities)\n\n### Problem Blueprint:\nThe ratio of boys to girls in a college is $5 : 3$. If 50 boys leave and 50 girls join, the ratio becomes $9 : 7$. What was the original number of boys?\n\n### Step-by-Step Solution:\n1. Let original boys $= 5x$ and girls $= 3x$.\n2. After transition:\n   $$\\frac{5x - 50}{3x + 50} = \\frac{9}{7}$$\n3. Cross-multiply:\n   $$7(5x - 50) = 9(3x + 50) \\implies 35x - 350 = 27x + 450$$\n   $$8x = 800 \\implies x = 100$$\n4. Original boys $= 5 \\times 100 = \\mathbf{500}$.\n",
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
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Ratio%2C+Proportion+%26+Rule+of+Alligation+Quantitative+Aptitude+lecture",
      "prerequisites": [
        "Basic Multiplication and Division",
        "Fractions and Equations"
      ],
      "externalResources": [
        {
          "title": "Ratios and Proportions Tutorial — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/ratios-and-proportions/",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    },
    {
      "id": "profit-loss",
      "slug": "profit-loss-discount",
      "title": "Profit, Loss & Successive Discounts",
      "description": "Cost Price, Selling Price, Marked Price, Margin, and Successive Percentage Discounts.",
      "estimatedMinutes": 16,
      "notesMarkdown": "# Profit, Loss, Marked Price & Successive Discounts\n\nCommercial mathematics assessments frequently feature retail pricing, multi-tier successive discounts, dishonest weighing, and unit cost equations.\n\n---\n\n## 1. Foundational Accounting Terms & Relations\n\n```\n               +-----------------------------------------+\n               | Marked Price (MP) / List Price / MRP    |\n               +-----------------------------------------+\n                                    |\n                            - Discount % (D)\n                                    v\n+-----------------------+   Profit %   +-----------------------+\n|    Cost Price (CP)    | -----------> |   Selling Price (SP)  |\n+-----------------------+              +-----------------------+\n```\n\n### Core Equations:\n- $\\text{Profit} = \\text{SP} - \\text{CP} \\quad (\\text{when } \\text{SP} > \\text{CP})$\n- $\\text{Loss} = \\text{CP} - \\text{SP} \\quad (\\text{when } \\text{CP} > \\text{SP})$\n- **Profit Percentage:**\n  $$\\text{Profit \\%} = \\frac{\\text{SP} - \\text{CP}}{\\text{CP}} \\times 100\\%$$\n- **Loss Percentage:**\n  $$\\text{Loss \\%} = \\frac{\\text{CP} - \\text{SP}}{\\text{CP}} \\times 100\\%$$\n  *(Crucial rule: Profit % and Loss % are ALWAYS calculated over CP unless explicitly stated otherwise).*\n\n---\n\n## 2. Successive Discounts & Net Selling Price\n\nWhen a merchant offers two successive discounts of $d_1\\%$ and $d_2\\%$ on Marked Price (MP):\n$$\\text{SP} = \\text{MP} \\times \\left(1 - \\frac{d_1}{100}\\right) \\times \\left(1 - \\frac{d_2}{100}\\right)$$\n$$\\text{Single Equivalent Discount } D_{\\text{net}} = d_1 + d_2 - \\frac{d_1 \\cdot d_2}{100} \\%$$\n\n### Worked Example:\nAn item is marked at $\\$500$ and sold with successive discounts of $20\\%$ and $10\\%$.\n$$\\text{SP} = 500 \\times 0.80 \\times 0.90 = 500 \\times 0.72 = \\mathbf{\\$360}$$\nNet single discount $= 20 + 10 - \\frac{200}{100} = 28\\%$. $\\$500 \\times (1 - 0.28) = \\$360$.\n\n---\n\n## 3. The Dishonest Merchant & False Weights\n\nWhen a dealer claims to sell goods at cost price ($\\text{SP} = \\text{CP}$ per unit nominal weight) but uses a false weight that under-delivers product:\n\n$$\\text{Actual Gain \\%} = \\frac{\\text{Error}}{\\text{True Value} - \\text{Error}} \\times 100\\% = \\frac{\\text{Nominal Weight} - \\text{Actual Weight Given}}{\\text{Actual Weight Given}} \\times 100\\%$$\n\n### Worked Example:\nA dealer claims to sell at cost price, but uses a 900g false weight instead of 1000g:\n$$\\text{Gain \\%} = \\frac{1000 - 900}{900} \\times 100\\% = \\frac{100}{900} \\times 100\\% = \\frac{1}{9} \\times 100\\% = \\mathbf{11.11\\%}$$\n\n---\n\n## 4. Selling $N$ items with profit of $K$ items\n\n### Worked Example:\nBy selling 33 meters of cloth, a merchant gains the selling price of 11 meters. Find the merchant's profit percentage.\n1. Let $\\text{SP of } 1 \\text{ meter} = \\$1$.\n2. $\\text{SP of } 33 \\text{ meters} = \\$33$.\n3. $\\text{Profit} = \\text{SP of } 11 \\text{ meters} = \\$11$.\n4. $\\text{CP of } 33 \\text{ meters} = \\text{SP} - \\text{Profit} = \\$33 - \\$11 = \\$22$.\n5. $\\text{Profit \\%} = \\frac{\\text{Profit}}{\\text{CP}} \\times 100\\% = \\frac{11}{22} \\times 100\\% = \\mathbf{50\\%}$.\n",
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
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Profit%2C+Loss+%26+Successive+Discounts+Quantitative+Aptitude+lecture",
      "prerequisites": [
        "Percentages and Decimal Multipliers",
        "Linear Equations"
      ],
      "externalResources": [
        {
          "title": "Profit and Loss Formulas & Shortcuts — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/profit-and-loss/",
          "difficulty": "Beginner",
          "isFree": true
        },
        {
          "title": "Aptitude: Profit and Loss Problems — InterviewBit",
          "provider": "InterviewBit",
          "url": "https://www.interviewbit.com/quantitative-aptitude-interview-questions/",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    },
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
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Time+and+Work+Quantitative+Aptitude+lecture",
      "prerequisites": [
        "Ratios and Proportions",
        "LCM of Integers"
      ],
      "externalResources": [
        {
          "title": "Time and Work Problems and Shortcuts — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/time-and-work/",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    },
    {
      "id": "speed-time-distance",
      "slug": "speed-time-distance",
      "title": "Speed, Time & Distance (Trains & Streams)",
      "description": "Relative speed, train crossing times, average speed harmonic mean, and upstream/downstream boats.",
      "estimatedMinutes": 18,
      "notesMarkdown": "# Speed, Time & Distance: Relative Speed, Trains & River Streams\n\nMastering dimensional unit conversions, relative velocity vectors, and multi-train crossings.\n\n---\n\n## 1. Foundational Relations & Unit Conversion\n\n$$\\text{Distance} = \\text{Speed} \\times \\text{Time}$$\n\n### Rapid Unit Conversion:\n- $\\text{km/h} \\to \\text{m/s}$: Multiply by $\\frac{5}{18}$\n- $\\text{m/s} \\to \\text{km/h}$: Multiply by $\\frac{18}{5}$\n\n### Average Speed for Round Trips:\nWhen traveling a fixed distance $D$ at speed $x$ and returning at speed $y$:\n$$\\text{Average Speed} = \\frac{2xy}{x + y}$$\n\n---\n\n## 2. Relative Speed Principles\n\n```\nOpposite Directions (Approaching each other):\n[ Train A -> s1 ]         [ <- s2 Train B ]\nRelative Speed = s1 + s2\n\nSame Direction (Overtaking):\n[ Train A -> s1 ]   [ Train B -> s2 ]\nRelative Speed = |s1 - s2|\n```\n\n---\n\n## 3. Train Crossing Mechanics\n\n1. **Passing a Point Object (Pole, Person, Signpost):**\n   $$\\text{Distance} = L_{\\text{train}}$$\n   $$\\text{Time} = \\frac{L_{\\text{train}}}{\\text{Speed}}$$\n2. **Passing an Extended Object (Platform, Bridge, Tunnel):**\n   $$\\text{Distance} = L_{\\text{train}} + L_{\\text{platform}}$$\n3. **Two Trains Crossing Each Other:**\n   $$\\text{Distance} = L_1 + L_2$$\n   $$\\text{Time} = \\frac{L_1 + L_2}{\\text{Relative Speed}}$$\n\n### Worked Example:\nTwo trains 140m and 160m long run at 60 km/h and 40 km/h in opposite directions. Time to cross completely?\n- Total distance $= 140 + 160 = 300\\text{ m}$.\n- Relative speed $= 60 + 40 = 100\\text{ km/h} = 100 \\times \\frac{5}{18} = \\frac{500}{18}\\text{ m/s}$.\n- $\\text{Time} = \\frac{300}{500/18} = \\frac{300 \\times 18}{500} = \\frac{54}{5} = \\mathbf{10.8\\text{ seconds}}$.\n\n---\n\n## 4. Boats and River Streams\n\nLet Boat Speed in still water $= b\\text{ km/h}$, Stream current speed $= s\\text{ km/h}$.\n- **Downstream Speed ($u$):** Along the current $\\implies u = b + s$\n- **Upstream Speed ($v$):** Against the current $\\implies v = b - s$\n- **Inversion Formulas:**\n  $$b = \\frac{u + v}{2}, \\quad s = \\frac{u - v}{2}$$\n\n### Worked Example:\nA boat travels 24 km downstream in 2 hours ($u = 12\\text{ km/h}$) and takes 4 hours upstream ($v = 6\\text{ km/h}$). What is stream speed?\n$$s = \\frac{12 - 6}{2} = \\mathbf{3\\text{ km/h}}$$\n",
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
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Speed%2C+Time+%26+Distance+%28Trains+%26+Streams%29+Quantitative+Aptitude+lecture",
      "prerequisites": [
        "Basic Physics Motion Formulas",
        "Fractions and Conversions"
      ],
      "externalResources": [
        {
          "title": "Speed, Time, and Distance Formulas — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/speed-time-and-distance/",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    },
    {
      "id": "mixtures-alligations",
      "slug": "mixtures-and-alligations",
      "title": "Mixtures and Alligations",
      "description": "Rule of alligation, successive dilution, and mean concentration ratios.",
      "estimatedMinutes": 15,
      "notesMarkdown": "# Mixtures and Alligations: Weighted Averages & Repeated Dilution\n\nThe Rule of Alligation is a high-speed graphical shortcut for solving weighted average problems involving mixtures of two ingredients at different price or concentration levels.\n\n---\n\n## 1. The Rule of Alligation\n\n```\nCheaper Price / Conc (c)          Dearer Price / Conc (d)\n                    \\            /\n                     Mean Price (m)\n                    /            \\\nQuantity (Dearer) = (d - m)      Quantity (Cheaper) = (m - c)\n```\n\n$$\\frac{\\text{Quantity of Cheaper}}{\\text{Quantity of Dearer}} = \\frac{d - m}{m - c}$$\n\n### Worked Example:\nIn what ratio must rice at $\\$30/\\text{kg}$ be mixed with rice at $\\$45/\\text{kg}$ to obtain a mixture worth $\\$35/\\text{kg}$?\n- Cheaper $c = 30$, Dearer $d = 45$, Mean $m = 35$.\n- Ratio $= (45 - 35) : (35 - 30) = 10 : 5 = \\mathbf{2 : 1}$.\n\n---\n\n## 2. Repeated Dilution / Replacement Formula\n\nIf a vessel initially contains $V$ liters of pure liquid, and $x$ liters are repeatedly withdrawn and replaced with water $n$ times:\n\n$$\\text{Final Volume of Pure Liquid} = V \\left(1 - \\frac{x}{V}\\right)^n$$\n\n### Worked Example:\nA container contains 40 liters of milk. 4 liters are removed and replaced with water, and this process is repeated twice more ($n = 3$ total operations). Milk remaining?\n$$\\text{Remaining Milk} = 40 \\times \\left(1 - \\frac{4}{40}\\right)^3 = 40 \\times (0.9)^3 = 40 \\times 0.729 = \\mathbf{29.16\\text{ liters}}$$\n",
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
          "question": "In what ratio must a 20% alcohol solution be mixed with a 50% alcohol solution to produce a 30% alcohol solution?",
          "options": [
            "2 : 1",
            "1 : 2",
            "3 : 1",
            "2 : 3"
          ],
          "correct_option": 0,
          "explanation": "Using the Rule of Alligation: (Concentration 2 - Mean) : (Mean - Concentration 1) = (50 - 30) : (30 - 20) = 20 : 10 = 2 : 1."
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
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Mixtures+and+Alligations+Quantitative+Aptitude+lecture",
      "prerequisites": [
        "Ratios and Proportions",
        "Weighted Averages"
      ],
      "externalResources": [
        {
          "title": "Alligation and Mixture Rules — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/alligation-or-mixture/",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    },
    {
      "id": "apt-number-systems",
      "slug": "number-systems",
      "title": "Number Systems",
      "description": "Divisibility rules, unit digit calculation, remainders (Euler's totient, Fermat's Little Theorem), HCF and LCM, and prime factorization.",
      "estimatedMinutes": 18,
      "difficulty": "Easy",
      "companyTags": [
        "TCS Ninja",
        "Infosys",
        "Wipro",
        "Cognizant",
        "Capgemini"
      ],
      "keyTakeaways": [
        "Unit Digit Cyclicity: 2, 3, 7, 8 have cyclicity 4; 4, 9 have cyclicity 2; 0, 1, 5, 6 have cyclicity 1.",
        "Fermat's Little Theorem: If p is prime and gcd(a, p) = 1, then a^(p-1) mod p = 1.",
        "Product of two numbers: N1 * N2 = HCF(N1, N2) * LCM(N1, N2).",
        "Divisibility: By 3/9 (sum of digits), by 4 (last 2 digits), by 8 (last 3 digits), by 11 (alternating sum difference)."
      ],
      "notesMarkdown": "# Number Systems: Divisibility, Unit Digits, Remainders & LCM/HCF\n\nMastering prime factorizations, cyclicity of unit digits, and congruence modular arithmetic.\n\n---\n\n## 1. Unit Digit Calculation & Cyclicity\n\nThe unit digit of $x^n$ repeats in cycles of length $1, 2,$ or $4$:\n\n| Base Unit Digit | Powers Cyclicity Cycle | Cycle Length |\n| :---: | :---: | :---: |\n| **0, 1, 5, 6** | Always ends in same digit ($0, 1, 5, 6$) | 1 |\n| **4** | $4^1 = 4, \\; 4^2 = 6, \\; 4^3 = 4 \\dots$ | 2 ($4^{\\text{odd}} \\to 4, \\; 4^{\\text{even}} \\to 6$) |\n| **9** | $9^1 = 9, \\; 9^2 = 1, \\; 9^3 = 9 \\dots$ | 2 ($9^{\\text{odd}} \\to 9, \\; 9^{\\text{even}} \\to 1$) |\n| **2** | $2, 4, 8, 6$ | 4 |\n| **3** | $3, 9, 7, 1$ | 4 |\n| **7** | $7, 9, 3, 1$ | 4 |\n| **8** | $8, 4, 2, 6$ | 4 |\n\n### Worked Example:\nFind unit digit of $3^{65} \\times 6^{59} \\times 7^{71}$:\n- For $3^{65}$: $65 \\pmod 4 = 1 \\implies 3^1 \\to 3$\n- For $6^{59}$: 6 to any power always ends in $6$\n- For $7^{71}$: $71 \\pmod 4 = 3 \\implies 7^3 = 343 \\to 3$\n- Product of unit digits $= 3 \\times 6 \\times 3 = 54 \\implies \\mathbf{4}$.\n\n---\n\n## 2. HCF, LCM & Product Invariant\n\nFor any two positive integers $A$ and $B$:\n$$\\text{HCF}(A, B) \\times \\text{LCM}(A, B) = A \\times B$$\n\n### Worked Example:\n$\\text{HCF} = 12$, $\\text{LCM} = 144$, one number is $36$.\n$$B = \\frac{12 \\times 144}{36} = 12 \\times 4 = \\mathbf{48}$$\n\n---\n\n## 3. Modular Remainders & Fermat's Little Theorem\n\nFermat's Little Theorem states that if $p$ is prime and $\\gcd(a, p) = 1$:\n$$a^{p-1} \\equiv 1 \\pmod p$$\n\n### Worked Example:\nFind remainder when $2^{50}$ is divided by $7$:\n- Since $7$ is prime, $2^6 \\equiv 1 \\pmod 7$.\n- $50 = 6 \\times 8 + 2$.\n- $2^{50} = (2^6)^8 \\times 2^2 \\equiv 1^8 \\times 4 \\equiv \\mathbf{4} \\pmod 7$.\n",
      "questions": [
        {
          "id": "apt-ns-1",
          "question": "What is the unit digit of 3^65 * 6^59 * 7^71?",
          "options": [
            "1",
            "2",
            "4",
            "6"
          ],
          "correct_option": 2,
          "explanation": "3^65: 65 mod 4 = 1 -> unit digit 3. 6^59: always 6. 7^71: 71 mod 4 = 3 -> 7^3 = 343, unit digit 3. Product: 3 * 6 * 3 = 54 -> unit digit 4."
        },
        {
          "id": "apt-ns-2",
          "question": "The HCF and LCM of two numbers are 12 and 144 respectively. If one number is 36, what is the other number?",
          "options": [
            "48",
            "64",
            "72",
            "96"
          ],
          "correct_option": 0,
          "explanation": "Number 2 = (HCF * LCM) / Number 1 = (12 * 144) / 36 = 12 * 4 = 48."
        },
        {
          "id": "apt-num-3",
          "question": "What is the remainder when 2^50 is divided by 7?",
          "options": [
            "4",
            "2",
            "1",
            "6"
          ],
          "correct_option": 0,
          "explanation": "2^3 = 8 = 1 (mod 7). Expressing exponent: 50 = 3 * 16 + 2. Thus 2^50 = (2^3)^16 * 2^2 = (1)^16 * 4 = 4 (mod 7)."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Number+Systems+Quantitative+Aptitude+lecture",
      "prerequisites": [
        "Elementary Arithmetic",
        "Exponents and Factors"
      ],
      "externalResources": [
        {
          "title": "Number Systems for Placement Aptitude — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/number-system-in-quantitative-aptitude/",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    },
    {
      "id": "prob-perm",
      "slug": "probability-and-combinations",
      "title": "Permutations, Combinations & Probability",
      "description": "Selection vs arrangement, fundamental counting principle, independent events, and Bayes theorem.",
      "estimatedMinutes": 20,
      "notesMarkdown": "# Permutations, Combinations & Probability\n\nCombinatorial reasoning governs arrangements, selections, and stochastic probabilities in aptitude exams.\n\n---\n\n## 1. Permutations ($nPr$) vs. Combinations ($nCr$)\n\n| Dimension | Permutation ($nPr$) | Combination ($nCr$) |\n| :--- | :--- | :--- |\n| **Meaning** | Arrangement where **order matters** | Selection where **order does not matter** |\n| **Formula** | $P(n, r) = \\frac{n!}{(n-r)!}$ | $C(n, r) = \\frac{n!}{r!(n-r)!}$ |\n| **Symmetry** | $P(n, n) = n!$ | $C(n, r) = C(n, n-r)$ |\n\n---\n\n## 2. Arrangements with Identical Items & Grouping\n\nArranging $n$ objects where item 1 appears $p$ times, item 2 appears $q$ times:\n$$\\text{Arrangements} = \\frac{n!}{p! \\cdot q! \\dots}$$\n\n### Worked Example:\nArranging letters of **CORPORATION** such that all vowels are always together:\n- Letters: $C, R, P, R, T, N$ (6 consonants: 2 R's, 1 C, 1 P, 1 T, 1 N)\n- Vowels: $O, O, A, I, O$ (5 vowels: 3 O's, 1 A, 1 I)\n- Tie 5 vowels into 1 block. Total blocks to arrange $= 6 + 1 = 7$ blocks.\n- Arrangements of 7 blocks with 2 R's: $\\frac{7!}{2!} = \\frac{5040}{2} = 2520$.\n- Internal arrangements of 5 vowels with 3 O's: $\\frac{5!}{3!} = \\frac{120}{6} = 20$.\n- Total arrangements $= 2520 \\times 20 = \\mathbf{50,400}$.\n\n---\n\n## 3. Probability Axioms & Dice Combinations\n\n$$\\text{Probability } P(E) = \\frac{n(E)}{n(S)} = \\frac{\\text{Favorable Outcomes}}{\\text{Total Elementary Outcomes}}$$\n\n### Rolling Two Dice ($n(S) = 36$):\nSum of 7 outcomes: $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1) \\implies 6 \\text{ pairs}$.\n$$P(\\text{Sum} = 7) = \\frac{6}{36} = \\mathbf{\\frac{1}{6}}$$\n",
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
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Permutations%2C+Combinations+%26+Probability+Quantitative+Aptitude+lecture",
      "prerequisites": [
        "Combinatorics and Counting",
        "Factorial Properties"
      ],
      "externalResources": [
        {
          "title": "Permutations, Combinations & Probability — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/permutations-and-combinations/",
          "difficulty": "Intermediate",
          "isFree": true
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
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Pipes+and+Cisterns+Quantitative+Aptitude+lecture",
      "prerequisites": [
        "Time and Work LCM Method",
        "Positive and Negative Efficiencies"
      ],
      "externalResources": [
        {
          "title": "Pipes and Cisterns Formulas — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/pipes-and-cisterns/",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    },
    {
      "id": "clocks-calendars",
      "slug": "clocks-and-calendars",
      "title": "Clocks and Calendars",
      "description": "Angle between hands, clock gains/losses, leap year rules, and odd days computation.",
      "estimatedMinutes": 15,
      "notesMarkdown": "# Clocks and Calendars: Angular Velocity & Odd Day Arithmetic\n\nClocks and calendars assess angular kinematics and modular arithmetic over calendar cycles.\n\n---\n\n## 1. Clocks: Hand Velocities & Angle Formula\n\n```\n- Dial = 360 degrees = 60 minute divisions (6 degrees per minute space)\n- Minute Hand Speed = 360 deg / 60 min = 6 deg/min\n- Hour Hand Speed = 360 deg / 720 min = 0.5 deg/min\n- Relative Speed = 6 - 0.5 = 5.5 deg/min = (11/2) deg/min\n```\n\n### The Angle Formula:\n$$\\theta = \\left| 30H - \\frac{11}{2}M \\right|$$\n\n### Worked Example: Angle at 3:40\n$$\\theta = \\left| 30(3) - \\frac{11}{2}(40) \\right| = |90 - 220| = |-130| = \\mathbf{130^\\circ}$$\n\n### Coincidence Time ($0^\\circ$ between $H$ and $H+1$):\n$$M = \\frac{60}{11} \\times H \\text{ minutes past } H$$\nBetween 3 and 4 o'clock:\n$$M = \\frac{60}{11} \\times 3 = \\frac{180}{11} = \\mathbf{16\\frac{4}{11}\\text{ minutes past 3}}$$\n\n---\n\n## 2. Calendars: Odd Days & Leap Years\n\n- **Normal Year (365 days):** 52 weeks $+ 1 \\text{ day} \\implies \\mathbf{1\\text{ odd day}}$.\n- **Leap Year (366 days):** 52 weeks $+ 2 \\text{ days} \\implies \\mathbf{2\\text{ odd days}}$.\n  - Leap year if divisible by 4, except century years must be divisible by 400 (1900 was NOT leap, 2000 was LEAP).\n\n### Day of the Year Progression:\nIf Jan 1, 2007 was Monday, what was Jan 1, 2008?\n- 2007 is a non-leap year (1 odd day).\n- Day advances by $+1$: $\\text{Monday} + 1 = \\mathbf{\\text{Tuesday}}$.\n",
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
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Clocks+and+Calendars+Quantitative+Aptitude+lecture",
      "prerequisites": [
        "Circular Angles (360 degrees)",
        "Leap Year Rules and Gregorian Calendar"
      ],
      "externalResources": [
        {
          "title": "Clocks and Calendars Aptitude Shortcuts — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/clocks-in-quantitative-aptitude/",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    }
  ]
};

export const LOGICAL_REASONING_CATEGORY: SectionCategory = {
  "id": "logical",
  "slug": "logical-reasoning",
  "title": "Logical Reasoning",
  "description": "Series, patterns, analogies, syllogisms, coding-decoding, blood relations, and seating arrangement puzzles.",
  "icon": "Layers",
  "topics": [
    {
      "id": "apt-series-and-patterns",
      "slug": "series-and-patterns",
      "title": "Series and Patterns",
      "description": "Number series (arithmetic, geometric, Fibonacci, alternating, squares/cubes) and letter series completion.",
      "estimatedMinutes": 15,
      "difficulty": "Easy",
      "companyTags": [
        "TCS",
        "Accenture",
        "Infosys",
        "Wipro"
      ],
      "keyTakeaways": [
        "Difference analysis: Check 1st and 2nd level differences for polynomial progressions.",
        "Prime & Square series: Watch for n^2 +/- 1 or n^3 +/- n patterns.",
        "Alternating series: Odd and even indices follow separate concurrent arithmetic rules.",
        "Letter series: Convert alphabet letters to positions (A=1, Z=26; reverse A=26, Z=1) using EJOTY (5, 10, 15, 20, 25)."
      ],
      "notesMarkdown": "# Series and Patterns: Numerical, Alphabetical & Polynomial Sequences\n\nPattern recognition requires diagnosing progressive differences, multiplicative ratios, powers, and interleaving dual series.\n\n---\n\n## 1. Primary Number Series Categories\n\n1. **Difference Series:** Calculating $\\Delta_n = a_{n+1} - a_n$. If $\\Delta_n$ is constant $\\to$ AP; if $\\Delta_n$ increases by a constant $\\to$ 2nd order difference.\n2. **Multiplicative / Geometric Growth:** $a_{n+1} = k \\cdot a_n + c$.\n   - Example: $3, 7, 15, 31, 63 \\dots$\n     - Pattern: $a_{n+1} = 2a_n + 1$ (or $2^{n+1} - 1$).\n     - Next term: $2(63) + 1 = \\mathbf{127}$.\n3. **Polynomial Series ($n^2 \\pm k$ or $n^2 + n$):**\n   - Example: $2, 6, 12, 20, 30, 42 \\dots$\n     - Notice: $1 \\times 2, 2 \\times 3, 3 \\times 4, 4 \\times 5, 5 \\times 6, 6 \\times 7$.\n     - Next term: $7 \\times 8 = \\mathbf{56}$ (or $42 + 14 = 56$).\n\n---\n\n## 2. Alphabetical Position Indexing (The EJOTY Rule)\n\n```\nE = 5,  J = 10,  O = 15,  T = 20,  Y = 25\n```\n\n### Worked Example:\nSequence: $B, D, G, K, P, \\dots$\n- Convert to numerical alphabet indices:\n  $B = 2, \\; D = 4 \\; (+2), \\; G = 7 \\; (+3), \\; K = 11 \\; (+4), \\; P = 16 \\; (+5)$\n- Next jump must be $+6$:\n  $16 + 6 = 22 \\implies \\mathbf{V}$.\n",
      "questions": [
        {
          "id": "apt-sp-1",
          "question": "What is the next number in the series: 3, 7, 15, 31, 63, ...?",
          "options": [
            "95",
            "127",
            "125",
            "129"
          ],
          "correct_option": 1,
          "explanation": "Pattern: 2x + 1 (or differences doubling: +4, +8, +16, +32, +64). Next number = 63 + 64 = 127."
        },
        {
          "id": "apt-sp-2",
          "question": "Find the missing term in the sequence: B, D, G, K, P, ...?",
          "options": [
            "U",
            "V",
            "W",
            "X"
          ],
          "correct_option": 1,
          "explanation": "Positions: B(2) -> +2 -> D(4) -> +3 -> G(7) -> +4 -> K(11) -> +5 -> P(16) -> +6 -> 22, which corresponds to letter V."
        },
        {
          "id": "apt-ser-3",
          "question": "What is the next number in the sequence: 2, 6, 12, 20, 30, 42, ...?",
          "options": [
            "56",
            "54",
            "52",
            "60"
          ],
          "correct_option": 0,
          "explanation": "The pattern is n * (n + 1): 1*2=2, 2*3=6, 3*4=12, 4*5=20, 5*6=30, 6*7=42. The next term is 7*8 = 56 (or differences: +4, +6, +8, +10, +12, +14 => 42 + 14 = 56)."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Series+and+Patterns+Logical+Reasoning+lecture",
      "prerequisites": [
        "Basic Arithmetic and Sequence Identification",
        "Alphabetical Indexing"
      ],
      "externalResources": [
        {
          "title": "Number and Letter Series Reasoning — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/number-series-in-logical-reasoning/",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    },
    {
      "id": "apt-analogies-and-classification",
      "slug": "analogies-and-classification",
      "title": "Analogies and Classification",
      "description": "Word analogies, number analogies, odd-man-out classification, and semantic relationship mapping.",
      "estimatedMinutes": 15,
      "difficulty": "Easy",
      "companyTags": [
        "TCS Ninja",
        "Capgemini",
        "Cognizant",
        "Mindtree"
      ],
      "keyTakeaways": [
        "Analogy relationship types: Tool-Worker, Cause-Effect, Part-Whole, Synonyms-Antonyms, Degree of intensity.",
        "Classification (Odd-Man-Out): Identify common shared property among 3 options and the outlier violating it."
      ],
      "notesMarkdown": "# Analogies, Semantic Mapping & Classification (Odd-One-Out)\n\nAnalogy and Classification questions evaluate relational reasoning, vocabulary depth, mathematical pattern recognition, and conceptual categorization. They appear widely across campus placement assessments (TCS, Infosys, Wipro, Cognizant, Accenture) and standardized exams (GATE Aptitude, CAT).\n\n---\n\n## 1. The Anatomy of an Analogy ($A : B :: C : D$)\n\nThe notation $A : B :: C : D$ is read: *\"A is related to B in the exact same manner as C is related to D.\"*\n\n### The 8 Classic Analogy Relationships:\n1. **Tool & User / Worker:**\n   - *Carpenter : Saw :: Surgeon : Scalpel*\n   - *Astronomer : Telescope :: Sculptor : Chisel*\n2. **Worker & End Product:**\n   - *Author : Novel :: Choreographer : Ballet*\n   - *Mason : Wall :: Goldsmith : Ornament*\n3. **Instrument & Measurement:**\n   - *Barometer : Atmospheric Pressure :: Anemometer : Wind Speed*\n   - *Seismograph : Earthquake Intensity :: Hygrometer : Humidity*\n4. **Cause & Effect / Symptom:**\n   - *Pathogen : Infection :: Friction : Heat*\n   - *Drought : Famine :: Rain : Flood*\n5. **Part to Whole (Meronymy):**\n   - *Spoke : Wheel :: Petal : Flower*\n   - *Stanza : Poem :: Cell : Organism*\n6. **Degree of Intensity / Gradation:**\n   - *Warm : Torrid :: Cool : Frigid*\n   - *Whisper : Shout :: Glance : Scrutinize*\n7. **Synonyms and Antonyms:**\n   - *Prodigal : Spendthrift :: Parsimonious : Miserly* (Synonyms)\n   - *Ephemeral : Eternal :: Obsolete : Contemporary* (Antonyms)\n8. **Word Morphology / Sound / Anagrams:**\n   - *Night : Knight :: Bare : Bear* (Homophones)\n\n---\n\n## 2. Number & Letter Analogies\n\nWhen dealing with alphanumeric analogies, examine patterns in this priority order:\n1. **Prime numbers** (e.g., $11 : 13 :: 17 : 19$ - successive primes).\n2. **Squares and Cubes** (e.g., $n : n^2 \\pm 1$ or $n : n^3 \\pm n$).\n3. **Digit operations** (Sum of digits, product of digits, reversing digits).\n4. **Letter positional values** (A = 1, Z = 26; reverse positions: A = 26, Z = 1; sum of opposite letters $= 27$).\n\n---\n\n## 3. Classification (Odd-Man-Out) Strategy\n\nIn classification questions, four or five options are given, and exactly one does not fit.\n\n### The Golden Rule:\n**Never just search for why one option is unique.** Every option is unique in some arbitrary way!\nInstead, **you must first prove an unambiguous common rule that binds the other three options together**, leaving the remaining option as the clear outlier.\n\n- **Example:** $\\{2, 3, 5, 9\\}$. Why is 9 the odd one out? Because $\\{2, 3, 5\\}$ are all **prime numbers**, while 9 is composite. (Note: Saying \"2 is the odd one because it's even\" is rejected if a broader category of primes exists).\n",
      "questions": [
        {
          "id": "apt-ac-1",
          "question": "Complete the analogy: Seismograph : Earthquake :: Hygrometer : ?",
          "options": [
            "Atmospheric Pressure",
            "Humidity",
            "Wind Velocity",
            "Precipitation"
          ],
          "correct_option": 1,
          "explanation": "A seismograph measures earthquakes; a hygrometer measures humidity in the air."
        },
        {
          "id": "apt-ac-2",
          "question": "Find the odd one out: 27, 64, 125, 144, 216",
          "options": [
            "64",
            "125",
            "144",
            "216"
          ],
          "correct_option": 2,
          "explanation": "27 (3^3), 64 (4^3), 125 (5^3), and 216 (6^3) are all perfect cubes. 144 is 12^2 (a square, not a cube)."
        },
        {
          "id": "apt-ana-3",
          "question": "Thermometer : Temperature :: Barometer : ?",
          "options": [
            "Atmospheric Pressure",
            "Humidity",
            "Wind Speed",
            "Altitude"
          ],
          "correct_option": 0,
          "explanation": "A thermometer is an instrument used to measure temperature; a barometer is an instrument used to measure atmospheric pressure."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Analogies+and+Classification+Logical+Reasoning+lecture",
      "prerequisites": [
        "Semantic Word Relationships",
        "Set Classification"
      ],
      "externalResources": [
        {
          "title": "Analogy and Classification in Reasoning — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/analogy-in-logical-reasoning/",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    },
    {
      "id": "syllogisms",
      "slug": "syllogisms-and-deduction",
      "title": "Syllogisms & Logical Deductions",
      "description": "Venn diagram approach, \"All/Some/No\" rules, and definite vs possibility conclusions.",
      "estimatedMinutes": 12,
      "notesMarkdown": "# Syllogisms & Deductive Logic: Venn Diagrams & Inference Rules\n\nSyllogisms test categorical deductive reasoning, determining whether conclusions follow necessarily from stated premise propositions.\n\n---\n\n## 1. The 4 Standard Categorical Propositions\n\n```\nType A: Universal Affirmative  | \"All S are P\"     | S is a proper subset of P\nType E: Universal Negative     | \"No S is P\"       | Disjoint sets (S ∩ P = ∅)\nType I: Particular Affirmative | \"Some S are P\"    | Overlapping sets (S ∩ P ≠ ∅)\nType O: Particular Negative    | \"Some S are not P\"| Part of S lies outside P\n```\n\n```\nUniversal Affirmative:           Universal Negative:           Particular Affirmative:\n+-------------------+            +-------+   +-------+         +-------+---+-------+\n|  P                |            |   S   |   |   P   |         |   S   |S∩P|   P   |\n|   +-----------+   |            |       |   |       |         |       |   |       |\n|   |     S     |   |            +-------+   +-------+         +-------+---+-------+\n|   +-----------+   |            (Disjoint sets)               (Non-empty intersection)\n+-------------------+\n```\n\n---\n\n## 2. Syllogistic Inference Rules & Complementary Pairs\n\n- **Definite vs. Possibility:** A conclusion follows *only* if it holds in **all possible valid Venn diagrams**.\n- **Complementary Pairs (\"Either I or II Follows\"):**\n  1. Both conclusions contain identical subject and predicate elements.\n  2. One conclusion is positive and one is negative.\n  3. Valid pairs: **Some + No** OR **All + Some Not**.\n\n### Worked Example:\n- **Statements:** All cats are dogs. No dog is a bird.\n- **Conclusions:**\n  - I. No cat is a bird: True (Since all cats are enclosed within dogs, and dogs have zero overlap with birds, cats cannot touch birds).\n  - II. Some dogs are cats: True (Since all cats are dogs, the portion of dogs containing cats is non-empty).\n- **Result:** Both conclusions I and II follow.\n",
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
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Syllogisms+%26+Logical+Deductions+Logical+Reasoning+lecture",
      "prerequisites": [
        "Propositional Logic",
        "Venn Diagram Set Representation"
      ],
      "externalResources": [
        {
          "title": "Syllogisms and Deductive Reasoning — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/syllogism-logical-reasoning/",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "coding-decoding",
      "slug": "coding-decoding-series",
      "title": "Coding-Decoding & Direction Sense",
      "description": "Letter shifts, reverse opposites (A-Z, B-Y), alphanumeric series, and 8-direction navigation paths.",
      "estimatedMinutes": 14,
      "notesMarkdown": "# Coding-Decoding and Spatial Direction Navigation\n\nLogical deduction using letter positions, shift cyphers, and 2D compass mapping.\n\n---\n\n## 1. Alphabet Position Matrices\n- **EJOTY Rule (Multiples of 5):**\n  - E = 5, J = 10, O = 15, T = 20, Y = 25.\n- **Reverse Alphabet Pairs (Sum = 27):**\n  - A (1) $\\leftrightarrow$ Z (26)\n  - B (2) $\\leftrightarrow$ Y (25)\n  - C (3) $\\leftrightarrow$ X (24)\n  - D (4) $\\leftrightarrow$ W (23)\n  - E (5) $\\leftrightarrow$ V (22) *(LOVE: L-O, V-E)*\n  - F (6) $\\leftrightarrow$ U (21)\n  - G (7) $\\leftrightarrow$ T (20) *(GT Road)*\n  - H (8) $\\leftrightarrow$ S (19) *(High School)*\n  - I (9) $\\leftrightarrow$ R (18) *(Indian Railway)*\n  - J (10) $\\leftrightarrow$ Q (17) *(Jungle Queen)*\n  - K (11) $\\leftrightarrow$ P (16) *(Kanpur)*\n  - M (13) $\\leftrightarrow$ N (14)\n\n---\n\n## 2. Direction Sense & Pythagorean Distance\n- Standard 8-point compass: North (N), North-East (NE), East (E), South-East (SE), South (S), South-West (SW), West (W), North-West (NW).\n- Right Turn $= 90^\\circ$ Clockwise. Left Turn $= 90^\\circ$ Counter-Clockwise.\n- Shortest aerial displacement between start $(x_1, y_1)$ and finish $(x_2, y_2)$:\n  $$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$\n- **Shadow Clues:**\n  - Morning (Sunrise in East): Shadows fall towards **West**.\n  - Evening (Sunset in West): Shadows fall towards **East**.\n  - Noon ($12\\text{ PM}$): No shadow cast (sun overhead).\n",
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
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Coding-Decoding+%26+Direction+Sense+Logical+Reasoning+lecture",
      "prerequisites": [
        "Alphabetical Ordering",
        "Modulo Arithmetic (Base 26)"
      ],
      "externalResources": [
        {
          "title": "Coding and Decoding Techniques — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/coding-decoding-logical-reasoning/",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    },
    {
      "id": "seating-arrangements",
      "slug": "seating-arrangements",
      "title": "Seating Arrangements & Puzzles",
      "description": "Circular (facing inward vs outward), linear, parallel rows, and multi-attribute grid constraints.",
      "estimatedMinutes": 18,
      "notesMarkdown": "# Seating Arrangements and Multi-Attribute Puzzles\n\nStructured methodology for resolving circular, linear, and parallel constraint puzzles.\n\n---\n\n## 1. Circular Seating Guidelines\n- **Facing Center:**\n  - Left direction = **Clockwise**.\n  - Right direction = **Anti-Clockwise**.\n- **Facing Outward (Away from Center):**\n  - Left direction = **Anti-Clockwise**.\n  - Right direction = **Clockwise**.\n- **Opposite Positions:** In a circle of $N$ people (where $N$ is even), opposite person is at offset $N / 2$ in either direction.\n\n---\n\n## 2. Linear and Parallel Row Arrangements\n- **Facing North:** Left is towards your left hand; Right is towards your right hand.\n- **Facing South:** Left is towards your right hand; Right is towards your left hand.\n- **Two Parallel Rows:** One row faces South, the other faces North; people directly opposite face each other.\n\n---\n\n## 3. Systematic 4-Step Solution Algorithm\n1. **Identify Definite Clues:** Anchor elements with fixed positions (e.g., \"P sits at extreme left end\").\n2. **Link Related Clues:** Connect secondary clues containing the names of already-anchored members.\n3. **Branch Multiple Cases:** Maintain two parallel sketch tracks (Case A vs Case B) when facing ambiguous placements.\n4. **Eliminate Contradictions:** Discard branched sketches that violate negative or conditional constraints.\n",
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
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Seating+Arrangements+%26+Puzzles+Logical+Reasoning+lecture",
      "prerequisites": [
        "Spatial Orientation",
        "Linear and Circular Graph Permutations"
      ],
      "externalResources": [
        {
          "title": "Seating Arrangement Puzzles — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/seating-arrangement-reasoning/",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "blood-relations",
      "slug": "blood-relations",
      "title": "Blood Relations & Family Trees",
      "description": "Family tree generation symbols, maternal vs paternal lineages, and coded relation statements.",
      "estimatedMinutes": 12,
      "notesMarkdown": "# Blood Relations and Family Tree Analysis\n\nDecoding family relationships through standard symbolic conventions.\n\n---\n\n## 1. Family Tree Symbolic Convention\n- **Gender:** Male $= [\\text{Square}]$ or $(+)$; Female $= (\\text{Circle})$ or $(-)$.\n- **Marital Relationship:** Double horizontal line $(A = B)$ or $(A \\iff B)$.\n- **Sibling Relationship:** Single horizontal line $(A - B)$.\n- **Generational Step:** Vertical connector downwards $(A \\to B)$.\n\n---\n\n## 2. Standard Relationship Classifications\n- **Maternal Relations (Mother's side):**\n  - Maternal Grandfather: Mother's father.\n  - Maternal Uncle: Mother's brother.\n  - Maternal Aunt: Mother's sister.\n- **Paternal Relations (Father's side):**\n  - Paternal Uncle: Father's brother.\n  - Paternal Aunt: Father's sister.\n- **In-Laws:**\n  - Father-in-law: Spouse's father.\n  - Brother-in-law: Spouse's brother OR Sister's husband.\n- **Children of Siblings:**\n  - Nephew: Sibling's son.\n  - Niece: Sibling's daughter.\n  - First Cousin: Aunt's or Uncle's child.\n\n---\n\n## 3. Deciphering Pointing Statements\n- Break statements backwards from the perspective of the speaker:\n  - Example: *\"His mother is the only daughter of my father.\"*\n  - Step 1: *\"My father\"* (Speaker's father).\n  - Step 2: *\"Only daughter of my father\"* (The speaker herself, if female).\n  - Step 3: *\"His mother is me\"* $\\implies$ The speaker is his mother.\n",
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
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Blood+Relations+%26+Family+Trees+Logical+Reasoning+lecture",
      "prerequisites": [
        "Genealogical Tree Diagrams",
        "Family Hierarchy Levels"
      ],
      "externalResources": [
        {
          "title": "Blood Relations Family Tree Method — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/blood-relations-logical-reasoning/",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    },
    {
      "id": "direction-sense",
      "slug": "direction-sense-and-navigation",
      "title": "Direction Sense & Compass Navigation",
      "description": "Cardinal coordinates, turn angles, shortest distance via Pythagoras theorem, and shadow analysis.",
      "estimatedMinutes": 15,
      "notesMarkdown": "# Direction Sense & Compass Navigation: 2D Coordinates & Shadows\n\nDirection sense questions require tracing displacements across a 2D Cartesian plane and applying vector addition.\n\n---\n\n## 1. The 8 Compass Cardinal Directions\n\n```\n                       North (0 deg)\n                            |\n           North-West       |       North-East\n                 \\          |          /\n                   \\        |        /\nWest (270 deg) -----+-------+-------+----- East (90 deg)\n                   /        |        \\\n                 /          |          \\\n           South-West       |       South-East\n                            |\n                       South (180 deg)\n```\n\n- **Turns:**\n  - **Right Turn:** $90^\\circ$ Clockwise rotation\n  - **Left Turn:** $90^\\circ$ Counter-Clockwise rotation\n- **Shortest Distance (Pythagoras Theorem):**\n  $$d = \\sqrt{(\\Delta x)^2 + (\\Delta y)^2}$$\n\n### Worked Example:\nA person walks 12 km North, then turns right (East) and walks 5 km.\n$$d = \\sqrt{12^2 + 5^2} = \\sqrt{144 + 25} = \\sqrt{169} = \\mathbf{13\\text{ km North-East}}$$\n\n---\n\n## 2. Shadow Navigation Rules\n\n| Time of Day | Sun Position | Shadow Direction |\n| :--- | :--- | :--- |\n| **Morning (Sunrise)** | **East** | **West** (Always falls towards West) |\n| **Evening (Sunset)** | **West** | **East** (Always falls towards East) |\n| **Noon (12:00 PM)** | Directly Overhead | No shadow or minimal underfoot |\n\n### Worked Example:\nOne morning after sunrise, Gopal was standing facing a pole. The shadow of the pole fell exactly to Gopal's right. Which direction was Gopal facing?\n- In the morning, the shadow of any object falls toward the **West**.\n- Gopal's right side is pointing toward the shadow $\\implies$ Gopal's Right is pointing **West**.\n- If Right is West, Left is East, Back is North, and Gopal is facing **South**.\n",
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
          "question": "A person walks 10 km South, turns left and walks 15 km, turns left again and walks 10 km, then turns left again and walks 5 km. In which direction and at what distance is he from his initial point?",
          "options": [
            "10 km East",
            "10 km West",
            "5 km East",
            "15 km North"
          ],
          "correct_option": 0,
          "explanation": "Tracing net coordinates: (Y: -10 + 10 = 0), (X: +15 - 5 = +10 km). Thus, he is exactly 10 km East of his starting position."
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
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Direction+Sense+%26+Compass+Navigation+Logical+Reasoning+lecture",
      "prerequisites": [
        "Cardinal Directions",
        "Pythagoras Theorem"
      ],
      "externalResources": [
        {
          "title": "Direction Sense Test Shortcuts — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/direction-sense-test/",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    },
    {
      "id": "statements-assumptions",
      "slug": "statements-and-assumptions",
      "title": "Statements, Assumptions & Deductions",
      "description": "Critical verbal reasoning, identifying implicit premises, and testing validity.",
      "estimatedMinutes": 15,
      "notesMarkdown": "# Critical Reasoning: Statements, Assumptions, and Deductions\n\nAnalyzing logical premises, unstated assumptions, courses of action, and valid syllogistic deductions.\n\n---\n\n## 1. Assumptions vs Inferences\n- **Assumption:** An unstated premise taken for granted by the speaker before making the statement.\n- **Inference / Conclusion:** A logical deduction drawn *after* evaluating the facts in the statement.\n- **Validity Rule:** An assumption is valid if the statement falls apart or loses sense without it. Avoid extreme qualifiers (e.g. \"all\", \"only\", \"never\", \"every\") unless explicitly supported by context.\n\n---\n\n## 2. Courses of Action\nA course of action is correct if:\n1. It directly addresses and solves the core problem or substantially minimizes it.\n2. It does not create new, more severe secondary problems.\n3. It is practical and proportional (not an extreme overreaction).\n\n---\n\n## 3. Syllogistic Deductions (Euler Diagrams)\n- **Universal Affirmative (All A are B):** Circle A is entirely contained inside Circle B.\n- **Universal Negative (No A is B):** Circles A and B are completely disjoint.\n- **Particular Affirmative (Some A are B):** Circles A and B overlap.\n- **Particular Negative (Some A are not B):** At least one element of A is outside B.\n",
      "questions": [
        {
          "id": "sa-assump-1",
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
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Statements%2C+Assumptions+%26+Deductions+Logical+Reasoning+lecture",
      "prerequisites": [
        "Logical Deduction",
        "Critical Reading"
      ],
      "externalResources": [
        {
          "title": "Statements and Assumptions in Reasoning — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/statement-and-assumption/",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    }
  ]
};

export const VERBAL_ABILITY_CATEGORY: SectionCategory = {
  "id": "verbal-ability",
  "slug": "verbal-ability",
  "title": "Verbal Ability",
  "description": "Grammar, sentence completion, vocabulary, reading comprehension, analogies, and data interpretation.",
  "icon": "BookOpen",
  "topics": [
    {
      "id": "sentence-correction",
      "slug": "sentence-correction-and-grammar",
      "title": "Grammar and Sentence Completion",
      "description": "Subject-verb agreement, modifier placement, parallelism, and tense consistency.",
      "estimatedMinutes": 15,
      "notesMarkdown": "# Grammar, Sentence Correction & Subject-Verb Agreement\n\nSentence correction evaluates grammatical syntax, parallelism, modifier placement, and subject-verb concord.\n\n---\n\n## 1. High-Frequency Subject-Verb Agreement Rules\n\n### Rule 1: Intervening Prepositional Phrases\nWords between subject and verb do not change the subject's grammatical number.\n- *Incorrect:* The lead architect, together with his entire development team, **are** attending.\n- *Correct:* The lead architect, together with his entire development team, **is** attending.\n*(Phrases like \"together with\", \"as well as\", \"accompanied by\", \"in addition to\" are parenthetical modifiers, not coordinating conjunctions).*\n\n### Rule 2: Correlative Conjunctions (\"Neither... Nor\", \"Either... Or\")\nThe verb agrees in person and number with the **closer/nearest subject**.\n- *Example:* \"Neither the manager nor the **engineers were** aware of the outage.\"\n- *Example:* \"Neither the engineers nor the **manager was** aware of the outage.\"\n\n### Rule 3: Distributive Pronouns (\"Each\", \"Every\", \"Neither of\")\nIndefinite distributive pronouns are strictly **singular**.\n- *Incorrect:* Neither of the two candidates have completed their interview.\n- *Correct:* Neither of the two candidates **has completed his or her** interview.\n\n---\n\n## 2. Dangling and Misplaced Modifiers\n\nA modifying clause must be placed immediately adjacent to the noun it logically modifies.\n- *Dangling Modifier:* \"Walking into the office, the server crashed.\" (Implies the server was walking!).\n- *Corrected:* \"Walking into the office, the engineer saw that the server had crashed.\"\n",
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
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Grammar+and+Sentence+Completion+Verbal+Ability+English+lecture",
      "prerequisites": [
        "English Grammatical Parts of Speech",
        "Sentence Clause Structure"
      ],
      "externalResources": [
        {
          "title": "Sentence Correction Rules and Error Spotting — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/rules-of-sentence-correction/",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    },
    {
      "id": "apt-vocabulary",
      "slug": "vocabulary",
      "title": "Vocabulary",
      "description": "Synonyms, antonyms, contextual word usage, root words (prefixes/suffixes), and idioms & phrases commonly asked in campus screening.",
      "estimatedMinutes": 18,
      "difficulty": "Easy",
      "companyTags": [
        "Deloitte",
        "TCS Digital",
        "Accenture",
        "Infosys"
      ],
      "keyTakeaways": [
        "Root Words: Etymological roots (e.g. 'bene' = good, 'mal' = bad, 'chron' = time, 'loqu' = speak) decode unfamiliar words.",
        "Context Clues: Restatement, contrast (however, despite), and cause-effect indicators identify word meanings in sentences.",
        "Collocations: Conventional pairings of words (e.g. 'make an effort', not 'do an effort')."
      ],
      "notesMarkdown": "# Advanced Vocabulary: Etymology, Latin/Greek Roots & Context Clues\n\nMastering morphology and classical roots allows candidates to deduce meanings of unfamiliar words.\n\n---\n\n## 1. High-Frequency Classical Latin & Greek Roots\n\n| Root | Language & Meaning | Derived English Words |\n| :--- | :--- | :--- |\n| **loqu / loc** | Latin: *talk, speak* | **Eloquent** (fluent speech), Loquacious (talkative), Soliloquy, Circumlocution |\n| **chron** | Greek: *time* | Chronological, Chronic, Synchronous, Anachronism |\n| **bene / mal** | Latin: *good / bad* | Benevolent, Benefactor $\\leftrightarrow$ Malevolent, Malicious |\n| **omni** | Latin: *all, every* | Omniscient (all-knowing), Omnipotent (all-powerful), Omnipresent |\n\n---\n\n## 2. High-Frequency Placement Antonyms & Idioms\n\n- **EPHEMERAL:** Lasting for a very short time; transient, fleeting.\n  - *Antonym:* **Eternal**, Perennial, Permanent, Everlasting.\n- **SPECIOUS:** Superficially plausible or attractive, but actually deceptive, wrong, or false.\n- **\"To take with a grain of salt\":** To maintain a healthy degree of skepticism or doubt regarding a claim.\n",
      "questions": [
        {
          "id": "apt-voc-1",
          "question": "Choose the word most nearly opposite in meaning to 'EPHEMERAL':",
          "options": [
            "Fleeting",
            "Transient",
            "Eternal",
            "Frail"
          ],
          "correct_option": 2,
          "explanation": "Ephemeral means short-lived or transient. Its exact antonym is eternal or permanent."
        },
        {
          "id": "apt-voc-2",
          "question": "What is the meaning of the idiom 'To take with a grain of salt'?",
          "options": [
            "To cook with careful attention",
            "To view or accept with skepticism and doubt",
            "To become extremely agitated",
            "To completely reject without evaluation"
          ],
          "correct_option": 1,
          "explanation": "To take something with a grain of salt means to maintain skepticism and not accept a claim as wholly true."
        },
        {
          "id": "apt-voc-3",
          "question": "Based on the Latin root 'loqu / loc' (meaning speech or talk), which word describes a person who speaks in a clear, persuasive, and fluent manner?",
          "options": [
            "Eloquent",
            "Loquacious",
            "Colloquial",
            "Soliloquy"
          ],
          "correct_option": 0,
          "explanation": "Eloquent means expressing ideas fluently and persuasively. While all four options derive from 'loqu/loc', 'loquacious' specifically means excessively talkative, 'colloquial' means informal spoken language, and 'soliloquy' is speaking one's thoughts aloud when alone."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Vocabulary+Verbal+Ability+English+lecture",
      "prerequisites": [
        "Root Words and Etymology",
        "Contextual Vocabulary Clues"
      ],
      "externalResources": [
        {
          "title": "English Vocabulary and Word Roots — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/root-words-in-english-vocabulary/",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    },
    {
      "id": "apt-reading-comprehension",
      "slug": "reading-comprehension",
      "title": "Reading Comprehension",
      "description": "Techniques for passage analysis, identifying main ideas, tone identification, critical inference, and eliminating trap answer choices.",
      "estimatedMinutes": 20,
      "difficulty": "Medium",
      "companyTags": [
        "CAT",
        "TCS Digital",
        "Deloitte",
        "Accenture"
      ],
      "keyTakeaways": [
        "Active Skimming: Read first and last paragraphs and topic sentences of body paragraphs first.",
        "Trap Answers: Extreme options ('always', 'never', 'only'), distortion of facts, out-of-scope assertions.",
        "Inference Questions: Must be 100% logically substantiated by text without external assumptions.",
        "Tone Recognition: Objective/neutral, critical, cynical, laudatory, satirical, didactic."
      ],
      "notesMarkdown": "# Reading Comprehension: Structure, Traps & Active Inference\n\nReading comprehension tests analytical reading, passage synthesis, identifying authorial tone, and distinguishing direct evidence from speculative traps.\n\n---\n\n## 1. Direct Facts vs. Logical Inferences\n\n```\n+------------------------------------+------------------------------------+\n| Direct Fact Questions              | Logical Inference Questions        |\n+------------------------------------+------------------------------------+\n| - Directly stated verbatim in text | - Must be deduced from given facts |\n| - Answers restate passage content  | - Author implies; reader infers    |\n| - Zero logical leap required       | - Must follow necessarily (no gap) |\n+------------------------------------+------------------------------------+\n```\n\n---\n\n## 2. Common Distractor & Trap Patterns in Standardized Tests\n\n1. **The Absolute Extreme Language Trap:**\n   - Options containing words like **\"always\"**, **\"never\"**, **\"completely\"**, **\"universally\"**, **\"exclusively\"** are almost always incorrect distractors in nuanced literary/scientific passages.\n2. **The Out-of-Scope (True but Irrelevant) Trap:**\n   - The statement may be an undeniable real-world fact, but the author never mentioned or supported it in the passage.\n3. **The Half-Right, Half-Wrong Trap:**\n   - The first half of the option matches the text perfectly, but the second half subtly mischaracterizes the conclusion.\n",
      "questions": [
        {
          "id": "apt-rc-1",
          "question": "Which answer choice is most likely a distractor/trap in standard reading comprehension inference questions?",
          "options": [
            "An option using moderate language ('may', 'suggests', 'tends to')",
            "An option using absolute, extreme language ('completely', 'universally', 'always')",
            "An option directly supported by two consecutive sentences",
            "An option summarizing the central thesis"
          ],
          "correct_option": 1,
          "explanation": "Passage authors rarely take absolute categorical stances; options with absolute qualifiers are classic distractors."
        },
        {
          "id": "apt-rc-2",
          "question": "What is the primary difference between a 'Direct Fact' question and an 'Inference' question?",
          "options": [
            "Direct facts are explicitly stated in the text; inferences are implied conclusions that follow logically from stated facts",
            "Inferences require outside world knowledge",
            "Direct facts are always in the first sentence",
            "There is no difference"
          ],
          "correct_option": 0,
          "explanation": "Direct facts are found verbatim or closely paraphrased, whereas inferences must be deduced logically from the textual evidence."
        },
        {
          "id": "apt-rc-3",
          "question": "When an author writes that an argument is 'specious', what does the author imply about the argument?",
          "options": [
            "Superficially plausible, but actually wrong or misleading.",
            "Thoroughly proven and statistically sound.",
            "Completely incomprehensible.",
            "Irrelevant to the main thesis."
          ],
          "correct_option": 0,
          "explanation": "'Specious' describes an argument or statement that appears superficially plausible or attractive at first glance, but is deceptive, logically flawed, or false upon examination."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Reading+Comprehension+Verbal+Ability+English+lecture",
      "prerequisites": [
        "Critical Reading Comprehension",
        "Identifying Main Ideas and Tone"
      ],
      "externalResources": [
        {
          "title": "Reading Comprehension Strategies — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/reading-comprehension-passages-for-interviews/",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    },
    {
      "id": "apt-verbal-analogies",
      "slug": "verbal-analogies",
      "title": "Verbal Analogies",
      "description": "Techniques for mapping word pair relationships, Bridge Sentence method, and distinguishing subtle semantic nuances.",
      "estimatedMinutes": 15,
      "difficulty": "Easy",
      "companyTags": [
        "TCS",
        "Infosys",
        "Wipro",
        "Cognizant"
      ],
      "keyTakeaways": [
        "Bridge Sentence Technique: Create a concise, precise sentence connecting Word A and Word B (e.g. 'An A is a person who creates B').",
        "Order matters: If Pair 1 is Cause : Effect, Pair 2 must strictly be Cause : Effect, never Effect : Cause.",
        "Part of Speech matching: Noun : Noun -> Noun : Noun."
      ],
      "notesMarkdown": "# Verbal Analogies & Relational Semantic Mapping\n\nVerbal analogies assess reasoning precision, lexical nuance, and relational mapping. They test whether you can identify the exact logical connection connecting a pair of stem words and find a matching pair governed by the identical underlying relationship.\n\n---\n\n## 1. The Bridge Sentence Technique (The Gold Standard)\n\nThe most reliable strategy for solving analogies without falling for distractors is the **Bridge Sentence Technique**:\n\n1. **Construct a Clear, Specific Bridge Sentence:** Formulate a concise sentence defining how the first word relates to the second. Avoid vague verbs like \"is related to\" or \"has\".\n   - *Weak:* \"A surgeon has a scalpel.\" (Too vague; a thief might also have a scalpel).\n   - *Strong & Specific:* \"A **surgeon** uses a **scalpel** as a primary surgical cutting instrument.\"\n2. **Substitute Answer Choices into the Bridge Sentence:** Insert each option into the exact same sentence frame:\n   - *Carpenter : Wood* $\\to$ \"A carpenter uses wood as a primary cutting instrument.\" (False: wood is the material, not the tool).\n   - *Sculptor : Chisel* $\\to$ \"A sculptor uses a chisel as a primary sculpting cutting instrument.\" (**Exact Match!**)\n3. **If Multiple Options Fit, Refine the Bridge:** Make the sentence more specific regarding action, purpose, or degree.\n\n---\n\n## 2. Fundamental Analogy Relationship Classes\n\n| Relationship Type | Example Stem Pair | Matched Analogy Pair | Key Distinction |\n| :--- | :--- | :--- | :--- |\n| **Worker : Tool** | *Surgeon : Scalpel* | *Sculptor : Chisel* | Primary professional instrument |\n| **Worker : Creation** | *Composer : Symphony* | *Architect : Blueprint* | Intangible / tangible design artifact |\n| **Cause : Effect** | *Torment : Agony* | *Pathogen : Disease* | First directly triggers second |\n| **Part : Whole (Meronym)** | *Petal : Flower* | *Spoke : Wheel* | Integral constituent component |\n| **Lack of Property** | *Audacious : Fear* | *Atheist : Faith* | First entity completely lacks second |\n| **Degree of Intensity** | *Drizzle : Downpour* | *Simmer : Boil* | Same phenomenon escalated in magnitude |\n| **Material : Product** | *Clay : Pottery* | *Yarn : Tapestry* | Raw material transformed into artifact |\n| **Measurement : Instrument**| *Pressure : Barometer* | *Speed : Tachometer* | Physical quantity and specialized gauge |\n\n---\n\n## 3. Strict Rules of Invariance & Traps\n\n1. **Directionality / Order of Terms:**\n   - If stem is $A : B$ (e.g. `Cause : Effect`), an answer choice ordered $B : A$ (`Effect : Cause`) is an **automatic trap** and must be eliminated immediately.\n2. **Parts of Speech Matching:**\n   - If the stem is `Noun : Noun`, the correct pair must be `Noun : Noun`.\n   - If the stem is `Adjective : Noun` (*Pompous : Orator*), the answer must match `Adjective : Noun` (*Voracious : Reader*).\n3. **Distinguishing Primary from Secondary Definitions:**\n   - Check if an unusual secondary definition is in play (e.g. `TABLE : MOTION` where *table* is used as a verb meaning to postpone).\n",
      "questions": [
        {
          "id": "apt-va-1",
          "question": "Select the pair that best expresses a relationship similar to 'GLACIER : ICE':",
          "options": [
            "Beach : Sand",
            "Mountain : Peak",
            "River : Fish",
            "Ocean : Island"
          ],
          "correct_option": 0,
          "explanation": "A glacier is a large landform fundamentally made of ice; a beach is a landform fundamentally made of sand."
        },
        {
          "id": "apt-va-2",
          "question": "Select the pair matching 'OBSEQUIOUS : FLATTERY':",
          "options": [
            "Stolid : Emotion",
            "Bellicose : War",
            "Pompous : Arrogance",
            "Miserly : Charity"
          ],
          "correct_option": 2,
          "explanation": "An obsequious person is characterized by excessive flattery; a pompous person is characterized by arrogance."
        },
        {
          "id": "apt-va-3",
          "question": "DOCTOR : STETHOSCOPE :: ASTRONOMER : ?",
          "options": [
            "Telescope",
            "Microscope",
            "Periscope",
            "Horoscope"
          ],
          "correct_option": 0,
          "explanation": "A doctor uses a stethoscope as their primary professional observational instrument; an astronomer uses a telescope."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Verbal+Analogies+Verbal+Ability+English+lecture",
      "prerequisites": [
        "Vocabulary Relationships",
        "Semantic Invariance"
      ],
      "externalResources": [
        {
          "title": "Verbal Analogies Practice and Techniques — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/verbal-analogies/",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    },
    {
      "id": "data-interpretation",
      "slug": "data-interpretation-charts",
      "title": "Data Interpretation (Pie Charts, Tables & Bar Graphs)",
      "description": "Extracting key percentage shares, compound annual growth, and ratio metrics from dense datasets.",
      "estimatedMinutes": 16,
      "notesMarkdown": "# Data Interpretation (Pie Charts, Tables, and Bar Graphs)\n\nData Interpretation assesses numerical analysis, rapid percentage estimations, and ratio calculations from complex visual datasets.\n\n---\n\n## 1. Pie Chart Degree Conversion\n- A complete circle spans $360^\\circ = 100\\%$.\n- $1\\% = 3.6^\\circ$, and $1^\\circ = \\frac{10}{36}\\% = \\frac{5}{18}\\%$.\n- **Sector Value:** $\\text{Value} = \\text{Total} \\times \\left(\\frac{\\text{Angle}}{360^\\circ}\\right)$.\n\n---\n\n## 2. Percentage Growth and CAGR\n- **Percentage Growth:**\n  $$\\text{Growth \\%} = \\left(\\frac{\\text{Final Value} - \\text{Initial Value}}{\\text{Initial Value}}\\right) \\times 100\\%$$\n- **Approximating Compound Annual Growth Rate (CAGR):**\n  $$\\text{CAGR} = \\left(\\frac{V_{\\text{final}}}{V_{\\text{initial}}}\\right)^{1/n} - 1$$\n\n---\n\n## 3. High-Speed Calculation Techniques\n- **Base Rounding & Fraction Approximations:**\n  - $1/6 \\approx 16.67\\%$\n  - $1/7 \\approx 14.28\\%$\n  - $1/8 = 12.5\\%$\n  - $1/9 \\approx 11.11\\%$\n  - $1/11 \\approx 9.09\\%$\n  - $1/12 \\approx 8.33\\%$\n- Avoid calculating absolute values when calculating ratio of two sectors in the same pie chart: simply calculate the ratio of their degrees or percentages directly!\n",
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
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Data+Interpretation+%28Pie+Charts%2C+Tables+%26+Bar+Graphs%29+Verbal+Ability+English+lecture",
      "prerequisites": [
        "Percentages and Growth Rates",
        "Reading Bar Graphs, Pie Charts & Tables"
      ],
      "externalResources": [
        {
          "title": "Data Interpretation Techniques & Charts — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/data-interpretation/",
          "difficulty": "Intermediate",
          "isFree": true
        }
      ]
    }
  ]
};

export const SPATIAL_APTITUDE_CATEGORY: SectionCategory = {
  "id": "spatial-aptitude",
  "slug": "spatial-aptitude",
  "title": "Spatial Aptitude",
  "description": "Shape transformations, paper folding, cube nets, mirror/water rotations, and visual matrix pattern recognition.",
  "icon": "Layers",
  "topics": [
    {
      "id": "apt-shape-transformations",
      "slug": "shape-transformations",
      "title": "Shape Transformations",
      "description": "Geometric shape operations, folding/unfolding 3D cubes from nets, paper cutting & punch holes, and combining geometric figures.",
      "estimatedMinutes": 18,
      "difficulty": "Medium",
      "companyTags": [
        "GATE",
        "Amazon",
        "Cognizant",
        "Mindtree"
      ],
      "keyTakeaways": [
        "Cube Nets: Opposite faces in an unfolded net can NEVER share an edge or corner (separated by 1 square in a straight line).",
        "Paper Folding & Hole Punch: Work backwards from final fold unfolding along the crease line; holes reflect across fold axes.",
        "Rule of Non-Adjacent Faces: If Face A and Face B are opposite in net, no 3D view can show both simultaneously."
      ],
      "notesMarkdown": "# Spatial Reasoning: 3D Cube Nets, Surface Folding & Paper Cutting\n\nSpatial transformation assessments measure mental rotation, surface connectivity in three dimensions, and multi-step planar unfolding. These questions are a cornerstone of GATE General Aptitude and high-difficulty campus recruitment tests.\n\n---\n\n## 1. Unfolded Cube Nets: The 11 Valid Hexominoes\n\nA cube has 6 square faces, 12 edges, and 8 vertices. Exactly **11 distinct planar nets (hexominoes)** can be folded into a closed 3D cube:\n- **1-4-1 Patterns (6 variations):** A central row of 4 squares with 1 square on either side.\n- **1-3-2 Patterns (3 variations):** Rows of 1, 3, and 2 squares.\n- **2-2-2 Pattern (1 variation):** Staircase arrangement.\n- **3-3 Pattern (1 variation):** Two rows of 3 squares offset.\n\n---\n\n## 2. The Golden Rules of Cube Nets\n\nWhen evaluating folded vs. unfolded representations of a cube:\n\n1. **The Alternation / Skip Rule (Opposite Faces):**\n   - In any straight horizontal row or vertical column of the net, **two faces separated by exactly one intervening square are always OPPOSITE each other in the assembled cube**.\n   - In a \"T\" or \"cross\" net: Face at $(1, 2)$ is opposite Face at $(3, 2)$ because they are separated by Face $(2, 2)$.\n2. **The Non-Adjacency Invariant:**\n   - **Opposite faces can NEVER be adjacent** in the assembled 3D cube.\n   - If an isometric view of a cube reveals two opposite faces simultaneously $\\implies$ **Instantly Eliminate the Option!**\n3. **Corner Convergence (Vertex Rules):**\n   - Three faces meeting at a 90-degree internal corner in the net fold to meet at a single shared 3D vertex.\n   - Cyclic orientation around the vertex (clockwise vs. counter-clockwise) is strictly preserved upon folding.\n\n---\n\n## 3. Paper Folding & Hole Punching: The Reverse Traceback Protocol\n\nQuestions involving folding a flat square sheet $k$ times followed by punching holes:\n\n```\n   Original Sheet (1 layer) \n        ↓  Fold 1 (Horizontal)\n   Half Sheet (2 layers) \n        ↓  Fold 2 (Vertical)\n   Quarter Sheet (4 layers) \n        ↓  Punch 1 Hole at (x, y)\n```\n\n### Step-by-Step Solving Protocol:\n1. **Count Layer Multiplicity:** Each fold doubles the number of paper layers ($2^k$ layers for $k$ complete folds). A single hole through all layers produces $2^k$ total holes upon full unfolding.\n2. **Reverse Symmetry Reflection:**\n   - Step 1: Open the last fold. Reflect the hole coordinate across the **crease axis** as a mirror line.\n   - Step 2: Open the penultimate fold. Reflect all current holes across that fold's crease axis.\n3. **Check Axis Symmetry:** The final unfolded sheet must exhibit geometric reflectional symmetry across **every crease line** used in the folding process.\n",
      "questions": [
        {
          "id": "apt-st-1",
          "question": "In a standard cube net, if Face 1 is in position (row 1, col 2) and Face 6 is in position (row 3, col 2) separated by Face 3, what is their geometric relationship when assembled?",
          "options": [
            "They are adjacent faces",
            "They are opposite faces",
            "They meet at 45 degrees",
            "They overlap"
          ],
          "correct_option": 1,
          "explanation": "Faces separated by exactly one intervening square along a straight line in a net are always opposite faces in the assembled cube."
        },
        {
          "id": "apt-st-2",
          "question": "A square sheet of paper is folded in half twice (into a quarter square) and 1 hole is punched through all layers. How many holes appear when unfolded completely?",
          "options": [
            "2",
            "4",
            "8",
            "16"
          ],
          "correct_option": 1,
          "explanation": "Folding twice creates 4 layers of paper. A single hole punched through all 4 layers yields 4 holes when fully opened."
        },
        {
          "id": "apt-st-3",
          "question": "When a 2D geometric shape is reflected across the y-axis, what transformation happens to point (x, y)?",
          "options": [
            "(-x, y)",
            "(x, -y)",
            "(-x, -y)",
            "(y, x)"
          ],
          "correct_option": 0,
          "explanation": "Reflection across the vertical line (y-axis) inverts the sign of the horizontal x-coordinate while preserving the y-coordinate: (x, y) maps to (-x, y)."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Shape+Transformations+Spatial+Aptitude+GATE+lecture",
      "prerequisites": [
        "2D/3D Geometric Shapes",
        "Spatial Transformations"
      ],
      "externalResources": [
        {
          "title": "Non-Verbal Reasoning and Shape Transformations — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/non-verbal-reasoning/",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    },
    {
      "id": "apt-rotation-and-reflection",
      "slug": "rotation-and-reflection",
      "title": "Rotation and Reflection",
      "description": "2D and 3D figure rotation (90, 180, 270 degrees clockwise/counter-clockwise), mirror images, and water images.",
      "estimatedMinutes": 18,
      "difficulty": "Easy",
      "companyTags": [
        "GATE",
        "TCS Ninja",
        "Accenture",
        "Capgemini"
      ],
      "keyTakeaways": [
        "Rotation: Preserves chirality (handedness); clockwise rotation by 90 deg maps (x, y) -> (y, -x).",
        "Mirror Reflection: Inverts horizontal orientation (left becomes right; top and bottom remain unchanged).",
        "Water Reflection: Inverts vertical orientation (top becomes bottom; left and right remain unchanged)."
      ],
      "notesMarkdown": "# Spatial Reasoning: 2D & 3D Rotation, Reflection & Inversion\n\nSpatial reasoning tests evaluate your mental manipulation of geometric shapes, symmetry, perspective transformations, and rotational invariance. These questions are a mandatory component of GATE General Aptitude, spatial visualization assessments, and tech hiring tests.\n\n---\n\n## 1. Reflection Transformations: Mirror Images vs. Water Images\n\nA reflection flips a 2D shape across a specified line of symmetry (axis of reflection), inverting chirality (handedness).\n\n```\n   Original Figure (F)            Mirror Image (Vertical Axis)     Water Image (Horizontal Axis)\n         |---|                               |---|                           \\\n         |   |                               |   |                            \\\n         |---|              |                |---|                             |---|\n         |                  |                    |                             |\n         |                  |                    |                             |---|\n                                                                               |   |\n                                                                         --------------\n                                                                               |---|\n                                                                               |   |\n                                                                               |---|\n                                                                               |\n                                                                               |\n```\n\n### A. Mirror Image (Vertical Reflection Axis)\n- **Rule of Inversion:** **Left $\\leftrightarrow$ Right** are swapped.\n- **Invariance:** **Top and Bottom** remain strictly unchanged.\n- **Letters with Vertical Symmetry (Unchanged in Mirror):** `A`, `H`, `I`, `M`, `O`, `T`, `U`, `V`, `W`, `X`, `Y`.\n\n### B. Water Image (Horizontal Reflection Axis along base)\n- **Rule of Inversion:** **Top $\\leftrightarrow$ Bottom** are inverted (upside down).\n- **Invariance:** **Left and Right** remain strictly unchanged.\n- **Letters with Horizontal Symmetry (Unchanged in Water):** `B`, `C`, `D`, `E`, `H`, `I`, `K`, `O`, `X`.\n\n---\n\n## 2. 2D Coordinate Rotations (Clockwise & Counter-Clockwise)\n\nRotation moves every point along a circular arc centered on the origin $(0, 0)$ without altering distances or angles (isometry). Rotation **preserves chirality** (handedness is not flipped).\n\n| Angle & Direction | Equivalent Rotation | Coordinate Transformation $(x, y) \\to$ | Visual Meaning |\n| :--- | :--- | :--- | :--- |\n| **$90^\\circ$ Clockwise** | $270^\\circ$ Counter-Clockwise | $(x, y) \\to (y, -x)$ | 1 quarter turn to the right |\n| **$180^\\circ$ Rotation** | $180^\\circ$ Counter-Clockwise | $(x, y) \\to (-x, -y)$ | Complete inversion (half turn) |\n| **$270^\\circ$ Clockwise** | $90^\\circ$ Counter-Clockwise | $(x, y) \\to (-y, x)$ | 3 quarter turns right / 1 quarter turn left |\n\n> [!TIP]\n> A $180^\\circ$ planar rotation is mathematically identical to applying **both a horizontal reflection and a vertical reflection simultaneously**!\n\n---\n\n## 3. Paper Folding and Punching (Spatial Traceback Method)\n\nTo solve paper folding and hole punch problems:\n1. Identify the chronological sequence of folds: $F_1 \\to F_2 \\to \\dots \\to \\text{Hole Punch}$.\n2. Solve in reverse chronological order: **Unfold step-by-step from the last fold to the first**.\n3. For each unfolding step, treat the fold crease as a **reflection mirror line** and reflect all existing holes across that crease.\n",
      "questions": [
        {
          "id": "apt-rr-1",
          "question": "What happens to the orientation of an asymmetrical figure when reflected across a horizontal water surface?",
          "options": [
            "Left and right invert, while top and bottom stay the same",
            "Top and bottom invert, while left and right stay the same",
            "The figure rotates 90 degrees clockwise",
            "The figure remains unchanged"
          ],
          "correct_option": 1,
          "explanation": "Water reflection is reflection across a horizontal baseline, inverting top and bottom while preserving left-to-right alignment."
        },
        {
          "id": "apt-rr-2",
          "question": "Which of the following capital English letters remains unchanged under BOTH mirror reflection and water reflection?",
          "options": [
            "A",
            "H",
            "B",
            "M"
          ],
          "correct_option": 1,
          "explanation": "The letter 'H' has both horizontal and vertical axes of symmetry, so both its mirror image and water image are identical to H."
        },
        {
          "id": "apt-rr-3",
          "question": "What is the result of rotating point (x, y) 90 degrees counter-clockwise about the origin (0, 0)?",
          "options": [
            "(-y, x)",
            "(y, -x)",
            "(-x, -y)",
            "(y, x)"
          ],
          "correct_option": 0,
          "explanation": "A 90-degree counter-clockwise rotation about the origin transforms (x, y) into (-y, x)."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Rotation+and+Reflection+Spatial+Aptitude+GATE+lecture",
      "prerequisites": [
        "Cartesian Transformations",
        "Mirror Images and Water Reflections"
      ],
      "externalResources": [
        {
          "title": "Mirror and Water Images in Spatial Reasoning — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/mirror-and-water-images/",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    },
    {
      "id": "apt-pattern-recognition",
      "slug": "pattern-recognition",
      "title": "Pattern Recognition",
      "description": "Non-verbal reasoning, visual matrices, missing figure identification, embedded figures, and grouping of identical geometric figures.",
      "estimatedMinutes": 18,
      "difficulty": "Medium",
      "companyTags": [
        "GATE",
        "TCS",
        "Accenture",
        "Cognizant"
      ],
      "keyTakeaways": [
        "Matrix Reasoning: Analyze rows and columns independently for movement, rotation, addition/subtraction of elements, and shading.",
        "Embedded Figures: Locate hidden sub-figures without altering orientation unless specified.",
        "Symbol Shifting: Track individual components (dots, arrows, lines) stepping along corners or sides in fixed increments."
      ],
      "notesMarkdown": "# Non-Verbal Pattern Recognition & Matrix Reasoning\n\nAbstract and non-verbal reasoning assessments (such as Raven's Progressive Matrices, spatial matrix tests in GATE, and tech hiring evaluations) evaluate fluid intelligence: the capacity to deduce underlying geometric rules, identify symmetries, track multi-variable transformations, and predict subsequent states without reliance on verbal or numerical language.\n\n---\n\n## 1. The 5 Core Transformation Archetypes in Visual Matrices\n\nWhen analyzing $3 \\times 3$ or $2 \\times 2$ figure grids, inspect **Row-wise (horizontal)** and **Column-wise (vertical)** progressions for these five recurring transformation laws:\n\n### A. Geometric Arithmetic & Boolean Line Operations (XOR / AND / OR)\nSuperimposing Cell 1 and Cell 2 to produce Cell 3:\n- **XOR (Cancellation of Identical Features):** Line segments or marks that appear in **both** Cell 1 and Cell 2 are deleted; lines that appear in **only one** are retained in Cell 3.\n- **OR (Union):** All lines from Cell 1 and Cell 2 are merged into Cell 3.\n- **AND (Intersection):** Only lines shared by both Cell 1 and Cell 2 are kept in Cell 3.\n\n```\n   Cell 1: [ | ]         Cell 2: [ - ]         Cell 3 (XOR): [ + ]\n   Cell 1: [ + ]         Cell 2: [ | ]         Cell 3 (XOR): [ - ]   (Common '|' erased!)\n```\n\n### B. Incremental Rotations & Chirality\n- Track the angular step size: $+45^\\circ, +90^\\circ, +135^\\circ$ Clockwise ($CW$) or Counter-Clockwise ($CCW$).\n- **Check for Chirality / Reflection Inversion:** Alternating between standard shape and its mirror reflection alongside rotation.\n\n### C. Positional Translation & Perimeter Stepping\n- Dots, pins, or symbols stepping around a square or octagon perimeter:\n  - Moves $+1$ step along corner $\\to$ mid-edge $\\to$ corner (increments of half-sides or vertices).\n- Independent trajectories: When multiple symbols inhabit the same cell, **trace each symbol's path in isolation**.\n\n### D. Quantitative Conservation & Progression\n- **Sum / Count of Elements:** 1 dot in Col 1, 2 dots in Col 2, 3 dots in Col 3.\n- **Latin Square (Conservation of Elements):** Each row and each column must contain exactly one circle, one triangle, and one square; or exactly one solid black, one shaded, and one hollow fill.\n\n### E. Size & Layering Dynamics\n- Concentric shapes expanding outward or shrinking inward.\n- Alternating layering order (e.g., Circle in front of Square $\\to$ Square in front of Circle).\n\n---\n\n## 2. Systematic 4-Step Matrix Solver Protocol\n\n1. **Scan Row 1:** Formulate a tentative hypothesis (e.g. \"Row 1 rotates $90^\\circ$ CW and subtracts 1 internal spoke\").\n2. **Verify on Row 2:** Check if the hypothesis holds identically for Row 2. If it fails, check for a column-wise rule.\n3. **Isolate Feature Components:** Deconstruct composite figures into distinct sub-elements (outer frame, inner polygon, shading, orientation needle).\n4. **Eliminate Options Systematically:** Match one verified sub-element against the answer options. Eliminate non-matching choices immediately to avoid visual fatigue.\n\n---\n\n## 3. Embedded Figures & Figure Classification\n- **Embedded Figures:** Identify which simple geometric probe (e.g., a specific zigzag or trapezoid) is hidden within a complex, cluttered schematic. Look for **critical vertices and non-standard internal angles** (e.g., a $60^\\circ$ sharp angle or an asymmetric notch).\n- **Figure Grouping:** Grouping $9$ heterogeneous shapes into 3 triads of identical characteristics (e.g., figures bounded by straight lines vs curved lines; open vs closed contours; divided into equal halves vs unequal regions).\n",
      "questions": [
        {
          "id": "apt-pr-1",
          "question": "In a 3x3 pattern matrix where elements in row 1 are combined via XOR (common lines disappear, unique lines remain) to form the 3rd element, what rule governs column 3?",
          "options": [
            "The same XOR line cancellation rule applies consistently across rows and columns",
            "Elements must invert color",
            "Elements must rotate 180 degrees",
            "The rule is purely random"
          ],
          "correct_option": 0,
          "explanation": "Geometric visual matrices follow consistent spatial logic (such as XOR union/subtraction of overlapping line segments) across rows and columns."
        },
        {
          "id": "apt-pr-2",
          "question": "When tracking multiple symbols rotating in an abstract series, what is the best strategy?",
          "options": [
            "Track the entire image at once",
            "Isolate one individual feature (e.g. arrow tip or shaded dot), trace its step progression independently, and eliminate wrong choices",
            "Always pick the most complex option",
            "Rotate the test paper 90 degrees"
          ],
          "correct_option": 1,
          "explanation": "Isolating one symbol component at a time quickly eliminates non-conforming options without visual confusion."
        },
        {
          "id": "apt-pr-3",
          "question": "In a visual matrix puzzle, if each row alternates between adding a dot and rotating the inner shape by 45 degrees, which principle of reasoning is being tested?",
          "options": [
            "Rule induction over composite geometric transformations",
            "Color theory",
            "Numerical factorials",
            "Mirror reflection only"
          ],
          "correct_option": 0,
          "explanation": "Abstract spatial matrix tests evaluate composite rule induction (identifying multiple concurrent transformation rules: count addition and angular rotation across rows and columns)."
        }
      ],
      "youtube_url": "https://www.youtube.com/results?search_query=Pattern+Recognition+Spatial+Aptitude+GATE+lecture",
      "prerequisites": [
        "Matrix Matching",
        "Visual Sequence Tracking"
      ],
      "externalResources": [
        {
          "title": "Visual Pattern Recognition and Matrix Puzzles — GeeksforGeeks",
          "provider": "GeeksforGeeks",
          "url": "https://www.geeksforgeeks.org/pattern-completion/",
          "difficulty": "Beginner",
          "isFree": true
        }
      ]
    }
  ]
};
