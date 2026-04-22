// 1. Libraries
import { useSelector } from "react-redux";

// 2. Redux
import { selectStudyAnswerLoading } from "../../redux/study/studySelectors";

// 3. Components & UI
import { StyledButton } from "../Buttons/Button";
import { Loader } from "../Loader/Loader";
import { GlobalError } from "../GlobalError/GlobalError";

// 4. Styled Components
import {
  ModalContentWrapper,
  ModalHint,
} from "../../commonStyles/ModalNotification.styled";
import { SharedActions } from "../../commonStyles/Form.styled";
import {
  WordMain,
  SummaryTitle,
  SummaryScore,
  TranslationBox,
} from "./StudySession.styled";

export const StudySession = ({
  words,
  wordIndex,
  session,
  currentWord,
  uiMode,
  onAnswer,
  onClose,
  showDa,
  setShowDa,
  showUk,
  setShowUk,
  serverError,
}) => {
  const isAnswerLoading = useSelector(selectStudyAnswerLoading);

  if (session.isFinished) {
    return (
      <ModalContentWrapper>
        <SummaryTitle>
          {uiMode === "repeat" ? "Replay is complete!" : "Topic completed!"}
        </SummaryTitle>
        <SummaryScore>
          Result: <span>{session.correct}</span> / {words.length}
        </SummaryScore>
        <SharedActions>
          <StyledButton onClick={onClose}>Close</StyledButton>
        </SharedActions>
      </ModalContentWrapper>
    );
  }

  if (!currentWord) return <Loader />;

  const resultFieldError = serverError?.fields?.result || null;
  const modeFieldError = serverError?.fields?.mode || null;

  const generalError =
    !resultFieldError && !modeFieldError ? serverError?.message : null;

  const { en, da, uk, _id } = currentWord;
  const currentCount = wordIndex + 1;
  const totalCount = words.length;

  return (
    <ModalContentWrapper>
      <ModalHint>
        {currentCount} / {totalCount}
      </ModalHint>

      <WordMain
        key={_id}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {en}
      </WordMain>

      <TranslationBox $active={showDa} onClick={() => setShowDa(!showDa)}>
        <span className="label">Danish</span>
        <span className="value">{da}</span>
      </TranslationBox>

      <TranslationBox $active={showUk} onClick={() => setShowUk(!showUk)}>
        <span className="label">Ukrainian</span>
        <span className="value">{uk}</span>
      </TranslationBox>

      <GlobalError error={resultFieldError} />

      <GlobalError error={modeFieldError} />

      <GlobalError error={generalError} />

      <SharedActions>
        <StyledButton
          $type="unknown"
          onClick={() => onAnswer("unknown")}
          disabled={isAnswerLoading || serverError}
        >
          Unknown
        </StyledButton>
        <StyledButton
          $type="known"
          onClick={() => onAnswer("known")}
          disabled={isAnswerLoading || serverError}
        >
          Known
        </StyledButton>
      </SharedActions>
    </ModalContentWrapper>
  );
};
