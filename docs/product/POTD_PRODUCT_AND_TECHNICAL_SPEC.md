# StackUp Problem of the Day (POTD) Engine & Learning Ecosystem Specification

**Document Version:** 1.0.0  
**Status:** Approved & Implemented  
**Authors:** Senior Product Designer & Senior Full-Stack Engineer  
**Target Routes:** `/practice/potd`, `/api/dsa/potd`, `/dsa`, `/dashboard`

---

## 1. Executive Summary & Product Objective

The **Problem of the Day (POTD)** is StackUp's flagship daily deliberate practice mechanism. Rather than confronting students with a wall of 150 unstructured problems—triggering choice paralysis and sporadic cramming—POTD establishes a sustainable, daily cadence for technical interview preparation.

### Core Product Principles
1. **Reduce Friction & Eliminate Choice Paralysis**: Every morning at 00:00 IST, one high-yield problem is selected globally across the 150-problem curated pool.
2. **Deterministic & Fair Progression**: The sequence traverses fundamental algorithmic patterns (Two Pointers, Sliding Window, Monotonic Stack, Dynamic Programming, Graph BFS/DFS) in a pseudo-randomized yet balanced schedule.
3. **Socratic Guidance Over Spoilers**: Students encountering friction can progressively reveal Tier 1 (Mental Model), Tier 2 (Invariants & Boundary Conditions), and Tier 3 (Algorithmic Skeleton) hints without having the full solution spoiled.
4. **Post-Solve Conceptual Closure**: Solving a problem does not dead-end into a generic congratulations dialog; it debriefs the core pattern and provides two immediate reinforcement challenges in the same pattern category.
5. **Anti-Anxiety Consistency**: Streaks reflect regular engagement rather than punishing students with hostile resets for minor temporal anomalies.

---

## 2. Temporal & Timezone Architecture

### The Choice of Asia/Kolkata (IST - UTC+05:30)
StackUp primarily serves engineering students and early-career candidates operating on Indian Standard Time (IST). Using UTC or local client time introduces critical bugs:
- Between 00:00 and 05:30 IST, a UTC-based system renders "yesterday's" challenge, creating confusion during night coding sessions.
- Using client device time allows artificial manipulation of local clocks to alter streak metrics.

StackUp anchors all date key generation, calendar status, and reset timers to `Asia/Kolkata`.

### Date Key & Hash Formulation
```ts
// Canonical Asia/Kolkata Date Key Extraction
export function getKolkataDateKey(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const getPart = (t: string) => parts.find((p) => p.type === t)?.value || '';
  return `${getPart('year')}-${getPart('month')}-${getPart('day')}`;
}
```

### Deterministic Problem Selection Function
To ensure zero database querying overhead and instant offline capability, the problem index is calculated via linear congruential hashing:
$$\text{epochDays} = \left\lfloor \frac{\text{epochMs}_{\text{IST}}}{86400000} \right\rfloor$$
$$\text{problemIndex} = (\text{epochDays} \times 37 + 13) \pmod{N}$$
Where $N = 150$ is the total curated DSA problems count. 

Because $\gcd(37, 150) = 1$, this linear generator is guaranteed to form a full cycle permutation without clustering or premature repetition.

### Countdown Timer Until Midnight IST
The countdown timer runs on an exact millisecond difference from the current IST time to the next 00:00:00 IST boundary:
```ts
const now = new Date();
const kolkataFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Kolkata',
  hour12: false,
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
});
// Target is midnight (24:00:00) of the current Kolkata day
const msUntilMidnight = targetMidnightKolkata.getTime() - currentKolkata.getTime();
```

---

## 3. Calendar View & Historical Archive

The `/practice/potd` route features an interactive monthly challenge grid that mirrors the student's personal preparation trajectory.

### Calendar Cell State Machine
Each cell in the monthly grid belongs to one of five discrete states:
1. **Pad Cell (`pad-{i}`)**: Invisible padding cell aligning day 1 of the month to its correct day-of-week column (Sunday through Saturday).
2. **Past Solved (`isSolved = true`)**: Rendered in soft mint background (`bg-emerald-500/20`), emerald text, and a distinctive dot indicator.
3. **Today's Active (`isToday = true`)**: Highlighted with an editorial teal ring (`border-[#103F45]`), indicating the live daily challenge.
4. **Historical Attemptable (`isPast && !isSolved`)**: Fully clickable. Clicking loads the problem corresponding to that historical date without mutating today's active streak.
5. **Future Locked (`isFuture = true`)**: Rendered in muted text (`text-slate-400/40`), `cursor-not-allowed`, and `disabled`. Prevents premature solution gaming.

