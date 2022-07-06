import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { merge } from '../../styles/Styles';
import { Component } from '../../types/Utility';
import OutlinedButton from '../inputs/buttons/OutlinedButton';
import Stack from '../utility/Stack';

interface Props {
    onStart?: VoidFunction;
    onTogglePause?: (newIsPaused: boolean, seconds: number) => void;
    onReset?: (seconds: number) => void;
}

function padDigits(num: number): string {
    return num.toString().padStart(2, '0');
}

export function getDisplayTime(ms: number): string {
    const hours = Math.floor(ms / 3_600_000);
    const minutes = Math.floor(ms / 60_000) % 60;
    const seconds = Math.floor(ms / 1_000) % 60;

    if (hours === 0) {
        return `${minutes.toString()}:${padDigits(seconds)}`;
    } else return `${hours.toString()}:${padDigits(minutes)}:${padDigits(seconds)}`;
}

const Timer: Component<Props> = (props) => {
    const [ms, setMs] = useState(0);
    const [isPaused, setIsPaused] = useState(true);

    const redStyles = 'border-red-500 hover:border-red-600 text-red-500 hover:text-red-600 bg-red-500';

    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => setMs((ms) => ms + 10), 10);
            return () => clearInterval(interval);
        }
        return () => {};
    }, [isPaused]);

    function reset() {
        if (props.onReset) props.onReset(ms);
        setMs(0);
        setIsPaused(true);
    }

    function toggleIsPaused() {
        const newIsPaused = !isPaused;
        if (props.onTogglePause) props.onTogglePause(newIsPaused, ms);
        setIsPaused(newIsPaused);
    }

    function getStyles(): string {
        return isPaused
            ? 'border-emerald-500 hover:border-emerald-600 text-emerald-500 hover:text-emerald-600 bg-emerald-500'
            : redStyles;
    }

    return (
        <Stack orientation="row" className="gap-x-3">
            <OutlinedButton className={merge(['rounded-xl min-w-[160px] px-2', getStyles()])} onClick={toggleIsPaused}>
                <Stack orientation="row" className="gap-x-5 justify-center">
                    <h3 className="leading-9">{getDisplayTime(ms)}</h3>
                </Stack>
            </OutlinedButton>
            {isPaused && ms !== 0 && (
                <OutlinedButton className={`${redStyles} px-3 py-2 rounded-xl`} onClick={reset}>
                    <FontAwesomeIcon icon={faClockRotateLeft} size="lg" />
                </OutlinedButton>
            )}
        </Stack>
    );
};

export default Timer;
