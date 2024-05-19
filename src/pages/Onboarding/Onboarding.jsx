import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Onboarding.module.scss';
import Login from './Login/Login';
import useAuthProvider from '../../hooks/useAuthProvider';
import backgroundVideo from '../../assets/video/loginBackground.mp4'; // Ensure you have a video file

const Onboarding = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuthProvider();

    useEffect(() => {
        if (isLoggedIn()) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className={styles.mainContainer}>
            <video autoPlay="autoplay" loop="loop" muted className={styles.videoBackground}>
                <source src="https://usv.ro/fisiere_utilizator/file/filme/USV-2022-nosound.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className={styles.formContainer}>
                <Login />
            </div>
        </div>
    );
};

export default Onboarding;
