import { faArrowRotateLeft, faClockRotateLeft, faFileArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { merge } from '../../styles/Styles';
import { Component } from '../../types/Utility';
import IconButton from '../inputs/buttons/IconButton';
import OutlinedButton from '../inputs/buttons/OutlinedButton';
import Stack from '../utility/Stack';
import Tooltip from '../utility/Tooltip';

interface Props {
    ms?: number;
    isPaused?: boolean;
    onStart?: VoidFunction;
    onTogglePause?: (newIsPaused: boolean, ms: number) => void;
    onRestart?: (ms: number) => void;
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

    const redStyles = 'border-red-500 hover:border-red-600 text-red-500 hover:text-red-600 bg-red-500';

    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => setMs((ms) => ms + 10), 10);
            return () => clearInterval(interval);
        }
        return () => {};
    }, [isPaused]);

    function reset() {
        setMs(0);
        setIsPaused(true);
    }

    function restart() {
        if (props.onRestart) props.onRestart(ms);
        setMs(0);
    }

    function saveTime() {
        if (props.onSave) props.onSave(ms);
        reset();
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
        <Stack orientation="row" className="gap-x-2 justify-center">
            <IconButton
                disabled={ms === 0}
                icon={faFileArrowUp}
                size="lg"
                className="text-blue-500 disabled:text-gray-300 bg-blue-500"
                onClick={saveTime}
            />
            <OutlinedButton className={merge(['rounded-xl min-w-[220px] px-2', getStyles()])} onClick={toggleIsPaused}>
                <Stack orientation="row" className="gap-x-5 justify-center">
                    <h3 className="leading-9">{getDisplayTime(ms)}</h3>
                </Stack>
            </OutlinedButton>
            <IconButton
                disabled={ms === 0}
                icon={faArrowRotateLeft}
                size="lg"
                className="text-blue-500 disabled:text-gray-300 bg-blue-500"
                onClick={restart}
            />
        </Stack>
    );
};

export default Timer;
