import dayjs from 'dayjs';
import {weekly, fortnightly, monthly, daysToAdd, generateBreakdown} from './lease';

describe('weekly', () => {
    it('should correctly calculate for the first payment: case 1', () => {
        const toAdd = weekly(dayjs('2018-08-05'), dayjs('2018-08-31'), 'tuesday', true);
        expect(toAdd).toEqual(2);
    });
    
    it('should correctly calculate for the first payment: case 2', () => {
        const toAdd = weekly(dayjs('2018-08-07'), dayjs('2018-08-31'), 'tuesday', true);
        expect(toAdd).toEqual(7);
    });

    it('should correctly calculate for the first payment: case 3', () => {
        const toAdd = weekly(dayjs('2018-08-14'), dayjs('2018-08-31'), 'tuesday');
        expect(toAdd).toEqual(7);
    });

    it('should correctly calculate for the first payment: case 4', () => {
        const toAdd = weekly(dayjs('2018-08-07'), dayjs('2018-08-31'), 'tuesday');
        expect(toAdd).toEqual(7);
    });
    
    it('should correctly calculate for the first payment: case 5', () => {
        const toAdd = weekly(dayjs('2018-08-08'), dayjs('2018-08-31'), 'tuesday', true);
        expect(toAdd).toEqual(6);
    });

    it('should correctly calculate for the last payment: case 1', () => {
        const toAdd = weekly(dayjs('2018-08-28'), dayjs('2018-08-31'), 'tuesday');
        expect(toAdd).toEqual(4);
    });
    
    it('should correctly calculate for the last payment: case 2', () => {
        const toAdd = weekly(dayjs('2018-08-26'), dayjs('2018-08-31'), 'tuesday');
        expect(toAdd).toEqual(6);
    });
    
    it('should correctly calculate for the last payment: case 3', () => {
        const toAdd = weekly(dayjs('2018-08-30'), dayjs('2018-08-31'), 'tuesday');
        expect(toAdd).toEqual(2);
    });
});

describe('fortnightly', () => {
    it('should correctly calculate for the first payment: case 1', () => {
        const toAdd = fortnightly(dayjs('2018-08-05'), dayjs('2018-12-28'), 'tuesday', true);
        expect(toAdd).toEqual(9);
    });
    
    it('should correctly calculate for the first payment: case 2', () => {
        const toAdd = fortnightly(dayjs('2018-08-07'), dayjs('2018-12-01'), 'tuesday', true);
        expect(toAdd).toEqual(7);
    });

    it('should correctly calculate for the first payment: case 3', () => {
        const toAdd = fortnightly(dayjs('2018-08-08'), dayjs('2018-12-01'), 'tuesday', true);
        expect(toAdd).toEqual(6);
    });

    it('should correctly calculate for the first payment: case 4', () => {
        const toAdd = fortnightly(dayjs('2018-08-14'), dayjs('2018-12-01'), 'tuesday');
        expect(toAdd).toEqual(14);
    });
    
    it('should correctly calculate for the first payment: case 5', () => {
        const toAdd = fortnightly(dayjs('2018-08-21'), dayjs('2018-12-01'), 'tuesday', true);
        expect(toAdd).toEqual(7);
    });
    
    it('should correctly calculate for the first payment: case 6', () => {
        const toAdd = fortnightly(dayjs('2018-08-01'), dayjs('2018-12-01'), 'tuesday', true);
        expect(toAdd).toEqual(13);
    });

    it('should correctly calculate for the first payment: case 7', () => {
        const toAdd = fortnightly(dayjs('2018-08-07'), dayjs('2018-12-01'), 'tuesday', true);
        expect(toAdd).toEqual(7);
    });
    
    it('should correctly calculate for the first payment: case 8', () => {
        const toAdd = fortnightly(dayjs('2018-07-01'), dayjs('2018-12-01'), 'wednesday', true);
        expect(toAdd).toEqual(10);
    });
    
    it('should correctly calculate for the first payment: case 9', () => {
        const toAdd = fortnightly(dayjs('2018-07-15'), dayjs('2018-12-01'), 'wednesday', true);
        expect(toAdd).toEqual(10);
    });
    
    it('should correctly calculate for the first payment: case 10', () => {
        const toAdd = fortnightly(dayjs('2018-07-31'), dayjs('2018-12-01'), 'wednesday', true);
        expect(toAdd).toEqual(8);
    });
    
    it('should correctly calculate for the last payment: case 1', () => {
        const toAdd = fortnightly(dayjs('2018-12-18'), dayjs('2018-12-28'), 'tuesday');
        expect(toAdd).toEqual(11);
    });

    it('should correctly calculate for the last payment: case 2', () => {
        const toAdd = fortnightly(dayjs('2018-11-28'), dayjs('2018-12-01'), 'wednesday');
        expect(toAdd).toEqual(4);
    });
});

