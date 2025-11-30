const n = nums.length;
// Outer loop iterates from the first element to the second-to-last
for (let i = 0; i < n - 1; i++) {
  // Inner loop iterates from the element after 'i' to the end
  for (let j = i + 1; j < n; j++) {
    // If the sum of the pair equals the target, return their indices
    if (nums[i] + nums[j] === target) {
      return [i, j];
    }
  }
}
// If no pair is found, return an empty array
return [];
