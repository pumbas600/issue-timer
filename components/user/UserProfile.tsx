import { User } from 'firebase/auth';
import Image from 'next/image';
import { Component } from '../../types/Utility';
import Card from '../utility/Card';
import Stack from '../utility/Stack';
import ProfilePicture from './ProfilePicture';

interface Props {
    user: User;
}

const UserProfile: Component<Props> = (props) => {
    return (
        <Card
            header={
                <Stack className="items-center">
                    <h5 className="text-highlight">{props.user.displayName}</h5>
                    <div className="relative -bottom-8 -mt-7">
                        <ProfilePicture user={props.user} width="64px" height="64px" />
                    </div>
                </Stack>
            }
            headerBg="bg-highlight"
            noHeaderBottomPadding
            className="relative"
        >
            <Stack className="mt-6">
                <p>{props.user.email}</p>
            </Stack>
        </Card>
    );
};

export default UserProfile;
