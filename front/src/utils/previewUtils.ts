export const calculatePreviewWidth = (
  containerWidth: number | null,
  containerHeight: number | null,
  isMobile: boolean,
) => {
  return isMobile
    ? containerWidth && containerHeight
      ? containerHeight * (746 / 1677)
      : 746
    : containerWidth && containerHeight
      ? Math.min(containerWidth, containerHeight * (807 / 453))
      : 807;
};

export const calculatePreviewHeight = (
  containerWidth: number | null,
  containerHeight: number | null,
  isMobile: boolean,
) => {
  return isMobile
    ? containerWidth && containerHeight
      ? (containerHeight * 1619) / 1677
      : 1619
    : containerWidth && containerHeight
      ? Math.min(containerWidth * (453 / 807), containerHeight)
      : 453;
};
