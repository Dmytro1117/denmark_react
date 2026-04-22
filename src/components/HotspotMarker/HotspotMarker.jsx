// 1. Libraries
import { memo } from "react";
import { VscEditSparkle } from "react-icons/vsc";
import { ImBin } from "react-icons/im";

// 2. Helpers, Hooks & API
import {
  hotspotMarkerVariants,
  tooltiNameHotspotVariants,
} from "../../helpers/animations";

// 3. Styled Components
import {
  MarkerPos,
  PulseCircle,
  Tooltip,
  EditPinButton,
  HotspotMarkerDiv,
  DeletePinButton,
  PulseWrapper,
  ImageWrapper,
} from "./HotspotMarker.styled";

export const HotspotMarker = memo(
  ({
    hotspot,
    idx,
    mode,
    hoveredId,
    setHoveredId,
    handleViewHotspot,
    setHotspotToEdit,
    openDeleteConfirm,
    isActionLoading,
    deletingId,
    activeTab,
  }) => {
    const isActive = hoveredId === hotspot._id;
    const isDeleting = isActionLoading && deletingId === hotspot._id;

    const handleMouseEnter = () => {
      if (mode === "edit" || mode === "delete") return;
      setHoveredId(hotspot._id);
    };

    const handleMouseLeave = () => {
      if (mode === "edit" || mode === "delete") return;
      setHoveredId(null);
    };

    return (
      <MarkerPos
        variants={hotspotMarkerVariants}
        custom={idx}
        $x={hotspot.position?.x ?? 0}
        $y={hotspot.position?.y ?? 0}
        $isActive={isActive}
      >
        <HotspotMarkerDiv
          $x={hotspot.position?.x ?? 0}
          $y={hotspot.position?.y ?? 0}
          $isActive={isActive}
          $anyHovered={hoveredId !== null}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => mode === null && handleViewHotspot(hotspot)}
        >
          {mode === "edit" && (
            <EditPinButton
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setHotspotToEdit(hotspot);
              }}
            >
              <VscEditSparkle size={18} />
            </EditPinButton>
          )}

          {mode === "delete" && (
            <DeletePinButton
              type="button"
              disabled={isDeleting}
              onClick={(e) => {
                e.stopPropagation();
                openDeleteConfirm(hotspot);
              }}
            >
              <ImBin size={18} />
            </DeletePinButton>
          )}

          <PulseWrapper $hide={isActive}>
            <PulseCircle $mapType={activeTab} />
            <PulseCircle $mapType={activeTab} />
          </PulseWrapper>

          <ImageWrapper $isActive={isActive}>
            <img src={hotspot.imageUrl || null} alt={hotspot.name} />
          </ImageWrapper>

          {isActive && (
            <Tooltip
              variants={tooltiNameHotspotVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {hotspot.name}
            </Tooltip>
          )}
        </HotspotMarkerDiv>
      </MarkerPos>
    );
  },
);
