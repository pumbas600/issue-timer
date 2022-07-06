import { ClassName } from '../../types/Props';
import { Component } from '../../types/Utility';

const Container: Component<ClassName> = (props) => {
    return <div className={`lg:mx-auto mx-4 xl:w-[1100px] ${props.className ?? ''}`}>{props.children}</div>;
};

export default Container;
