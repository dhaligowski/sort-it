/////////////// no window width response/////////////////////////
useEffect(() => {
  //resetArray();
  const bars = [];
  for (let i = 0; i < constants.NUMBER_OF_ARRAY_BARS; i++) {
    bars.push(randomIntFromInterval(1, 500));
  }
  setArray(bars);
}, []);

const resetArray = () => {
  const bars = [];
  for (let i = 0; i < constants.NUMBER_OF_ARRAY_BARS; i++) {
    bars.push(randomIntFromInterval(1, 500));
  }
  setArray(bars);
};
///////////////////////////////////////////////////////////////////////////////////////////
