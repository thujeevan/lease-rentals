import dayjs from "dayjs";
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(isSameOrBefore).extend(advancedFormat);

const dayMap = {
    'sunday': 0,
    'monday': 1,
    'tuesday': 2,
    'wednesday': 3,
    'thursday': 4,
    'friday': 5,
    'saturday': 6,
};

export const byWeek = (startDate, endDate, paymentDay, weeks, initial) => {
    const maxTermDays = weeks * 7;
    // first check end diff and bail out early
    const endDiff = endDate.diff(startDate, 'd');
    if (endDiff < maxTermDays) return endDiff + 1;

    // if it's not the initial term, number of days * weeks
    if (!initial) return maxTermDays;

    // if it's initial, let's find the next payment date
    let next = startDate.startOf('M').add(weeks, 'w');
    while(next.isSameOrBefore(startDate)) {
        next = next.add(weeks, 'w');
    }

    const diff = next.day(dayMap[paymentDay]).diff(startDate, 'd');

    // diff will be 0 if the start day is equal to the payment day
    if (!diff) return maxTermDays;

    // bubbled up to the next week(month starting on a sunday), deduct one
    return diff > maxTermDays ? diff - 7 : diff;
}

export const weekly = (startDate, endDate, paymentDay, initial = false) => {
    return byWeek(startDate, endDate, paymentDay, 1, initial);
}

export const fortnightly = (startDate, endDate, paymentDay, initial = false) => {
    return byWeek(startDate, endDate, paymentDay, 2, initial);
}

export const monthly = (startDate, endDate, paymentDay, initial = false) => {
    return byWeek(startDate, endDate, paymentDay, 4, initial);
}

const fnMap = {
    'weekly': weekly,
    'fortnightly': fortnightly,
    'monthly': monthly,
}

export const daysToAdd = (startDate, endDate, paymentDay, frequency, initial = false) => {
    return fnMap[frequency](startDate, endDate, paymentDay, initial);
}

export const generateBreakdown = (data) => {
    if (!data) return [];

    const {
        start_date,
        end_date,
        frequency,
        payment_day,
        rent
    } = data;
    const dayRate = rent / 7;
    let startDate = dayjs(start_date);
    const endDate = dayjs(end_date);

    const breakdown = [];
    let initial = true;
    while(startDate.isSameOrBefore(endDate)) {
        const toAdd = daysToAdd(startDate, endDate, payment_day, frequency, initial);
        breakdown.push({
            from: startDate.format('MMMM, Do YYYY'),
            to: startDate.add(toAdd - 1, 'd').format('MMMM, Do YYYY'),
            days: toAdd,
            amount: (toAdd * dayRate).toFixed(1)
        });
        initial = false;
        startDate = startDate.add(toAdd, 'd');
    }

    return breakdown;
}

