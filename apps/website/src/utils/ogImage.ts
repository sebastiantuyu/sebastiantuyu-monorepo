export const generateOGImage = (title: string): string => {
  if(title && title.replaceAll) {
    return `https://res.cloudinary.com/dwd2eaext/image/upload/l_text:Merriweather_28_bold:${title.replaceAll(' ', '%20')},co_rgb:000000/og_image-2_o3erfi.png`
  }
  return `https://res.cloudinary.com/dwd2eaext/image/upload/l_text:Merriweather_28_bold:Sebastian%20Tuyu,co_rgb:000000/og_image-2_o3erfi.png`
}
