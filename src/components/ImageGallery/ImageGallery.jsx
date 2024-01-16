import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './imageGallery.module.css';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={s.ImageGallery}>
      {images.map((image, index) => (
        <ImageGalleryItem
          key={index + 1}
          content={image}
          openModal={openModal}
        />
      ))}
    </ul>
  );
};
