import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addPost } from "../../store/actions/post";

const Postform = () => {
  const dispatch = useDispatch();
  const [postComment, setPostComment] = useState("");

  const addUserPost = async () => {
    if (postComment === "") {
      toast.error("Comment can not be empty.");
      return;
    }
    const response = await dispatch(addPost(postComment));
    if (response?.status === 200) {
      toast.success("Comment added successfully.");
    }
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form className="form my-1">
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={postComment}
          onChange={(e) => setPostComment(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={() => addUserPost()}
          className="btn btn-dark my-1"
        >
          submit
        </button>
        {/* <input
          type="submit"
         
          value="Submit"
        /> */}
      </form>
    </div>
  );
};

export default Postform;
