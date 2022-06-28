import { ClassName } from '../../types/Props';
import { Component } from '../../types/Utility';

interface Props extends ClassName {
    orientation?: 'col' | 'row';
}

const Stack: Component<Props> = (props) => {
    function orientationStyles(): string {
        return props.orientation === 'row' ? 'flex-row items-center' : 'flex-col';
    }

    return <div className={`flex ${orientationStyles()} ${props.className ?? ''}`}>{props.children}</div>;
};

export default Stack;
