const EMPTY_ARRAY_MAPTYPE = [];

export const selectHotspotsByMapType = (mapType) => (state) =>
  state.map.items[mapType] ?? EMPTY_ARRAY_MAPTYPE;

export const selectHotspotsLoading = (state) => state.map.isLoading;

export const selectHotspotsError = (state) => state.map.error;

export const selectHotspotDeletingId = (state) => state.map.deletingId;

export const selectHotspotsActionLoading = (state) => state.map.isActionLoading;

export const selectHotspotsiDetailsLoading = (state) =>
  state.map.isDetailsHotspotLoading;
