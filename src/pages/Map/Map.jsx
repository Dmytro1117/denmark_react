// 1. Libraries
import { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { AnimatePresence } from "framer-motion";

// 2. Components & UI
import { Loader } from "../../components/Loader/Loader";
import { MapModeHint } from "../../components/MapModeHint/MapModeHint";
import { ViewHotspot } from "../../components/ViewHotspot/ViewHotspot";
import { AddHotspot } from "../../components/AddHotspot/AddHotspot";
import { EditHotspot } from "../../components/EditHotspot/EditHotspot";
import { StyledButton } from "../../components/Buttons/Button";
import { EmptyPage } from "../../components/EmptyPage/EmptyPage";
import { ConfirmDialog } from "../../components/ConfirmDialog/ConfirmDialog";
import { HotspotMarker } from "../../components/HotspotMarker/HotspotMarker";
import { ServerError } from "../../components/ServerError/ServerError";
import { PageBackground } from "../../components/PageBackground/PageBackground";
import { PagesTabs } from "../../components/PagesTabs/PageTabs";

// 3. Helpers, Hooks & API
import { countryOptions } from "../../helpers/constant";
import { useMap } from "../../helpers/hooks";
import { mapContainerVariants, fadeVariants } from "../../helpers/animations";

// 4. Styled Components
import { PageSection } from "../../commonStyles/Page.styled";
import {
  MapImage,
  MapContentContainer,
  MapTitle,
  MotionMarkersLayer,
  DimOverlay,
  Stage,
  MapFrame,
  MapTabsWrapper,
  ModeButtons,
  DataMap,
} from "./Map.styled";

export const Map = () => {
  const [activeTab, setActiveTab] = useState(countryOptions[0]?.value || "ua");

  const {
    isLoggedIn,
    mode,
    toggleMode,
    hotspots,
    stageRef,
    handleStageClick,
    hoveredId,
    isLoading,
    isDetailsLoading,
    setHoveredId,
    setSelectedCity,
    setHotspotToEdit,
    isActionLoading,
    openDeleteConfirm,
    deletingId,
    authPending,
    isEmptyMap,
    selectedCity,
    handleViewHotspot,
    handleUpdateHotspot,
    hotspotToEdit,
    closeAddModal,
    pendingPos,
    handleCreateHotspot,
    confirmOpen,
    hotspotToDelete,
    closeDeleteConfirm,
    handleConfirmDelete,
    serverError,
    generalError,
    nameError,
    descError,
    categoryError,
    photoError,
  } = useMap(activeTab);

  const currentCountry = countryOptions.find((opt) => opt.value === activeTab);
  const currentMap = currentCountry?.mapImage;

  return (
    <PageSection>
      <PageBackground />
      <MapContentContainer>
        <MapTitle>{currentCountry?.mapTitle}</MapTitle>

        {!generalError && (
          <MapTabsWrapper>
            <PagesTabs
              options={countryOptions}
              activeValue={activeTab}
              onChange={setActiveTab}
            />

            {isLoggedIn && !isLoading && (
              <ModeButtons>
                <StyledButton
                  active={mode === "add"}
                  onClick={() => toggleMode("add")}
                >
                  + Add Point
                </StyledButton>

                {hotspots.length > 0 && (
                  <>
                    <StyledButton
                      active={mode === "edit"}
                      onClick={() => toggleMode("edit")}
                    >
                      Edit
                    </StyledButton>
                    <StyledButton
                      active={mode === "delete"}
                      onClick={() => toggleMode("delete")}
                    >
                      Delete
                    </StyledButton>
                  </>
                )}
              </ModeButtons>
            )}
          </MapTabsWrapper>
        )}
        <AnimatePresence mode="wait">
          {authPending || isLoading ? (
            <Loader fullscreen={false} />
          ) : (
            <DataMap
              key={activeTab}
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <TransformWrapper initialScale={1} minScale={1} maxScale={4}>
                <TransformComponent
                  wrapperStyle={{ width: "100%", height: "100%" }}
                  contentStyle={{ width: "100%", height: "100%" }}
                >
                  <Stage>
                    <MapFrame
                      ref={stageRef}
                      onClick={handleStageClick}
                      $isAddMode={mode === "add"}
                    >
                      <MapImage src={currentMap} alt="Interactive map" />

                      <DimOverlay $show={hoveredId !== null} />

                      {!isLoading && !serverError && hotspots.length > 0 && (
                        <MotionMarkersLayer
                          key={`markers-${activeTab}-${hotspots.length}`}
                          variants={mapContainerVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          {hotspots.map((hotspot, idx) => (
                            <HotspotMarker
                              key={hotspot._id}
                              hotspot={hotspot}
                              idx={idx}
                              mode={mode}
                              hoveredId={hoveredId}
                              setHoveredId={setHoveredId}
                              handleViewHotspot={handleViewHotspot}
                              setHotspotToEdit={setHotspotToEdit}
                              openDeleteConfirm={openDeleteConfirm}
                              isActionLoading={isActionLoading}
                              deletingId={deletingId}
                              activeTab={activeTab}
                            />
                          ))}
                        </MotionMarkersLayer>
                      )}

                      <MapModeHint mode={mode} />

                      {isEmptyMap &&
                        !isLoading &&
                        !serverError &&
                        mode === null && (
                          <EmptyPage
                            title="The Map is empty"
                            text="Add your first marker"
                          />
                        )}
                    </MapFrame>
                  </Stage>
                </TransformComponent>
              </TransformWrapper>
            </DataMap>
          )}
        </AnimatePresence>
      </MapContentContainer>

      {isDetailsLoading && <Loader fullscreen={false} />}

      <ViewHotspot
        hotspot={selectedCity}
        onClose={() => setSelectedCity(null)}
        mapType={activeTab}
      />

      <AddHotspot
        onClose={closeAddModal}
        pendingPos={pendingPos}
        mapType={activeTab}
        onSubmit={handleCreateHotspot}
        errors={{
          generalError,
          nameError,
          descError,
          categoryError,
          photoError,
        }}
      />

      <EditHotspot
        mapType={activeTab}
        onClose={() => setHotspotToEdit(null)}
        onSubmit={handleUpdateHotspot}
        hotspotToEdit={hotspotToEdit}
        onDelete={() => {
          setHotspotToEdit(null);
          openDeleteConfirm(hotspotToEdit);
        }}
        errors={{
          generalError,
          nameError,
          descError,
          categoryError,
          photoError,
        }}
      />

      <ConfirmDialog
        isOpen={confirmOpen}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the hotspot “${hotspotToDelete?.name ?? ""}”?`}
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={closeDeleteConfirm}
        onConfirm={handleConfirmDelete}
        isLoading={isActionLoading && deletingId === hotspotToDelete?._id}
        error={serverError}
      />

      <ServerError
        error={serverError}
        isVisible={mode === null && !isLoading}
      />
    </PageSection>
  );
};

export default Map;
