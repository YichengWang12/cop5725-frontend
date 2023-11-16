

export const months = [
    { index: 1, label: 'January', days: 31 },
    { index: 2, label: 'February', days: 28 },
    { index: 3, label: 'March', days: 31 },
    { index: 4, label: 'April', days: 30 },
    { index: 5,label: 'May', days: 31 },
    { index: 6,label: 'June', days: 30 },
    { index: 7,label: 'July', days: 31 },
    { index: 8,label: 'August', days: 31 },
    { index: 9,label: 'September', days: 30 },
    { index: 10,label: 'October', days: 31 },
    { index: 11,label: 'November', days: 30 },
    { index: 12,label: 'December', days: 31 },
];
export const checkDate = (year:string,month: string, day: string) => {
    const monthIndex = Number(month);
    const dayIndex = Number(day);
    let daysInMonth = months[monthIndex - 1].days;
    //如果是二月，确定是否为闰年来决定天数
    if (monthIndex === 2 && isLeapYear(year)) {
        daysInMonth = 29;
    }
    if (dayIndex > daysInMonth) {
        return daysInMonth.toString();
    }else{
        return day;
    }
}
export const isLeapYear = (year: number|string) => {
    if(typeof year === 'string'){
        year = Number(year);
    }
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
};