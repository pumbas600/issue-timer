import { User } from 'firebase/auth';
import Image from 'next/image';
import { forwardRef, MutableRefObject } from 'react';
import { useUserContext } from '../../login/UserContext';
import { ForwardRefComponent } from '../../types/Utility';
import Card from '../utility/Card';
import Stack from '../utility/Stack';
import ProfilePicture from './ProfilePicture';

interface Props {
    user: User;
    onClickProfile?: VoidFunction;
}

const SignedInUser: ForwardRefComponent<HTMLDivElement, Props> = (props, profileRef) => {
    return (
        <Stack className="gap-x-2 select-none" orientation="row">
            <Stack className="text-right">
                <p className="leading-4">Signed in as</p>
                <div className="font-bold leading-4">{props.user.displayName}</div>
            </Stack>
            <ProfilePicture
                className="border-highlight-hover"
                ref={profileRef}
                user={props.user}
                onClick={props.onClickProfile}
                width="35px"
                height="35px"
            />
        </Stack>
    );
};

export default forwardRef(SignedInUser);
