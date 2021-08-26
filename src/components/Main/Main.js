import React from "react";
import "./Main.scss";
import historyItem from "../../images/history-item-1.png";
import Post from "../Post/Post";
import userImg from "../../images/nizami-user.png";
import { auth } from "../../firebase";
import swal from "sweetalert";
import ImageUpload from "../../imageUpload";

function Main({ posts, handleOpen, handleOpenSignIn, user }) {
  return (
    <main className="main container">
      <div className="main__left">
        {/* <div className="histories">
          <div className="histories__item">
            <img src={userImg} alt="history-item" />
            <h6>a.nizami_99</h6>
          </div>
          <div className="histories__item">
            <img src={historyItem} alt="history-item" />
            <h6>gusein_ga...</h6>
          </div>
          <div className="histories__item">
            <img src={historyItem} alt="history-item" />
            <h6>gusein_ga...</h6>
          </div>
          <div className="histories__item">
            <img src={historyItem} alt="history-item" />
            <h6>gusein_ga...</h6>
          </div>
          <div className="histories__item">
            <img src={historyItem} alt="history-item" />
            <h6>gusein_ga...</h6>
          </div>
          <div className="histories__item">
            <img src={historyItem} alt="history-item" />
            <h6>gusein_ga...</h6>
          </div>
          <div className="histories__item">
            <img src={historyItem} alt="history-item" />
            <h6>gusein_ga...</h6>
          </div>
          <div className="histories__item">
            <img src={historyItem} alt="history-item" />
            <h6>gusein_ga...</h6>
          </div>
          <div className="histories__item">
            <img src={historyItem} alt="history-item" />
            <h6>gusein_ga...</h6>
          </div>
        </div> */}
        <div className="posts">
          {posts.map(({ id, post }) => {
            const {
              userImg = "https://www.sport24.az/frontend/web/upload/users/default.png",
              username,
              postImg,
              likes = 0,
              context,
            } = post;
            return (
              <Post
                key={id}
                user={user}
                postId={id}
                userImg={userImg}
                username={username}
                postImg={postImg}
                likes={likes}
                context={context}
                likes={likes}
              />
            );
          })}
        </div>
      </div>
      <div className="main__right">
        {user && (
          <div className="user__details">
            <img
              src="https://www.sport24.az/frontend/web/upload/users/default.png"
              alt="user-img"
            />
            <h6>{user.displayName}</h6>
          </div>
        )}

        {user ? (
          <button
            className="btn-login"
            onClick={() => {
              auth.signOut();
              swal("See you soon 👋!", `You have logged out.`, "success");
            }}
          >
            Log out
          </button>
        ) : (
          <>
            <button className="btn-login" onClick={handleOpenSignIn}>
              Sign In
            </button>
            <button className="btn-login" onClick={handleOpen}>
              Sign Up
            </button>
          </>
        )}

        {user ? (
          <div className="image-upload">
            <ImageUpload username={user.displayName} />
          </div>
        ) : (
          <h6 className="sorry-message">
            Sorry, you need to log in to upload! 🙅‍♂️
          </h6>
        )}
      </div>
    </main>
  );
}

export default Main;
