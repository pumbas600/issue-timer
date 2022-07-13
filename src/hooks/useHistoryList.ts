import { useState } from 'react';

interface HistoryList<T> {
    add: (val: T) => void;
    addAll: (vals: T[]) => void;
    forEach: (fn: ForEachCallback<T>) => void;
    map: <R>(fn: MapCallback<T, R>) => R[];
    size: () => number;
}

type Comparator = (a: Date, b: Date) => number;
type ForEachCallback<T> = (day: Date, val: T[]) => void;
type MapCallback<T, R> = (day: Date, val: T[]) => R;
type DateSupplier<T> = (val: T) => Date;

const TimeComparator: Comparator = (a, b) => b.getTime() - a.getTime();
const DayComparator: Comparator = (a, b) =>
    b.getDate() === a.getDate() && b.getMonth() === a.getMonth() && b.getFullYear() === a.getFullYear()
        ? 0
        : b.getTime() - a.getTime();

function useHistoryList<T>(dateSupplier: DateSupplier<T>): HistoryList<T> {
    const [data, setData] = useState<[Date, T[]][]>([]);

    function insert<T>(arr: T[], index: number, val: T) {
        // Insert the value at the specified index
        // https://stackoverflow.com/questions/586182/how-to-insert-an-item-into-an-array-at-a-specific-index-javascript
        arr.splice(index, 0, val);
    }

    function asDay(date: Date): Date {
        return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    }

    function determineDayIndex(valDate: Date): number {
        let index = 0;
        while (index < data.length) {
            const dataDate = data[index][0];
            const comparison = DayComparator(valDate, dataDate);
            if (comparison === 0) return index;
            if (comparison < 0) {
                insert(data, index, [asDay(valDate), []]);
                return index;
            }
            index++;
        }
        data.push([asDay(valDate), []]);
        return index;
    }

    function addHelper(val: T) {
        const valDate = dateSupplier(val);
        const dayIndex = determineDayIndex(valDate);
        const dayData = data[dayIndex][1];

        let index = 0;
        while (index < dayData.length && TimeComparator(valDate, dateSupplier(dayData[index])) > 0) {
            index++;
        }

        //TODO: Check that this updates the data instance too.
        insert(dayData, index, val);
    }

    function add(val: T) {
        addHelper(val);
        setData((data) => [...data]);
    }

    function addAll(vals: T[]) {
        vals.forEach(addHelper);
        setData((data) => [...data]);
    }

    function forEach(fn: ForEachCallback<T>) {
        data.forEach(([day, vals]) => fn(day, vals));
    }

    function map<R>(fn: MapCallback<T, R>): R[] {
        return data.map(([day, vals]) => fn(day, vals));
    }

    function size(): number {
        return data.length;
    }

    return {
        add,
        addAll,
        forEach,
        map,
        size,
    };
}

export default useHistoryList;
export type { HistoryList };
