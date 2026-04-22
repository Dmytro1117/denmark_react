// 1. Libraries
import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";

// 2. Redux
import { refreshUser } from "../redux/auth/operationsAuth";
import { selectIsRefreshing } from "../redux/auth/authSelectors.js";

// 3. Components & UI
import { Layout } from "../components/Layout/Layout";
import { Loader } from "./Loader/Loader";
import { ResetPassword } from "../components/ResetPassword/ResetPassword";
import { VerifyEmail } from "../components/VerifyEmail/VerifyEmail.jsx";
import { ResendEmail } from "../components/ResendEmail/ResendEmail.jsx";

// 4. Lazy Pages
const Home = lazy(() => import("../pages/Home/Home"));
const AboutUs = lazy(() => import("../pages/AboutUs/AboutUs"));
const Map = lazy(() => import("../pages/Map/Map"));
const Gallery = lazy(() => import("../pages/Gallery/Gallery"));
const Documents = lazy(() => import("../pages/Documents/Documents"));
const Study = lazy(() => import("../pages/Study/Study"));

export function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) return <Loader />;

  return (
    <>
      <Suspense fallback={<Loader fullscreen={true} />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />}>
              <Route
                path="verify-email/:verificationToken"
                element={<VerifyEmail />}
              />
              <Route path="resend-email" element={<ResendEmail />} />
              <Route
                path="reset-password/:resetToken"
                element={<ResetPassword />}
              />
            </Route>

            <Route path="/about" element={<AboutUs />} />
            <Route path="/map" element={<Map />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/study" element={<Study />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
