import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";

const AuthRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) return <Spinner />;
  if (isAuthenticated) return <Component />;

  return <Link to="/login" />;
};

export default AuthRoute;
