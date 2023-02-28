import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteExperience } from "../../store/actions/profile";
import formatDate from "../../utils/formatDate";

const Experience = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.profile);

  const deleteUserExperience = async (id) => {
    try {
      const { status, data } = await dispatch(deleteExperience(id));
      if (status === 200) {
        toast.success("Experience deleted successfully");
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      }
    } catch (error) {}
  };

  const experiences = useMemo(
    () =>
      profile?.experience?.map((exp) => (
        <tr key={exp?._id}>
          <td>{exp?.company}</td>
          <td className="hide-sm">{exp?.title}</td>
          <td>
            {formatDate(exp?.from)} - {exp?.to ? formatDate(exp?.to) : "Now"}
          </td>
          <td>
            <button
              onClick={() => deleteUserExperience(exp._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      )),
    [profile?.experience]
  );

  return (
    <div>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </div>
  );
};

export default Experience;
