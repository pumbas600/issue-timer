import { User } from 'firebase/auth';
import { Component } from '../../types/Utility';
import Card from '../utility/Card';
import Stack from '../utility/Stack';
import ProfilePicture from './ProfilePicture';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface Props {
    user: User;
    onClose: VoidFunction;
}

const UserProfile: Component<Props> = (props) => {
    return (
        <Card
            header={
                <Stack className="items-center">
                    <div className="flex justify-between w-full">
                        <div />
                        <h5 className="text-highlight">{props.user.displayName}</h5>
                        <h5
                            className="relative w-0 -left-3 text-highlight text-highlight-hover"
                            onClick={props.onClose}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </h5>
                    </div>
                    <div className="relative -bottom-8 -mt-7">
                        <ProfilePicture user={props.user} width="64px" height="64px" />
                    </div>
                </Stack>
            }
            headerBg="bg-highlight"
            noHeaderBottomPadding
            className="w-[250px] absolute top-[70px]"
        >
            <Stack className="mt-6 align-center">
                <p>{props.user.email}</p>
            </Stack>
        </Card>
    );
};

export default UserProfile;
