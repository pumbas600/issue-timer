import { ForwardedRef, MutableRefObject, useEffect, useRef } from 'react';
import { ClassName } from '../../types/Props';
import { Component } from '../../types/Utility';

interface Props extends ClassName {
    onClickOutside: VoidFunction;
    disable?: boolean;
    ignore?: MutableRefObject<null | HTMLDivElement>[];
}

const OutsideClickHandler: Component<Props> = (props) => {
    const ref = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        if (props.disable) return;

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                ref.current &&
                !ref.current?.contains(target) &&
                !props.ignore?.some((ref) => ref?.current?.contains(target))
            ) {
                props.onClickOutside();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [props]);

    return (
        <div className={props.className} ref={ref}>
            {props.children}
        </div>
    );
};

export default OutsideClickHandler;
