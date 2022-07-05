import { faCaretDown, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, ReactNode, useState } from 'react';
import { merge } from '../../../styles/Styles';
import { ClassName } from '../../../types/Props';
import { Component } from '../../../types/Utility';
import { childrenToArray, first } from '../../../utility/Utility';
import OutsideClickHandler from '../../functional/OutsideClickHandler';
import Stack from '../../utility/Stack';
import OutlinedButton from '../buttons/OutlinedButton';
import Option, { OptionProps } from './Option';

interface Props extends ClassName {
    placeholder?: string;
    value?: string | null;
    onSelect?: (value: string) => void;
}

const Dropdown: Component<Props> = (props) => {
    const [showOptions, setShowOptions] = useState(false);

    function findOptionByValue(value: string | undefined | null): ReactElement<OptionProps> | null {
        if (value === null || value === undefined) return null;
        return first(childrenToArray(props.children, Option), (child) => child.props.value === value);
    }

    function children(): ReactNode {
        return childrenToArray(props.children, Option).map((child) => {
            // Preserve the onClick method already on the option
            const onClickBinding = child.props.onClick
                ? () => {
                      child.props.onClick!();
                      if (props.onSelect) props.onSelect(child.props.value);
                      setShowOptions(false);
                  }
                : () => {
                      if (props.onSelect) props.onSelect!(child.props.value);
                      setShowOptions(false);
                  };

            return React.cloneElement(child, { onClick: onClickBinding });
        });
    }

    return (
        <div className="relative w-full">
            <OutsideClickHandler disable={!showOptions} onClickOutside={() => setShowOptions(false)}>
                <OutlinedButton
                    className={merge([
                        'px-3 w-full whitespace-nowrap text-left flex flex-row items-center justify-between',
                        props.className,
                    ])}
                    onClick={() => setShowOptions((showOptions) => !showOptions)}
                >
                    <div className="font-normal">
                        {findOptionByValue(props.value)?.props.children ?? props.placeholder}
                    </div>
                    <FontAwesomeIcon icon={showOptions ? faCaretDown : faCaretLeft} size="lg" />
                </OutlinedButton>
                {showOptions && (
                    <Stack className="absolute top-10 w-full rounded-lg border border-gray-300 bg-white text-left overflow-x-hidden gap-y-0.5 ">
                        {children()}
                    </Stack>
                )}
            </OutsideClickHandler>
        </div>
    );
};

export default Dropdown;
