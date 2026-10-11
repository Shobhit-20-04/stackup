import json
import urllib.parse

def make_yt_url(title, subject="General Aptitude GATE Placement"):
    q = f"{title} {subject} lecture"
    return f"https://www.youtube.com/results?search_query={urllib.parse.quote_plus(q)}"

with open("scripts/existing_curriculum.json", encoding="utf-8") as f:
    existing = json.load(f)

existing_apt = {}
for cat in existing["aptitude"]["categories"]:
    for t in cat["topics"]:
        existing_apt[t["id"]] = t

# New topics needed for Aptitude
new_apt_topics = {
    # 1. Number Systems (Quant)
    "apt-number-systems": {
        "id": "apt-number-systems",
        "slug": "number-systems",
        "title": "Number Systems",
        "description": "Divisibility rules, unit digit calculation, remainders (Euler's totient, Fermat's Little Theorem), HCF and LCM, and prime factorization.",
        "estimatedMinutes": 18,
        "difficulty": "Easy",
        "companyTags": ["TCS Ninja", "Infosys", "Wipro", "Cognizant", "Capgemini"],
        "keyTakeaways": [
            "Unit Digit Cyclicity: 2, 3, 7, 8 have cyclicity 4; 4, 9 have cyclicity 2; 0, 1, 5, 6 have cyclicity 1.",
            "Fermat's Little Theorem: If p is prime and gcd(a, p) = 1, then a^(p-1) mod p = 1.",
            "Product of two numbers: N1 * N2 = HCF(N1, N2) * LCM(N1, N2).",
            "Divisibility: By 3/9 (sum of digits), by 4 (last 2 digits), by 8 (last 3 digits), by 11 (alternating sum difference)."
        ],
        "notesMarkdown": """# Number Systems — Formulas & Shortcuts

---

## 1. Cyclicity of Unit Digits
To find the unit digit of $x^n$:
- **Cyclicity 4:** Bases ending in $2, 3, 7, 8$.
  - Divide exponent $n$ by $4$: $n = 4k + r$.
  - Unit digit is base$^r$ (if $r=0$, use power $4$).
  - *Example:* Unit digit of $7^{45}$: $45 \\pmod 4 = 1 \\implies 7^1 = 7$.
- **Cyclicity 2:**
  - $4^{\\text{odd}} = 4$, $4^{\\text{even}} = 6$.
  - $9^{\\text{odd}} = 9$, $9^{\\text{even}} = 1$.
- **Cyclicity 1:** Bases ending in $0, 1, 5, 6$ always yield $0, 1, 5, 6$.

---

## 2. HCF and LCM Relations
$$\\text{Product of two numbers} = \\text{HCF} \\times \\text{LCM}$$
$$\\text{HCF of fractions} = \\frac{\\text{HCF of numerators}}{\\text{LCM of denominators}}$$
$$\\text{LCM of fractions} = \\frac{\\text{LCM of numerators}}{\\text{HCF of denominators}}$$
""",
        "questions": [
            {
                "id": "apt-ns-1",
                "question": "What is the unit digit of 3^65 * 6^59 * 7^71?",
                "options": ["1", "2", "4", "6"],
                "correct_option": 2,
                "explanation": "3^65: 65 mod 4 = 1 -> unit digit 3. 6^59: always 6. 7^71: 71 mod 4 = 3 -> 7^3 = 343, unit digit 3. Product: 3 * 6 * 3 = 54 -> unit digit 4."
            },
            {
                "id": "apt-ns-2",
                "question": "The HCF and LCM of two numbers are 12 and 144 respectively. If one number is 36, what is the other number?",
                "options": ["48", "64", "72", "96"],
                "correct_option": 0,
                "explanation": "Number 2 = (HCF * LCM) / Number 1 = (12 * 144) / 36 = 12 * 4 = 48."
            }
        ]
    },

    # 2. Series and Patterns (Logical)
    "apt-series-and-patterns": {
        "id": "apt-series-and-patterns",
        "slug": "series-and-patterns",
        "title": "Series and Patterns",
        "description": "Number series (arithmetic, geometric, Fibonacci, alternating, squares/cubes) and letter series completion.",
        "estimatedMinutes": 15,
        "difficulty": "Easy",
        "companyTags": ["TCS", "Accenture", "Infosys", "Wipro"],
        "keyTakeaways": [
            "Difference analysis: Check 1st and 2nd level differences for polynomial progressions.",
            "Prime & Square series: Watch for n^2 +/- 1 or n^3 +/- n patterns.",
            "Alternating series: Odd and even indices follow separate concurrent arithmetic rules.",
            "Letter series: Convert alphabet letters to positions (A=1, Z=26; reverse A=26, Z=1) using EJOTY (5, 10, 15, 20, 25)."
        ],
        "notesMarkdown": """# Series and Pattern Recognition

---

## 1. Types of Number Series
1. **Difference Series:** Constant difference or arithmetic sequence of differences.
2. **Geometric / Multiplicative Series:** Multiply/divide by factor ($k$, $k+1$, etc.).
3. **Difference of Differences:**
   - E.g., $2, 5, 10, 17, 26 \\dots$ Differences are $3, 5, 7, 9 \\implies n^2 + 1$.
4. **Alternating / Interleaved Series:**
   - Two interleaved sub-sequences: $S[0], S[2], S[4]$ and $S[1], S[3], S[5]$.

---

## 2. Letter Series Navigation (EJOTY)
- Memorize positional anchors:
  $$\\mathbf{E}=5, \\quad \\mathbf{J}=10, \\quad \\mathbf{O}=15, \\quad \\mathbf{T}=20, \\quad \\mathbf{Y}=25$$
- Opposite letter pairs sum to $27$ ($A+Z = 1+26=27$, $B+Y=2+25=27$).
""",
        "questions": [
            {
                "id": "apt-sp-1",
                "question": "What is the next number in the series: 3, 7, 15, 31, 63, ...?",
                "options": ["95", "127", "125", "129"],
                "correct_option": 1,
                "explanation": "Pattern: 2x + 1 (or differences doubling: +4, +8, +16, +32, +64). Next number = 63 + 64 = 127."
            },
            {
                "id": "apt-sp-2",
                "question": "Find the missing term in the sequence: B, D, G, K, P, ...?",
                "options": ["U", "V", "W", "X"],
                "correct_option": 1,
                "explanation": "Positions: B(2) -> +2 -> D(4) -> +3 -> G(7) -> +4 -> K(11) -> +5 -> P(16) -> +6 -> 22, which corresponds to letter V."
            }
        ]
    },

    # 3. Analogies and Classification (Logical)
    "apt-analogies-and-classification": {
        "id": "apt-analogies-and-classification",
        "slug": "analogies-and-classification",
        "title": "Analogies and Classification",
        "description": "Word analogies, number analogies, odd-man-out classification, and semantic relationship mapping.",
        "estimatedMinutes": 15,
        "difficulty": "Easy",
        "companyTags": ["TCS Ninja", "Capgemini", "Cognizant", "Mindtree"],
        "keyTakeaways": [
            "Analogy relationship types: Tool-Worker, Cause-Effect, Part-Whole, Synonyms-Antonyms, Degree of intensity.",
            "Classification (Odd-Man-Out): Identify common shared property among 3 options and the outlier violating it."
        ],
        "notesMarkdown": """# Analogies and Classification

---

## 1. Analogy Relations
$A : B :: C : D$ asserts that the relationship between $A$ and $B$ is identical to $C$ and $D$.
- **Worker & Tool:** Carpenter : Saw :: Surgeon : Scalpel.
- **Worker & Product:** Author : Book :: Choreographer : Ballet.
- **Instrument & Measurement:** Barometer : Pressure :: Anemometer : Wind Speed.

---

## 2. Odd-Man-Out (Classification)
Identify the criterion common to all options except one:
- Category / Taxon membership (e.g., mammals vs reptiles).
- Functional utility.
- Prime vs Composite numbers.
""",
        "questions": [
            {
                "id": "apt-ac-1",
                "question": "Complete the analogy: Seismograph : Earthquake :: Hygrometer : ?",
                "options": ["Atmospheric Pressure", "Humidity", "Wind Velocity", "Precipitation"],
                "correct_option": 1,
                "explanation": "A seismograph measures earthquakes; a hygrometer measures humidity in the air."
            },
            {
                "id": "apt-ac-2",
                "question": "Find the odd one out: 27, 64, 125, 144, 216",
                "options": ["64", "125", "144", "216"],
                "correct_option": 2,
                "explanation": "27 (3^3), 64 (4^3), 125 (5^3), and 216 (6^3) are all perfect cubes. 144 is 12^2 (a square, not a cube)."
            }
        ]
    },

    # 4. Vocabulary (Verbal)
    "apt-vocabulary": {
        "id": "apt-vocabulary",
        "slug": "vocabulary",
        "title": "Vocabulary",
        "description": "Synonyms, antonyms, contextual word usage, root words (prefixes/suffixes), and idioms & phrases commonly asked in campus screening.",
        "estimatedMinutes": 18,
        "difficulty": "Easy",
        "companyTags": ["Deloitte", "TCS Digital", "Accenture", "Infosys"],
        "keyTakeaways": [
            "Root Words: Etymological roots (e.g. 'bene' = good, 'mal' = bad, 'chron' = time, 'loqu' = speak) decode unfamiliar words.",
            "Context Clues: Restatement, contrast (however, despite), and cause-effect indicators identify word meanings in sentences.",
            "Collocations: Conventional pairings of words (e.g. 'make an effort', not 'do an effort')."
        ],
        "notesMarkdown": """# High-Yield Vocabulary & Root Words

---

## 1. Etymology Roots
| Root | Meaning | Examples |
|---|---|---|
| **Bene** | Good, well | Benevolent, Benefactor, Benign |
| **Mal** | Bad, evil | Malevolent, Malign, Malfunction |
| **Loqu / Loc** | Speech, talk | Loquacious, Eloquent, Colloquial |
| **Path** | Feeling, disease | Empathy, Apathy, Pathology |
| **Chron** | Time | Chronological, Anachronism, Synchronize |

---

## 2. Context Clue Strategies
When encountering an unfamiliar word in an assessment:
1. **Contrast Clues:** Words like *although, nevertheless, on the contrary* signal the opposite meaning.
2. **Cause & Effect Clues:** Words like *because, therefore, consequently* explain the rationale.
""",
        "questions": [
            {
                "id": "apt-voc-1",
                "question": "Choose the word most nearly opposite in meaning to 'EPHEMERAL':",
                "options": ["Fleeting", "Transient", "Eternal", "Frail"],
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
            }
        ]
    },

    # 5. Reading Comprehension (Verbal)
    "apt-reading-comprehension": {
        "id": "apt-reading-comprehension",
        "slug": "reading-comprehension",
        "title": "Reading Comprehension",
        "description": "Techniques for passage analysis, identifying main ideas, tone identification, critical inference, and eliminating trap answer choices.",
        "estimatedMinutes": 20,
        "difficulty": "Medium",
        "companyTags": ["CAT", "TCS Digital", "Deloitte", "Accenture"],
        "keyTakeaways": [
            "Active Skimming: Read first and last paragraphs and topic sentences of body paragraphs first.",
            "Trap Answers: Extreme options ('always', 'never', 'only'), distortion of facts, out-of-scope assertions.",
            "Inference Questions: Must be 100% logically substantiated by text without external assumptions.",
            "Tone Recognition: Objective/neutral, critical, cynical, laudatory, satirical, didactic."
        ],
        "notesMarkdown": """# Reading Comprehension Strategies

---

## 1. Strategic Passage Reading
1. **Paragraph Mapping:** After reading each paragraph, mentally summarize its core point in 4 words.
2. **Identify Author's Main Thesis:** Locate the sentence stating *why* the author wrote the passage.
3. **Tone Identification:**
   - *Objective / Descriptive:* Reports data and facts without emotion.
   - *Advocatory / Laudatory:* Praises a concept or policy.
   - *Critical / Skeptical:* Questions arguments and highlights flaws.

---

## 2. Common Trap Answer Formats
- **Too Extreme:** Answers with absolute modifiers (*all, completely, impossible, universally*).
- **True in Reality, but Absent in Passage:** Valid real-world facts not supported by the passage text.
- **Half-Right / Half-Wrong:** Begins accurately but twists the conclusion.
""",
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
            }
        ]
    },

    # 6. Verbal Analogies (Verbal)
    "apt-verbal-analogies": {
        "id": "apt-verbal-analogies",
        "slug": "verbal-analogies",
        "title": "Verbal Analogies",
        "description": "Techniques for mapping word pair relationships, Bridge Sentence method, and distinguishing subtle semantic nuances.",
        "estimatedMinutes": 15,
        "difficulty": "Easy",
        "companyTags": ["TCS", "Infosys", "Wipro", "Cognizant"],
        "keyTakeaways": [
            "Bridge Sentence Technique: Create a concise, precise sentence connecting Word A and Word B (e.g. 'An A is a person who creates B').",
            "Order matters: If Pair 1 is Cause : Effect, Pair 2 must strictly be Cause : Effect, never Effect : Cause.",
            "Part of Speech matching: Noun : Noun -> Noun : Noun."
        ],
        "notesMarkdown": """# Verbal Analogies & Bridge Sentences

---

## 1. The Bridge Sentence Technique
Formulate a simple, unambiguous sentence linking the stem words, then test each answer option against that sentence:
- **Example:** `ARCHITECT : BUILDING`
  - *Bridge Sentence:* An architect designs a building.
  - Test options:
    - Painter : Canvas? (No, painter paints *on* canvas).
    - Composer : Symphony? (Yes! A composer designs/creates a symphony).

---

## 2. Common Analogy Patterns
- **Degree of Intensity:** Drizzle : Downpour :: Whisper : Shout.
- **Lack of Characteristic:** Careless : Caution :: Audacious : Fear.
- **Worker & Workplace:** Chef : Kitchen :: Sailor : Ship.
""",
        "questions": [
            {
                "id": "apt-va-1",
                "question": "Select the pair that best expresses a relationship similar to 'GLACIER : ICE':",
                "options": ["Beach : Sand", "Mountain : Peak", "River : Fish", "Ocean : Island"],
                "correct_option": 0,
                "explanation": "A glacier is a large landform fundamentally made of ice; a beach is a landform fundamentally made of sand."
            },
            {
                "id": "apt-va-2",
                "question": "Select the pair matching 'OBSEQUIOUS : FLATTERY':",
                "options": ["Stolid : Emotion", "Bellicose : War", "Pompous : Arrogance", "Miserly : Charity"],
                "correct_option": 2,
                "explanation": "An obsequious person is characterized by excessive flattery; a pompous person is characterized by arrogance."
            }
        ]
    },

    # 7. Shape Transformations (Spatial)
    "apt-shape-transformations": {
        "id": "apt-shape-transformations",
        "slug": "shape-transformations",
        "title": "Shape Transformations",
        "description": "Geometric shape operations, folding/unfolding 3D cubes from nets, paper cutting & punch holes, and combining geometric figures.",
        "estimatedMinutes": 18,
        "difficulty": "Medium",
        "companyTags": ["GATE", "Amazon", "Cognizant", "Mindtree"],
        "keyTakeaways": [
            "Cube Nets: Opposite faces in an unfolded net can NEVER share an edge or corner (separated by 1 square in a straight line).",
            "Paper Folding & Hole Punch: Work backwards from final fold unfolding along the crease line; holes reflect across fold axes.",
            "Rule of Non-Adjacent Faces: If Face A and Face B are opposite in net, no 3D view can show both simultaneously."
        ],
        "notesMarkdown": """# Spatial Aptitude: Shape Transformations & Cube Nets

---

## 1. Unfolded Cube (Net) Rules
When a cube is unfolded into a flat net of 6 squares:
1. **Opposite Faces:** Faces separated by exactly one intervening square in a row/column are opposites.
2. **Cardinal Rule:** Opposite faces can **NEVER be adjacent** in the assembled 3D cube.
3. If an answer choice shows two opposite faces visible together $\\implies$ **Instantly Eliminate!**

---

## 2. Paper Folding & Hole Punching
- Reverse each fold step-by-step.
- Every unfold acts as a **mirror reflection line** for all punched holes.
- Total holes double with each fold opened (if fold covered that coordinate).
""",
        "questions": [
            {
                "id": "apt-st-1",
                "question": "In a standard cube net, if Face 1 is in position (row 1, col 2) and Face 6 is in position (row 3, col 2) separated by Face 3, what is their geometric relationship when assembled?",
                "options": ["They are adjacent faces", "They are opposite faces", "They meet at 45 degrees", "They overlap"],
                "correct_option": 1,
                "explanation": "Faces separated by exactly one intervening square along a straight line in a net are always opposite faces in the assembled cube."
            },
            {
                "id": "apt-st-2",
                "question": "A square sheet of paper is folded in half twice (into a quarter square) and 1 hole is punched through all layers. How many holes appear when unfolded completely?",
                "options": ["2", "4", "8", "16"],
                "correct_option": 1,
                "explanation": "Folding twice creates 4 layers of paper. A single hole punched through all 4 layers yields 4 holes when fully opened."
            }
        ]
    },

    # 8. Rotation and Reflection (Spatial)
    "apt-rotation-and-reflection": {
        "id": "apt-rotation-and-reflection",
        "slug": "rotation-and-reflection",
        "title": "Rotation and Reflection",
        "description": "2D and 3D figure rotation (90, 180, 270 degrees clockwise/counter-clockwise), mirror images, and water images.",
        "estimatedMinutes": 18,
        "difficulty": "Easy",
        "companyTags": ["GATE", "TCS Ninja", "Accenture", "Capgemini"],
        "keyTakeaways": [
            "Rotation: Preserves chirality (handedness); clockwise rotation by 90 deg maps (x, y) -> (y, -x).",
            "Mirror Reflection: Inverts horizontal orientation (left becomes right; top and bottom remain unchanged).",
            "Water Reflection: Inverts vertical orientation (top becomes bottom; left and right remain unchanged)."
        ],
        "notesMarkdown": """# Rotation and Reflection (Mirror & Water Images)

---

## 1. Mirror Image vs. Water Image
- **Mirror Image (Vertical Mirror axis):**
  - Left $\\leftrightarrow$ Right inversion.
  - Top and Bottom remain unchanged.
- **Water Image (Horizontal Mirror axis at base):**
  - Top $\\leftrightarrow$ Bottom inversion.
  - Left and Right remain unchanged.

---

## 2. 2D Rotations
- **$90^\\circ$ Clockwise:** $(x, y) \\to (y, -x)$.
- **$180^\\circ$ Rotation:** $(x, y) \\to (-x, -y)$ (identical to simultaneous vertical and horizontal reflection).
- **$270^\\circ$ Clockwise ($90^\\circ$ CCW):** $(x, y) \\to (-y, x)$.
""",
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
                "options": ["A", "H", "B", "M"],
                "correct_option": 1,
                "explanation": "The letter 'H' has both horizontal and vertical axes of symmetry, so both its mirror image and water image are identical to H."
            }
        ]
    },

    # 9. Pattern Recognition (Spatial)
    "apt-pattern-recognition": {
        "id": "apt-pattern-recognition",
        "slug": "pattern-recognition",
        "title": "Pattern Recognition",
        "description": "Non-verbal reasoning, visual matrices, missing figure identification, embedded figures, and grouping of identical geometric figures.",
        "estimatedMinutes": 18,
        "difficulty": "Medium",
        "companyTags": ["GATE", "TCS", "Accenture", "Cognizant"],
        "keyTakeaways": [
            "Matrix Reasoning: Analyze rows and columns independently for movement, rotation, addition/subtraction of elements, and shading.",
            "Embedded Figures: Locate hidden sub-figures without altering orientation unless specified.",
            "Symbol Shifting: Track individual components (dots, arrows, lines) stepping along corners or sides in fixed increments."
        ],
        "notesMarkdown": """# Spatial Pattern Recognition & Matrices

---

## 1. Visual Matrix Strategies
In $3 \\times 3$ visual matrices:
1. **Arithmetic of Shapes:** Shape 1 $+$ Shape 2 = Shape 3 (XORing lines, removing common lines, or combining segments).
2. **Incremental Motion:** Elements rotate $+45^\\circ, +90^\\circ$ or advance clockwise around the perimeter.
3. **Conservation of Features:** Each row and column must contain exactly one circle, one square, and one triangle.

---

## 2. Embedded Figures & Decomposition
Find the given probe figure hidden within complex geometric drawings. Focus on unique intersection angles and distinctive vertex counts.
""",
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
            }
        ]
    }
}

