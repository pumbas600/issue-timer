import { Component } from '../../types/Utility';
import Stack from '../utility/Stack';

interface Props {
    label: string | JSX.Element;
    placement?: 'left' | 'right' | 'above' | 'below';
}

const Label: Component<Props> = (props) => {
    const isRow = props.placement === 'left' || props.placement === 'right';
    const isAfter = props.placement === 'right' || props.placement === 'below';

    return (
        <Stack orientation={isRow ? 'row' : 'col'} className="gap-x-2">
            {!isAfter && props.label}
            <div>{props.children}</div>
            {isAfter && props.label}
        </Stack>
    );
};

export default Label;
