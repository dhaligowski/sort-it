import React, { useState, useEffect } from "react";
import { getMergeSortAnimations } from "../components/sortingAlgorithms";
import { getBubbleSortAnimations } from "../components/sortingAlgorithms";
import "./SortIt.css";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 45;

// This is the main color of the array bars.
const PRIMARY_COLOR = "turquoise";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "red";

const SortIt = () => {
  const [array, setArray] = useState([]);

  useEffect(() => {
    resetArray();
    //console.log("array", array);
  }, []);

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const resetArray = () => {
    const bars = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      bars.push(randomIntFromInterval(5, 650));
    }
    setArray(bars);
    //setArray([500, 400, 300, 200, 100]);
  };

  const bubbleSort = () => {
    // console.log("in bubble main");
    // console.log("Array", array);
    //const sortedArray = getBubbleSortAnimations(array);
    // console.log("sorted array", sortedArray);

    console.log("Array", array);
    const animations = getBubbleSortAnimations(array);
    console.log("animations", animations);
    console.log("Array", array);
    // for (let i = 0; i < animations.length; i++) {
    //   const arrayBars = document.getElementsByClassName("array-bar");
    //   const isColorChange = i % 3 !== 2;

    //}
    //   const isColorChange = i % 3 !== 2;
    //   if (isColorChange) {
    //     console.log("Animations[i]", animations[i]);
    //     const [barOneIdx, barTwoIdx] = animations[i];

    //     const barOneStyle = arrayBars[barOneIdx].style;
    //     const barTwoStyle = arrayBars[barTwoIdx].style;
    //     const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
    //     setTimeout(() => {
    //       barOneStyle.backgroundColor = color;
    //       barTwoStyle.backgroundColor = color;
    //     }, i * ANIMATION_SPEED_MS);
    //   } else {
    //     setTimeout(() => {
    //       const [barOneIdx, newHeight] = animations[i];
    //       const barOneStyle = arrayBars[barOneIdx].style;
    //       barOneStyle.height = `${newHeight}px`;
    //     }, i * ANIMATION_SPEED_MS);
    //   }
    // }
  };

  return (
    <div className="array-container">
      {array.map((value, idx) => (
        <div
          className="array-bar"
          key={idx}
          style={{
            backgroundColor: PRIMARY_COLOR,
            height: `${value}px`,
          }}
        >
          <h4 className="array-value">{value}</h4>
        </div>
      ))}
      <button onClick={() => resetArray()}>Generate New Array</button>
      <button onClick={() => this.mergeSort()}>Merge Sort</button>
      <button onClick={() => this.quickSort()}>Quick Sort</button>
      <button onClick={() => this.heapSort()}>Heap Sort</button>
      <button onClick={() => bubbleSort()}>Bubble Sort</button>
      <button onClick={() => this.testSortingAlgorithms()}>
        Test Sorting Algorithms (BROKEN)
      </button>
    </div>
    // <div>
    //   <h1>Hello World</h1>
    // </div>
  );
};

export default SortIt;