# 1. Quantitative Aptitude
# Preserve all 9 existing topics + add 'apt-number-systems'
quant_topics = []
for tid in ["percentages-interest", "ratio-proportion", "profit-loss", "time-work", "speed-time-distance", "mixtures-alligations", "apt-number-systems", "prob-perm", "pipes-cisterns", "clocks-calendars"]:
    if tid == "apt-number-systems":
        t = new_apt_topics[tid]
    else:
        t = existing_apt.get(tid)
    if t:
        t_copy = dict(t)
        t_copy["youtube_url"] = make_yt_url(t_copy["title"], "Quantitative Aptitude")
        quant_topics.append(t_copy)

# 2. Logical Reasoning
# Existing: syllogisms, seating-arrangements, blood-relations, coding-decoding, direction-sense, statements-assumptions
# Add: apt-series-and-patterns, apt-analogies-and-classification
logical_topics = []
for tid in ["apt-series-and-patterns", "apt-analogies-and-classification", "syllogisms", "coding-decoding", "seating-arrangements", "blood-relations", "direction-sense", "statements-assumptions"]:
    if tid in new_apt_topics:
        t = new_apt_topics[tid]
    else:
        t = existing_apt.get(tid)
    if t:
        t_copy = dict(t)
        t_copy["youtube_url"] = make_yt_url(t_copy["title"], "Logical Reasoning")
        logical_topics.append(t_copy)

