import "./SortIt.css";
const ANIMATION_SPEED_MS = 70;

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
    arrayBars[index1].style.backgroundColor = "red";
    arrayBars[index2].style.backgroundColor = "red";
  }, i * ANIMATION_SPEED_MS);
}
function animateCompareEnd(index1, index2, i) {
  const arrayBars = document.getElementsByClassName("array-bar");
  setTimeout(() => {
    arrayBars[index1].style.backgroundColor = "turquoise";
    arrayBars[index2].style.backgroundColor = "turquoise";
  }, i * ANIMATION_SPEED_MS);
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

    arrayBars[index1].style.backgroundColor = "turquoise";
  }, i * ANIMATION_SPEED_MS);
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
    //   renderCounter++;
    //   animateCompareEnd(minIndex, i, renderCounter);
  }
  return array;
};
export const insertionSortAnimations = (array) => {
  let renderCounter = 0;
  for (let i = 1; i < array.length; i++) {
    renderCounter++;
    animateCompare(i - 1, i, renderCounter);

    let current = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > current) {
      renderCounter++;
      animateCompare(j, j + 1, renderCounter);

      array[j + 1] = array[j]; //shift up greater value
      renderCounter++;
      animateShift(j, j + 1, renderCounter);
      renderCounter++;
      animateCompareEnd(j, j + 1, renderCounter);
      j = j - 1; //decrement j to see if < or at zero
    }
    array[j + 1] = current; //save current in new home
    renderCounter++;
    animateShiftCurrent(j + 1, current, renderCounter);
    //animateCompareEnd(j + 1, current, renderCounter);
  }
  return array;
};

function animateShiftCurrent(index1, current, i) {
  const arrayBars = document.getElementsByClassName("array-bar");
  const arrayValue = document.getElementsByClassName("array-value");

  setTimeout(() => {
    arrayValue[index1].innerHTML = current;
    arrayBars[index1].style.height = `${current}px`; //
    arrayBars[index1].style.backgroundColor = "turquoise";
  }, i * ANIMATION_SPEED_MS);
}

function animateShift(index1, index2, i) {
  const arrayBars = document.getElementsByClassName("array-bar");
  const arrayValue = document.getElementsByClassName("array-value");
  setTimeout(() => {
    arrayValue[index2].innerHTML = arrayValue[index1].innerHTML;
    arrayBars[index2].style.height = arrayBars[index1].style.height;
  }, i * ANIMATION_SPEED_MS);
}

export const mergeSortAnimations = (array) => {
  let len = array.length;
  if (len < 2) {
    return array;
  }
  let mid = Math.floor(len / 2),
    left = array.slice(0, mid),
    right = array.slice(mid);
  return merge(mergeSortAnimations(left), mergeSortAnimations(right));
};

let merge = (left, right) => {
  let renderCounter = 0;
  let result = [],
    leftLen = left.length,
    rightLen = right.length,
    l = 0,
    r = 0;
  while (l < leftLen && r < rightLen) {
    // renderCounter++;
    // animateCompare(l, r, renderCounter);
    if (left[l] < right[r]) {
      //console.log("left less");
      // renderCounter++;
      // animateCompare(l, r, renderCounter);
      result.push(left[l]);
      // renderCounter++;
      // animateCompareEnd(l, r, renderCounter);
      l++;
    } else {
      // console.log("right less");
      // renderCounter++;
      // animateCompare(l, r, renderCounter);
      result.push(right[r]);
      // renderCounter++;
      // animateCompareEnd(l, r, renderCounter);
      r++;
    }
  }
  // console.log("left.slice", left.slice(l));
  // console.log("right.slice", right.slice(r));
  return result.concat(left.slice(l)).concat(right.slice(r));
};
// let merge = (left, right) => {
//   let renderCounter = 0;
//   let result = [],
//     leftLen = left.length,
//     rightLen = right.length,
//     l = 0,
//     r = 0;
//   while (l < leftLen && r < rightLen) {
//     if (left[l] < right[r]) {
//       //console.log("left less");
//       // renderCounter++;
//       //animateCompare(l, r, renderCounter);
//       result.push(left[l]);
//       //renderCounter++;
//       //animateCompareEnd(l, r, renderCounter);
//       l++;
//     } else {
//       //console.log("right less");
//       //renderCounter++;
//       //animateCompare(l, r, renderCounter);
//       result.push(right[r]);
//       //  renderCounter++;
//       //animateCompareEnd(l, r, renderCounter);
//       // r++;
//     }
//   }
//   // console.log("left.slice", left.slice(l));
//   // console.log("right.slice", right.slice(r));
//   return result.concat(left.slice(l)).concat(right.slice(r));
// };

// export function getMergeSortAnimations(array) {
//   const animations = [];
//   if (array.length <= 1) return array;
//   const auxiliaryArray = array.slice();
//   mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
//   return animations;
// }
// function mergeSortHelper(
//   mainArray,
//   startIdx,
//   endIdx,
//   auxiliaryArray,
//   animations
// ) {
//   if (startIdx === endIdx) return;
//   const middleIdx = Math.floor((startIdx + endIdx) / 2);
//   mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
//   mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
//   doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
// }

// function doMerge(
//   mainArray,
//   startIdx,
//   middleIdx,
//   endIdx,
//   auxiliaryArray,
//   animations
// ) {
//   let k = startIdx;
//   let i = startIdx;
//   let j = middleIdx + 1;
//   while (i <= middleIdx && j <= endIdx) {
//     // These are the values that we're comparing; we push them once
//     // to change their color.
//     animations.push([i, j]);
//     // These are the values that we're comparing; we push them a second
//     // time to revert their color.
//     animations.push([i, j]);
//     if (auxiliaryArray[i] <= auxiliaryArray[j]) {
//       // We overwrite the value at index k in the original array with the
//       // value at index i in the auxiliary array.
//       animations.push([k, auxiliaryArray[i]]);
//       mainArray[k++] = auxiliaryArray[i++];
//     } else {
//       // We overwrite the value at index k in the original array with the
//       // value at index j in the auxiliary array.
//       animations.push([k, auxiliaryArray[j]]);
//       mainArray[k++] = auxiliaryArray[j++];
//     }
//   }
//   while (i <= middleIdx) {
//     // These are the values that we're comparing; we push them once
//     // to change their color.
//     animations.push([i, i]);
//     // These are the values that we're comparing; we push them a second
//     // time to revert their color.
//     animations.push([i, i]);
//     // We overwrite the value at index k in the original array with the
//     // value at index i in the auxiliary array.
//     animations.push([k, auxiliaryArray[i]]);
//     mainArray[k++] = auxiliaryArray[i++];
//   }
//   while (j <= endIdx) {
//     // These are the values that we're comparing; we push them once
//     // to change their color.
//     animations.push([j, j]);
//     // These are the values that we're comparing; we push them a second
//     // time to revert their color.
//     animations.push([j, j]);
//     // We overwrite the value at index k in the original array with the
//     // value at index j in the auxiliary array.
//     animations.push([k, auxiliaryArray[j]]);
//     mainArray[k++] = auxiliaryArray[j++];
//   }
// }
// function animateCompare(index1, index2, i) {
//   console.log("in animate.compare");
//   const arrayBars = document.getElementsByClassName("array-bar");

//   arrayBars[index1].style.backgroundColor = "red";
//   arrayBars[index2].style.backgroundColor = "red";
// }

// function animateCompareComplete(index1, index2, i) {
//   const arrayBars = document.getElementsByClassName("array-bar");

//   arrayBars[index1].style.backgroundColor = "turquoise";
//   arrayBars[index2].style.backgroundColor = "turquoise";
// }
