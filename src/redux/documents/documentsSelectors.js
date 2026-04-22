const EMPTY_ARRAY_COUNTRY = [];

export const selectDocsByCountry = (state, country) =>
  state.documents.items?.[country] ?? EMPTY_ARRAY_COUNTRY;

export const selectDocsLoading = (state) => state.documents.isLoading;

export const selectIsInitialLoading = (state) =>
  state.documents.isInitialLoading;

export const selectDocsError = (state) => state.documents.error;

export const selectUpdatingId = (state) => state.documents.updatingId;

export const selectDocsActionLoading = (state) =>
  state.documents.isActionLoading;
