import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { merge, Styles } from '../../styles/Styles';
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
            className={merge([
                'flex items-center justify-center text-2xl w-8 h-8 text-highlight transition-colors duration-300 bg-opacity-0 hover:bg-opacity-40 rounded-full',
                Styles.secondary.bg.default,
                props.className,
            ])}
        >
            <FontAwesomeIcon icon={props.icon} />
        </button>
    );
};

export default IconButton;
