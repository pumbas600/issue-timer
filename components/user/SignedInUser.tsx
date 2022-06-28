import { User } from 'firebase/auth';
import Image from 'next/image';
import { useUserContext } from '../../login/UserContext';
import { Component } from '../../types/Utility';
import Card from '../utility/Card';
import Stack from '../utility/Stack';
import ProfilePicture from './ProfilePicture';

interface Props {
    user: User;
    onClickProfile?: VoidFunction;
}

const SignedInUser: Component<Props> = (props) => {
    return (
        <Stack className="gap-x-2" orientation="row">
            <Stack className="text-right">
                <p className="leading-4">Signed in as</p>
                <div className="font-bold leading-4">{props.user.displayName}</div>
            </Stack>
            <ProfilePicture user={props.user} onClick={props.onClickProfile} width="35px" height="35px" />
        </Stack>
    );
};

export default SignedInUser;
