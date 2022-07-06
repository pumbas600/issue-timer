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
    const arrowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const calculateStyles = () => {
            if (tooltipRef.current && arrowRef.current) {
                const tooltipRect = tooltipRef.current.getBoundingClientRect();
                const windowWidth = Math.min(screen.width, window.innerWidth);

                if (tooltipRect.left < 0 || tooltipRect.width > windowWidth) {
                    setShift(-tooltipRect.left);
                } else if (tooltipRect.right > windowWidth) {
                    setShift(windowWidth - tooltipRect.right);
                } else if (
                    (shift < 0 && tooltipRect.right - shift <= windowWidth) ||
                    (shift > 0 && tooltipRect.left - shift >= 0)
                ) {
                    setShift(0);
                }
            }
        };

        window.addEventListener('resize', calculateStyles);
        calculateStyles();
        return () => window.removeEventListener('resize', calculateStyles);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex relative justify-center">
            <div className="peer">{props.children}</div>
            <div
                className="flex opacity-0 peer-hover:opacity-100 absolute bottom-7 items-center flex-col whitespace-nowrap"
                style={{ transform: `translateX(${shift}px)` }}
            >
                <Card ref={tooltipRef} className="py-2 bg-white">
                    {props.message}
                </Card>
                <div
                    ref={arrowRef}
                    className="relative w-2 inline-block border-transparent border-8 border-t-gray-300"
                    style={{ transform: `translateX(${-shift}px)` }}
                />
            </div>
        </div>
    );
};

export default Tooltip;
