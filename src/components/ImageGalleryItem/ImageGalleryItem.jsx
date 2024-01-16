import s from './imageGalleryItem.module.css';

export const ImageGalleryItem = ({ content, openModal }) => {
  const { webformatURL, largeImageURL, tags } = content;
  return (
    <li className={s.ImageGalleryItem} onClick={() => openModal(largeImageURL)}>
      <img src={webformatURL} alt={tags} className={s.ImageGalleryItemImage} />
    </li>
  );
};
