// --- Gauss Formula Approach ---
/**
 * Calculate sum from 1 to n using Gauss' mathematical formula.
 *
 * Approach:
 * 1. Directly apply the formula n*(n+1)/2
 * 2. Handles edge case where n ≤ 0
 *
 * Time Complexity: O(1) - Constant time
 * Space Complexity: O(1) - Constant space
 */
function sumGauss(n) {
  if (n <= 0) return 0;
  return (n * (n + 1)) / 2;
}

// --- Pairwise Summation Approach ---
/**
 * Calculate sum from 1 to n by pairing elements from start and end.
 *
 * Approach:
 * 1. Use two pointers (left and right) starting at 1 and n
 * 2. Add pairs (left + right) while moving pointers towards each other
 * 3. Handle odd n by adding the middle element at the end
 *
 * Time Complexity: O(n) - Linear time (processes n/2 pairs)
 * Space Complexity: O(1) - Constant space
 */
function sumPairwise(n) {
  if (n <= 0) return 0;
  let left = 1;
  let right = n;
  let sum = 0;
  while (left < right) {
    sum += left + right;
    left++;
    right--;
  }
  if (left === right) {
    sum += left;
  }
  return sum;
}

// --- Binary Search Approach ---
/**
 * Calculate sum using binary search to divide the range into segments.
 *
 * Approach:
 * 1. Split the range [left, right] into halves using midpoint
 * 2. Calculate partial sums for each segment using Gauss' formula
 * 3. Recursively process remaining segments (iterative implementation)
 *
 * Time Complexity: O(log n) - Logarithmic time (halves the range each iteration)
 * Space Complexity: O(1) - Constant space
 */
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

// Test cases
console.log("Gauss: ", sumGauss(100)); // 5050
console.log("Pairwise: ", sumPairwise(100)); // 5050
console.log("Binary Search: ", sumBinarySearch(100)); // 5050
