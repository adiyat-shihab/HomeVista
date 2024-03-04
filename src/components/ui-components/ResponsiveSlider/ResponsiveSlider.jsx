/* eslint-disable @next/next/no-img-element */
"use client";

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.css";
import React from 'react';
import Image from 'next/image';

const ResponsiveSlider = ({ title, imgLinks }) => {

  console.log(imgLinks);
  return <div className='w-full min-h-[90vh]'>

    <Carousel thumbWidth={100} showThumbs={true} autoPlay={true}>

      {
        imgLinks?.length != 0 &&
        imgLinks?.map((imgLink, index) =>
          <div className='w-full min-h-[90vh]' key={index}>
            <Image fill objectFit="cover" alt={title} src={imgLink} />
          </div>
        )
      }

    </Carousel>
  </div>
};

export default ResponsiveSlider;