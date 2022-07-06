import { ReactNode } from 'react';
import { Component } from '../../types/Utility';
import Card from '../cards/Card';

interface Props {
    message: ReactNode;
    disabled?: boolean;
}

const Tooltip: Component<Props> = (props) => {
    return (
        <div className="flex relative justify-center">
            <div className="peer">{props.children}</div>
            {!props.disabled && (
                <div className="flex opacity-0 peer-hover:opacity-100 transition-opacity duration-300 absolute bottom-7 items-center flex-col whitespace-nowrap">
                    <Card className="py-2 bg-white">{props.message}</Card>
                    <div className="relative w-2 inline-block border-transparent border-8 border-t-gray-300" />
                </div>
            )}
        </div>
    );
};

export default Tooltip;
