import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { useUserContext } from '../login/UserContext';
import { Component } from '../types/Utility';
import OutsideClickHandler from './functional/OutsideClickHandler';
import SignedInUser from './user/SignedInUser';
import UserProfile from './user/UserProfile';
import Container from './Utility/Container';
import Stack from './utility/Stack';

const NavBar: Component = () => {
    const userContext = useUserContext();
    const router = useRouter();
    const [showProfile, setShowProfile] = useState(false);
    const profileRef = useRef<HTMLDivElement | null>(null);

    function signOut() {
        userContext.logoutUser().then(() => {
            router.push({ pathname: '/login' });
        });
        setShowProfile(false);
    }

    return (
        <div>
            {userContext.user && (
                <div className="border-b border-secondary py-2 mb-5">
                    <Container>
                        <Stack orientation="row" className="justify-between">
                            <h3 className="text-blue-500">Issue Tracker</h3>
                            <div>
                                <SignedInUser
                                    ref={profileRef}
                                    user={userContext.user}
                                    onClickProfile={() => {
                                        setShowProfile((showProfile) => !showProfile);
                                    }}
                                />
                                {showProfile && (
                                    <OutsideClickHandler
                                        onClickOutside={() => setShowProfile(false)}
                                        ignore={[profileRef]}
                                    >
                                        <div className="flex justify-end">
                                            <UserProfile
                                                user={userContext.user}
                                                onClose={() => setShowProfile(false)}
                                                signOut={signOut}
                                            />
                                        </div>
                                    </OutsideClickHandler>
                                )}
                            </div>
                        </Stack>
                    </Container>
                </div>
            )}
        </div>
    );
};

export default NavBar;
