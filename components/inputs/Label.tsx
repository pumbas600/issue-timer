import { Component } from '../../types/Utility';
import Stack from '../utility/Stack';

interface Props {
    label: string | JSX.Element;
}

const Label: Component<Props> = (props) => {
    return (
        <Stack orientation="row" className="gap-x-2">
            <div>{props.children}</div>
            {props.label}
        </Stack>
    );
};

export default Label;
