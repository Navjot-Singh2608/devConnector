import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../store/actions/post";
import Postform from "./Postform";
import PostItem from "./PostItem";

const Posts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, loading } = useSelector((state) => state.post);

  const getUsersPosts = async () => {
    await dispatch(getPosts());
  };

  useEffect(() => {
    getUsersPosts();
  }, []);
  return (
    <section className="container">
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <Postform />
      <div className="posts">
        {posts && posts?.map((post) => <PostItem id={post._id} post={post} />)}
      </div>
    </section>
  );
};

export default Posts;
