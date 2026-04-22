import { Modal } from "../Modal/Modal";
import { HotspotForm } from "../HotspotForm/HotspotForm";

export const AddHotspot = ({
  pendingPos,
  onClose,
  mapType,
  onSubmit,
  errors,
}) => {
  return (
    <Modal onClose={onClose} title={"Add Hotspot"} isOpen={Boolean(pendingPos)}>
      {pendingPos && (
        <HotspotForm
          mapType={mapType}
          position={pendingPos}
          onSubmit={onSubmit}
          errors={errors}
        />
      )}
    </Modal>
  );
};
