import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getProfileById } from "../../store/actions/profile";
import Spinner from "../layout/Spinner";
import ProfileAbout from "./ProfileAbout";
import ProfileTop from "./ProfileTop";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";

const Profile = () => {
  const { id } = useParams(); // id1 and id2 will be the two IDs
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const auth = useSelector((state) => state.auth);

  const getUserProfile = async () => {
    const { status, data } = await dispatch(getProfileById(id));
    if (status === 200) {
      setProfile(data);
    }
  };

  useEffect(() => {
    if (id) {
      getUserProfile();
    }
  }, [id]);

  return (
    <section className="container">
      {Object.keys(profile).length === 0 ? (
        <Spinner />
      ) : (
        <div>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <div>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </div>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <div>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </div>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>

            {/* {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )} */}
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
