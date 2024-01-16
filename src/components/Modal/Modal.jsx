import React, { Component } from 'react';
import s from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscapePress);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscapePress);
    document.body.style.overflow = 'scroll';
  }

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) this.props.closeModal();
  };

  handleEscapePress = e => {
    if (e.key === 'Escape') this.props.closeModal();
  };

  render() {
    const url = this.props.imageLink;

    return (
      <div className={s.Overlay} onClick={this.handleBackdropClick}>
        <div className={s.Modal}>
          <img src={url} alt="largeImage" />
        </div>
      </div>
    );
  }
}
