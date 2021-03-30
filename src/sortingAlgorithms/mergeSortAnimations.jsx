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
  for (i = 0; i < len; i++) {
    tmp[i] = array[startIndex + i];
  }
  i = 0;
  j = middle;
  k = startIndex;
  while (i < len && j < endIndex) {
    if (tmp[i] <= array[j]) {
      animateMergeCompare(k, renderCounter);
      animateMerge(k, tmp[i], renderCounter);
      animateMergeCompareEnd(k, renderCounter);
      array[k++] = tmp[i++];
    } else {
      animateMergeCompare(k, renderCounter);
      animateMerge(k, array[j], renderCounter);
      animateMergeCompareEnd(k, renderCounter);
      array[k++] = array[j++];
    }
  }
  while (i < len) {
    animateMergeCompare(k, renderCounter);
    animateMerge(k, tmp[i], renderCounter);
    animateMergeCompareEnd(k, renderCounter);
    array[k++] = tmp[i++];
  }
  return array;
}

export default mergeSortAnimations;
