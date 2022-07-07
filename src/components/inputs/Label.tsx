import { merge } from '../../styles/Styles';
import { ClassName } from '../../types/Props';
import { Component } from '../../types/Utility';
import Stack from '../utility/Stack';

interface Props extends ClassName {
    label: string | JSX.Element;
    placement?: 'left' | 'right' | 'above' | 'below';
}

const Label: Component<Props> = (props) => {
    const isRow = props.placement === 'left' || props.placement === 'right';
    const isAfter = props.placement === 'right' || props.placement === 'below';

    return (
        <Stack orientation={isRow ? 'row' : 'col'} className={merge(['gap-x-2 w-full', props.className])}>
            {!isAfter && props.label}
            {props.children}
            {isAfter && props.label}
        </Stack>
    );
};

export default Label;
