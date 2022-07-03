import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { merge } from '../../../styles/Styles';
import { Component } from '../../../types/Utility';
import { IconButtonProps } from './ButtonCommon';

const FilledIconButton: Component<IconButtonProps> = (props) => {
    return (
        <div className={merge(['filled-icon-btn', props.className])} onClick={props.onClick}>
            <FontAwesomeIcon icon={props.icon} size={props.size} />
        </div>
    );
};

export default FilledIconButton;
