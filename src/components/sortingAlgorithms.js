import "./SortIt.css";
import colors from "../config/colors";
import constants from "../config/constants";

export const bubbleSortAnimations = (array) => {
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

function animateCompare(index1, index2, i) {
  const arrayBars = document.getElementsByClassName("array-bar");
  setTimeout(() => {
    arrayBars[index1].style.backgroundColor = colors.secondary;
    arrayBars[index2].style.backgroundColor = colors.secondary;
  }, i * constants.ANIMATION_SPEED_MS);
}

function animateCompareEnd(index1, index2, i) {
  const arrayBars = document.getElementsByClassName("array-bar");
  setTimeout(() => {
    arrayBars[index1].style.backgroundColor = colors.primary;
    arrayBars[index2].style.backgroundColor = colors.primary;
  }, i * constants.ANIMATION_SPEED_MS);
}

function swap(array, index1, index2, i) {
  var temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

function animateSwap(index1, index2, i) {
  const arrayBars = document.getElementsByClassName("array-bar");
  const arrayValue = document.getElementsByClassName("array-value");

  setTimeout(() => {
    const tempArrayValue = arrayValue[index1].innerHTML;
    arrayValue[index1].innerHTML = arrayValue[index2].innerHTML;
    arrayValue[index2].innerHTML = tempArrayValue;

    const tempStyle = arrayBars[index1].style.height;
    arrayBars[index1].style.height = arrayBars[index2].style.height;
    arrayBars[index2].style.height = tempStyle;

    arrayBars[index1].style.backgroundColor = colors.primary;
  }, i * constants.ANIMATION_SPEED_MS);
}

export const selectionSortAnimations = (array) => {
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

export const insertionSortAnimations = (array) => {
  let renderCounter = 0;
  for (let i = 1; i < array.length; i++) {
    let current = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > current) {
      renderCounter++;
      animateCompare(j, j + 1, renderCounter);

      array[j + 1] = array[j]; //shift  greater value
      renderCounter++;
      animateShift(j, j + 1, renderCounter);
      renderCounter++;
      animateCompareEnd(j, j + 1, renderCounter);
      j = j - 1; //decrement j to see if < or at zero
    }
    renderCounter++; //
    animateCompare(j + 1, j + 1, renderCounter); //
    array[j + 1] = current; //save current in new home
    renderCounter++;
    animateShiftCurrent(j + 1, current, renderCounter);
  }
  return array;
};

function animateShiftCurrent(index1, current, i) {
  const arrayBars = document.getElementsByClassName("array-bar");
  const arrayValue = document.getElementsByClassName("array-value");

  setTimeout(() => {
    arrayValue[index1].innerHTML = current;
    arrayBars[index1].style.height = `${current}px`;
    arrayBars[index1].style.backgroundColor = colors.primary;
  }, i * constants.ANIMATION_SPEED_MS);
}

function animateShift(index1, index2, i) {
  const arrayBars = document.getElementsByClassName("array-bar");
  const arrayValue = document.getElementsByClassName("array-value");
  setTimeout(() => {
    arrayValue[index2].innerHTML = arrayValue[index1].innerHTML;
    arrayBars[index2].style.height = arrayBars[index1].style.height;
  }, i * constants.ANIMATION_SPEED_MS);
}

export const quickSortAnimations = (array, start, end, renderCounter) => {
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

function animatePivot(index1, index2, i) {
  const arrayBars = document.getElementsByClassName("array-bar");
  setTimeout(() => {
    arrayBars[index1].style.backgroundColor = colors.pivot;
    arrayBars[index2].style.backgroundColor = colors.pivot;
  }, i * constants.ANIMATION_SPEED_MS);
}

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

export const mergeSortAnimations = (
  array,
  startIndex,
  endIndex,
  renderCounter
) => {
  if (endIndex - startIndex > 1) {
    let middle = Math.floor((startIndex + endIndex) / 2);
    mergeSortAnimations(array, startIndex, middle, renderCounter);
    mergeSortAnimations(array, middle, endIndex, renderCounter);
    merge(array, startIndex, middle, endIndex, renderCounter);
  }
  return array;
};

function animateMerge(index1, value, renderCounter) {
  const arrayBars = document.getElementsByClassName("array-bar");
  const arrayValue = document.getElementsByClassName("array-value");
  setTimeout(() => {
    arrayValue[index1].innerHTML = value;
    arrayBars[index1].style.height = `${value}px`;
  }, renderCounter * constants.ANIMATION_SPEED_MS);
}

function animateMergeCompare(index1, i) {
  const arrayBars = document.getElementsByClassName("array-bar");
  setTimeout(() => {
    arrayBars[index1].style.backgroundColor = colors.secondary;
  }, i * constants.ANIMATION_SPEED_MS);
}

function animateMergeCompareEnd(index1, i) {
  const arrayBars = document.getElementsByClassName("array-bar");
  setTimeout(() => {
    arrayBars[index1].style.backgroundColor = colors.primary;
  }, i * constants.ANIMATION_SPEED_MS);
}
