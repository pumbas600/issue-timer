import { User } from 'firebase/auth';
import { Component } from '../../types/Utility';
import Card from '../cards/Card';
import Stack from '../utility/Stack';
import ProfilePicture from './ProfilePicture';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../inputs/buttons/IconButton';
import OutlinedButton from '../inputs/buttons/OutlinedButton';
import CardSection from '../cards/CardSection';
import Label from '../inputs/Label';
import Checkbox from '../inputs/checkbox/Checkbox';
import CardSeparator from '../cards/CardSeparator';
import { canAccessPrivateRepos } from '../../login/UserData';

interface Props {
    user: User;
    onClose: VoidFunction;
    signOut: VoidFunction;
}

const UserProfile: Component<Props> = (props) => {
    return (
        <Card className="absolute min-w-[300px] top-[70px] select-none bg-white z-10">
            <CardSection className="bg-blue-500" top paddingBottom={false}>
                <Stack className="items-center">
                    <div className="flex items-center justify-between w-full">
                        <div className="w-8" />
                        <h5 className="text-highlight">{props.user.displayName}</h5>
                        <IconButton icon={faXmark} onClick={props.onClose} size="lg" className="bg-blue-400" />
                    </div>
                    <div className="relative -bottom-8 -mt-7">
                        <ProfilePicture
                            className="p-0.5 border-2 bg-white border-blue-500"
                            user={props.user}
                            width="64px"
                            height="64px"
                        />
                    </div>
                </Stack>
            </CardSection>
            <Stack className="mt-10 gap-y-2">
                <Label placement="right" label={<div className="font-semibold">Private repositories</div>}>
                    <Checkbox ring readonly checked={canAccessPrivateRepos()} />
                </Label>
                <CardSeparator />
                <OutlinedButton
                    className="w-full text-red-500 hover:text-red-600 border-red-500 hover:border-red-600 bg-red-500"
                    onClick={props.signOut}
                >
                    Sign out
                </OutlinedButton>
            </Stack>
        </Card>
    );
};

export default UserProfile;
