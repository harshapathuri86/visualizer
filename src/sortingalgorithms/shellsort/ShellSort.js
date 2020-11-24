import {
  swap,
  newTrace,
  addToTrace,
  createRange,
} from './../helpers';

const ShellSort = (nums) => {
  const trace = newTrace(nums);

  for (
    let gap = Math.floor(nums.length / 2);
    gap > 0;
    gap = Math.floor(gap / 2)
  ) {
    for (let j = gap; j < nums.length; j++) {
      for (let i = j - gap; i >= 0; i -= gap) {
        addToTrace(trace, nums, 0, [], [i, i + gap]);
        if (nums[i + gap] < nums[i]) {
          addToTrace(trace, nums, 1, [], [], [i, i + gap]);
          swap(nums, i, i + gap);
          addToTrace(trace, nums, 1, [], [], [i, i + gap]);
        } else {
          break;
        }
      }
    }
  }

  addToTrace(trace, nums, -1, createRange(0, nums.length));
  return trace;
};



export default ShellSort;
