import React from 'react';
import { Component } from '../../../types/Utility';
import { mapChildren } from '../../../utility/Utility';
import OutlinedButton from '../buttons/OutlinedButton';
import Option from './Option';

interface Props {
    placeholder?: string;
    value?: string | null;
    onSelect?: (value: string) => void;
}

const Dropdown: Component<Props> = (props) => {
    mapChildren(props.children, Option, (child) => {
        console.log(child.props.value);
        return child;
    });

    return <OutlinedButton>Hello!</OutlinedButton>;
};

export default Dropdown;
