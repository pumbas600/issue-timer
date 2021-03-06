import { User } from 'firebase/auth';
import { forwardRef } from 'react';
import { ForwardRefComponent } from '../../types/Utility';
import OutlinedButton from '../inputs/buttons/OutlinedButton';
import Stack from '../utility/Stack';
import ProfilePicture from './ProfilePicture';

interface Props {
    user: User;
    onClickProfile?: VoidFunction;
}

const SignedInUser: ForwardRefComponent<HTMLDivElement, Props> = (props, profileRef) => {
    return (
        <Stack className="gap-x-2 select-none" orientation="row">
            <Stack className="text-right hidden sm:flex">
                <p className="leading-4">Signed in as</p>
                <div className="font-bold leading-4">{props.user.displayName}</div>
            </Stack>
            <OutlinedButton
                onClick={props.onClickProfile}
                className="flex px-0 py-0 border-2 rounded-full border-blue-500 hover:border-blue-600"
            >
                <ProfilePicture ref={profileRef} className="p-0.5" user={props.user} width="35px" height="35px" />
            </OutlinedButton>
        </Stack>
    );
};

export default forwardRef(SignedInUser);
