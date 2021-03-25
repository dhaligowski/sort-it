import { animateCompare } from "../animations/animationVisuals";
import { animateShift } from "../animations/animationVisuals";
import { animateShiftCurrent } from "../animations/animationVisuals";
import { animateCompareEnd } from "../animations/animationVisuals";

const insertionSortAnimations = (array, renderCounter) => {
  for (let i = 1; i < array.length; i++) {
    let current = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > current) {
      animateCompare(j, j + 1, renderCounter);
      array[j + 1] = array[j]; //shift  greater value
      animateShift(j, j + 1, renderCounter);
      animateCompareEnd(j, j + 1, renderCounter);
      j = j - 1; //decrement j to see if < or at zero
    }
    animateCompare(j + 1, j + 1, renderCounter); //
    array[j + 1] = current; //save current in new home
    animateShiftCurrent(j + 1, current, renderCounter);
  }
  return array;
};
export default insertionSortAnimations;
