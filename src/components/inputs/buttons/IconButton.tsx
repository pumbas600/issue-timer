import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { merge } from '../../../styles/Styles';
import { Component } from '../../../types/Utility';
import { IconButtonProps } from './ButtonCommon';

const IconButton: Component<IconButtonProps> = (props) => {
    return (
        <button onClick={props.onClick} className={merge(['icon-btn bg-opacity-0', props.className])}>
            <FontAwesomeIcon icon={props.icon} size={props.size} />
        </button>
    );
};

export default IconButton;
