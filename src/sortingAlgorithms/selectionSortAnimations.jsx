import { animateCompare } from "../animations/animationVisuals";
import { swap } from "../animations/animationVisuals";
import { animateSwap } from "../animations/animationVisuals";
import { animateCompareEnd } from "../animations/animationVisuals";

const selectionSortAnimations = (array, renderCounter) => {
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    for (let j = i; j < array.length; j++) {
      animateCompare(i, j, renderCounter);
      if (array[j] < array[minIndex]) {
        animateCompareEnd(minIndex, minIndex, renderCounter);
        minIndex = j;
      }
      if (j !== minIndex) {
        animateCompareEnd(i, j, renderCounter);
      }
    }
    swap(array, minIndex, i, renderCounter);
    animateSwap(minIndex, i, renderCounter);
    animateCompareEnd(minIndex, i, renderCounter);
  }
  return array;
};
export default selectionSortAnimations;
