import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteEducation } from "../../store/actions/profile";
import formatDate from "../../utils/formatDate";

const Education = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.profile);

  const deleteUserEducation = async (id) => {
    try {
      const { status, data } = await dispatch(deleteEducation(id));
      if (status === 200) {
        toast.success("Experience deleted successfully");
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      }
    } catch (error) {}
  };

  const educations = useMemo(
    () =>
      profile?.education?.map((edu) => (
        <tr key={edu._id}>
          <td>{edu.school}</td>
          <td className="hide-sm">{edu.degree}</td>
          <td>
            {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : "Now"}
          </td>
          <td>
            <button
              onClick={() => deleteUserEducation(edu._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      )),
    [profile?.education]
  );

  return (
    <div>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </div>
  );
};

export default Education;
