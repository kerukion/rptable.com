import './style.scss';
import { FunctionalComponent, h } from 'preact';
import { GoogleLogin } from 'react-google-login';
import { useLoginMutation } from '~frontend/queries';

export const Login: FunctionalComponent = () => {
    const GOOGLE_CLIENT_ID = '270087464037-10kcjadihf5tbe78mir7rs3h25jn9rq4.apps.googleusercontent.com';
    const { mutateAsync: handleLogin } = useLoginMutation();

    return (
        <div className='login'>
            <div className='login--card'>
                <div className='login--title-bar'>
                    <h2>Login to rptable.com</h2>
                </div>
                <div className='login--body'>
                    <GoogleLogin
                        clientId={GOOGLE_CLIENT_ID}
                        className='google-login-button'
                        buttonText='Log in with Google'
                        onSuccess={handleLogin}
                        onFailure={handleLogin}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </div>
        </div>
    );
};
