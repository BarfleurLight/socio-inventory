import React, { useState, useEffect } from 'react';

const Img = ({ src, ...props }) => {
  const [imageSrc, setImageSrc] = useState(null);
  // const fallback = 'https://foodgram.mvobr.ru/backend_media/recipes/images/temp.jpeg';

  useEffect(() => {
    if (!src) {
      setImageSrc(null);
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => setImageSrc(src);
    img.onerror = () => setImageSrc(null);
  }, [src]);

  const backgroundStyle = imageSrc
    ? `url(${imageSrc})`
    : 'radial-gradient(circle, rgba(0,0,0,0.2), rgba(0,0,0,0.1))';

  return <div style={{ backgroundImage: backgroundStyle, ...props.style }} {...props} />;
};

export default Img;