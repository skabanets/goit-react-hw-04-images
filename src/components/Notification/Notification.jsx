import s from './Notification.module.css';

export const Notification = ({ text }) => {
  return (
    <div className={s.NotificationWrapper}>
      <p className={s.Notification}>{text}</p>
    </div>
  );
};
