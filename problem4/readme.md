# Summation from 1 to n (1 + 2 + ... + n)

## Problem Statement

Calculate the sum of all integers from `1` to `n` using different algorithmic approaches.  
**Input Constraint**: The result will **always** be less than `Number.MAX_SAFE_INTEGER`.  
**Example**: `sum_to_n(5) = 1 + 2 + 3 + 4 + 5 = 15`.

---

## Solutions Overview

### 1. **Gauss Formula (Optimal Solution)**

**Implementation**:

```javascript
function sumGauss(n) {
  if (n <= 0) return 0;
  return (n * (n + 1)) / 2;
}
```

**Complexity**:

- **Time**: O(1)
- **Space**: O(1)

**Pros**:

- Instant calculation regardless of input size.
- Minimal code and no loops/recursion.

**Cons**:

- Requires knowledge of the mathematical formula.

**Note**:

- The formula inherently respects the input constraint (`result < Number.MAX_SAFE_INTEGER`), as specified in the problem statement.
- No overflow checks are needed due to the problem’s guarantee.

---

### 2. **Binary Search Approach (Logarithmic Time)**

**Implementation**:

```javascript
function sumBinarySearch(n) {
  if (n <= 0) return 0;
  let left = 1,
    right = n,
    total = 0;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const partialSum = (mid * (mid + 1)) / 2 - ((left - 1) * left) / 2;
    total += partialSum;
    left = mid + 1;
  }
  return total;
}
```

**Complexity**:

- **Time**: O(log n)
- **Space**: O(1)

**Pros**:

- Efficient for large `n` without recursion.
- Combines binary search with Gauss formula for partial sums.

**Cons**:

- Slightly more complex logic than the formula.

**Note**:

- Relies on the problem’s input constraint to avoid overflow.
- Uses integer division to prevent floating-point inaccuracies.

---

### 3. **Pairwise Summation (Intuitive Linear Approach)**

**Implementation**:

```javascript
function sumPairwise(n) {
  if (n <= 0) return 0;
  let left = 1,
    right = n,
    sum = 0;
  while (left < right) {
    sum += left + right;
    left++;
    right--;
  }
  if (left === right) sum += left;
  return sum;
}
```

**Complexity**:

- **Time**: O(n)
- **Space**: O(1)

**Pros**:

- Visually demonstrates Gauss’s pairing strategy (e.g., 1 + n, 2 + (n-1)).
- Easy to understand for educational purposes.

**Cons**:

- Less efficient for large `n` compared to O(1) or O(log n) solutions.

**Note**:

- Safe under the problem’s input constraint but performs worst for very large `n`.

---

## Comparison Table

| Method            | Time Complexity | Space Complexity | Practical Use Case                     |
| ----------------- | --------------- | ---------------- | -------------------------------------- |
| **Gauss Formula** | O(1)            | O(1)             | **Ideal for all n** (optimal solution) |
| **Binary Search** | O(log n)        | O(1)             | When formula is unknown/for study      |
| **Pairwise Sum**  | O(n)            | O(1)             | Educational purposes or small n        |

---

## Usage Examples

```javascript
console.log(sumGauss(100)); // Output: 5050
console.log(sumBinarySearch(100)); // Output: 5050
console.log(sumPairwise(100)); // Output: 5050
```

---

## Conclusion

- **Best Choice**: **`sumGauss`** (O(1) time/space) for all practical purposes.
- **Educational Value**:
  - Use `sumBinarySearch` to understand logarithmic algorithms.
  - Use `sumPairwise` to visualize Gauss’s mathematical insight.
- **Avoid**: Any O(n) solution for large `n` (e.g., `n = 10^9`).

---

## Guide to test
```sh
cd ./problem4
node index.js
```