import { animateMerge } from "../animations/animationVisuals";
import { animateMergeCompare } from "../animations/animationVisuals";
import { animateMergeCompareEnd } from "../animations/animationVisuals";

const mergeSortAnimations = (array, startIndex, endIndex, renderCounter) => {
  if (endIndex - startIndex > 1) {
    let middle = Math.floor((startIndex + endIndex) / 2);
    mergeSortAnimations(array, startIndex, middle, renderCounter);
    mergeSortAnimations(array, middle, endIndex, renderCounter);
    merge(array, startIndex, middle, endIndex, renderCounter);
  }
  return array;
};

function merge(array, startIndex, middle, endIndex, renderCounter) {
  let tmp = [];
  let len = middle - startIndex;
  let i, j, k;
  // save left subarray
  for (i = 0; i < len; i++) {
    // animate this move
    tmp[i] = array[startIndex + i];
  }
  // merge subarrays
  i = 0;
  j = middle;
  k = startIndex;
  while (i < len && j < endIndex) {
    if (tmp[i] <= array[j]) {
      // animate this move
      renderCounter.value++;
      animateMergeCompare(k, renderCounter.value);
      renderCounter.value++;
      animateMerge(k, tmp[i], renderCounter.value);
      renderCounter.value++;
      animateMergeCompareEnd(k, renderCounter.value);
      array[k++] = tmp[i++];
    } else {
      // animate this move
      renderCounter.value++;
      animateMergeCompare(k, renderCounter.value);
      renderCounter.value++;
      animateMerge(k, array[j], renderCounter.value);
      renderCounter.value++;
      animateMergeCompareEnd(k, renderCounter.value);
      array[k++] = array[j++];
    }
  }
  // copy the remaining elements
  while (i < len) {
    // animate this move
    renderCounter.value++;
    animateMergeCompare(k, renderCounter.value);
    renderCounter.value++;
    animateMerge(k, tmp[i], renderCounter.value);
    renderCounter.value++;
    animateMergeCompareEnd(k, renderCounter.value);
    array[k++] = tmp[i++];
  }
  return array;
}

export default mergeSortAnimations;
