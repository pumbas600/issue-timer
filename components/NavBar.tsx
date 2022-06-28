import { useRef, useState } from 'react';
import { useUserContext } from '../login/UserContext';
import { Component } from '../types/Utility';
import OutsideClickHandler from './functional/OutsideClickHandler';
import ProfilePicture from './user/ProfilePicture';
import SignedInUser from './user/SignedInUser';
import UserProfile from './user/UserProfile';
import Container from './utility/Container';

const NavBar: Component = () => {
    const userContext = useUserContext();
    const [showProfile, setShowProfile] = useState(false);
    const profileRef = useRef<HTMLDivElement | null>(null);

    return (
        <div className="border-b border-secondary py-2 mb-5">
            <Container>
                <div className="flex justify-end">
                    {userContext.user ? (
                        <div>
                            <SignedInUser
                                ref={profileRef}
                                user={userContext.user}
                                onClickProfile={() => {
                                    setShowProfile((showProfile) => !showProfile);
                                }}
                            />
                            {showProfile && (
                                <OutsideClickHandler onClickOutside={() => setShowProfile(false)} ignore={[profileRef]}>
                                    <UserProfile user={userContext.user} />
                                </OutsideClickHandler>
                            )}
                        </div>
                    ) : (
                        <button>Sign in</button>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default NavBar;
