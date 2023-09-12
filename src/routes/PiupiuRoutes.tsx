import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from ".";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { RequireAuth } from "../components/RequireAuth";
import { MainLayout } from "../pages/MainLayout";
import { Home } from "../pages/Home";
import { SinglePiupiu } from "../pages/SinglePiupiu";
import { ProfileLayout } from "../pages/ProfileLayout";
import { Profile } from "../pages/Profile";
import { useAuth } from "../contexts/Auth";

export const PiupiuRoutes = () => {
  const { loading, signedIn } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <Routes>
      {signedIn ? (
        <Route element={<RequireAuth />}>
          <Route element={<MainLayout />}>
            <Route path={routes.home} element={<Home pius="main" />} />
            <Route path={routes.stalking} element={<Home pius="stalking" />} />
            <Route path={routes.singlePiupiu()} element={<SinglePiupiu />} />
            <Route element={<ProfileLayout />}>
              <Route
                path={routes.userLikes()}
                element={<Profile postsRoute="likes" />}
              />
              <Route
                path={routes.profile()}
                element={<Profile postsRoute="posts" />}
              />
              <Route
                path="/*"
                element={<Navigate replace to={routes.home} />}
              />
            </Route>
          </Route>
        </Route>
      ) : (
        <>
          <Route path={"/*"} element={<Navigate replace to="/" />} />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.signup} element={<SignUp />} />
        </>
      )}
    </Routes>
  );
};
