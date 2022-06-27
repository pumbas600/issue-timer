import { User } from 'firebase/auth';
import Image from 'next/image';
import { Component } from '../types/Utility';
import Card from './Utility/Card';
import Stack from './Utility/Stack';

interface Props {
    user: User;
}

const UserProfile: Component<Props> = (props) => {
    return (
        <Card>
            <Stack orientation="row">
                <Stack>
                    <p>Signed in as</p>
                    <h2>{props.user.displayName}</h2>
                </Stack>
                {props.user.photoURL && (
                    <div className="flex items-center p-0.5 rounded-full border-2 border-primary w-fit h-fit">
                        <Image
                            className="rounded-full"
                            alt={`${props.user.displayName}'s profile picture`}
                            src={props.user.photoURL}
                            style={{
                                borderWidth: '2px',
                            }}
                            width="40px"
                            height="40px"
                        />
                    </div>
                )}
            </Stack>
        </Card>
    );
};

export default UserProfile;
