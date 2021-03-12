import React, { useState, useEffect } from "react";
import { getMergeSortAnimations } from "../components/sortingAlgorithms";
import { bubbleSortAnimations } from "../components/sortingAlgorithms";
import { selectionSortAnimations } from "../components/sortingAlgorithms";
import { insertionSortAnimations } from "../components/sortingAlgorithms";
import "./SortIt.css";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 42;

// This is the main color of the array bars.
const PRIMARY_COLOR = "turquoise";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "red";

const SortIt = () => {
  const [array, setArray] = useState([]);

  useEffect(() => {
    resetArray();
  }, []);

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const resetArray = () => {
    const bars = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      bars.push(randomIntFromInterval(5, 500));
    }
    setArray(bars);
    // setArray([500, 450, 400, 350, 300, 250, 200, 100]);
    // setArray([100, 200, 300, 400, 500]);
    //setArray([80, 20, 40, 10, 30]);
  };

  const bubbleSort = () => {
    const animations = bubbleSortAnimations(array);
  };
  const selectionSort = () => {
    const animations = selectionSortAnimations(array);
    console.log("selSort", animations);
  };
  const insertionSort = () => {
    const animations = insertionSortAnimations(array);
    console.log("insertion", animations);
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
      <div className="btn-block">
        <button className="btn" onClick={() => resetArray()}>
          Generate New Array
        </button>
        <button className="btn" onClick={() => this.mergeSort()}>
          Merge Sort
        </button>
        <button className="btn" onClick={() => insertionSort()}>
          Insertion Sort
        </button>
        <button className="btn" onClick={() => selectionSort()}>
          Selection Sort
        </button>
        <button className="btn" onClick={() => bubbleSort()}>
          Bubble Sort
        </button>
      </div>
    </div>
    // <div>
    //   <h1>Hello World</h1>
    // </div>
  );
};

export default SortIt;