describe('monthly', () => {
    it('should correctly calculate for the first payment: case 1', () => {
        const toAdd = monthly(dayjs('2018-08-05'), dayjs('2018-12-28'), 'tuesday', true);
        expect(toAdd).toEqual(23);
    });
    
    it('should correctly calculate for the first payment: case 2', () => {
        const toAdd = monthly(dayjs('2018-08-07'), dayjs('2018-12-01'), 'tuesday', true);
        expect(toAdd).toEqual(21);
    });

    it('should correctly calculate for the first payment: case 3', () => {
        const toAdd = monthly(dayjs('2018-08-08'), dayjs('2018-12-01'), 'tuesday', true);
        expect(toAdd).toEqual(20);
    });

    it('should correctly calculate for the first payment: case 4', () => {
        const toAdd = monthly(dayjs('2018-08-07'), dayjs('2018-12-01'), 'tuesday', true);
        expect(toAdd).toEqual(21);
    });

    it('should correctly calculate for the first payment: case 5', () => {
        const toAdd = monthly(dayjs('2018-08-28'), dayjs('2018-12-01'), 'tuesday');
        expect(toAdd).toEqual(28);
    });
    
    it('should correctly calculate for the first payment: case 6', () => {
        const toAdd = monthly(dayjs('2018-02-15'), dayjs('2018-12-01'), 'friday', true);
        expect(toAdd).toEqual(15);
    });
    
    it('should correctly calculate for the last payment: case 1', () => {
        const toAdd = monthly(dayjs('2018-08-18'), dayjs('2018-08-31'), 'tuesday');
        expect(toAdd).toEqual(14);
    });

    it('should correctly calculate for the last payment: case 2', () => {
        const toAdd = monthly(dayjs('2018-08-28'), dayjs('2018-08-31'), 'wednesday');
        expect(toAdd).toEqual(4);
    });
});

describe('daysToAdd', () => {
    it('should call correct method for each frequency', () => {
        let toAdd = daysToAdd(dayjs('2018-08-05'), dayjs('2018-08-31'), 'tuesday', 'weekly', true);
        expect(toAdd).toEqual(2);
        toAdd = daysToAdd(dayjs('2018-08-07'), dayjs('2018-08-31'), 'tuesday', 'weekly');
        expect(toAdd).toEqual(7);
        toAdd = daysToAdd(dayjs('2018-08-05'), dayjs('2018-08-31'), 'tuesday', 'fortnightly', true);
        expect(toAdd).toEqual(9);
        toAdd = daysToAdd(dayjs('2018-08-14'), dayjs('2018-08-31'), 'tuesday', 'fortnightly');
        expect(toAdd).toEqual(14);
        toAdd = daysToAdd(dayjs('2018-08-05'), dayjs('2018-12-31'), 'tuesday', 'monthly', true);
        expect(toAdd).toEqual(23);
        toAdd = daysToAdd(dayjs('2018-08-28'), dayjs('2018-12-31'), 'tuesday', 'monthly');
        expect(toAdd).toEqual(28);
    })
});

