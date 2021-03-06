import { faArrowRotateLeft, faFileArrowUp, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { merge } from '../../styles/Styles';
import { Component } from '../../types/Utility';
import IconButton from '../inputs/buttons/IconButton';
import OutlinedButton from '../inputs/buttons/OutlinedButton';
import Stack from '../utility/Stack';

interface Props {
    ms?: number;
    isPaused?: boolean;
    onTogglePause?: (newIsPaused: boolean, ms: number) => void;
    onRestart?: (isPaused: boolean, ms: number) => void;
    onSave?: (ms: number) => void;
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
    const [ms, setMs] = useState(props.ms ?? 0);
    const [isPaused, setIsPaused] = useState(props.isPaused ?? true);
    const [baselineMs, setBaselineMs] = useState(0);
    const [lastUnpaused, setLastUnpaused] = useState(new Date());

    const redStyles = 'border-red-500 hover:border-red-600 text-red-500 hover:text-red-600 bg-red-500';
    const greenStyles =
        'border-emerald-500 hover:border-emerald-600 text-emerald-500 hover:text-emerald-600 bg-emerald-500';

    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => setMs(Date.now() - lastUnpaused.getTime() + baselineMs), 100);
            return () => clearInterval(interval);
        }
    }, [isPaused, baselineMs, lastUnpaused]);

    function reset() {
        setMs(0);
        setBaselineMs(0);
        setIsPaused(true);
    }

    function restart() {
        if (props.onRestart) props.onRestart(isPaused, ms);
        setMs(0);
        setBaselineMs(0);
        if (!isPaused) setLastUnpaused(new Date());
    }

    function saveTime() {
        if (props.onSave) props.onSave(ms);
        reset();
    }

    function toggleIsPaused() {
        const newIsPaused = !isPaused;
        if (props.onTogglePause) props.onTogglePause(newIsPaused, ms);

        setIsPaused(newIsPaused);
        if (!newIsPaused) {
            setLastUnpaused(new Date());
        } else {
            setBaselineMs(Date.now() - lastUnpaused.getTime() + baselineMs);
        }
    }

    function getStyles(): string {
        return isPaused ? greenStyles : redStyles;
    }

    return (
        <Stack orientation="row" className="gap-x-2 justify-center">
            <IconButton
                title="Save the time and description"
                disabled={ms < 1000}
                icon={faFileArrowUp}
                size="lg"
                className="text-blue-500 disabled:text-gray-300 bg-blue-500"
                onClick={saveTime}
            />
            <OutlinedButton
                className={merge([
                    'group rounded-xl w-[220px] px-2 flex justify-center items-center h-10',
                    getStyles(),
                ])}
                onClick={toggleIsPaused}
            >
                {ms === 0 && isPaused ? (
                    <FontAwesomeIcon icon={faPlay} size="lg" />
                ) : (
                    <div className="sm:leading-7 sm:text-3xl text-2xl font-semibold">{getDisplayTime(ms)}</div>
                )}
            </OutlinedButton>
            <IconButton
                title="Reset the timer"
                disabled={ms < 1000}
                icon={faArrowRotateLeft}
                size="lg"
                className="text-blue-500 disabled:text-gray-300 bg-blue-500"
                onClick={restart}
            />
        </Stack>
    );
};

export default Timer;
