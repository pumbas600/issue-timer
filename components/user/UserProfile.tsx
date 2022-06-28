import { User } from 'firebase/auth';
import { Component } from '../../types/Utility';
import Card from '../cards/Card';
import Stack from '../utility/Stack';
import ProfilePicture from './ProfilePicture';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../buttons/IconButton';
import OutlinedButton from '../buttons/OutlinedButton';
import Button from '../buttons/Button';
import CardSection from '../cards/CardSection';

interface Props {
    user: User;
    onClose: VoidFunction;
    signOut: VoidFunction;
}

const UserProfile: Component<Props> = (props) => {
    return (
        <Card headerBg="bg-highlight" noHeaderBottomPadding className="absolute min-w-[300px] top-[70px] select-none">
            <CardSection className="bg-highlight" marginTop>
                <Stack className="items-center">
                    <div className="flex items-center justify-between w-full">
                        <div className="w-8" />
                        <h5 className="text-highlight">{props.user.displayName}</h5>
                        <IconButton icon={faXmark} onClick={props.onClose} />
                    </div>
                    <div className="relative -bottom-8 -mt-7">
                        <ProfilePicture
                            className="p-0.5 border-2 bg-primary border-highlight"
                            user={props.user}
                            width="64px"
                            height="64px"
                        />
                    </div>
                </Stack>
            </CardSection>
            <Stack className="mt-10 items-center gap-y-2">
                <p>{props.user.email}</p>
                <OutlinedButton className="w-full" variant="danger" onClick={props.signOut}>
                    Sign out
                </OutlinedButton>
            </Stack>
        </Card>
    );
};

export default UserProfile;
