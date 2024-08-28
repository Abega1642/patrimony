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

export async function patrimonyRangeValues(startDate, endDate, day) {
    var beginDate = new Date(startDate);
    var endingDate = new Date(endDate)
    day = Number.parseInt(day)

    const result = []
    const datesIntervals = getDatesBetween(beginDate, endingDate, day);

    for (let i = 0; i < datesIntervals.length; i++) {
        let value = await getPatrimonyValueByDate(new Date(datesIntervals[i]));
        
       result.push(value);
    }
    return {
      "patrimony_values" : result
    }
}




  