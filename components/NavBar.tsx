import { useState } from 'react';
import { useUserContext } from '../login/UserContext';
import { Component } from '../types/Utility';
import SignedInUser from './user/SignedInUser';
import UserProfile from './user/UserProfile';
import Container from './utility/Container';

const NavBar: Component = () => {
    const userContext = useUserContext();
    const [showProfile, setShowProfile] = useState(false);

    return (
        <div className="border-b border-secondary py-2 mb-5">
            <Container>
                <div className="flex justify-end">
                    {userContext.user ? (
                        <div>
                            <SignedInUser user={userContext.user} onClickProfile={() => setShowProfile(true)} />
                            {showProfile && <UserProfile user={userContext.user} />}
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
