import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteAccount, getCurrentProfile } from "../../store/actions/profile";
import DashboardActions from "./DashboardAction";
import Education from "./Education";
import Experience from "./Experience";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);

  const deleteUserAccount = async () => {
    await dispatch(deleteAccount());
  };

  return (
    <section className="container">
      <section className="container">
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user" /> Welcome {user && user.name}
        </p>
        {profile !== null ? (
          <div>
            <DashboardActions />
            <Experience />
            <Education />

            <div className="my-2">
              <button
                className="btn btn-danger"
                onClick={() => deleteUserAccount()}
              >
                <i className="fas fa-user-minus" /> Delete My Account
              </button>

              <Link to="/createProfile" className="btn btn-primary my-1">
                Edit Profile
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/createProfile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </div>
        )}
      </section>
    </section>
  );
};

export default Dashboard;
