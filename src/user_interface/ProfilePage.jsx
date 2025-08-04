import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { signOut, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/ProfilePage.css';

const testUpdateSubscription = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        subscriptionPlan: 'Pro',
        subscriptionPrice: '$9.99',
        subscriptionStatus: 'active',
      });
      console.log('Test subscription data updated successfully.');
    } catch (error) {
      console.error('Error updating test subscription data:', error);
    }
  }
};

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [subscriptionPlan, setSubscriptionPlan] = useState('No Plan');
  const [subscriptionPrice, setSubscriptionPrice] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState('Inactive');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
  
      if (currentUser) {
        try {
          // Kullanıcı bilgilerini Firestore'dan al
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
  
          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            console.log('User data:', data); // Firestore'dan gelen veriyi konsola yazdır
            setUserData(data);
            setName(data.name || ''); // İsim bilgisini al
  
            // Abonelik bilgilerini al
            setSubscriptionPlan(data.subscriptionPlan || 'No Plan');
            setSubscriptionPrice(data.subscriptionPrice || '');
            setSubscriptionStatus(data.subscriptionStatus || 'Inactive');
          } else {
            console.error('No user data found!'); // Belge bulunamadığında konsola yazdır
            toast.error('User data not found!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error); // Hata durumunda konsola yazdır
          toast.error('Error fetching user data. Please try again.');
        }
      } else {
        console.log('User is not signed in.'); // Kullanıcı oturum açmamışsa konsola yazdır
        navigate('/login'); // Oturum açma sayfasına yönlendir
      }
    };
  
    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        await updateDoc(docRef, {
          name: name, // Firestore'daki name alanını güncelle
        });
        setUserData({ ...userData, name }); // Yerel state'i güncelle
        setIsEditing(false);
        toast.success('Name updated successfully!');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      toast.error('Error updating name. Please try again.');
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    const currentUser = auth.currentUser;
    if (currentUser) {
      const credential = EmailAuthProvider.credential(currentUser.email, oldPassword);

      try {
        // Kullanıcıyı yeniden doğrula
        await reauthenticateWithCredential(currentUser, credential);

        // Şifreyi güncelle
        await updatePassword(currentUser, newPassword);
        setError('Password updated successfully!');
        setIsChangingPassword(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        toast.success('Password updated successfully!');
      } catch (error) {
        setError(error.message);
        toast.error('Error updating password. Please try again.');
      }
    }
  };

  if (!userData) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }
  // Abonelik iptali 
  const handleCancelSubscription = async () => {
    const confirmCancel = window.confirm('Are you sure you want to cancel your subscription?');
    if (confirmCancel) {
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          await updateDoc(userDocRef, {
            subscriptionPlan: 'No Plan',
            subscriptionPrice: '',
            subscriptionStatus: 'Inactive',
          });
          setSubscriptionPlan('No Plan');
          setSubscriptionPrice('');
          setSubscriptionStatus('Inactive');
          toast.success('Subscription cancelled successfully!');
        } catch (error) {
          toast.error('Error cancelling subscription. Please try again.');
        }
      }
    }
  };
  // abonelik update 

  const handleUpdateSubscription = async (newPlan, newPrice) => {
    const confirmUpdate = window.confirm(`Are you sure you want to update your subscription to ${newPlan}?`);
    if (confirmUpdate) {
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          await updateDoc(userDocRef, {
            subscriptionPlan: newPlan,
            subscriptionPrice: newPrice,
            subscriptionStatus: 'active',
          });
          setSubscriptionPlan(newPlan);
          setSubscriptionPrice(newPrice);
          setSubscriptionStatus('active');
          toast.success('Subscription updated successfully!');
        } catch (error) {
          toast.error('Error updating subscription. Please try again.');
        }
      }
    }
  };

  return (
    <div className="profile-page">
      <h1>Welcome, {userData.name || 'User'}!</h1>
      <div className="profile-details">
        {isEditing ? (
          <>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <p>Name: {userData.name || 'No name provided'}</p>
            <p>Email: {userData.email}</p>
            <p>Subscription Plan: {subscriptionPlan}</p>
            <p>Subscription Price: {subscriptionPrice}</p>
            <p>Subscription Status: {subscriptionStatus}</p>
            <button onClick={handleEdit}>Edit Name</button>
          </>
        )}
      </div>

      {isChangingPassword ? (
        <div className="change-password">
          <h2>Change Password</h2>
          {error && <p style={{ color: error.includes('successfully') ? 'green' : 'red' }}>{error}</p>}
          <label>
            Old Password:
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </label>
          <label>
            New Password:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
          <label>
            Confirm New Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <button onClick={handleChangePassword}>Change Password</button>
          <button onClick={() => setIsChangingPassword(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setIsChangingPassword(true)}>Change Password</button>
      )}

      {/* Anasayfa Butonu */}
      <button
        className="home-button"
        onClick={() => navigate('/')} // Anasayfaya yönlendir
        style={{ margin: '10px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}
      >
        Go to Home
      </button>

      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>
      <button onClick={testUpdateSubscription}>Test Update Subscription</button>
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
      <button onClick={handleCancelSubscription}>Cancel Subscription</button>
      <div className="subscription-upgrade">
      <h2>Upgrade Subscription</h2>
        <button onClick={() => handleUpdateSubscription('Pro', '$19.99')}>Upgrade to Pro</button>
        <button onClick={() => handleUpdateSubscription('Basic', '$9.99')}>Downgrade to Basic</button>
      </div>

    </div>
    
  );
};

export default ProfilePage;