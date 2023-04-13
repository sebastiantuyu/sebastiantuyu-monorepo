const generateOGImage = (title: string): string => {
    if(title && title.replaceAll) {
      return `https://res.cloudinary.com/dwd2eaext/image/upload/l_text:Merriweather_28_bold:${title.replaceAll(' ', '%20')},co_rgb:000000/og_image-2_o3erfi.png`
    }
    return `https://res.cloudinary.com/dwd2eaext/image/upload/l_text:Merriweather_28_bold:Sebastian%20Tuyu,co_rgb:000000/og_image-2_o3erfi.png`
}

const getMeta = (title: string, description?: string) => {
  const ogImage = generateOGImage(title);
  return [
    {
      hid: 'og:image',
      property: 'og:image',
      content: ogImage
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: title
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: description ?? ''
    },
    {
      hid: 'twitter:image',
      property: 'twitter:image',
      content: ogImage
    },
    {
      hid: 'twitter:title',
      property: 'twitter:title',
      content: title
    },
    {
      hid: 'twitter:description',
      property: 'twitter:description',
      content: description ?? ''
    },
  ]
}

export default getMeta;
