import styled from "styled-components";
import { Suspense, useLayoutEffect, useState } from "react";
import { IMAGE_LIST } from "../../constants/imageList";
import { getLazyComponentWithPreload } from "../../hooks/useLazyComponent";

const [ImageModal, preloadImageModal] = getLazyComponentWithPreload(
  () => import("./ImageModal")
);

const Gallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useLayoutEffect(() => {
    function preloading(imageArray: string[]) {
      imageArray.forEach((file) => {
        const image = new Image();
        image.src = file;
      });
    }

    preloading(IMAGE_LIST);
  }, []);

  return (
    <div>
      <AlbumButton
        onMouseEnter={() => preloadImageModal()}
        onClick={() => setIsModalOpen(true)}
      >
        My album
      </AlbumButton>
      {isModalOpen && (
        <Suspense>
          <ImageModal onClose={() => setIsModalOpen(false)} />
        </Suspense>
      )}
    </div>
  );
};

const AlbumButton = styled.button`
  width: 200px;
  background-color: #2B642D;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #3c9a4b;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    transform: scale(1.05);
  }
`;

export default Gallery;
