import { ClassName } from '../../types/Props';
import { Component } from '../../types/Utility';

interface Props extends ClassName {
    top?: boolean;
    paddingBottom?: boolean;
}

const CardSection: Component<Props> = (props) => {
    return (
        <div
            className={`-mx-6 ${props.top ? '-mt-3' : ''} px-6 pt-3 ${props.paddingBottom === false ? '' : 'pb-3'} ${
                props.className ?? ''
            }`}
        >
            {props.children}
        </div>
    );
};

export default CardSection;
