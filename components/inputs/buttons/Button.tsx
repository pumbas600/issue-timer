import { Styles } from '../../../styles/Styles';
import { Component } from '../../../types/Utility';
import { ButtonProps, createButton } from './ButtonCommon';

const Button: Component<ButtonProps> = (props) => {
    function buttonStyler(styles: Styles): string {
        return `${styles.bg.default} hover:${styles.bg.dark}`;
    }

    return createButton(props, buttonStyler, 'text-white');
};

export default Button;
