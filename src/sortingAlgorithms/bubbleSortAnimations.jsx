import { animateCompare } from "../animations/animationVisuals";
import { swap } from "../animations/animationVisuals";
import { animateSwap } from "../animations/animationVisuals";
import { animateCompareEnd } from "../animations/animationVisuals";

const bubbleSortAnimations = (array) => {
  let renderCounter = 0; //counter to make animation smooth
  for (var i = 0; i < array.length; i++) {
    let isSorted = true;
    for (var j = 1; j < array.length - i; j++)
      if (array[j] < array[j - 1]) {
        renderCounter++;
        animateCompare(j - 1, j, renderCounter);
        renderCounter++;
        swap(array, j - 1, j, renderCounter);
        animateSwap(j - 1, j, renderCounter);

        renderCounter++;
        animateCompareEnd(j - 1, j, renderCounter);

        isSorted = false;
      } else {
        renderCounter++;
        animateCompare(j - 1, j, renderCounter);
        renderCounter++;
        animateCompareEnd(j - 1, j, renderCounter);
      }

    if (isSorted) return array;
  }
};
export default bubbleSortAnimations;
