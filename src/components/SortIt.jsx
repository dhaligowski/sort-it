import React, { useState, useEffect } from "react";
import { bubbleSortAnimations } from "../components/sortingAlgorithms";
import { selectionSortAnimations } from "../components/sortingAlgorithms";
import { insertionSortAnimations } from "../components/sortingAlgorithms";
import { quickSortAnimations } from "../components/sortingAlgorithms";
import { mergeSortAnimations } from "../components/sortingAlgorithms";
import colors from "../config/colors";
import constants from "../config/constants";
import "./SortIt.css";

// Inspired by project at https://github.com/clementmihailescu/Sorting-Visualizer-Tutorial

const SortIt = () => {
  const [array, setArray] = useState([]);

  useEffect(() => {
    resetArray();
  }, []);

  // From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const refreshPage = () => {
    window.location.reload();
  };

  const resetArray = () => {
    const bars = [];
    for (let i = 0; i < constants.NUMBER_OF_ARRAY_BARS; i++) {
      bars.push(randomIntFromInterval(1, 500));
    }
    setArray(bars);
    //setArray([500, 400, 350, 300, 250, 200, 100]);
    //setArray([100, 50, 300, 400, 500]);
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
  const quickSort = () => {
    const animations = quickSortAnimations(array, 0, array.length - 1);
    console.log("quick", animations);
  };
  // const mergeSort = () => {
  //   const animations = mergeSortAnimations(array);
  //   console.log("merge", animations);
  // };
  // const mergeSort2 = () => {
  //   let mid = Math.floor(array.length / 2);
  //   let originalArray = array.slice(0);
  //   const animations = mergeSortAnimations2(array, originalArray, 1, 5);

  //   console.log("merge2", animations);
  //   // console.log("OG array", originalArray);
  // };
  const mergeSort = () => {
    //let renderCounter = 0;
    let renderCounter = { value: 0 };

    let mid = Math.floor(array.length / 2);
    let originalArray = array.slice(0);
    const animations = mergeSortAnimations(
      array,
      0,
      array.length,
      renderCounter
    );

    console.log("merge", animations);
    // console.log("OG array", originalArray);
  };

  return (
    <div className="array-container">
      {array.map((value, idx) => (
        <div
          className="array-bar"
          key={idx}
          style={{
            backgroundColor: colors.primary,
            height: `${value}px`,
          }}
        >
          <h5 className="array-value">{value}</h5>
        </div>
      ))}

      <div className="btn-block">
        <button className="btn" onClick={() => refreshPage()}>
          Refresh Page
        </button>
        <button className="btn" onClick={() => resetArray()}>
          Generate New Array
        </button>
        {/* <button className="btn" onClick={() => quickSort()}>
          Quick Sort
        </button> */}
        <button className="btn" onClick={() => insertionSort()}>
          Insertion Sort
        </button>
        <button className="btn" onClick={() => selectionSort()}>
          Selection Sort
        </button>
        <button className="btn" onClick={() => bubbleSort()}>
          Bubble Sort
        </button>
        {/* <button className="btn" onClick={() => mergeSort()}>
          Merge Sort
        </button>
        <button className="btn" onClick={() => mergeSort2()}>
          Merge Sort2
        </button> */}
        <button className="btn" onClick={() => mergeSort()}>
          Merge Sort
        </button>
      </div>
    </div>
    // <div>
    //   <h1>Hello World</h1>
    // </div>
  );
};

export default SortIt;
