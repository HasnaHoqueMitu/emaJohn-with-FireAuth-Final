import React from 'react';
import Auth from './useAuth';

const LogIn = () => {
    const auth = Auth();
    //console.log(auth.signInWithGoogle);
    //console.log(auth.user);

    const handleSinIn = () => {
        auth.signInWithGoogle()
        .then(res => {
            window.location.pathname = '/review';
        })
    }
    const handleSignOut = ()=>{
        auth.signOut()
        .then(res => {
            window.location.pathname = '/';
        });
    }
    return (
        <div>
            <h1>Join the Party</h1>
            {
                auth.user? <button onClick={handleSignOut} >Sign Out</button>
                : <button onClick={handleSinIn}>Sign In with Google</button>
            }
        </div>
    );
};

export default LogIn;