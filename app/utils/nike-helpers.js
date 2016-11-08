export const formatImageUrl = (imageURL, type) => {
  if (imageURL.match('content.nike.com')) return imageURL;
  const experiencePreset = `$SNKRS_${type.toUpperCase()}_WM$`;
  const alignSuffix = (!imageURL.match('_D_') ? '&align=0,1' : '');
  return `${imageURL}?${experiencePreset}${alignSuffix}`;
};
