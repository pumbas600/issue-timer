import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { ClassName } from '../../../types/Props';
import { Component } from '../../../types/Utility';

export interface CheckboxProps extends ClassName {
    checked?: boolean;
    onClicked?: (checked: boolean) => void;
    ring?: boolean;
    readonly?: boolean;
}

const Checkbox: Component<CheckboxProps> = (props) => {
    const [checked, setChecked] = useState(props.checked ?? false);

    return (
        <div
            className={`flex items-center justify-center m-1 w-5 h-5 rounded-sm ${
                checked ? 'bg-blue-500 hover:bg-blue-600' : 'border border-gray-500 hover:border-gray-600'
            } ${props.ring && checked ? 'ring-offset-1 ring-2 ring-blue-500 hover:ring-blue-600' : ''} ${
                props.className ?? ''
            }`}
            onClick={() => {
                if (props.onClicked) props.onClicked(!checked);
                if (props.readonly) return;
                setChecked((checked) => !checked);
            }}
        >
            {checked && <FontAwesomeIcon className="text-white" icon={faCheck} />}
        </div>
    );
};

export default Checkbox;
