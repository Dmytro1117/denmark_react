// 1. Libraries
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

// 2. Redux
import {
  selectStudyUI,
  selectAvailableTopics,
  selectStudyWords,
  selectStudyWordIndex,
  selectStudySession,
  selectAvailableTopicsLoading,
  selectStudyWordsLoading,
  selectStudyAnswerLoading,
  selectStudyError,
  selectStudyAvailableError,
} from "../../redux/study/studySelectors";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
  selectToken,
} from "../../redux/auth/authSelectors";
import {
  fetchAvailableTopics,
  fetchWords,
  sendAnswer,
} from "../../redux/study/operationsStudy";
import {
  setLevel,
  openTopic,
  openRepeat,
  nextWord,
  sessionResult,
  resetSession,
} from "../../redux/study/studySlice";

// 3. Components & UI
import { EmptyPage } from "../../components/EmptyPage/EmptyPage";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { ServerError } from "../../components/ServerError/ServerError";
import { PagesTabs } from "../../components/PagesTabs/PageTabs";
import { StudySession } from "../../components/StudySession/StudySession";
import { Loader } from "../../components/Loader/Loader";
import { PageBackground } from "../../components/PageBackground/PageBackground";
import { Modal } from "../../components/Modal/Modal";
import { StyledButton } from "../../components/Buttons/Button";

// 4. Helpers, Hooks & API
import { useStudy } from "../../helpers/hooks";
import { levelOptions } from "../../helpers/constant";
import { containerVariants, stydyItemVariants } from "../../helpers/animations";

// 5. Styled Components
import {
  PageSection,
  PageContainer,
  PageTitle,
} from "../../commonStyles/Page.styled";
import {
  DataGrid,
  DataItem,
  TopicText,
  TopicNote,
  StudyTabsWrapper,
} from "./Study.styled";

export const Study = () => {
  const dispatch = useDispatch();
  const { actualPercentProgress, topics } = useStudy();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const token = useSelector(selectToken);
  const ui = useSelector(selectStudyUI);
  const availableTopics = useSelector(selectAvailableTopics);
  const words = useSelector(selectStudyWords);
  const wordIndex = useSelector(selectStudyWordIndex);
  const session = useSelector(selectStudySession);
  const isAvailableTopicsLoading = useSelector(selectAvailableTopicsLoading);
  const isWordsLoading = useSelector(selectStudyWordsLoading);
  const isAnswerLoading = useSelector(selectStudyAnswerLoading);
  const error = useSelector(selectStudyError);
  const availableError = useSelector(selectStudyAvailableError);

  const [modalOpen, setModalOpen] = useState(false);
  const [showDa, setShowDa] = useState(false);
  const [showUk, setShowUk] = useState(false);

  const currentWord = words[wordIndex] || null;

  const activeErrorMessage =
    availableError?.message || availableError || error?.message || error;

  const activeLevelOption = levelOptions.find((opt) => opt.value === ui.level);
  const currentLevelColor = activeLevelOption?.color || levelOptions[0].color;

  useEffect(() => {
    if (!isLoggedIn || ui.level) return;
    const defaultLevel = levelOptions[0].value;

    dispatch(setLevel(defaultLevel));
    dispatch(fetchAvailableTopics({ level: defaultLevel }));
  }, [dispatch, isLoggedIn, ui.level]);

  useEffect(() => {
    setShowDa(false);
    setShowUk(false);
  }, [currentWord?._id]);

  const handlePickLevel = (selectedLevel) => {
    dispatch(setLevel(selectedLevel));
    dispatch(fetchAvailableTopics({ level: selectedLevel }));
  };

  const handleStartSession = async (mode, selectedTopic = null) => {
    if (!ui.level) return;

    if (mode === "topic") {
      dispatch(openTopic(selectedTopic));
    } else {
      dispatch(openRepeat());
    }

    dispatch(resetSession());

    // Чекаєм завантаження слів перед відкриттям модалки
    try {
      await dispatch(
        fetchWords({ mode, level: ui.level, topicName: selectedTopic }),
      ).unwrap();
      setModalOpen(true);
    } catch (err) {}
  };

  const handleAnswer = async (selectedResult) => {
    if (!currentWord || isAnswerLoading) return;

    try {
      //  Чекаєм відповідь від сервера
      await dispatch(
        sendAnswer({
          wordId: currentWord._id,
          result: selectedResult,
          mode: ui.mode,
        }),
      ).unwrap();

      // Тільки якщо сервер сказав "ОК" — оновлюємо локальний прогрес і йдемо далі
      dispatch(sessionResult(selectedResult));
      dispatch(nextWord());
    } catch (err) {}
  };

  const handleCloseModal = () => {
    setModalOpen(false);

    setShowDa(false);
    setShowUk(false);

    dispatch(resetSession());

    if (ui.level) dispatch(fetchAvailableTopics({ level: ui.level }));
  };

  const disabled = isWordsLoading || isAnswerLoading;
  const authPending = isRefreshing || (token && !isLoggedIn);
  const repeatTotal = availableTopics?.repeat?.wordsInRepeat ?? 0;
  const isInitialLoading = isAvailableTopicsLoading && topics.length === 0;

  return (
    <PageSection>
      <PageBackground />
      <PageContainer>
        <PageTitle>Study</PageTitle>

        {(authPending || isInitialLoading) && !activeErrorMessage ? (
          <Loader fullscreen={false} />
        ) : !isLoggedIn ? (
          <EmptyPage
            title="Not Authorized"
            text="Please log in to start learning"
          />
        ) : (
          <>
            <ProgressBar
              percent={actualPercentProgress}
              customColor={currentLevelColor}
            />

            <StudyTabsWrapper>
              {!activeErrorMessage && !isInitialLoading && (
                <>
                  <PagesTabs
                    options={levelOptions}
                    activeValue={ui.level}
                    onChange={handlePickLevel}
                    containerProps={{
                      disabled: disabled || isAvailableTopicsLoading,
                    }}
                  />

                  {repeatTotal > 0 && !isAvailableTopicsLoading && (
                    <StyledButton
                      onClick={() => handleStartSession("repeat")}
                      disabled={!ui.level || disabled}
                      title="Review"
                    >
                      Review{" "}
                      {
                        levelOptions.find((opt) => opt.value === ui.level)
                          ?.label
                      }
                    </StyledButton>
                  )}
                </>
              )}
            </StudyTabsWrapper>

            <AnimatePresence mode="wait">
              <DataGrid
                key={ui.level}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {topics.map((t, idx) => (
                  <DataItem
                    key={t.topic}
                    custom={idx}
                    $activeColor={currentLevelColor}
                    variants={stydyItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={() => handleStartSession("topic", t.topic)}
                  >
                    <span>TOPIC</span>
                    <TopicText>{t.topic}</TopicText>
                    <TopicNote>Total words: {t.totalWords}</TopicNote>
                  </DataItem>
                ))}
              </DataGrid>
            </AnimatePresence>
          </>
        )}
      </PageContainer>

      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={ui.mode === "repeat" ? "Review" : ui.topic}
        isSmall
      >
        <StudySession
          words={words}
          wordIndex={wordIndex}
          session={session}
          currentWord={currentWord}
          uiMode={ui.mode}
          onAnswer={handleAnswer}
          onClose={handleCloseModal}
          showDa={showDa}
          setShowDa={setShowDa}
          showUk={showUk}
          setShowUk={setShowUk}
          serverError={error}
        />
      </Modal>

      <ServerError error={activeErrorMessage} isVisible={!modalOpen} />
    </PageSection>
  );
};

export default Study;