describe('generateBreakdown', () => {
    it('should return empty array if the data is empty', () => {
        const breakdown = generateBreakdown();
        expect(breakdown.length).toEqual(0);
    });

    it('should provide correct weekly breakdown: case 1', () => {
        const breakdown = generateBreakdown({
            start_date: '2018-05-01',
            end_date: '2018-05-31',
            frequency: 'weekly',
            payment_day: 'tuesday',
            rent: 510
        });

        expect(breakdown.length).toEqual(5);
        const [first, second, ...rest] = breakdown;
        const [last] = rest.reverse();
        expect(first).toEqual({ from: 'May, 1st 2018', to: 'May, 7th 2018', days: 7, amount: '510.0' });
        expect(second).toEqual({ from: 'May, 8th 2018', to: 'May, 14th 2018', days: 7, amount: '510.0' });
        expect(last).toEqual({ from: 'May, 29th 2018', to: 'May, 31st 2018', days: 3, amount: '218.6' });
    });

    it('should provide correct weekly breakdown: case 2', () => {
        const breakdown = generateBreakdown({
            start_date: '2018-08-05',
            end_date: '2018-12-28',
            frequency: 'weekly',
            payment_day: 'tuesday',
            rent: 510
        });

        expect(breakdown.length).toEqual(22);
        const [first, second, ...rest] = breakdown;
        const [last] = rest.reverse();
        expect(first).toEqual({ from: 'August, 5th 2018', to: 'August, 6th 2018', days: 2, amount: '145.7' });
        expect(second).toEqual({ from: 'August, 7th 2018', to: 'August, 13th 2018', days: 7, amount: '510.0' });
        expect(last).toEqual({ from: 'December, 25th 2018', to: 'December, 28th 2018', days: 4, amount: '291.4' });
    });

    it('should provide correct fortnightly breakdown: case 1', () => {
        const breakdown = generateBreakdown({
            start_date: '2018-08-01',
            end_date: '2018-08-31',
            frequency: 'fortnightly',
            payment_day: 'tuesday',
            rent: 510
        });

        expect(breakdown.length).toEqual(3);
        const [first, second, ...rest] = breakdown;
        const [last] = rest.reverse();
        expect(first).toEqual({ from: 'August, 1st 2018', to: 'August, 13th 2018', days: 13, amount: '947.1' });
        expect(second).toEqual({ from: 'August, 14th 2018', to: 'August, 27th 2018', days: 14, amount: "1020.0" });
        expect(last).toEqual({ from: 'August, 28th 2018', to: 'August, 31st 2018', days: 4, amount: '291.4' });
    });

    it('should provide correct fortnightly breakdown: case 2', () => {
        const breakdown = generateBreakdown({
            start_date: '2018-08-07',
            end_date: '2018-12-28',
            frequency: 'fortnightly',
            payment_day: 'tuesday',
            rent: 510
        });

        expect(breakdown.length).toEqual(11);
        const [first, second, ...rest] = breakdown;
        const [last] = rest.reverse();
        expect(first).toEqual({ from: 'August, 7th 2018', to: 'August, 13th 2018', days: 7, amount: '510.0' });
        expect(second).toEqual({ from: 'August, 14th 2018', to: 'August, 27th 2018', days: 14, amount: "1020.0" });
        expect(last).toEqual({ from: 'December, 18th 2018', to: 'December, 28th 2018', days: 11, amount: '801.4' });
    });

    it('should provide correct monthly breakdown: case 1', () => {
        const breakdown = generateBreakdown({
            start_date: '2018-08-01',
            end_date: '2018-08-31',
            frequency: 'monthly',
            payment_day: 'tuesday',
            rent: 510
        });

        expect(breakdown.length).toEqual(2);
        const [first, last] = breakdown;
        expect(first).toEqual({ from: 'August, 1st 2018', to: 'August, 27th 2018', days: 27, amount: '1967.1' });
        expect(last).toEqual({ from: 'August, 28th 2018', to: 'August, 31st 2018', days: 4, amount: '291.4' });
    });

    it('should provide correct monthly breakdown: case 2', () => {
        const breakdown = generateBreakdown({
            start_date: '2018-08-07',
            end_date: '2018-12-28',
            frequency: 'monthly',
            payment_day: 'tuesday',
            rent: 510
        });
        
        expect(breakdown.length).toEqual(6);
        const [first, second, ...rest] = breakdown;
        const [last] = rest.reverse();
        expect(first).toEqual({ from: 'August, 7th 2018', to: 'August, 27th 2018', days: 21, amount: '1530.0' });
        expect(second).toEqual({ from: 'August, 28th 2018', to: 'September, 24th 2018', days: 28, amount: '2040.0' });
        expect(last).toEqual({ from: 'December, 18th 2018', to: 'December, 28th 2018', days: 11, amount: '801.4' });
    });
});