import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { ClassName } from '../../../types/Props';
import { Component } from '../../../types/Utility';
import Card from '../../cards/Card';
import IconButton from './IconButton';

interface Props extends ClassName {
    info: string | JSX.Element;
}

const InfoButton: Component<Props> = (props) => {
    return (
        <div className="flex relative justify-center">
            <div className="peer">
                <IconButton className={props.className} icon={faQuestionCircle} size="lg" />
            </div>
            <div className="flex opacity-0 peer-hover:opacity-100 transition-opacity duration-300 absolute bottom-7 items-center flex-col whitespace-nowrap">
                <Card className="py-2 bg-white">{props.info}</Card>
                <div className="relative w-2 inline-block border-transparent border-8 border-t-gray-300" />
            </div>
        </div>
    );
};

export default InfoButton;