# 3. Verbal Ability
# Existing: sentence-correction, data-interpretation
# Add: apt-vocabulary, apt-reading-comprehension, apt-verbal-analogies
verbal_topics = []
for tid in ["sentence-correction", "apt-vocabulary", "apt-reading-comprehension", "apt-verbal-analogies", "data-interpretation"]:
    if tid in new_apt_topics:
        t = new_apt_topics[tid]
    else:
        t = existing_apt.get(tid)
    if t:
        t_copy = dict(t)
        if tid == "sentence-correction":
            t_copy["title"] = "Grammar and Sentence Completion"
        t_copy["youtube_url"] = make_yt_url(t_copy["title"], "Verbal Ability English")
        verbal_topics.append(t_copy)

# 4. Spatial Aptitude
spatial_topics = []
for tid in ["apt-shape-transformations", "apt-rotation-and-reflection", "apt-pattern-recognition"]:
    t = new_apt_topics[tid]
    t_copy = dict(t)
    t_copy["youtube_url"] = make_yt_url(t_copy["title"], "Spatial Aptitude GATE")
    spatial_topics.append(t_copy)

quant_category = {
    "id": "quant",
    "slug": "quantitative-aptitude",
    "title": "Quantitative Aptitude",
    "description": "Percentages, ratios, profit & loss, time & work, speed & distance, number systems, and combinatorics.",
    "icon": "BookOpen",
    "topics": quant_topics
}

