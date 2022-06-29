import { ClassName } from '../../types/Props';
import { Component } from '../../types/Utility';

const Card: Component<ClassName> = (props) => {
    return <div className={`card ${props.className ?? ''}`}>{props.children}</div>;
};

export default Card;
