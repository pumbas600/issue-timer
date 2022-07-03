import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { merge } from '../styles/Styles';
import { Component } from '../types/Utility';
import OutlinedButton from './inputs/buttons/OutlinedButton';
import Stack from './utility/Stack';

interface Props {
    onStart?: VoidFunction;
    onTogglePause?: (newIsPaused: boolean, seconds: number) => void;
    onReset?: (seconds: number) => void;
}

const Timer: Component<Props> = (props) => {
    const [seconds, setSeconds] = useState(0);
    const [isPaused, setIsPaused] = useState(true);

    useEffect(() => {
        if (!isPaused) {
            const timeout = setTimeout(() => setSeconds((seconds) => seconds + 1), 1000);
            return () => clearTimeout(timeout);
        }
        return () => {};
    }, [seconds, isPaused]);

    function reset() {
        if (props.onReset) props.onReset(seconds);
        setSeconds(0);
        setIsPaused(true);
    }

    function toggleIsPaused() {
        const newIsPaused = !isPaused;
        if (props.onTogglePause) props.onTogglePause(newIsPaused, seconds);
        setIsPaused(newIsPaused);
    }

    function padDigits(num: number): string {
        return num.toString().padStart(2, '0');
    }

    function getDisplayTime(): string {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor(seconds / 60) % 3600;
        const displaySeconds = padDigits(seconds % 60);

        if (hours === 0) {
            return `${minutes.toString()}:${displaySeconds}`;
        } else return `${hours.toString()}:${padDigits(minutes)}:${displaySeconds}`;
    }

    function getStyles(): string {
        return isPaused
            ? 'border-emerald-500 hover:border-emerald-600 text-emerald-500 hover:text-emerald-600 bg-emerald-500'
            : 'border-red-500 hover:border-red-600 text-red-500 hover:text-red-600 bg-red-500';
    }

    return (
        <Stack orientation="row" className="gap-x-3">
            <OutlinedButton className={merge(['rounded-xl', getStyles()])} onClick={toggleIsPaused}>
                <Stack orientation="row" className="gap-x-5">
                    <h3 className="leading-9">{getDisplayTime()}</h3>
                </Stack>
            </OutlinedButton>
            {isPaused && seconds !== 0 && (
                <OutlinedButton
                    className="border-red-500 hover:border-red-600 text-red-500 hover:text-red-600 bg-red-500 px-3 py-2 rounded-xl"
                    onClick={reset}
                >
                    <FontAwesomeIcon icon={faClockRotateLeft} size="lg" />
                </OutlinedButton>
            )}
        </Stack>
    );
};

export default Timer;
