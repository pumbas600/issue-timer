import { useEffect, useRef } from 'react';
import { Component } from '../../types/Utility';

interface Props {
    onClickOutside: VoidFunction;
}

const OutsideClickHandler: Component<Props> = (props) => {
    const ref = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                props.onClickOutside();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.onClickOutside]);

    return <div ref={ref}>{props.children}</div>;
};

export default OutsideClickHandler;
