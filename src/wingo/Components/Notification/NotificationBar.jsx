import "./Notification.css";
import { IoIosNotifications } from "react-icons/io";
import { BiCommentDetail } from "react-icons/bi";

const NotificationBar = ({ showtransaction }) => {
  return (
    <div>
      <div className="notification-bar">
        <div className="notification-icon">
          <IoIosNotifications />
        </div>
        <div className="notification-msg">
          Thank you for being a member of Revo Play platform, we provide many
          ...
        </div>
        <div className="notification-btn">
          <button onClick={(e) => showtransaction("notification")}>
            <BiCommentDetail /> Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationBar;
