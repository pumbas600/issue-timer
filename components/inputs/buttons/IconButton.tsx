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
        <button
            onClick={props.onClick}
            className={merge([
                'flex items-center justify-center w-8 h-8 text-highlight transition-colors duration-300 bg-opacity-0 hover:bg-opacity-20 rounded-full',
                Styles.secondary.bg.default,
                props.className,
            ])}
        >
            <FontAwesomeIcon icon={props.icon} size={props.size} />
        </button>
    );
};

export default IconButton;
