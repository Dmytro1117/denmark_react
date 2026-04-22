import { PlaceModal } from "../PlaceModal/PlaceModal";
import { Modal } from "../Modal/Modal";

export const ViewHotspot = ({ hotspot, onClose, mapType }) => (
  <Modal isOpen={Boolean(hotspot)} title={hotspot?.name} onClose={onClose}>
    {hotspot && <PlaceModal city={hotspot} mapType={mapType} />}
  </Modal>
);
