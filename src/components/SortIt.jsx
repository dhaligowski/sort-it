import React, { useState, useEffect } from "react";

//import { bubbleSortAnimations } from "../components/sortingAlgorithms";
import bubbleSortAnimations from "../sortingAlgorithms/bubbleSortAnimations";
//import { selectionSortAnimations } from "../components/sortingAlgorithms";
import selectionSortAnimations from "../sortingAlgorithms/selectionSortAnimations";
//import { insertionSortAnimations } from "../components/sortingAlgorithms";
import insertionSortAnimations from "../sortingAlgorithms/insertionSortAnimations";
//import { quickSortAnimations } from "../components/sortingAlgorithms";
//import { mergeSortAnimations } from "../components/sortingAlgorithms";
import mergeSortAnimations from "../sortingAlgorithms/mergeSortAnimations";
import quickSortAnimations from "../sortingAlgorithms/quickSortAnimations";
import colors from "../config/colors";
import constants from "../config/constants";
import "./SortIt.css";

// Inspired by project at https://github.com/clementmihailescu/Sorting-Visualizer-Tutorial

const SortIt = () => {
  const [array, setArray] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  //////////////incorporates response to changes in window width///////////
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    const bars = [];
    for (
      let i = 0;
      i <
      window.innerWidth / constants.NUMBER_OF_ARRAY_BARS -
        constants.OVERFLOW_BARS;
      i++
    ) {
      bars.push(
        randomIntFromInterval(constants.RANGE_BEGIN, constants.RANGE_END)
      );
    }
    setArray(bars);
  }, [windowWidth]);

  const resetArray = () => {
    const bars = [];
    for (
      let i = 0;
      i <
      window.innerWidth / constants.NUMBER_OF_ARRAY_BARS -
        constants.OVERFLOW_BARS;
      i++
    ) {
      bars.push(
        randomIntFromInterval(constants.RANGE_BEGIN, constants.RANGE_END)
      );
    }
    setArray(bars);
  };
  //////////////////////////////////////////////////////////////////////////

  /////////////// no window width response/////////////////////////
  // useEffect(() => {
  //   //resetArray();
  //   const bars = [];
  //   for (let i = 0; i < constants.NUMBER_OF_ARRAY_BARS; i++) {
  //     bars.push(randomIntFromInterval(1, 500));
  //   }
  //   setArray(bars);
  // }, []);

  // const resetArray = () => {
  //   const bars = [];
  //   for (let i = 0; i < constants.NUMBER_OF_ARRAY_BARS; i++) {
  //     bars.push(randomIntFromInterval(1, 500));
  //   }
  //   setArray(bars);
  // };
  ///////////////////////////////////////////////////////////////////////////////////////////

  // From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const refreshPage = () => {
    window.location.reload();
  };

  const bubbleSort = () => {
    const animations = bubbleSortAnimations(array);
    console.log("bubbleSort", animations);
  };
  const selectionSort = () => {
    const animations = selectionSortAnimations(array);
    console.log("selSort", animations);
  };
  const insertionSort = () => {
    const animations = insertionSortAnimations(array);
    console.log("insertion", animations);
  };

  const mergeSort = () => {
    let renderCounter = { value: 0 };

    const animations = mergeSortAnimations(
      array,
      0,
      array.length,
      renderCounter
    );

    console.log("merge", animations);
  };

  const quickSort = () => {
    let renderCounter = { value: 0 };
    const animations = quickSortAnimations(
      array,
      0,
      array.length - 1,
      renderCounter
    );
    console.log("quick", animations);
  };

  return (
    <div className="array-container">
      <div className="array-block">
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
      </div>
      <div className="btn-block">
        <button className="btn" onClick={() => refreshPage()}>
          Refresh Page
        </button>

        <button className="btn" onClick={() => resetArray()}>
          Generate New Array
        </button>

        <button className="btn" onClick={() => bubbleSort()}>
          Bubble Sort
        </button>

        <button className="btn" onClick={() => selectionSort()}>
          Selection Sort
        </button>

        <button className="btn" onClick={() => insertionSort()}>
          Insertion Sort
        </button>

        <button className="btn" onClick={() => mergeSort()}>
          Merge Sort
        </button>

        <button className="btn" onClick={() => quickSort()}>
          Quick Sort
        </button>
      </div>
    </div>

    // <div>
    //   <h1>Hello World</h1>
    // </div>
  );
};

export default SortIt;
