import { faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { clearInterval } from 'timers';
import { Component } from '../types/Utility';
import IconButton from './inputs/buttons/IconButton';

interface Props {
    onStart?: VoidFunction;
    onTogglePause?: (newIsPaused: boolean, seconds: number) => void;
    onReset?: (seconds: number) => void;
}

const Timer: Component<Props> = (props) => {
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [seconds, setSeconds] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (startTime && !isPaused) {
            const interval = setInterval(() => setSeconds((seconds) => seconds + 1), 1000);
            return () => clearInterval(interval);
        }
        return () => {};
    }, [startTime, isPaused]);

    function startTimer() {
        reset();
        setStartTime(new Date());
        if (props.onStart) props.onStart();
    }

    function reset() {
        if (props.onReset) props.onReset(seconds);
        setStartTime(null);
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
        <div>
            <h3>{`${getDisplayHours()}:${getDisplayMinutes()}:${getDisplaySeconds()}`}</h3>
            {isPaused ? (
                <div className="rounded-md bg-emerald-500 hover:bg-emerald-600 w-min">
                    <IconButton
                        className="text-white"
                        icon={faPlay}
                        onClick={() => {
                            if (startTime) toggleIsPaused();
                            else startTimer();
                        }}
                    />
                </div>
            ) : (
                <div className="rounded-md bg-red-500 hover:bg-red-600 w-min">
                    <IconButton className="text-white" icon={faStop} onClick={toggleIsPaused} />
                </div>
            )}
        </div>
    );
};

export default Timer;
