import { swap, newTrace, addToTrace, lastSorted } from './../helpers';

const SelectionSort = (nums) => {
  // Initial State
  const trace = newTrace(nums);

  // Core Algorithm
  for (let i = 0; i < nums.length - 1; i++) {
    // Internal Loop: Find index of min value
    let minIndex = i;
    for (let j = i + 1; j < nums.length; j++) {
      // Visualize: comparing A[j] to A[minIndex]
      addToTrace(trace, nums, 0, lastSorted(trace), [minIndex, j]);
      if (nums[j] < nums[minIndex]) {
        // Visualize: discovered new minIndex
        addToTrace(trace, nums, -1, lastSorted(trace), [minIndex], [j]);
        minIndex = j;
        // Visualize: reassign new minIndex;
        addToTrace(trace, nums, -1, lastSorted(trace), [minIndex], [j]);
      }
    }

    // Visualize: i'th value to be swapped with min value
    addToTrace(trace, nums, -1, lastSorted(trace), [], [i, minIndex]);

    swap(nums, i, minIndex);

    // Visualize: i'th value has been swapped with min value
    addToTrace(trace, nums, 1, [...lastSorted(trace), i], [], []);
  }

  // Visualize: Final item in the array is sorted
  addToTrace(trace, nums, -1, [...lastSorted(trace), nums.length - 1]);

  return trace;
};
export default SelectionSort;