import { User } from 'firebase/auth';
import Image from 'next/image';
import { forwardRef, MutableRefObject } from 'react';
import { ClassName } from '../../types/Props';
import { ForwardRefComponent } from '../../types/Utility';

interface Props extends ClassName {
    user: User;
    onClick?: VoidFunction;
    width: string | number;
    height: string | number;
}

const ProfilePicture: ForwardRefComponent<HTMLDivElement, Props> = (props, ref) => {
    if (!props.user.photoURL) return <></>;

    return (
        <div
            ref={ref}
            className={`inline-flex items-center p-0.5 rounded-full border-2 bg-primary border-highlight ${
                props.className ?? ''
            }`}
        >
            <Image
                onClick={props.onClick}
                className="rounded-full"
                alt={`${props.user.displayName}'s profile picture`}
                src={props.user.photoURL}
                width={props.width}
                height={props.height}
            />
        </div>
    );
};

export default forwardRef(ProfilePicture);
