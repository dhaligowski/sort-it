import { animatePivot } from "../animations/animationVisuals";
import { animateCompare } from "../animations/animationVisuals";
import { animateSwap } from "../animations/animationVisuals";
import { swap } from "../animations/animationVisuals";
import { animateCompareEnd } from "../animations/animationVisuals";

const quickSortAnimations = (array, start, end, renderCounter) => {
  if (start >= end) return array;

  let boundary = partition(array, start, end, renderCounter);

  quickSortAnimations(array, start, boundary - 1, renderCounter);
  quickSortAnimations(array, boundary + 1, end, renderCounter);
  return array;
};

function partition(array, start, end, renderCounter) {
  let pivot = array[end];
  animatePivot(end, end, renderCounter);
  let boundary = start - 1;
  for (let i = start; i <= end; i++) {
    animateCompare(i, i, renderCounter);
    if (array[i] <= pivot) {
      animateCompare(boundary + 1, boundary + 1, renderCounter);
      animateSwap(i, boundary + 1, renderCounter);
      swap(array, i, ++boundary);
      animateCompareEnd(i, boundary, renderCounter);
    } else {
      animateCompareEnd(i, i, renderCounter);
    }
  }
  animateCompareEnd(end, end, renderCounter);
  return boundary;
}
export default quickSortAnimations;
