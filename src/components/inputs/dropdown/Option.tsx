import { Component } from '../../../types/Utility';

export interface OptionProps {
    onClick?: VoidFunction;
    value: string;
}

const Option: Component<OptionProps> = (props) => {
    return <div>Hello!</div>;
};

export default Option;
