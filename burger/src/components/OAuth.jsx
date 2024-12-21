import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constant/fetchApi';

const OAuth = () => {
    const navigate = useNavigate();


    const handleGoogleClicked = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider); 

            const res = await fetch(`${BASE_URL}/google`, {  
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name:  result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json(); 
            localStorage.setItem('access_token', data.token);
            localStorage.setItem("googleEmail", data.email);
            localStorage.setItem("profilePicture", data.profilePicture);
            localStorage.setItem('userId', data.userId);    
            
            navigate('/');
        } catch (error) {
            console.log("Error during Google authentication:", error);
        }
    };

    return (
        <button
            type='button'
            onClick={handleGoogleClicked}
            className='bg-red-700 p-3 text-white rounded-lg uppercase hover:opacity-95'>
            Continue with Google
        </button>
    );
};

export default OAuth;
