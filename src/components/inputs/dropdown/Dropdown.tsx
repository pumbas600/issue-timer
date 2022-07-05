import React, { ReactElement, ReactNode, useState } from 'react';
import { merge } from '../../../styles/Styles';
import { ClassName } from '../../../types/Props';
import { Component } from '../../../types/Utility';
import { forEachChildren, childrenMap, childrenToArray, first } from '../../../utility/Utility';
import Card from '../../cards/Card';
import Stack from '../../utility/Stack';
import OutlinedButton from '../buttons/OutlinedButton';
import Option, { OptionProps } from './Option';

interface Props extends ClassName {
    placeholder?: string;
    value?: string;
    onSelect?: (value: string) => void;
}

const Dropdown: Component<Props> = (props) => {
    const [selected, setSelected] = useState<ReactElement<OptionProps> | null>(findChildByValue(props.value));
    const [showOptions, setShowOptions] = useState(false);

    function findChildByValue(value: string | undefined | null): ReactElement<OptionProps> | null {
        if (!value) return null;
        return first(childrenToArray(props.children, Option), (child) => child.props.value === value);
    }

    function children(): ReactNode {
        return childrenToArray(props.children, Option).map((child) => {
            // Preserve the onClick method already on the option
            const onClickBinding = child.props.onClick
                ? () => {
                      child.props.onClick!();
                      if (props.onSelect) props.onSelect(child.props.value);
                      setSelected(child);
                      setShowOptions(false);
                  }
                : () => {
                      if (props.onSelect) props.onSelect!(child.props.value);
                      setSelected(child);
                      setShowOptions(false);
                  };

            return React.cloneElement(child, { onClick: onClickBinding });
        });
    }

    return (
        <div className={merge(['relative w-full', props.className])}>
            <OutlinedButton
                className="px-3 w-full py-1 whitespace-nowrap text-left text-blue-500 hover:text-blue-600 border-blue-500 hover:border-blue-600 bg-blue-500"
                onClick={() => setShowOptions((showOptions) => !showOptions)}
            >
                <div className="font-normal">{selected?.props.children ?? props.placeholder}</div>
            </OutlinedButton>
            {showOptions && (
                <Stack className="absolute top-10 w-full rounded-lg border border-gray-300 bg-white text-left overflow-x-hidden gap-y-0.5 ">
                    {children()}
                </Stack>
            )}
        </div>
    );
};

export default Dropdown;
