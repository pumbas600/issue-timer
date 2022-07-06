import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import { Component } from '../../types/Utility';
import Card from '../cards/Card';

interface Props {
    message: ReactNode;
    disabled?: boolean;
}

const Tooltip: Component<Props> = (props) => {
    const [shift, setShift] = useState(0);
    const tooltipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const calculateStyles = () =>
            setShift((shift) => {
                if (tooltipRef.current) {
                    const tooltipRect = tooltipRef.current.getBoundingClientRect();
                    const windowWidth = Math.min(screen.width, window.innerWidth);

                    if (tooltipRect.left < 0 || tooltipRect.width > windowWidth) {
                        return -tooltipRect.left;
                    } else if (tooltipRect.right > windowWidth) {
                        return windowWidth - tooltipRect.right;
                    } else if (
                        (shift < 0 && tooltipRect.right - shift <= windowWidth) ||
                        (shift > 0 && tooltipRect.left - shift >= 0)
                    ) {
                        return 0;
                    }
                }
                return shift;
            });

        window.addEventListener('resize', calculateStyles);
        calculateStyles();
        return () => window.removeEventListener('resize', calculateStyles);
    }, []);

    return (
        <div className="flex relative justify-center">
            <div className="peer">{props.children}</div>
            <div
                className="max-w-full flex opacity-0 peer-hover:opacity-100 absolute bottom-7 items-center flex-col whitespace-nowrap"
                style={{ transform: `translateX(${shift}px)` }}
            >
                <Card ref={tooltipRef} className="py-2 bg-white">
                    {props.message}
                </Card>
                <div
                    className="relative w-2 inline-block border-transparent border-8 border-t-gray-300"
                    style={{ transform: `translateX(${-shift}px)` }}
                />
            </div>
        </div>
    );
};

export default Tooltip;
