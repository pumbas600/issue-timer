import { FC } from 'react';
import { merge } from '../../styles/Styles';
import { ClassName } from '../../types/Props';

const CardSeparator: FC<ClassName> = (props) => {
    return <hr className={merge(['card-separator', props.className])} />;
};

export default CardSeparator;