logical_category = {
    "id": "logical",
    "slug": "logical-reasoning",
    "title": "Logical Reasoning",
    "description": "Series, patterns, analogies, syllogisms, coding-decoding, blood relations, and seating arrangement puzzles.",
    "icon": "Layers",
    "topics": logical_topics
}

verbal_category = {
    "id": "verbal-ability",
    "slug": "verbal-ability",
    "title": "Verbal Ability",
    "description": "Grammar, sentence completion, vocabulary, reading comprehension, analogies, and data interpretation.",
    "icon": "BookOpen",
    "topics": verbal_topics
}

spatial_category = {
    "id": "spatial-aptitude",
    "slug": "spatial-aptitude",
    "title": "Spatial Aptitude",
    "description": "Shape transformations, paper folding, cube nets, mirror/water rotations, and visual matrix pattern recognition.",
    "icon": "Layers",
    "topics": spatial_topics
}

ts_content = f"""import type {{ SectionCategory }} from './types';

export const QUANTITATIVE_APTITUDE_CATEGORY: SectionCategory = {json.dumps(quant_category, indent=2)};

export const LOGICAL_REASONING_CATEGORY: SectionCategory = {json.dumps(logical_category, indent=2)};

export const VERBAL_ABILITY_CATEGORY: SectionCategory = {json.dumps(verbal_category, indent=2)};

export const SPATIAL_APTITUDE_CATEGORY: SectionCategory = {json.dumps(spatial_category, indent=2)};
"""

with open("src/lib/data/curriculum/aptitude.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print(f"Generated Aptitude modules (Quant: {len(quant_topics)}, Logical: {len(logical_topics)}, Verbal: {len(verbal_topics)}, Spatial: {len(spatial_topics)}) successfully!")
