import React from 'react';

const NotificationDropdown: React.FC = () => {
  return (
    <div className="notification-wrap">
      <button className="icon-btn" title="Notificações">
        <img src="/assets/images/icon-bell.png" alt="Notificações" />
      </button>
    </div>
  );
};

export default NotificationDropdown;
