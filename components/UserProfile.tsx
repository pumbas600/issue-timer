import { User } from 'firebase/auth';
import Image from 'next/image';
import { Component } from '../types/Utility';

interface Props {
    user: User;
}

const UserProfile: Component<Props> = (props) => {
    return (
        <div className="">
            <div>
                <p>Signed in as</p>
                <h2>{props.user.displayName}</h2>
            </div>
            {props.user.photoURL && (
                <div className="flex items-center p-0.5 rounded-full border-2 border-primary w-fit h-fit">
                    <Image
                        className="rounded-full"
                        alt={`${props.user.displayName}'s profile picture`}
                        src={props.user.photoURL}
                        style={{
                            borderWidth: '2px',
                        }}
                        width="50px"
                        height="50px"
                    />
                </div>
            )}
        </div>
    );
};

export default UserProfile;
