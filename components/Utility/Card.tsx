import { ReactNode } from 'react';
import { ClassName } from '../../types/Props';
import { Component } from '../../types/Utility';

interface Props extends ClassName {
    header?: ReactNode;
    headerBg?: string;
    noHeaderBottomPadding?: boolean;
}

const Card: Component<Props> = (props) => {
    function headerPadding(): string {
        return `px-6 pt-3 ${props.noHeaderBottomPadding ? '' : 'pb-3'}`;
    }

    return (
        <div className={`shadow-lg ${props.className ?? ''}`}>
            {props.header && (
                <div
                    className={`rounded-t-lg border border-b-0 border-secondary ${headerPadding()} ${
                        props.headerBg ?? 'bg-secondary'
                    }`}
                >
                    {props.header}
                </div>
            )}
            <div className="px-6 py-3 border-secondary rounded-b-lg border border-t-0">{props.children}</div>
        </div>
    );
};

export default Card;
