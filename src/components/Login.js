// import useRef and useContext
import 'firebase/database'
import { useRef, useContext } from "react";
// import Context to get shared data from React context.
import Context from "../Context";
// import firebase authentication and real time database.
import { db, auth, realTimeDb } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth"
import { ref } from "firebase/database"
import firebase from 'firebase/compat/app'
// import validator to validate user's credentials.
import validator from "validator";
// import custom components.
import withModal from "./Modal";
import SignUp from "./SignUp";
// import navigate
import { useNavigate } from 'react-router-dom';
// import logo 
//import logoBlack from '../logo_black.png';
import bloblocor from '../bloblocor.png';

function Login(props) {
  // get shared data from context.
  const { setUser, setIsLoading, cometChat } = useContext(Context);
  // get toggle modal function from withModal - higher order component.
  const { toggleModal } = props;
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // create ref to get user's email and user's password.
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  /**
   * validate user's credentials.
   * @param {*} email 
   * @param {*} password  
   * @returns 
   */
  const isUserCredentialsValid = (email, password) => {
    return validator.isEmail(email) && password;
  };

  /**
   * login
   */
  const login = () => {

    setIsLoading(true);

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    //const auth = getAuth();

    console.log(email, password);

      signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const userEmail = userCredential.user.email;
        
        if (isUserCredentialsValid(email, password)) {
          //const userRef = ref(realTimeDb, 'users');
          //const userRef = ref(realTimeDb);
          // const userRef = "https://bloblocor-f56ab-default-rtdb.firebaseio.com/users"
          // console.log(userRef, realTimeDb);
          firebase.database().ref().child('users').orderByChild('email').equalTo(userEmail).on("value", function(snapshot) {
            const val = snapshot.val();
            if (val) {
              const keys = Object.keys(val);
              const user = val[keys[0]];
              cometChat.login(user.id, "acbd9af1d08f7723c91675770d8d4598f9314c04").then(
                User => {
          localStorage.setItem('auth', JSON.stringify(userEmail));
          setUser(userEmail);
          setIsLoading(false);
          navigate('/')
            }
          );
       }
      });
    }
 })
}
        // realTimeDb.ref().child('users').orderByChild('email').equalTo(userEmail).on("value", function(snapshot) {
        //        const val = snapshot.val();
        //        if (val) {
        //          const keys = Object.keys(val);
        //          const user = val[keys[0]];
        //          console.log(keys, user);
               // login cometchat.
               //cometChat.login(user.id, `${process.env.REACT_APP_COMETCHAT_AUTH_KEY}`).then(
  //              cometChat.login(user.id, "acbd9af1d08f7723c91675770d8d4598f9314c04" ).then(
  //                User  => {
  //                 // User logged in successfully.
  //                 // save authenticated user to local storage.
  //                  localStorage.setItem('auth', JSON.stringify(user));
  //                 // save authenticated user to context.
  //                  setUser(user);
  //                 // hide loading.
  //                  setIsLoading(false);
  //                 // redirect to home page.
  //                 navigate('/');
  //                 console.log(user)
  //                }
  //,
  //               error => {
  //                 " User login failed, check error and take appropriate action."
  //               }
  //              );
  //             }
  //          });
  //        })
  //       .catch((error) => {      
  //         // hide loading indicator.
  //         setIsLoading(false);
  //         alert(`Your username or password is not correct`);
  //       });
  //   } else {
  //     // hide loading indicator.
  //     setIsLoading(false);
  //     alert(`Your username or password is not correct`);
  //    }
  //  };

  return (
    <div className="login__container">
      <div className="login__welcome">
        <div className="login__logo">
          <img src={bloblocor} alt="Uber Clone" />
        </div>
        <p>Get moving with BlobloCor</p>
      </div>
      <div className="login__form-container">
        <div className="login__form">
          <input
            type="text"
            placeholder="Email or Username"
            ref={emailRef}
          />
          <input type="password" placeholder="Password"
           ref={passwordRef }
           />
          <button className="login__submit-btn" onClick={login}>
            Login
          </button>
          <span className="login__forgot-password">Forgot password?</span>
          <span className="login__signup" onClick={() => toggleModal(true)}>Create New Account</span>
        </div>
      </div>
    </div>
  )
};
export default withModal(SignUp)(Login);