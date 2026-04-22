import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";

const CustomLightbox = ({ open, close, index, slides }) => {
  if (!slides || slides.length === 0) return null;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <Lightbox
      open={open}
      close={close}
      index={index}
      slides={slides}
      plugins={[Fullscreen, Slideshow, Thumbnails, Zoom, Captions]}
      captions={{
        descriptionTextAlign: "center",
        descriptionMaxLines: 3,
      }}
      thumbnails={{
        position: "bottom",
        width: isMobile ? 60 : 120,
        height: isMobile ? 40 : 80,
        border: isMobile ? 1 : 2,
        hidden: isMobile,
        gap: 5,
      }}
      animation={{ fade: 300, swipe: 500 }}
      zoom={{
        maxZoomPixelRatio: 3,
        zoomInMultiplier: 2,
      }}
      styles={{
        container: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
        thumbnail: { borderRadius: "4px" },
        buttonClose: { width: "48px", height: "48px" },
      }}
    />
  );
};

export default CustomLightbox;
