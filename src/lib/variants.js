export const swiperSlides = {
  initial: (forwards) => ({
    x: forwards ? "70%" : "-70%",
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    duration: 0.5,
    transition: { delay: 0.5, ease: "easeInOut" },
  },
  exit: (forwards) => ({
    x: forwards ? "-70%" : "70%",
    opacity: 0,
    duration: 0.5,
    transition: { ease: "easeInOut" },
  }),
};
