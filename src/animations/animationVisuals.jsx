import colors from "../config/colors";
import constants from "../config/constants";

export function animateCompare(index1, index2, renderCounter) {
  renderCounter.value++;
  const arrayBars = document.getElementsByClassName("array-bar");
  setTimeout(() => {
    arrayBars[index1].style.backgroundColor = colors.secondary;
    arrayBars[index2].style.backgroundColor = colors.secondary;
  }, renderCounter.value * constants.ANIMATION_SPEED_MS);
}

export function animateCompareEnd(index1, index2, renderCounter) {
  renderCounter.value++;
  const arrayBars = document.getElementsByClassName("array-bar");
  setTimeout(() => {
    arrayBars[index1].style.backgroundColor = colors.primary;
    arrayBars[index2].style.backgroundColor = colors.primary;
  }, renderCounter.value * constants.ANIMATION_SPEED_MS);
}

export function swap(array, index1, index2, i) {
  var temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

export function animateSwap(index1, index2, renderCounter) {
  renderCounter.value++;
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
  }, renderCounter.value * constants.ANIMATION_SPEED_MS);
}

export function animateShiftCurrent(index1, current, renderCounter) {
  renderCounter.value++;
  const arrayBars = document.getElementsByClassName("array-bar");
  const arrayValue = document.getElementsByClassName("array-value");

  setTimeout(() => {
    arrayValue[index1].innerHTML = current;
    arrayBars[index1].style.height = `${current}px`;
    arrayBars[index1].style.backgroundColor = colors.primary;
  }, renderCounter.value * constants.ANIMATION_SPEED_MS);
}

export function animateShift(index1, index2, renderCounter) {
  renderCounter.value++;
  const arrayBars = document.getElementsByClassName("array-bar");
  const arrayValue = document.getElementsByClassName("array-value");
  setTimeout(() => {
    arrayValue[index2].innerHTML = arrayValue[index1].innerHTML;
    arrayBars[index2].style.height = arrayBars[index1].style.height;
  }, renderCounter.value * constants.ANIMATION_SPEED_MS);
}

export function animatePivot(index1, index2, i) {
  const arrayBars = document.getElementsByClassName("array-bar");
  setTimeout(() => {
    arrayBars[index1].style.backgroundColor = colors.pivot;
    arrayBars[index2].style.backgroundColor = colors.pivot;
  }, i * constants.ANIMATION_SPEED_MS);
}

export function animateMerge(index1, value, renderCounter) {
  console.log("animateValue", index1, value, renderCounter);
  const arrayBars = document.getElementsByClassName("array-bar");
  const arrayValue = document.getElementsByClassName("array-value");
  setTimeout(() => {
    arrayValue[index1].innerHTML = value;
    arrayBars[index1].style.height = `${value}px`;
  }, renderCounter * constants.ANIMATION_SPEED_MS);
}

export function animateMergeCompare(index1, i) {
  const arrayBars = document.getElementsByClassName("array-bar");
  setTimeout(() => {
    arrayBars[index1].style.backgroundColor = colors.secondary;
  }, i * constants.ANIMATION_SPEED_MS);
}

export function animateMergeCompareEnd(index1, i) {
  const arrayBars = document.getElementsByClassName("array-bar");
  setTimeout(() => {
    arrayBars[index1].style.backgroundColor = colors.primary;
  }, i * constants.ANIMATION_SPEED_MS);
}
