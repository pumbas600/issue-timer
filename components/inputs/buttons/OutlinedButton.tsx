import { Styles } from '../../../styles/Styles';
import { Component } from '../../../types/Utility';
import { ButtonProps, createButton } from './ButtonCommon';

const OutlinedButton: Component<ButtonProps> = (props) => {
    function buttonStyler(styles: Styles): string {
        return `${styles.text.default} hover:${styles.text.dark} ${styles.border.default} hover:${styles.border.dark}`;
    }

    return createButton(props, buttonStyler, 'border bg-opacity-0 hover:bg-opacity-10 transition-colors duration-300');
};

export default OutlinedButton;
