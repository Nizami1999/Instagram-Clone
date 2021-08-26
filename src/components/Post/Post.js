import React, { useState, useEffect } from "react";
import "./Post.scss";
import hamburger from "../../images/horizontal-hamburger.png";
import likeLogo from "../../images/logo-likes.png";
import commentLogo from "../../images/logo-comment.png";
import sendLogo from "../../images/logo-send.png";
import saveLogo from "../../images/logo-save.png";
import { db } from "../../firebase";
import firebase from "firebase";
import swal from "sweetalert";
import Swal from "sweetalert2";

function Post({ userImg, username, postImg, likes, context, postId, user }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (user) {
      db.collection("posts").doc(postId).collection("comments").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        text: comment,
        username: user.displayName,
      });

      setComment("");
    } else {
      setComment("");

      swal(
        "Oops",
        "Please sign in or sign up to leave a comments 😄",
        "warning"
      );
    }
  };

  const handleLikes = (id) => {
    if (user) {
      db.collection("posts")
        .doc(id)
        .set(
          {
            likes: firebase.firestore.FieldValue.increment(1),
          },
          { merge: true }
        );
    } else {
      Swal.fire("Oops...", "You have to login first", "warning");
    }
  };

  const handleDetails = (e, postId) => {
    e.preventDefault();

    Swal.fire({
      title: "Do you want to delete this post?",
      showCancelButton: true,
      confirmButtonText: `Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (user) {
          debugger;
          if (user.displayName === username) {
            db.collection("posts")
              .doc(postId)
              .delete()
              .then(() => {
                Swal.fire("Deleted", "", "success");
              })
              .catch((error) => {
                Swal.fire("Oops...", `${error.message}`, "error");
              });
          } else {
            Swal.fire("Hey!", "You can delete only your own posts!", "error");
          }
        } else {
          Swal.fire("Oops...", "You have to login first!", "error");
        }
      }
    });
  };

  return (
    <div className="post">
      <div className="post__header">
        <div className="post__header-user">
          <img src={userImg} alt="user-img" />
          <h6>{username}</h6>
        </div>
        <a onClick={(e) => handleDetails(e, postId)}>
          <img src={hamburger} alt="icon-h" />
        </a>
      </div>
      <div className="post__main">
        <img src={postImg} alt="post-image" />
      </div>
      <div className="post__footer">
        <div className="post__footer__main">
          <div className="post__footer__top">
            <div className="post__footer__top-left">
              <img
                src={likeLogo}
                alt="likes"
                onClick={() => handleLikes(postId)}
              />
              <img src={commentLogo} alt="comments" />
              <img src={sendLogo} alt="send" />
            </div>
            <div className="post__footer__top-right">
              <img src={saveLogo} alt="save" />
            </div>
          </div>
          <div className="post__footer__like">
            <h6>{likes} likes</h6>
          </div>
          <div className="post__footer__context">
            <h6>
              {username} <span>{context}</span>
            </h6>
          </div>
          <div className="post__footer__comments">
            <h6>Comments:</h6>
            {comments.map((c) => (
              <div className="post__footer__comments-comment">
                <h6>
                  <strong>{c.username}</strong> <span>{c.text}</span>
                </h6>
              </div>
            ))}
          </div>
        </div>
        <div className="post__footer__bottom">
          <form action="" onSubmit={submitHandler}>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Добавьте комментарий..."
            />
            <button type="submit">Опубликовать</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Post;
