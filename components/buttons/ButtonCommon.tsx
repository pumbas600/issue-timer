import { ReactNode } from 'react';
import { ClassName } from '../../types/Props';

export type Variant = 'primary' | 'secondary' | 'success' | 'danger';

export interface Styles {
    bg: string;
    text: string;
    border: string;
}

export interface ButtonProps extends ClassName {
    variant?: Variant;
    disabled?: boolean;
    onClick?: VoidFunction;
    children?: ReactNode;
}

export const VariantStyles: Record<Variant, Styles> = {
    primary: {
        bg: 'bg-blue-500 hover:bg-blue-700',
        text: 'text-blue-500 hover:text-blue-700',
        border: 'border-blue-500 hover:border-blue-700',
    },
    secondary: {
        bg: 'bg-gray-500 hover:bg-gray-700',
        text: 'text-gray-500 hover:text-gray-700',
        border: 'border-gray-500 hover:border-gray-700',
    },
    success: {
        bg: 'bg-emerald-500 hover:bg-emerald-700',
        text: 'text-emerald-500 hover:text-emerald-700',
        border: 'border-emerald-500 hover:border-emerald-700',
    },
    danger: {
        bg: 'bg-red-500 hover:bg-red-700',
        text: 'text-red-500 hover:text-red-700',
        border: 'border-red-500 hover:border-red-700',
    },
};

export function createButton(props: ButtonProps, buttonStyler: (styles: Styles) => string): JSX.Element {
    const styles = VariantStyles[props.variant ?? 'primary'];
    return (
        <button
            onClick={props.onClick}
            disabled={props.disabled}
            className={`text-lg font-semibold px-7 py-0.5 rounded-lg ${props.className ?? ''} ${buttonStyler(styles)}`}
        >
            {props.children}
        </button>
    );
}
