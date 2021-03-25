import { animateCompare } from "../animations/animationVisuals";
import { swap } from "../animations/animationVisuals";
import { animateSwap } from "../animations/animationVisuals";
import { animateCompareEnd } from "../animations/animationVisuals";

const selectionSortAnimations = (array) => {
  let renderCounter = 0;
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    for (let j = i; j < array.length; j++) {
      renderCounter++;
      animateCompare(i, j, renderCounter);
      if (array[j] < array[minIndex]) {
        renderCounter++;
        animateCompareEnd(minIndex, minIndex, renderCounter);
        minIndex = j;
      }
      if (j !== minIndex) {
        renderCounter++;
        animateCompareEnd(i, j, renderCounter);
      }
    }

    swap(array, minIndex, i, renderCounter);
    renderCounter++;
    animateSwap(minIndex, i, renderCounter);

    renderCounter++;
    animateCompareEnd(minIndex, i, renderCounter);
  }
  return array;
};
export default selectionSortAnimations;
