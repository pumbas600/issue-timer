import { ClassName } from '../../types/Props';
import { Component } from '../../types/Utility';

interface Props extends ClassName {
    variant?: 'highlight' | 'secondary' | 'danger';
    onClick: VoidFunction;
}

const OutlinedButton: Component<Props> = (props) => {
    function variantStyles(): string {
        switch (props.variant) {
            case 'danger':
                return 'text-red-500 hover:text-red-700 border-red-500 hover:border-red-700';
            case 'secondary':
                return 'text-secondary border-secondary';
            default:
                return 'text-highlight border-highlight';
        }
    }

    return (
        <button
            onClick={props.onClick}
            className={`text-lg font-semibold px-4 py-1 rounded-lg border ${variantStyles()} ${props.className ?? ''}`}
        >
            {props.children}
        </button>
    );
};

export default OutlinedButton;
