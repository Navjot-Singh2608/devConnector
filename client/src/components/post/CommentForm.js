import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addComment } from "../../store/actions/post";

const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { post, loading } = useSelector((state) => state.post);
  const [comment, setComment] = useState("");

  const addUserComment = async () => {
    await dispatch(addComment(postId, comment));
    setComment("");
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a Comment</h3>
      </div>
      <form className="form my-1">
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment the post"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={() => addUserComment()}
          className="btn btn-dark my-1"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
