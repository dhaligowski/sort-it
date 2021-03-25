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
  renderCounter.value++;
  animatePivot(end, end, renderCounter.value);
  let boundary = start - 1;
  for (let i = start; i <= end; i++) {
    renderCounter.value++;
    animateCompare(i, i, renderCounter.value);
    if (array[i] <= pivot) {
      renderCounter.value++;
      animateCompare(boundary + 1, boundary + 1, renderCounter.value);
      renderCounter.value++;
      animateSwap(i, boundary + 1, renderCounter.value);
      swap(array, i, ++boundary);
      renderCounter.value++;
      animateCompareEnd(i, boundary, renderCounter.value);
    } else {
      renderCounter.value++;
      animateCompareEnd(i, i, renderCounter.value);
    }
  }
  renderCounter.value++;
  animateCompareEnd(end, end, renderCounter.value);
  return boundary;
}
export default quickSortAnimations;
