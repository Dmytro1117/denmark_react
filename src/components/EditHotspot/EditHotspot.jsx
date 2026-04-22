import { Modal } from "../Modal/Modal";
import { HotspotForm } from "../HotspotForm/HotspotForm";

export const EditHotspot = ({
  onClose,
  onSubmit,
  hotspotToEdit,
  onDelete,
  mapType,
  errors,
}) => {
  return (
    <Modal
      onClose={onClose}
      title={"Edit Hotspot"}
      isOpen={Boolean(hotspotToEdit)}
    >
      {hotspotToEdit && (
        <HotspotForm
          initialValues={hotspotToEdit}
          position={hotspotToEdit.position}
          onDelete={onDelete}
          onSubmit={onSubmit}
          mapType={mapType}
          isEdit
          errors={errors}
        />
      )}
    </Modal>
  );
};
