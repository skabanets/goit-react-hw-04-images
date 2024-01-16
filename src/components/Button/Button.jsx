import s from './Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <button type="button" className={s.Button} onClick={onClick}>
      Load more
    </button>
  );
};
