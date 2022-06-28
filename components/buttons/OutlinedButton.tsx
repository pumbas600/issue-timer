import { Component } from '../../types/Utility';
import { ButtonProps, createButton, Styles, VariantStyles } from './ButtonCommon';

const OutlinedButton: Component<ButtonProps> = (props) => {
    function buttonStyler(styles: Styles): string {
        return `border ${styles.text} ${styles.border}`;
    }

    return createButton(props, buttonStyler);
};

export default OutlinedButton;
