import React, { Component } from 'react';
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

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    isLoadMore: false,
    isEmpty: false,
    isError: false,
    modalContent: null,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const res = await getImages(query, page);
        const { hits: images, totalHits: totalImages } = res;
        const totalPages = Math.ceil(totalImages / 60);

        if (!images.length) {
          this.setState({ isEmpty: true });
          toast.error(`No images found.`, { autoClose: 2000 });
          return;
        }

        if (page === 1) {
          toast.success(`We found ${totalImages} images`, { autoClose: 2000 });
        }

        if (page !== 1 && page === totalPages) {
          toast.warning(
            `We're sorry, but you've reached the end of search results.`,
            { autoClose: 2000 }
          );
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          isLoadMore: page < totalPages,
        }));
      } catch (error) {
        this.setState({ isError: true });
        toast.error(`${error.message}`, { autoClose: 2000 });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmit = query => {
    if (query) {
      this.setState({
        query,
        images: [],
        page: 1,
        modalContent: null,
        isLoadMore: false,
        isEmpty: false,
        isError: false,
      });
    }
  };

  handleClickImage = (url = '') => {
    this.setState({ modalContent: url });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const {
      query,
      images,
      isLoading,
      isLoadMore,
      isEmpty,
      isError,
      modalContent,
    } = this.state;

    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleSubmit} />
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
          <ImageGallery images={images} openModal={this.handleClickImage} />
        )}
        {isLoadMore && <Button onClick={this.handleLoadMore} />}
        {isLoading && <Loader />}
        {modalContent && (
          <Modal imageLink={modalContent} closeModal={this.handleClickImage} />
        )}
        <ToastContainer />
      </div>
    );
  }
}
