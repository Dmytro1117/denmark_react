export const selectStudyUI = (state) => state.study.ui;

export const selectAvailableTopics = (state) => state.study.availableTopics;

export const selectStudyWords = (state) => state.study.words;

export const selectStudyWordIndex = (state) => state.study.wordIndex;

export const selectStudySession = (state) => state.study.session;

export const selectAvailableTopicsLoading = (state) =>
  state.study.isAvailableTopicsLoading;

export const selectStudyWordsLoading = (state) => state.study.isWordsLoading;
export const selectStudyAnswerLoading = (state) => state.study.isAnswerLoading;

export const selectStudyError = (state) => state.study.error;

export const selectStudyAvailableError = (state) => state.study.availableError;
