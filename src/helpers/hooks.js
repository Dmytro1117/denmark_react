// 1. Libraries
import { useMemo, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

// 2. Auth Redux
import {
  selectIsLoggedIn,
  selectIsRefreshing,
  selectToken,
} from "../redux/auth/authSelectors";

// 3 Documents Redux
import {
  fetchDocuments,
  updateDocumentDone,
  deleteDocument,
} from "../redux/documents/operationsDocuments";
import { clearDocsError } from "../redux/documents/documentsSlise";
import {
  selectDocsByCountry,
  selectUpdatingId,
  selectDocsLoading,
  selectDocsError,
  selectIsInitialLoading,
} from "../redux/documents/documentsSelectors";

// 4 Study Redux
import {
  selectAvailableTopics,
  selectStudyUI,
} from "../redux/study/studySelectors";

// 5 Gallery Redux
import {
  selectGalleryLoading,
  selectTotalItem,
  selectImagesForLightbox,
  selectGalleryError,
} from "../redux/gallery/gallerySelectors";

// 6 Map Redux
import {
  selectHotspotsByMapType,
  selectHotspotsLoading,
  selectHotspotDeletingId,
  selectHotspotsActionLoading,
  selectHotspotsiDetailsLoading,
  selectHotspotsError,
} from "../redux/map/mapSelectors";
import { clearHotspotError, clearHotspots } from "../redux/map/mapSlice";
import {
  fetchHotspots,
  fetchHotspotById,
  addHotspot,
  deleteHotspot,
  updateHotspot,
} from "../redux/map/operationMap";

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export const useMap = (activeTab) => {
  const dispatch = useDispatch();
  const stageRef = useRef(null);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const token = useSelector(selectToken);
  const hotspots = useSelector(selectHotspotsByMapType(activeTab));
  const isLoading = useSelector(selectHotspotsLoading);
  const isDetailsLoading = useSelector(selectHotspotsiDetailsLoading);
  const deletingId = useSelector(selectHotspotDeletingId);
  const isActionLoading = useSelector(selectHotspotsActionLoading);
  const serverError = useSelector(selectHotspotsError);

  const nameError = serverError?.fields?.name || null;
  const descError = serverError?.fields?.description || null;
  const categoryError = serverError?.fields?.category || null;
  const photoError = serverError?.fields?.imageUrl || null;

  const generalError =
    !nameError && !descError && !categoryError && !photoError
      ? serverError?.message
      : null;

  const [hoveredId, setHoveredId] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [pendingPos, setPendingPos] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [hotspotToDelete, setHotspotToDelete] = useState(null);
  const [hotspotToEdit, setHotspotToEdit] = useState(null);
  const [mode, setMode] = useState(null);

  const isEmptyMap = isLoggedIn && hotspots.length === 0 && !isLoading;
  const authPending = isRefreshing || (token && !isLoggedIn);

  useEffect(() => {
    if (isRefreshing) return;
    if (token && !isLoggedIn) return;

    dispatch(clearHotspotError());

    dispatch(fetchHotspots({ mapType: activeTab }))
      .unwrap()
      .catch(() => {});
  }, [dispatch, activeTab, isRefreshing, token, isLoggedIn]);

  useEffect(() => {
    if (!mode) return;
    const onKeyDown = (e) => {
      if (e.code === "Escape") setMode(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mode]);

  useEffect(() => {
    if ((mode === "delete" || mode === "edit") && hotspots.length === 0)
      setMode(null);
  }, [mode, hotspots.length]);

  useEffect(() => {
    if (selectedCity) {
      setHoveredId(null);
    }
  }, [selectedCity]);

  useEffect(() => {
    return () => {
      dispatch(clearHotspots());
    };
  }, [dispatch]);

  const handleStageClick = (e) => {
    if (mode !== "add" || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const clamp = (v) => Math.max(0, Math.min(100, v));
    setPendingPos({ x: clamp(x), y: clamp(y) });
  };

  const toggleMode = (nextMode) => {
    dispatch(clearHotspotError());
    setSelectedCity(null);
    setHotspotToEdit(null);
    setPendingPos(null);
    setMode((prev) => (prev === nextMode ? null : nextMode));
  };

  const handleViewHotspot = async (hotspot) => {
    dispatch(clearHotspotError());

    try {
      const data = await dispatch(
        fetchHotspotById({ id: hotspot._id }),
      ).unwrap();

      setSelectedCity(data);
    } catch (error) {
      setSelectedCity(null);
    }
  };

  const handleCreateHotspot = (data) => {
    dispatch(addHotspot(data))
      .unwrap()
      .then(() => closeAddModal())
      .catch(() => {
        setSelectedCity(null);
      });
  };

  const handleUpdateHotspot = (data) => {
    if (!hotspotToEdit?._id) return;
    dispatch(updateHotspot({ id: hotspotToEdit._id, payload: data }))
      .unwrap()
      .then(() => {
        setHotspotToEdit(null);
        setMode(null);
      })
      .catch(() => {});
  };

  const handleConfirmDelete = () => {
    if (!hotspotToDelete?._id) return;
    dispatch(deleteHotspot({ id: hotspotToDelete._id }))
      .unwrap()
      .then(() => closeDeleteConfirm())
      .catch(() => {});
  };

  const openDeleteConfirm = (hotspot) => {
    dispatch(clearHotspotError());
    setHotspotToDelete(hotspot);
    setConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    dispatch(clearHotspotError());
    setConfirmOpen(false);
    setHotspotToDelete(null);
  };

  const closeAddModal = () => {
    dispatch(clearHotspotError());
    setPendingPos(null);
    setMode(null);
  };

  return {
    stageRef,
    hotspots,
    isLoading,
    isDetailsLoading,
    deletingId,
    isActionLoading,
    isEmptyMap,
    authPending,
    isLoggedIn,
    mode,
    setMode,
    toggleMode,
    hoveredId,
    setHoveredId,
    selectedCity,
    setSelectedCity,
    pendingPos,
    setPendingPos,
    confirmOpen,
    setConfirmOpen,
    hotspotToDelete,
    setHotspotToDelete,
    hotspotToEdit,
    handleViewHotspot,
    setHotspotToEdit,
    handleStageClick,
    handleCreateHotspot,
    handleUpdateHotspot,
    handleConfirmDelete,
    openDeleteConfirm: openDeleteConfirm,
    closeDeleteConfirm: closeDeleteConfirm,
    closeAddModal: closeAddModal,
    serverError,
    generalError,
    nameError,
    descError,
    categoryError,
    photoError,
  };
};

export const useDocuments = (activeCountry) => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const serverDocs = useSelector((state) =>
    selectDocsByCountry(state, activeCountry),
  );
  const updatingId = useSelector(selectUpdatingId);
  const isLoading = useSelector(selectDocsLoading);
  const isInitialLoading = useSelector(selectIsInitialLoading);
  const isRefreshing = useSelector(selectIsRefreshing);
  const serverError = useSelector(selectDocsError);
  const token = useSelector(selectToken);

  const [mode, setMode] = useState(null);

  const [guestProgress, setGuestProgress] = useLocalStorage(
    "guest_progress",
    {},
  );

  useEffect(() => {
    if (isRefreshing) return;
    if (token && !isLoggedIn) return;

    dispatch(clearDocsError());

    dispatch(fetchDocuments({ country: activeCountry }))
      .unwrap()
      .catch(() => {});
  }, [dispatch, activeCountry, isRefreshing, token, isLoggedIn]);

  useEffect(() => {
    if ((mode === "delete" || mode === "edit") && serverDocs.length === 0)
      setMode(null);
  }, [mode, serverDocs.length]);

  const documents = useMemo(() => {
    if (isLoggedIn) return serverDocs;

    return serverDocs.map((doc) => ({
      ...doc,
      done: !!guestProgress[doc._id],
      _isDefault: true,
    }));
  }, [isLoggedIn, serverDocs, guestProgress]);

  const percentProgress = useMemo(() => {
    if (!documents.length) return 0;
    const completedDocuments = documents.filter((x) => x.done).length;
    return Math.round((completedDocuments / documents.length) * 100);
  }, [documents]);

  const toggleMode = (nextMode) => {
    setMode((prev) => (prev === nextMode ? null : nextMode));
  };

  const toggleDone = (doc) => {
    if (!isLoggedIn) {
      setGuestProgress((prev) => ({ ...prev, [doc._id]: !prev[doc._id] }));
      return;
    }
    dispatch(updateDocumentDone({ id: doc._id, done: !doc.done }));
  };

  const removeDocument = (doc) => {
    if (isLoggedIn && !doc.isTemplate) {
      return dispatch(deleteDocument({ id: doc._id }));
    }
  };

  const clearDocumentError = () => dispatch(clearDocsError());

  return {
    documents,
    percentProgress,
    isLoggedIn,
    isRefreshing,
    isLoading,
    isInitialLoading,
    updatingId,
    toggleDone,
    toggleMode,
    removeDocument,
    isEmptyDocuments: isLoggedIn && serverDocs.length === 0,
    mode,
    setMode,
    clearDocumentError,
    serverError,
  };
};

export const useGallery = (images = []) => {
  const allSlides = useSelector(selectImagesForLightbox);
  const isLoading = useSelector(selectGalleryLoading);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const serverError = useSelector(selectGalleryError);
  const totalImages = useSelector(selectTotalItem);

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const isEmptyGallery =
    isLoggedIn &&
    images.length === 0 &&
    !isLoading &&
    !serverError &&
    totalImages === 0;

  const openLightbox = (photoId) => {
    // Шукаємо порядковий номер фото у ПОВНОМУ списку за його ID
    const realIndex = allSlides.findIndex((slide) => slide._id === photoId);
    setIndex(realIndex >= 0 ? realIndex : 0);
    setOpen(true);
  };

  return {
    open,
    setOpen,
    index,
    slidesForLightbox: allSlides,
    openLightbox,
    isEmptyGallery,
    totalImages,
    serverError,
  };
};

export const useStudy = () => {
  const availableTopics = useSelector(selectAvailableTopics);
  const ui = useSelector(selectStudyUI);

  const stadyStats = useMemo(() => {
    const topics = availableTopics?.topics ?? [];
    const learnedTotal = availableTopics?.learnedWords ?? 0;
    const currentLevel = ui.level || "A1";

    // Рахуємо загальну кількість слів у поточному рівні
    const totalWordsInLevel = topics.reduce(
      (sum, topic) => sum + (topic.totalWords || 0),
      0,
    );

    const actualPercentProgress =
      totalWordsInLevel > 0
        ? Math.min(Math.round((learnedTotal / totalWordsInLevel) * 100), 100)
        : 0;

    return {
      actualPercentProgress,
      learnedTotal,
      totalWordsInLevel,
      topics,
      currentLevel,
    };
  }, [availableTopics, ui.level]);

  return stadyStats;
};
