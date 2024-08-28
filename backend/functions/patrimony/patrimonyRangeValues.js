import { getPatrimonyValueByDate } from "./patrimonyValue.js";

function getDatesBetween(start, end, day) {
    start = new Date(start);
    end = new Date(end);
    day = Number.parseInt(day);
    const intervals = [];
    const currentDate = new Date(start);

    if (currentDate.getDate() > day) {
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  
    while (currentDate <= end) {
      currentDate.setDate(day);

      if (currentDate <= end) {
        intervals.push(new Date(currentDate));
      }

      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  
    return intervals;
}
async function push(array, element) {
  return await array.push(element)
}

export async function patrimonyRangeValues(start, end, day) {
    const result = []
    const datesIntervals = getDatesBetween(start, end, day);

    for (let i = 0; i < datesIntervals.length; i++) {
        let value = await getPatrimonyValueByDate(new Date(datesIntervals[i]));
        push(result, value)
    }
    return result
}


const start = new Date("2024-08-27");
const end = new Date("2024-11-01");
const day = 11;
patrimonyRangeValues(start, end, day).then(a => console.log(a))




  