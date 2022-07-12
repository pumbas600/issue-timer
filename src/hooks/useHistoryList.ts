import { useState } from 'react';

interface HistoryList<T> {
    add: (val: T) => void;
    addAll: (vals: T[]) => void;
    forEach: (fn: ForEachCallback<T>) => void;
}

type Comparator = (a: Date, b: Date) => number;
type ForEachCallback<T> = (day: Date, val: T) => void;
type DateSupplier<T> = (val: T) => Date;

const Comparator: Comparator = (a, b) => b.getTime() - a.getTime();

function useHistoryList<T>(dateSupplier: DateSupplier<T>, initialValues: T[] = []): HistoryList<T> {
    const [data, setData] = useState<T[]>(initialValues);

    function add(val: T) {
        let index = 0;
        const valDate = dateSupplier(val);
        while (index < data.length && Comparator(valDate, dateSupplier(data[index])) > 1) {
            index++;
        }
        // Insert the value at the specified index
        // https://stackoverflow.com/questions/586182/how-to-insert-an-item-into-an-array-at-a-specific-index-javascript
        setData((data) => [...data.splice(index, 0, val)]);
    }

    function addAll(vals: T[]) {
        const newData = [...data];
        vals.forEach((val) => {
            let index = 0;
            const valDate = dateSupplier(val);
            while (index < data.length && Comparator(valDate, dateSupplier(data[index])) > 1) {
                index++;
            }
            newData.splice(index, 0, val);
        });
        setData(newData);
    }

    function forEach(fn: ForEachCallback<T>) {
        Date;
    }

    return {
        add,
        addAll,
        forEach,
    };
}

export type { HistoryList };
