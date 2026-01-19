import type { FC } from "react";
import logoutIcon from "../../../../assetsOld/logout.png";
import { useAppDispatch } from "../../../../api/redux/hooks";
import { logoutUser } from "../../../../api/service/UserService";

const LogoutButton: FC = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    void dispatch(logoutUser());
  };

  return (
    <button
      onClick={handleLogout}
      className="max-w-[367px] rounded-[20px] bg-red-100 p-2.5 sm:max-w-full"
    >
      <div className="flex items-center justify-start gap-5">
        <img
          src={logoutIcon}
          alt="Log out"
          className="max-h-[42px] max-w-[42px]"
        />
        <span>Выйти из аккаунта</span>
      </div>
    </button>
  );
};

export default LogoutButton;
