import { CSSProperties, forwardRef } from 'react';
import { ClassName } from '../../types/Props';
import { ForwardRefComponent } from '../../types/Utility';

interface Props extends ClassName {
    style?: CSSProperties;
}

const Card: ForwardRefComponent<HTMLDivElement, Props> = (props, ref) => {
    return (
        <div ref={ref} className={`card ${props.className ?? ''}`} style={props.style}>
            {props.children}
        </div>
    );
};

export default forwardRef(Card);
