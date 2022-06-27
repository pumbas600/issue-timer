import { Component } from '../../types/Utility';

const Container: Component = (props) => {
    return <div className="lg:mx-auto m-5 lg:w-[900px]">{props.children}</div>;
};

export default Container;
