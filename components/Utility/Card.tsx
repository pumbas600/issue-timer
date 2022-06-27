import { Component } from '../../types/Utility';

const Card: Component = (props) => {
    return <div className="px-5 p-3 rounded-lg border border-gray-300 shadow-lg">{props.children}</div>;
};

export default Card;
