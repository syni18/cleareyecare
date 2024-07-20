import React from "react";
import { User } from "lucide-react";
import AuthDropdown from "../dropdown/Dropdown";

const ProfileComponent = ({ isAuthorized, open, setOpen, username }) => (
  <div className="nav-profile" onClick={() => setOpen(!open)}>
    {isAuthorized ? (
      <div className="user-auth-icon">
        {username.substring(0).toUpperCase()}
      </div>
    ) : ( <User />
    )}
    {open && (
      <AuthDropdown
        isAuthorized={isAuthorized}
        onClose={() => setOpen(false)}
      />
    )}
  </div>
);

export default ProfileComponent;
