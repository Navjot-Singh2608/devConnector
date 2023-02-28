import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import "./App.css";
// Redux
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store/store";

// Toastr
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./store/actions/auth";
import Dashboard from "./components/dashboard/Dashboard";
import { LOGOUT } from "./store/actions/types";
import AuthRoute from "./components/routing/AuthRoute";
import ProfileForm from "./components/profile-forms/ProfileForm";
import AddEducation from "./components/profile-forms/AddEducation";
import AddExperience from "./components/profile-forms/AddExperience";
import Profiles from "./components/profiles/Profiles";
import ProfileItem from "./components/profiles/ProfileItem";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import NotFound from "./components/layout/NotFound";
import Post from "./components/post/Post";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // const dispatch = useDispatch();

  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profiles" element={<Profiles />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route
            path="dashboard"
            element={<AuthRoute component={Dashboard} />}
          />
          <Route
            path="createProfile"
            element={<AuthRoute component={ProfileForm} />}
          />
          <Route
            path="addEducation"
            element={<AuthRoute component={AddEducation} />}
          />
          <Route
            path="addExperience"
            element={<AuthRoute component={AddExperience} />}
          />
          <Route
            path="EditProfile"
            element={<AuthRoute component={ProfileForm} />}
          />
          <Route path="posts" element={<AuthRoute component={Posts} />} />
          <Route path="posts/:id" element={<AuthRoute component={Post} />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
