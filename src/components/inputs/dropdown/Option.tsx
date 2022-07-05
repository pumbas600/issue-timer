import { FC } from 'react';
import { Children } from '../../../types/Props';

export interface OptionProps extends Children {
    onClick?: VoidFunction;
    value: string;
}

const Option: FC<OptionProps> = (props) => {
    return (
        <div onClick={props.onClick} className="hover:bg-gray-300 px-3 whitespace-nowrap text-ellipsis">
            {props.children}
        </div>
    );
};

export default Option;
