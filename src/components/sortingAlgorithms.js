import "./SortIt.css";
import colors from "../config/colors";
import constants from "../config/constants";
import { render } from "@testing-library/react";

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

export const quickSortAnimations = (array, left, right) => {
  var index;
  if (array.length > 1) {
    index = partition(array, left, right); //index returned from partition
    if (left < index - 1) {
      //more elements on the left side of the pivot
      quickSortAnimations(array, left, index - 1);
    }
    if (index < right) {
      //more elements on the right side of the pivot
      quickSortAnimations(array, index, right);
    }
  }
  return array;
};

function partition(array, left, right) {
  var pivot = array[Math.floor((right + left) / 2)], //middle element
    i = left, //left pointer
    j = right; //right pointer
  while (i <= j) {
    while (array[i] < pivot) {
      i++;
    }
    while (array[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(array, i, j); //sawpping two elements
      i++;
      j--;
    }
  }
  return i;
}

function merge(array, startIndex, middle, endIndex, renderCounter) {
  console.log("RCV", renderCounter);
  //let renderCounter = 0;
  //let renderCounter = { value: 0 };
  let tmp = [];
  let len = middle - startIndex;
  let i, j, k;
  // save left subarray
  for (i = 0; i < len; i++) {
    // animate this move
    tmp[i] = array[startIndex + i];
    // console.log("from array[startIndex +i]", i, array[startIndex + i]);
    // console.log("to tmp[i]", i, tmp[i]);
    // renderCounter++;
    // animateSwap(i, i, renderCounter);
  }
  // merge subarrays
  i = 0;
  j = middle;
  k = startIndex;
  while (i < len && j < endIndex) {
    if (tmp[i] <= array[j]) {
      // animate this move
      renderCounter.value++;
      console.log("renderCounter", renderCounter);
      animateMergeCompare(k, renderCounter.value);
      // renderCounter++;
      // animateMergeCompareEnd(k, k, i);
      renderCounter.value++;
      console.log("renderCounter", renderCounter);
      animateMerge(k, tmp[i], renderCounter.value);
      renderCounter.value++;
      console.log("renderCounter", renderCounter);
      animateMergeCompareEnd(k, renderCounter.value);

      array[k++] = tmp[i++];
      //console.log("from tmp[i]", i - 1, tmp[i - 1]);
      //console.log("to array[a]", k - 1, array[k - 1]);
      // renderCounter++;
      // animateSwap(k - 1, k - 1, renderCounter);
    } else {
      // animate this move
      renderCounter.value++;
      console.log("renderCounter", renderCounter);
      animateMergeCompare(k, renderCounter.value);
      renderCounter.value++;
      console.log("renderCounter", renderCounter);
      animateMerge(k, array[j], renderCounter.value);
      renderCounter.value++;
      console.log("renderCounter", renderCounter);
      animateMergeCompareEnd(k, renderCounter.value);
      array[k++] = array[j++];
      //console.log("from array[j]", j - 1, array[j - 1]);
      //console.log("to array[k]", k - 1, array[k - 1]);
      // renderCounter++;
      // animateSwap(k - 1, k - 1, renderCounter);
    }
  }
  // copy the remaining elements
  while (i < len) {
    // animate this move
    renderCounter.value++;
    console.log("renderCounter", renderCounter);
    animateMergeCompare(k, renderCounter.value);
    renderCounter.value++;
    console.log("renderCounter", renderCounter);
    animateMerge(k, tmp[i], renderCounter.value);
    renderCounter.value++;
    console.log("renderCounter", renderCounter);
    animateMergeCompareEnd(k, renderCounter.value);
    array[k++] = tmp[i++];
    // console.log("from tmp[i]", i - 1, tmp[i - 1]);
    // console.log(" to array[k]", k - 1, array[k - 1]);
    // renderCounter++;
    // animateSwap(k - 1, k - 1, renderCounter);
  }
  return array;
}

export const mergeSortAnimations = (
  array,
  startIndex,
  endIndex,
  renderCounter
) => {
  //console.log("RCV", renderCounter);
  //let  renderCounter=0;
  //let renderCounter = { value: 0 };
  if (endIndex - startIndex > 1) {
    //var m = lo + ((hi - lo) >> 1);
    let middle = Math.floor((startIndex + endIndex) / 2);
    //let middle = startIndex + ((endIndex - startIndex) >> 1);
    //console.log("startIndex, endIndex, middle", startIndex, endIndex, middle);
    mergeSortAnimations(array, startIndex, middle, renderCounter);
    //console.log("on to left call");
    //console.log("startIndex, endIndex, middle", startIndex, endIndex, middle);
    mergeSortAnimations(array, middle, endIndex, renderCounter);
    merge(array, startIndex, middle, endIndex, renderCounter);
  }
  return array;
};

function animateMerge(index1, value, renderCounter) {
  console.log("animateValue", index1, value, renderCounter);
  const arrayBars = document.getElementsByClassName("array-bar");
  const arrayValue = document.getElementsByClassName("array-value");
  setTimeout(() => {
    arrayValue[index1].innerHTML = value;
    arrayBars[index1].style.height = `${value}px`;
    //arrayBars[index1].style.backgroundColor = colors.secondary;
  }, renderCounter * constants.ANIMATION_SPEED_MS);
  // setTimeout(() => {
  //   console.log("value Before", arrayValue[index1].innerHTML);
  //   arrayValue[index1].innerHTML = value;
  //   console.log("value after", arrayValue[index1].innerHTML);
  //   arrayBars[index1].style.height = value;
  // }, renderCounter * constants.ANIMATION_SPEED_MS);
}
function animateMergeCompare(index1, i) {
  const arrayBars = document.getElementsByClassName("array-bar");
  setTimeout(() => {
    arrayBars[index1].style.backgroundColor = colors.secondary;
    //arrayBars[index2].style.backgroundColor = colors.secondary;
  }, i * constants.ANIMATION_SPEED_MS);
}
function animateMergeCompareEnd(index1, i) {
  const arrayBars = document.getElementsByClassName("array-bar");
  setTimeout(() => {
    arrayBars[index1].style.backgroundColor = colors.primary;
    //arrayBars[index2].style.backgroundColor = colors.primary;
  }, i * constants.ANIMATION_SPEED_MS);
}
