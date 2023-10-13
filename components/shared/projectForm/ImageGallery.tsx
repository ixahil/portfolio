"use client";
import { useFormContext } from "@/context/FormContext";
import React, { useEffect } from "react";
import { AiFillDelete, AiFillEdit, AiOutlineUpload } from "react-icons/ai";
import ImageUploading from "react-images-uploading";

const BASEURL = "http://localhost:8080/";

type Props = {
  imageList: [];
  addUpdateIndex: number;
};

export function ImageGallery() {
  const { formData, updateFormData } = useFormContext();
  const [images, setImages] = React.useState(formData.images);
  const maxNumber = 69;

  // useEffect(() => {
  //   if (previousImages) {
  //     previousImages.forEach((image) => {
  //       const imageURL = BASEURL + image.imageURL;
  //       setImages(imageURL);
  //     });
  //   }
  // }, [previousImages]);

  const onChange = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setImages(imageList);
    updateFormData({
      ...formData,
      images: imageList,
    });
  };

  return (
    <div className="image-upload-container w-full h-full">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div
            className={`p-4 border border-dashed border-gray-300 rounded ${
              isDragging ? "border-red-500" : ""
            }`}
          >
            <div className="mb-4">
              <button
                type="button"
                onClick={onImageUpload}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
              >
                <AiOutlineUpload className="mr-2" size={22} />
                Upload Images
              </button>
              {imageList.length > 0 && (
                <button
                  type="button"
                  onClick={onImageRemoveAll}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300 ml-2"
                >
                  <AiFillDelete className="mr-2" size={22} />
                  Remove All
                </button>
              )}
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-3 md:grid-cols-4gap-4">
              {imageList.map((image, index) => (
                <div
                  key={index}
                  className="bg-white p-2 flex flex-col justify-center items-center gap-2"
                >
                  <div className="flex gap-4">
                    <button
                      type="button"
                      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300"
                      onClick={() => onImageUpdate(index)}
                    >
                      <AiFillEdit className="mr" />
                    </button>
                    <button
                      type="button"
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300"
                      onClick={() => onImageRemove(index)}
                    >
                      <AiFillDelete className="mr" />
                    </button>
                  </div>
                  {image.imageURL ? (
                    <img
                      src={image.imageURL}
                      alt={`Image ${index}`}
                      className="w-32 h-32 mb-2"
                    />
                  ) : (
                    <img
                      src={image["data_url"]}
                      alt={`Image ${index}`}
                      className="w-32 h-32 mb-2"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default ImageGallery;
