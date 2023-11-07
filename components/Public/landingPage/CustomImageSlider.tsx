"use client";
import Image from "next/image";
import React, { Suspense, useState } from "react";
import Imageplace from "@/public/images/avatar.jpg";
// import { Carousel, IconButton } from "@material-tailwind/react";

type Props = {
  images: [
    {
      imageURL: string;
      public_id: string;
      _id: string;
    }
  ];
};

const CustomImageSlider = ({ images }: Props) => {
  const [mainImage, setMainImage] = useState(images[0]);

  // Check if images is undefined or empty
  if (images.length < 1) {
    return <div>No images to display</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-8 items-center">
        <div className="">
          <figure>
            <Image
              src={mainImage.imageURL}
              width={500}
              height={500}
              sizes="100vw"
              objectFit="cover"
              style={{ width: "100%", height: "100%" }} // optional
              alt={mainImage._id}
              className="rounded-xl border-2"
              placeholder="blur"
              blurDataURL={"/images/no-image.jpg"}
            />
          </figure>
        </div>

        <div className="flex gap-4 items-center">
          {images.map((image, index) => (
            <figure className="cursor-pointer">
              <Image
                src={image.imageURL}
                width={500}
                height={500}
                sizes="100vw"
                objectFit="contain"
                alt={image._id}
                className="rounded-xl border-2"
                key={index}
                onClick={() => setMainImage(image)}
                placeholder="blur"
                blurDataURL={"/images/no-image.jpg"}
              />
            </figure>
          ))}
        </div>
      </div>
    </>

    // <Carousel
    //   className="rounded-xl"
    //   autoplay={true}
    //   autoplayDelay={3000}
    //   loop={true}
    // >
    //   {images.map((image, index) => (
    //     <img
    //       src={image.imageURL}
    //       alt="image 1"
    //       className="h-full w-full object-cover"
    //     />
    //   ))}
    // </Carousel>
  );
};

{
  /* <div className="custom-image-slider">
      <button className="prev-button" onClick={prevSlide}>
        &#8249;
      </button>
      <div className="slider-container overflow-x-scroll whitespace-nowrap">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide inline-block ${
              index === currentIndex ? "active" : ""
            }`}
          >
            <img
              src={BACKENDPUBLICURL + image.imageURL}
              alt={`Slide ${index + 1}`}
              className="w-96 h-auto"
            />
          </div>
        ))}
      </div>
      <button className="next-button" onClick={nextSlide}>
        &#8250;
      </button>
    </div> */
}

export default CustomImageSlider;
