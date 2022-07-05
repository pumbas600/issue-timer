import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { merge } from '../../../styles/Styles';
import { Component } from '../../../types/Utility';
import { IconButtonProps } from './ButtonCommon';

const FilledIconButton: Component<IconButtonProps> = (props) => {
    return (
        <button
            className={merge(['filled-icon-btn', props.className])}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            <FontAwesomeIcon icon={props.icon} size={props.size} />
        </button>
    );
};

export default FilledIconButton;
