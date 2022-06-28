import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ClassName } from '../../types/Props';
import { Component } from '../../types/Utility';

interface Props extends ClassName {
    icon: IconProp;
    onClick: VoidFunction;
}

const IconButton: Component<Props> = (props) => {
    return (
        <button
            onClick={props.onClick}
            className={`text-2xl text-highlight text-highlight-hover rounded-full ${props.className ?? ''}`}
        >
            <FontAwesomeIcon icon={props.icon} />
        </button>
    );
};

export default IconButton;
