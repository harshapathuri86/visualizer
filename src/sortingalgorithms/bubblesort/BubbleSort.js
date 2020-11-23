import { swap, newTrace, addToTrace, lastSorted, } from './../helpers';
const BubbleSort = (nums) => 
{
  const trace = newTrace(nums);
  for (let i = 0; i < nums.length; i++) 
  {
    for (let j = 0; j < nums.length - i - 1; j++) 
    {
      addToTrace(trace, nums, lastSorted(trace), [j, j + 1]);
      if (nums[j] > nums[j + 1]) 
      {
        swap(nums, j, j + 1);
        addToTrace(trace, nums, lastSorted(trace), [], [j, j + 1]);
      }
    }
    addToTrace(trace, nums, 
    [
      ...lastSorted(trace),
      nums.length - 1 - i
    ]);
  }

  return trace;
};

export default BubbleSort;
