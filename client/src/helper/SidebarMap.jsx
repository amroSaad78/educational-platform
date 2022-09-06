import InstructorLinks from "../components/InstructorLinks";
import TraineeLinks from "../components/TraineeLinks";
import AdminLinks from "../components/AdminLinks";
import { Roles } from "../config/userRoles";

const SidebarMap = new Map();
SidebarMap.set(Roles.ADMIN, <AdminLinks />);
SidebarMap.set(Roles.INSTRUCTOR, <InstructorLinks />);
SidebarMap.set(Roles.TRAINEE, <TraineeLinks />);

export default SidebarMap;
