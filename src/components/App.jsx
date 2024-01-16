import React, { useEffect, useState } from 'react';
import {
  Searchbar,
  ImageGallery,
  Button,
  Notification,
  Loader,
  Modal,
} from './index';
import { getImages } from 'services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './App.module.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    if (!query) return;

    (async () => {
      try {
        setIsLoading(true);
        const res = await getImages(query, page);
        const { hits: images, totalHits: totalImages } = res;
        const totalPages = Math.ceil(totalImages / 60);

        if (!images.length) {
          setIsEmpty(true);
          toast.error(`No images found.`, { autoClose: 2000 });
          return;
        }

        if (page === 1) {
          toast.success(`We found ${totalImages} images`, {
            autoClose: 2000,
          });
        }

        if (page !== 1 && page === totalPages) {
          toast.warning(
            `We're sorry, but you've reached the end of search results.`,
            { autoClose: 2000 }
          );
        }

        setImages(prev => [...prev, ...images]);
        setIsLoadMore(page < totalPages);
      } catch (error) {
        setIsError(true);
        toast.error(`${error.message}`, { autoClose: 2000 });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [query, page]);

  const handleSubmit = newQuery => {
    if (newQuery.toLowerCase() === query.toLowerCase()) {
      return toast.warning(`The request matches the previous one.`, {
        autoClose: 2000,
      });
    }

    if (newQuery) {
      setQuery(newQuery);
      setImages([]);
      setPage(1);
      setModalContent(null);
      setIsLoadMore(false);
      setIsEmpty(false);
      setIsError(false);
    }
  };

  const handleClickImage = (url = '') => {
    setModalContent(url);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={handleSubmit} />
      {isEmpty && (
        <Notification
          text="No images found for your request.
            Try to enter another query."
        />
      )}
      {isError && (
        <Notification
          text="Oops, something's wrong!
              Reload page or try again later."
        />
      )}
      {!isEmpty && query && (
        <ImageGallery images={images} openModal={handleClickImage} />
      )}
      {isLoadMore && <Button onClick={handleLoadMore} />}
      {isLoading && <Loader />}
      {modalContent && (
        <Modal url={modalContent} closeModal={handleClickImage} />
      )}
      <ToastContainer />
    </div>
  );
};
