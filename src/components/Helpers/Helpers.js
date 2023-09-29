import { sketches } from "../../sketches/Sketches";
const homeSketch = sketches[0];

export function getRandomNum(val) {
  var x = Math.sin(val) * 10000;
  return x - Math.floor(x);
}

// index 2 goes to top
// 3 , 2, 1, 0
//-> 2, 1, 3, 0
export function getNewZIndices(indexToTop, array) {
  let prevVal = array[indexToTop];
  let maxVal = 0;
  let newArr = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] > maxVal) maxVal = array[i];
    if (array[i] > prevVal) newArr[i] = array[i]-1;
    else newArr[i] = array[i];
  }
  newArr[indexToTop] = maxVal;
  return newArr;
}

export function mapVal(val, in_min, in_max, out_min, out_max) {
  return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

export function constrain(val, min, max) {
  if (val < min)
    return min;
  else if (val > max)
    return max;
  return val;
}

export function randomInRange(start, end) {
  let diff = end-start;
  return Math.random()*diff+start;
}

export const getUrl = (short) => {
  let sk = sketches.find((sketch) => sketch.short === short);
  return "/" + sk.link;
}

export const getRoomTitle = (path) => {
  const link = path.substring(1, path.length);
  if (link === "")
      return homeSketch.title;
  else if (link === "about")
      return "about";

  let sk = sketches.find((sketch) => sketch.link === link);
  if (!sk)
      return ""
  return sk.title;
}

export const getSketchFromTitle = (title) => {
  if (title === "")
      return homeSketch;
  return sketches.find((sketch) => sketch.title === title);
}