import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { merge, Styles } from '../../../styles/Styles';
import { ClassName } from '../../../types/Props';
import { Component } from '../../../types/Utility';

export interface IconButtonProps extends ClassName {
    icon: IconProp;
    onClick?: VoidFunction;
    size?: SizeProp;
}

const IconButton: Component<IconButtonProps> = (props) => {
    return (
        <button onClick={props.onClick} className={merge(['icon-btn bg-opacity-0', props.className])}>
            <FontAwesomeIcon icon={props.icon} size={props.size} />
        </button>
    );
};

export default IconButton;
