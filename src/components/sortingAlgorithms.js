import "./SortIt.css";
const ANIMATION_SPEED_MS = 3;

export function getBubbleSortAnimations(array) {
  // let isSorted = "";
  //let array = array2.slice(0);
  for (var i = 0; i < array.length; i++) {
    let isSorted = true;
    for (var j = 1; j < array.length - i; j++)
      if (array[j] < array[j - 1]) {
        swap(array, j, j - 1, i);

        isSorted = false;
      }
    //animateCompareComplete(j - 1, j);
    if (isSorted) return array;
  }
}

function swap(array, index1, index2, i) {
  //console.log("swap called");
  // const arrayBars = document.getElementsByClassName("array-bar");
  // const arrayValue = document.getElementsByClassName("array-value");
  // console.log("innerHTML", arrayValue[index1].innerHTML);
  ////////////////////////////////////////////////////
  var temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
  animateSwap(index1, index2, i);
  // console.log("arraybars[index[1]", arrayBars[index1]);
  // console.log("arrayValue", arrayValue);
  // console.log("i", i);
  //console.log("index1", index1);
  // console.log("i*animationspeed", i * ANIMATION_SPEED_MS);
  //////////////////////////////////////////////
  // setTimeout(() => {
  //   const tempArrayValue = arrayValue[index1].innerHTML;
  //   arrayValue[index1].innerHTML = arrayValue[index2].innerHTML;
  //   arrayValue[index2].innerHTML = tempArrayValue;
  //   const barOneStyle = arrayBars[index1].style;
  //   const barTwoStyle = arrayBars[index2].style;

  //   const tempStyle = barOneStyle.height;
  //   //barOneStyle.backgroundColor = "red";

  //   barOneStyle.height = barTwoStyle.height;
  //   barTwoStyle.height = tempStyle;
  // }, i * ANIMATION_SPEED_MS);
  // }, ANIMATION_SPEED_MS);

  //}
}

function animateCompare(index1, index2, i) {
  const arrayBars = document.getElementsByClassName("array-bar");

  arrayBars[index1].style.backgroundColor = "red";
  arrayBars[index2].style.backgroundColor = "red";
}

function animateCompareComplete(index1, index2, i) {
  const arrayBars = document.getElementsByClassName("array-bar");

  arrayBars[index1].style.backgroundColor = "turquiose";
  arrayBars[index2].style.backgroundColor = "turquiose";
}

function animateSwap(index1, index2, i) {
  const arrayBars = document.getElementsByClassName("array-bar");
  const arrayValue = document.getElementsByClassName("array-value");
  //arrayBars[index1].style.backgroundColor = "red";
  //arrayBars[index2].style.backgroundColor = "red";
  //console.log("BackColor", arrayBars[index1].style.backgroundColor);
  setTimeout(() => {
    const tempArrayValue = arrayValue[index1].innerHTML;
    arrayValue[index1].innerHTML = arrayValue[index2].innerHTML;
    arrayValue[index2].innerHTML = tempArrayValue;

    const barOneStyle = arrayBars[index1].style;
    const barTwoStyle = arrayBars[index2].style;
    // barOneStyle.backgroundColor = "red";
    //barTwoStyle.backgroundColor = "red";

    const tempStyle = barOneStyle.height;
    //barOneStyle.backgroundColor = "red";

    barOneStyle.height = barTwoStyle.height;
    barTwoStyle.height = tempStyle;
    // barOneStyle.backgroundColor = "turquoise";
    // barTwoStyle.backgroundColor = "turquoise";
    // arrayBars[index1].style.backgroundColor = "turquoise";
    //arrayBars[index2].style.backgroundColor = "turquoise";
  }, i * ANIMATION_SPEED_MS);
}

// export function getBubbleSortAnimations(inputArr) {
//   console.log("in bubble sortAlgo");
//   //const len = inputArr.length;
//   for (let i = 0; i < len; i++) {
//     for (let j = 1; j < len; j++) {
//       if (inputArr[j] > inputArr[j - 1]) {
//         let tmp = inputArr[j];
//         inputArr[j] = inputArr[j + 1];
//         inputArr[j + 1] = tmp;
//       }
//     }
//   }
//   return inputArr;
// }

export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}
function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
