import { faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { clearInterval } from 'timers';
import { Component } from '../types/Utility';
import FilledIconButton from './inputs/buttons/FilledIconButton';
import IconButton from './inputs/buttons/IconButton';
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
        setIsPaused(false);
    }

    function toggleIsPaused() {
        const newIsPaused = !isPaused;
        if (props.onTogglePause) props.onTogglePause(newIsPaused, seconds);
        setIsPaused(newIsPaused);
    }

    function padDigits(num: number): string {
        return num.toString().padStart(2, '0');
    }

    function getDisplaySeconds(): string {
        return padDigits(seconds % 60);
    }

    function getDisplayMinutes(): string {
        return padDigits(Math.floor(seconds / 60) % 3600);
    }

    function getDisplayHours(): string {
        return padDigits(Math.floor(seconds / 3600));
    }

    return (
        <Stack orientation="row" className="gap-x-2">
            <h3>{`${getDisplayHours()}:${getDisplayMinutes()}:${getDisplaySeconds()}`}</h3>
            {isPaused ? (
                <FilledIconButton
                    className="w-9 h-9 bg-emerald-500 hover:bg-emerald-600"
                    icon={faPlay}
                    onClick={toggleIsPaused}
                />
            ) : (
                <FilledIconButton
                    className="w-9 h-9 bg-red-500 hover:bg-red-600"
                    icon={faStop}
                    onClick={toggleIsPaused}
                />
            )}
        </Stack>
    );
};

export default Timer;
