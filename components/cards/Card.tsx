import { ReactNode } from 'react';
import { ClassName } from '../../types/Props';
import { Component } from '../../types/Utility';

interface Props extends ClassName {}

const Card: Component<Props> = (props) => {
    return (
        <div
            className={`overflow-hidden px-6 py-3 border-secondary border rounded-lg shadow-lg ${
                props.className ?? ''
            }`}
        >
            <span>{props.children}</span>
        </div>
    );
};

export default Card;
