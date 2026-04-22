import { keyframes } from "styled-components";

const isMobile = typeof window !== "undefined" && window.innerWidth <= 767;

export const fadeInButton = keyframes`
  from {
    opacity: 0;
      transform: translateX(20px);
  }
   to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const fadeInTab = keyframes`
  from {
    opacity: 0;
      transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const hotspotPulse = keyframes`
  0% { transform: scale(1); opacity: 0.9; }
  100% { transform: scale(1.5); opacity: 0; }
`;

export const spinLoading = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const errorMessage = keyframes`
  from {
    opacity: 0;
    transform: translateY(-5px); 
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const pageVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",

      delay: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn",
      when: "beforeChildren",
    },
  },
};

export const backgroundVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

export const modalBackdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, delay: 0.1 },
  },
};

export const modalVariants = {
  hidden: {
    opacity: isMobile ? 1 : 0,
    y: isMobile ? "100%" : 40,
    scale: isMobile ? 1 : 0.9,
    filter: isMobile ? "none" : "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: isMobile ? 300 : 260,
      damping: isMobile ? 30 : 25,
      duration: 0.5,
    },
  },
  exit: {
    opacity: isMobile ? 1 : 0,
    y: isMobile ? "100%" : 30,
    scale: isMobile ? 1 : 0.95,
    filter: isMobile ? "none" : "blur(5px)",
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
};

export const tabVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const CoatOfArmsVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1, delay: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const tooltiNameHotspotVariants = {
  initial: { opacity: 0, x: 15 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: 15,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export const hintMapVariants = {
  initial: {
    opacity: 0,
    y: -50,
    x: "-50%",
  },
  animate: {
    opacity: 1,
    y: 0,
    x: "-50%",
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
  exit: {
    opacity: 0,
    y: -20,
    x: "-50%",
    transition: { duration: 0.2 },
  },
};

export const containerPercentVariants = {
  hidden: { scale: 1.2, opacity: 0.6 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.22, ease: "easeOut" },
  },
};

export const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.05,
      staggerDirection: -1, // зникають знизу догори
      when: "beforeChildren",
    },
  },
};

export const mapContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Затримка між кожним маркером
      delayChildren: 0.3, // Загальна затримка перед початком
    },
  },
};

export const dataSheetItemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.1,
      ease: "easeOut",
    },
  }),
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
    },
  },
};

export const hotspotMarkerVariants = {
  hidden: { opacity: 0, scale: 0.5, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
  exit: (idx) => ({
    opacity: 0,
    scale: 0.5,
    transition: {
      duration: 0.2,
      delay: idx * 0.05,
    },
  }),
};

export const fadeVariants = {
  initial: { opacity: 0, scale: 0.9, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 1.1,
    filter: "blur(4px)",
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

export const galleryItemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: { duration: 0.2 },
  },
};

export const documentItemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 },
  },
};

export const stydyItemVariants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 },
  },
};

export const errorVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};
