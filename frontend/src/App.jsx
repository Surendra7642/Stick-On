import { useState } from 'react';
import Splash from './screens/Splash';
import RoleSelection from './screens/RoleSelection';
import OTPVerification from './screens/OTPVerification';
import ProfileSetup from './screens/ProfileSetup';
import JobBrowser from './screens/JobBrowser';
import MapView from './screens/MapView';
import JobDetail from './screens/JobDetail';
import SmartJobMatch from './screens/SmartJobMatch';
import MyApplications from './screens/MyApplications';
import OfferLetter from './screens/OfferLetter';
import HiredSuccess from './screens/HiredSuccess';
import Notifications from './screens/Notifications';
import MyProfile from './screens/MyProfile';
import MerchantVerify from './screens/MerchantVerify';
import MerchantSuccess from './screens/MerchantSuccess';
import MerchantPostJob from './screens/MerchantPostJob';
import MerchantApplicants from './screens/MerchantApplicants';
import MerchantSendOffer from './screens/MerchantSendOffer';
import SeekerReportJob from './screens/SeekerReportJob';
import MerchantDashboard from './screens/MerchantDashboard';

import './index.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [direction, setDirection] = useState('forward');
  const [flowType, setFlowType] = useState('signup'); // 'signup' or 'login'
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'work');
  const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem('userPhone') || '');
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedApplicationForOffer, setSelectedApplicationForOffer] = useState(null);

  const navigate = (screen) => {
    setDirection('forward');
    setCurrentScreen(screen);
  };

  const goBack = (screen) => {
    setDirection('backward');
    setCurrentScreen(screen);
  };

  const handleSignOut = () => {
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userRole');
    setPhoneNumber('');
    setUserRole('work');
    setSelectedJob(null);
    setSelectedApplication(null);
    setSelectedApplicationForOffer(null);
    setDirection('backward');
    setFlowType('signup');
    setCurrentScreen('splash');
  };

  const handleOTPComplete = (verifiedPhone, verifiedRole) => {
    // Save to state & localstorage
    localStorage.setItem('userPhone', verifiedPhone);
    
    // Map backend roles (SEEKER -> work, MERCHANT -> shop)
    let mappedRole = 'work';
    if (verifiedRole === 'MERCHANT') {
      mappedRole = 'shop';
    }
    localStorage.setItem('userRole', mappedRole);
    
    setPhoneNumber(verifiedPhone);
    setUserRole(mappedRole);

    if (flowType === 'login') {
      navigate(mappedRole === 'work' ? 'browse' : 'dashboard');
    } else {
      navigate(mappedRole === 'work' ? 'profile' : 'merchant_verify');
    }
  };

  return (
    <div className={`app-root ${direction}`}>
      <div className="background-arts">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {currentScreen === 'splash' && (
        <Splash 
          onNext={() => { setFlowType('signup'); navigate('role'); }} 
          onLogin={() => { setFlowType('login'); navigate('role'); }} 
        />
      )}
      {currentScreen === 'role' && (
        <RoleSelection 
          flowType={flowType}
          onNext={(phone) => {
            setPhoneNumber(phone);
            navigate('otp');
          }} 
          onBack={() => goBack('splash')} 
          onRoleSelect={setUserRole} 
        />
      )}
      {currentScreen === 'otp' && (
        <OTPVerification 
          phoneNumber={phoneNumber}
          flowType={flowType}
          userRole={userRole}
          onNext={handleOTPComplete} 
          onBack={() => goBack('role')} 
        />
      )}
      {currentScreen === 'profile' && (
        <ProfileSetup 
          onNext={() => navigate('browse')} 
          onBack={() => goBack('otp')} 
        />
      )}
      
      {currentScreen === 'browse' && (
        <JobBrowser 
          onNext={() => navigate('map')} 
          onBack={() => goBack('profile')} 
          onNavigate={navigate}
          onSelectJob={(job) => setSelectedJob(job)}
        />
      )}
      {currentScreen === 'map' && (
        <MapView 
          onNext={() => navigate('detail')} 
          onBack={() => goBack('browse')} 
          onNavigate={navigate} 
          selectedJob={selectedJob}
        />
      )}
      {currentScreen === 'detail' && (
        <JobDetail 
          job={selectedJob}
          onNext={() => navigate('match')} 
          onReport={() => navigate('report_job')} 
          onBack={() => goBack('map')} 
          onNavigate={navigate} 
        />
      )}
      {currentScreen === 'match' && (
        <SmartJobMatch 
          onNext={() => navigate('apps')} 
          onBack={() => goBack('detail')} 
          onNavigate={navigate} 
        />
      )}
      {currentScreen === 'apps' && (
        <MyApplications 
          onNext={() => navigate('offer')} 
          onBack={() => goBack('match')} 
          onNavigate={navigate}
          onSelectApplication={(app) => {
            setSelectedApplication(app);
            setSelectedJob(app.job);
          }}
        />
      )}
      {currentScreen === 'offer' && (
        <OfferLetter 
          application={selectedApplication}
          onNext={() => navigate('hired')} 
          onBack={() => goBack('apps')} 
          onNavigate={navigate} 
        />
      )}

      {currentScreen === 'hired' && (
        <HiredSuccess 
          application={selectedApplication}
          onNext={() => navigate('notifications')} 
          onBack={() => goBack('offer')} 
          onNavigate={navigate} 
        />
      )}
      {currentScreen === 'notifications' && (
        <Notifications 
          onNext={() => navigate('myprofile')} 
          onBack={() => goBack('hired')} 
          onNavigate={navigate} 
        />
      )}
      {currentScreen === 'myprofile' && (
        <MyProfile 
          onNext={() => navigate('profile')} 
          onBack={() => goBack('notifications')} 
          onNavigate={navigate} 
          onSignOut={handleSignOut} 
        />
      )}
      {currentScreen === 'merchant_verify' && (
        <MerchantVerify 
          onNext={() => navigate('merchant_success')} 
          onBack={() => goBack('splash')} 
          onNavigate={navigate} 
        />
      )}
      {currentScreen === 'merchant_success' && (
        <MerchantSuccess 
          onNext={() => navigate('post_job')} 
          onBack={() => goBack('merchant_verify')} 
          onNavigate={navigate} 
        />
      )}

      {currentScreen === 'post_job' && (
        <MerchantPostJob 
          onNext={() => navigate('dashboard')} 
          onBack={() => goBack('merchant_success')} 
          onNavigate={navigate} 
        />
      )}
      {currentScreen === 'view_applicants' && (
        <MerchantApplicants 
          onNext={(app) => {
            setSelectedApplicationForOffer(app);
            navigate('send_offer');
          }} 
          onBack={() => navigate('dashboard')} 
          onNavigate={navigate} 
        />
      )}
      {currentScreen === 'send_offer' && (
        <MerchantSendOffer 
          application={selectedApplicationForOffer}
          onNext={() => navigate('dashboard')} 
          onBack={() => goBack('view_applicants')} 
          onNavigate={navigate} 
        />
      )}
      {currentScreen === 'report_job' && (
        <SeekerReportJob 
          job={selectedJob}
          onNext={() => goBack('detail')} 
          onBack={() => goBack('detail')} 
          onNavigate={navigate} 
        />
      )}
      {currentScreen === 'dashboard' && (
        <MerchantDashboard 
          onPostJob={() => navigate('post_job')} 
          onApplicants={() => navigate('view_applicants')} 
          onBack={() => goBack('splash')} 
          onNavigate={navigate} 
          onSignOut={handleSignOut} 
        />
      )}
    </div>
  );
}

export default App;
