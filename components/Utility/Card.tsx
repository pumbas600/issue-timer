import { ClassNames } from '../../types/Props';
import { Component } from '../../types/Utility';

const Card: Component<ClassNames> = (props) => {
    return (
        <div className={`px-6 py-3 rounded-lg border border-gray-300 shadow-lg ${props.className ?? ''}`}>
            {props.children}
        </div>
    );
};

export default Card;
