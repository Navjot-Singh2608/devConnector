import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addLike, deletePost, removeLike } from "../../store/actions/post";
import formatDate from "../../utils/formatDate";

const PostItem = ({ post, id }) => {
  const { name, user, text, date, comments, avatar, likes } = post;
  const dispatch = useDispatch();

  const addLikePost = async () => {
    try {
      const { status, data } = await dispatch(addLike(id));
      if (status === 200) {
      }
    } catch (error) {}
  };

  const removeUserLike = async () => {
    try {
      const { status, data } = await dispatch(removeLike(id));
      if (status === 200) {
      }
    } catch (error) {}
  };

  const deleteUserPost = async () => {
    try {
      const { status, data } = await dispatch(deletePost(id));
      if (status === 200) {
        toast.success("Post deleted successfuly");
      }
    } catch (error) {}
  };

  const auth = useSelector((state) => state.auth);
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">Posted on {formatDate(date)}</p>

        <button
          onClick={() => addLikePost(id)}
          type="button"
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-up" />{" "}
          <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
        </button>
        <button
          onClick={() => removeUserLike()}
          type="button"
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-down" />
        </button>
        <Link to={`/posts/${id}`} className="btn btn-primary">
          Discussion{" "}
          {comments.length > 0 && (
            <span className="comment-count">{comments.length}</span>
          )}
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={() => deleteUserPost()}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PostItem;
