import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { FC, ReactNode } from 'react';
import { ClassName } from '../../../types/Props';
import Tooltip from '../../utility/Tooltip';
import IconButton from './IconButton';

interface Props extends ClassName {
    info: ReactNode;
}

const InfoButton: FC<Props> = (props) => {
    return (
        <Tooltip message={props.info}>
            <IconButton className={props.className} icon={faQuestionCircle} size="lg" />
        </Tooltip>
    );
};

export default InfoButton;
