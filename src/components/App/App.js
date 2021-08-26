import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import "./App.scss";
import { db, auth } from "../../firebase";
import instagramLogo from "../../images/instagram-logo.png";
import swal from "sweetalert";

// Modal imports
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

// Modal styles
const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #efefef",
  },
}));

function App() {
  // Modal
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenSignIn = () => {
    setOpenSignIn(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSignIn = () => {
    setOpenSignIn(false);
  };

  // Posts state
  const [posts, setPosts] = useState([]);

  // Getting posts from firebase
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      });
  }, []);

  // Authentication
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [user, setUser] = useState(null);

  // Sign Up
  const signUp = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        handleClose();
        swal("Well done!", "You have successfully registered.", "success");
        handleClose();
        setEmail(null);
        setPassword(null);
        setUsername(null);

        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((err) => {
        swal("Oops... 🚫", `${err.message}`, "error");
      });
  };

  // Sign In
  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        swal("Welcome back! 🚀", "You have successfully signed in", "success");
        handleCloseSignIn();
        setEmail(null);
        setPassword(null);
        setUsername(null);
      })
      .catch((err) => {
        swal("Oops...", `${err.message}`, "error");
      });
  };

  useEffect(() => {
    // if you login if you logout if you create user it will be produces
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in
        setUser(authUser);
      } else {
        // user has logged out
        setUser(null);
      }
    });

    return () => {
      // perform some cleanup functions
      unsubscribe();
    };
  }, [user, username]);

  return (
    <div>
      <Header />
      <Main
        posts={posts}
        handleOpen={handleOpen}
        handleOpenSignIn={handleOpenSignIn}
        user={user}
      />

      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="my-modal">
            <div className="logo">
              <img src={instagramLogo} alt="insta-logo" />
            </div>
            <form>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="username"
                placeholder="Username"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="email"
                placeholder="Email"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="password"
                placeholder="Password"
              />
              <button type="submit" onClick={signUp} className="btn-login">
                Sign Up
              </button>
            </form>
          </div>
        </Fade>
      </Modal>
      <Modal
        className={classes.modal}
        open={openSignIn}
        onClose={handleCloseSignIn}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openSignIn}>
          <div className="my-modal">
            <div className="logo">
              <img src={instagramLogo} alt="insta-logo" />
            </div>
            <form>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="email"
                placeholder="Email"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="password"
                placeholder="Password"
              />
              <button type="submit" onClick={signIn} className="btn-login">
                Sign In
              </button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default App;