### Historical Querying
Users can click any past date to inspect and solve previous daily challenges. The front-end issues a lightweight fetch:
`GET /api/dsa/potd?date=YYYY-MM-DD`
If the user is offline or the network fails, the front-end decomposes the date string and executes `getProblemOfTheDay(new Date(y, m - 1, d))` synchronously in the browser.

---

## 4. Streak Calculation & Anti-Frustration Rules

### Streak Increment Criteria
A day's challenge counts toward the streak if and only if:
1. The student solves the challenge within its active 24-hour IST window (`dateKey === todayKey`).
2. The user has not already marked today as completed (idempotent).
3. If the user solved yesterday's challenge (`dateKey - 1 day`), `streak = previousStreak + 1`. If yesterday was missed, the active streak resets to 1.

### Storage Persistence Matrix
| Key | Type | Description |
|---|---|---|
| `stackup_potd_streak` | `number` | Consecutive daily challenge count. |
| `stackup_potd_last_solved` | `string` (`YYYY-MM-DD`) | Date key of the most recently solved daily challenge. |
| `stackup_potd_completed_dates` | `string[]` | Array of all historical date keys successfully completed. |
| `stackup_dsa_solved_ids` | `string[]` | Global set of all completed DSA problem IDs across the platform. |

### Supabase Cloud Synchronization
When an authenticated user session is active, daily completions are saved to the `user_dsa_activity` and `user_profiles` tables with a composite unique index on `(user_id, date_key)` to prevent duplicate increments across multiple devices.

---

## 5. Progressive Socratic Nudges

To cultivate genuine problem-solving grit rather than dependency on external video walkthroughs, POTD integrates a 3-tier progressive hint disclosure system:

### Tier 1: Conceptual Metaphor
- **Purpose**: Provides an intuitive analogy without mentioning data structures or syntax.
- **Example (Sliding Window)**: *"Imagine a magnifying glass sliding across a tape measure. You expand the right edge to discover valid sequences, and shrink the left edge whenever constraints are violated."*

### Tier 2: Invariants & Boundary Guards
- **Purpose**: Clarifies what invariant must remain true before and after each loop cycle, along with subtle edge cases (e.g., empty arrays, duplicates, negative values).
- **Example (Binary Search)**: *"Invariant: If the target exists, it is strictly within the closed interval `[low, high]`. Check whether `mid` can cause integer overflow in standard languages."*

### Tier 3: Algorithmic Skeleton
- **Purpose**: Structural pseudocode outlining loops, conditions, and return variables without revealing the final computation details.

---

## 6. Post-Solve Mastery Reinforcement

When `isProblemSolved` evaluates to `true` (via `solvedIds.includes(problem.id)` or `solvedDates.includes(selectedDateKey)`):
1. **Mastery Confirmation**: A congratulatory header confirms the problem was solved using the specific algorithmic pattern tag.
2. **Twin Reinforcement Challenges**: The engine filters the 150-problem dataset for problems sharing the identical `pattern_tag` (excluding the current problem) and presents 2 recommended next problems with direct links to the coding workspace.
3. **IDE Review**: A prominent action button switches from *"Solve Challenge in IDE"* to *"Review in IDE"*, allowing students to inspect their benchmarked runtime, time complexity, and memory score.

---

## 7. API Contracts & Specifications

### Endpoint: `GET /api/dsa/potd`

#### Query Parameters:
- `date` *(optional)*: `YYYY-MM-DD` string in `Asia/Kolkata` timezone. Defaults to current date.

#### Response Schema (`200 OK`):
```json
{
  "problem": {
    "id": "dsa-1",
    "title": "Two Sum",
    "difficulty": "Easy",
    "pattern_tag": "Hash Map",
    "time_complexity": "O(N)",
    "space_complexity": "O(N)",
    "companies": ["Amazon", "Google", "Microsoft"],
    "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target...",
    "starter_code": {
      "javascript": "function twoSum(nums, target) {\n  // Write your solution here\n}",
      "python": "def twoSum(nums: list[int], target: int) -> list[int]:\n    # Write your solution here\n    pass",
      "cpp": "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n    }\n};"
    },
    "test_cases": [
      { "input": "[2,7,11,15], 9", "expected": "[0,1]" }
    ],
    "leetcode_url": "https://leetcode.com/problems/two-sum/",
    "striver_url": "https://takeuforward.org/data-structure/two-sum-check-if-a-pair-with-given-sum-exists-in-array/"
  },
  "today": "2026-11-23",
  "date": "2026-11-23",
  "msUntilMidnight": 28654000
}
```

#### Cache-Control Headers:
```http
Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400
```
Allows Edge CDN servers to cache the daily challenge globally, eliminating compute load on serverless functions while serving instant responses to incoming student requests.
