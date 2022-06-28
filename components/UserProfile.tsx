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
        <Card className="w-fit">
            <Stack className="gap-x-3" orientation="row">
                <Stack className="text-right">
                    <p className="leading-5">Signed in as</p>
                    <h5 className="leading-5">{props.user.displayName}</h5>
                </Stack>
                {props.user.photoURL && (
                    <div className="flex items-center p-0.5 rounded-full border-2 border-blue-500 hover:border-blue-400 w-fit h-fit">
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
