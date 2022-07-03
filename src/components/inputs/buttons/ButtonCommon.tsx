import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { ReactNode } from 'react';
import { merge, Styles, Variant } from '../../../styles/Styles';
import { ClassName } from '../../../types/Props';

export interface ButtonProps extends ClassName {
    variant?: Variant;
    disabled?: boolean;
    onClick?: VoidFunction;
    children?: ReactNode;
}

export interface IconButtonProps extends ClassName {
    icon: IconProp;
    onClick?: VoidFunction;
    size?: SizeProp;
}

export function createButton(
    props: ButtonProps,
    buttonStyler: (styles: Styles) => string,
    additionalStyles: string = '',
): JSX.Element {
    const styles = props.variant ? buttonStyler(Styles[props.variant]) : '';
    return (
        <button
            onClick={props.onClick}
            disabled={props.disabled}
            className={merge(['btn', props.className, styles, additionalStyles])}
        >
            {props.children}
        </button>
    );
}
