// import useState
import { useState, useEffect } from 'react';
// import react router dom.
import {
  BrowserRouter as Router,
  Routes ,
  Route
} from 'react-router-dom';
// import custom components.
import Home from './components/Home';
import Login from './components/Login';
import Loading from './components/Loading';
import Chat from './components/Chat';
//import PrivateRoute from './components/PrivateRoute';
// import global styling.
import './index.css';
// import Context
import Context from './Context';
// import realtime database from Firebase.
import { realTimeDb } from "./firebase";
import React from 'react';
// create App components.
function App() {
  // create loading state and share to other components.
  // loading state will be used to show / hide loading indicator.
  const [isLoading, setIsLoading] = useState(false);
  // user state contains authenticated user.
  const [user, setUser] = useState(null);
  // comet chat.
  const [cometChat, setCometChat] = useState(null);
  // selected from, selected to.
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  // created ride request.
  const [rideRequest, setRideRequest] = useState(null);
  // current ride.
  const [currentRide, setCurrentRide] = useState(null);

  const lookingDriverMaxTime = 30000;

  useEffect(() => {
    initAuthUser();
    initCometChat();
    initCurrentRide();
  }, []);

  useEffect(() => {
    if (rideRequest) {
      // create a timeout to trigger notification if there is no driver.
      const lookingDriverTimeout = setTimeout(() => {
        alert('Cannot find your driver, please re-enter your pickup location and try again');
        // remove the created ride.
        setRideRequest(null);
        // hide loading indicator.
        setIsLoading(false);
      }, lookingDriverMaxTime);
      // show loading indicator.
      setIsLoading(true);
      // check data changes from firebase real time database. If there is a driver accepted the request.
        const createdRideRef = realTimeDb.ref(`rides/${rideRequest.rideUuid}`);
        createdRideRef.on("value", (snapshot) => {
          const updatedRide = snapshot.val();
          if (updatedRide && updatedRide.rideUuid === rideRequest.rideUuid && updatedRide.driver) {
          // hide loading indicator.
            setIsLoading(false);
          // remove looking for driver timeout.
            clearTimeout(lookingDriverTimeout);
          // set rider request and created ride.
            setRideRequest(null);
          // set created ride.
           localStorage.setItem('currentRide', JSON.stringify(updatedRide));
          // set current Ride. 
            setCurrentRide(() => updatedRide);
        }
      });
    }
 }, [rideRequest]);

    
   useEffect(() => {
     if (currentRide) {
       const currentRideRef = realTimeDb.ref(`rides/${currentRide.rideUuid}`);
       currentRideRef.on("value", (snapshot) => {
         const updatedRide = snapshot.val();
        if (updatedRide && updatedRide.rideUuid === currentRide.rideUuid && updatedRide.driver && (updatedRide.status === -1 || updatedRide.status === 2)) {
  //         // remove localStorage.
           localStorage.removeItem('currentRide');
  //         // remove data from context.
           setCurrentRide(null);
  //         // reload window 
           window.location.reload();
        }
      });
    }
  }, [currentRide]);

  /**
   * init current ride
   */
  const initCurrentRide = () => {
    const currentRide = localStorage.getItem('currentRide');
    if (currentRide) { 
      setCurrentRide(() => JSON.parse(currentRide));
    }
  }

  /**
   * init auth user
   */
  const initAuthUser = () => { 
    const authenticatedUser = localStorage.getItem('auth');
    if (authenticatedUser) { 
      setUser(JSON.parse(authenticatedUser));
    }
  };

  /**
   * init comet chat.
   */
   const initCometChat = async () => {
    const { CometChat }  = await import('@cometchat-pro/chat');
    //const appID = `${process.env.REACT_APP_COMETCHAT_APP_ID}`;
    const appID = "24480181d01fd571";
    //const region = `${process.env.REACT_APP_COMETCHAT_REGION}`;
    const region = "eu";
    const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
    CometChat.init(appID, appSetting).then(
      () => {
        setCometChat(() => CometChat);
      },
      error => {
      }
    );
  }

// const appID = "APP_ID";
// const region = "REGION";
// const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
// CometChat.init(appID, appSetting).then(
//   () => {
//     console.log("Initialization completed successfully");
//     // You can now call login function.
//   },
//   error => {
//     console.log("Initialization failed with error:", error);
//     // Check the reason for error and take appropriate action.
//   }
// );
// let authKey = "AUTH_KEY";
// let uid = "user1";
// let name = "Kevin";

// let user = new CometChat.User(uid);
// user.setName(name);
// CometChat.createUser(user, authKey).then(
//     user => {
//         console.log("user created", user);
//     },error => {
//         console.log("error", error);
//     }
// )
// const authKey = "AUTH_KEY";
// const uid = "SUPERHERO1";

// CometChat.login(uid, authKey).then(
//   user => {
//     console.log("Login Successful:", { user });    
//   },
//   error => {
//     console.log("Login failed with exception:", { error });    
//   }
// );
  return (
    <Context.Provider value={{isLoading, setIsLoading, user, setUser, cometChat, selectedFrom, setSelectedFrom, selectedTo, setSelectedTo, rideRequest, setRideRequest, currentRide, setCurrentRide}}>
      <Router>
        <Routes >
          {/* Home Route */}
          <Route exact path="/" element = { <Home /> }></Route>
          <Route exact path="/chat" element = { <Chat /> }></Route>
          {/* <PrivateRoute exact path="/chat" element={ <Chat/> } /> */}
          {/* End Home Route */}
          {/* Login Route */}
          <Route exact path="/login" element = { <Login />}></Route>
          {/* End Login Route */}
        </Routes >
      </Router>
      {isLoading && <Loading />}
    </Context.Provider>
  );
}

export default App;
