import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/Profile.css';

const UserProfile = () => {
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async (uid) => {
      try {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
        } else {
          console.log('No such document!');
          toast.error('User data not found!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Error fetching user data. Please try again.');
      } finally {
        setIsLoading(false); 
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserName(user.uid); 
      } else {
        setUserName(''); 
        setIsLoading(false); 
        navigate('/login'); 
      }
    });

    return () => unsubscribe(); 
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="profile-page">
      <h1>Welcome, {userName ? userName : 'Guest'}!</h1>
      {userName && <LogoutButton className="logout-btn" />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default UserProfile;