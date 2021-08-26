import { Button } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { db, storage } from "./firebase";
import firebase from "firebase";
import swal from "sweetalert";

const ImageUpload = ({ username }) => {
  const [context, setContext] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    // sometimes you might select 1+ images, therefore we pick only first
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image) {
      const uploadTask = storage
        .ref(`images/${image.name}`) // new Date().valueOf() ---> for getting unique name
        .put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress function
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          // Error function
          swal("Oops", `${error.message}`, "error");
        },
        () => {
          // Complete function...
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              // post image inside db
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                context: context,
                postImg: url,
                username: username,
              });

              setProgress(0);
              setContext("");
              setImage(null);
            });
        }
      );
    } else {
      swal("Hey!", "Please select an image to upload it...", "warning");
    }
  };

  return (
    <div className="conatiner image-upload">
      <progress style={{ width: "100%" }} value={progress} max="100"></progress>
      <textarea
        rows="6"
        className="caption"
        type="text"
        placeholder="Enter a caption... 🚀"
        onChange={(e) => setContext(e.target.value)}
        value={context}
      />
      <input type="file" onChange={handleChange} />
      <button className="upload-btn" onClick={handleUpload}>
        Upload
      </button>
      <br />
    </div>
  );
};

export default ImageUpload;
