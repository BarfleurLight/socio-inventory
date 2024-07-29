// import React, { useState, useEffect } from 'react';

const Img = ({ src, ...props }) => {
  return <div style={{ 
    backgroundImage: ` url(${src}), radial-gradient(circle, rgba(0,0,0,0.1), rgba(0,0,0,0.3))`
   }} {...props} />;
};

export default Img;