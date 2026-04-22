// 1. Libraries
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { Outlet } from "react-router-dom";
import { useTheme } from "styled-components";

// 2. Redux
import { logOut } from "../../redux/auth/operationsAuth";
import { selectStudyUI } from "../../redux/study/studySelectors";
import { clearDocuments } from "../../redux/documents/documentsSlise";
import { clearGallery } from "../../redux/gallery/gallerySlise";
import { fetchDocuments } from "../../redux/documents/operationsDocuments";
import { fetchGalleryImages } from "../../redux/gallery/operationsGallery";
import { fetchAvailableTopics } from "../../redux/study/operationsStudy";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/authSelectors";

// 3. Components & UI
import { ChangePassword } from "../../components/ChangePassword/ChangePassword";
import { MiniBarProgress } from "../../components/MiniBarProgress/MiniBarProgress";
import { Modal } from "../../components/Modal/Modal";
import { PageBackground } from "../../components/PageBackground/PageBackground";
import { DocumentMiniBar } from "../../components/DocumentMiniBar/DocumentMiniBar";
import { UserProfileDetailed } from "../../components/UserProfileDetailed/UserProfileDetailed";
import { HeroDescription } from "../../components/HeroDescription/HeroDescription";
import { Login } from "../../components/Login/Login";
import { Register } from "../../components/Register/Register";
import { StyledButton } from "../../components/Buttons/Button";

// 4. Helpers, Hooks & API
import { useStudy } from "../../helpers/hooks";
import { countryOptions } from "../../helpers/constant";
import { tabVariants, containerVariants } from "../../helpers/animations";

// 5. Styled Components
import {
  GiantTitle,
  AnimatedDescWrapper,
  TabsWrapper,
  TabButton,
  TabItem,
  ActiveLine,
  FormMotionWrapper,
  HomeContentContainer,
  HomePageSection,
  ProfileWrapper,
  ProfileAvatar,
  ProfileInfo,
  ProfileEmail,
  ProfileActions,
  ProfileAvatarWrap,
  MiniProgressRow,
  MotionContent,
} from "./Home.styled";

const Home = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const studyData = useStudy();

  const user = useSelector(selectUser);
  const ui = useSelector(selectStudyUI);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [activeTab, setActiveTab] = useState("login");
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;

    countryOptions.forEach(({ value }) => {
      dispatch(fetchDocuments(value));
    });

    dispatch(fetchGalleryImages({ page: 1, limit: 1 }));
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchAvailableTopics({ level: ui.level || "A1" }));
    }
  }, [dispatch, isLoggedIn, ui.level]);

  const handleLogout = async () => {
    try {
      await dispatch(logOut()).unwrap();
    } finally {
      dispatch(clearDocuments());
      dispatch(clearGallery());
    }
  };

  const handleLogoutWithCloseProfile = () => {
    handleLogout();
    setIsUserProfileOpen(false);
  };

  return (
    <HomePageSection>
      <PageBackground
        desktopBg={theme.images.home}
        mobileBg={theme.images.homeMobile}
      />
      <HomeContentContainer>
        <GiantTitle>Denmark</GiantTitle>
        <HeroDescription />

        <AnimatedDescWrapper
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {!isLoggedIn ? (
            <FormMotionWrapper>
              <TabsWrapper>
                {["login", "register"].map((tab) => (
                  <TabItem key={tab} onClick={() => setActiveTab(tab)}>
                    <TabButton $active={activeTab === tab}>
                      {tab === "login" ? "Login" : "Register"}
                    </TabButton>
                    {activeTab === tab && <ActiveLine layoutId="underline" />}
                  </TabItem>
                ))}
              </TabsWrapper>

              <AnimatePresence mode="wait">
                <MotionContent
                  key={activeTab}
                  variants={tabVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {activeTab === "login" ? <Login /> : <Register />}
                </MotionContent>
              </AnimatePresence>
            </FormMotionWrapper>
          ) : (
            <FormMotionWrapper>
              <ProfileWrapper>
                <ProfileInfo>
                  <ProfileEmail title={user.email}>{user.email}</ProfileEmail>

                  <MiniProgressRow>
                    {countryOptions.map((option) => (
                      <DocumentMiniBar key={option.value} option={option} />
                    ))}

                    <MiniBarProgress
                      label={`Study ${studyData.currentLevel}`}
                      percent={studyData.actualPercentProgress}
                    />
                  </MiniProgressRow>

                  <ProfileActions>
                    <StyledButton onClick={() => setIsUserProfileOpen(true)}>
                      Profile
                    </StyledButton>
                    <StyledButton onClick={handleLogout}>Logout</StyledButton>
                  </ProfileActions>
                </ProfileInfo>
                <AnimatePresence mode="wait">
                  <ProfileAvatarWrap
                    key="user-avatar"
                    variants={tabVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <ProfileAvatar
                      src={user.avatar}
                      alt="User avatar"
                      referrerPolicy="no-referrer"
                    />
                  </ProfileAvatarWrap>
                </AnimatePresence>
              </ProfileWrapper>
            </FormMotionWrapper>
          )}
        </AnimatedDescWrapper>
      </HomeContentContainer>

      <Modal
        isOpen={isUserProfileOpen}
        onClose={() => setIsUserProfileOpen(false)}
        title="User Profile"
      >
        <UserProfileDetailed
          studyData={studyData}
          documentsData={countryOptions}
          onClose={() => setIsUserProfileOpen(false)}
          openChangePassword={() => setIsChangePasswordOpen(true)}
          onLogout={handleLogoutWithCloseProfile}
        />
      </Modal>

      <Modal
        isOpen={isChangePasswordOpen}
        isSmall
        onClose={() => setIsChangePasswordOpen(false)}
        title="Change Password"
      >
        <ChangePassword
          onClose={() => setIsChangePasswordOpen(false)}
          onCloseProfile={() => setIsUserProfileOpen(false)}
          onSuccess={() => {
            setIsUserProfileOpen(false);
            setActiveTab("login");
          }}
        />
      </Modal>

      <Outlet />
    </HomePageSection>
  );
};

export default Home;
