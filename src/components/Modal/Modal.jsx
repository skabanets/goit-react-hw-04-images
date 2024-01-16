import React, { useEffect } from 'react';
import s from './Modal.module.css';

export const Modal = ({ url, closeModal }) => {
  useEffect(() => {
    const handleEscapePress = e => {
      if (e.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handleEscapePress);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEscapePress);
      document.body.style.overflow = 'scroll';
    };
  }, [closeModal]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <img src={url} alt="largeImage" />
      </div>
    </div>
  );
};
