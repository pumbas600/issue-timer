import { ClassName } from '../../types/Props';
import { Component } from '../../types/Utility';

const Container: Component<ClassName> = (props) => {
    return <div className={`xl:mx-auto mx-5 xl:w-[1100px] ${props.className ?? ''}`}>{props.children}</div>;
};

export default Container;
