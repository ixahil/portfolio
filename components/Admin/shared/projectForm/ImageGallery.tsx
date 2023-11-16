'use client';
import { useFormContext } from '@/context/FormContext';
import React, { useEffect } from 'react';
import { AiFillDelete, AiFillEdit, AiOutlineUpload } from 'react-icons/ai';
import ImageUploading from 'react-images-uploading';

const BASEURL = 'http://localhost:8080/';

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
    formData.images = imageList;
  };

  return (
    <div className="image-upload-container h-full w-full">
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
          dragProps
        }) => (
          <div
            className={`rounded border border-dashed border-gray-300 p-4 ${
              isDragging ? 'border-red-500' : ''
            }`}
          >
            <div className="mb-4">
              <button
                type="button"
                onClick={onImageUpload}
                className="rounded bg-blue-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-600"
              >
                <AiOutlineUpload className="mr-2" size={22} />
                Upload Images
              </button>
              {imageList.length > 0 && (
                <button
                  type="button"
                  onClick={onImageRemoveAll}
                  className="ml-2 rounded bg-red-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-red-600"
                >
                  <AiFillDelete className="mr-2" size={22} />
                  Remove All
                </button>
              )}
            </div>
            <div className="md:grid-cols-4gap-4 grid grid-cols-5 sm:grid-cols-3">
              {imageList.map((image, index) => (
                <div key={index} className=" flex flex-col items-center justify-center gap-2 p-2">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      className="rounded bg-green-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-green-600"
                      onClick={() => onImageUpdate(index)}
                    >
                      <AiFillEdit className="mr" />
                    </button>
                    <button
                      type="button"
                      className="rounded bg-red-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-red-600"
                      onClick={() => onImageRemove(index)}
                    >
                      <AiFillDelete className="mr" />
                    </button>
                  </div>
                  {image.imageURL ? (
                    <img src={image.imageURL} alt={`Image ${index}`} className="mb-2 h-32 w-32" />
                  ) : (
                    <img
                      src={image['data_url']}
                      alt={`Image ${index}`}
                      className="mb-2 h-32 w-32"
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
