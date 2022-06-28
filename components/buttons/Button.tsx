import { Component } from '../../types/Utility';
import { ButtonProps, createButton, Styles } from './ButtonCommon';

const Button: Component<ButtonProps> = (props) => {
    function buttonStyler(styles: Styles): string {
        return `text-white ${styles.bg}`;
    }

    return createButton(props, buttonStyler);
};

export default Button;
