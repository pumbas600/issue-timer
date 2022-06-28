import { User } from 'firebase/auth';
import { Component } from '../../types/Utility';
import Card from '../utility/Card';
import Stack from '../utility/Stack';
import ProfilePicture from './ProfilePicture';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../buttons/IconButton';
import OutlinedButton from '../buttons/OutlinedButton';

interface Props {
    user: User;
    onClose: VoidFunction;
    logOut: VoidFunction;
}

const UserProfile: Component<Props> = (props) => {
    return (
        <Card
            header={
                <Stack className="items-center">
                    <div className="flex items-center justify-between w-full">
                        <div />
                        <h5 className="text-highlight">{props.user.displayName}</h5>
                        <IconButton className="relative w-0 -left-4" icon={faXmark} onClick={props.onClose} />
                    </div>
                    <div className="relative -bottom-8 -mt-7">
                        <ProfilePicture user={props.user} width="64px" height="64px" />
                    </div>
                </Stack>
            }
            headerBg="bg-highlight"
            noHeaderBottomPadding
            className="w-[250px] absolute top-[70px] select-none"
        >
            <Stack className="mt-6 align-center gap-y-2">
                <p>{props.user.email}</p>
                <OutlinedButton variant="danger" onClick={props.logOut}>
                    Log out
                </OutlinedButton>
            </Stack>
        </Card>
    );
};

export default UserProfile;
