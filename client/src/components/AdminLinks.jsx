import * as sidebar from "../constants/sidebar";
import SideBarLink from "./SideBarLink";
import LogoutLink from "./LogoutLink";

const AdminLinks = () => {
  return (
    <ul>
      <SideBarLink
        title={sidebar.users}
        url={"/users"}
        iconClass={"fas fa-user-friends"}
      />
      <SideBarLink
        title={sidebar.courses}
        url={"/courses"}
        iconClass={"fas fa-book"}
      />
      <SideBarLink
        title={sidebar.media}
        url={"/media"}
        iconClass={"fas fa-photo-video"}
      />
      <SideBarLink
        title={sidebar.settings}
        url={"/settings"}
        iconClass={"fas fa-cog"}
      />
      <LogoutLink
        title={sidebar.exit}
        url={"/auth"}
        iconClass={"fas fa-sign-out-alt"}
      />
    </ul>
  );
};

export default AdminLinks;
