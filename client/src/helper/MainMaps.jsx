import { LeftForm, RightForm } from "../actions/types";
import LoginForm from "../components/forms/LoginForm";
import RedeemForm from "../components/forms/RedeemForm";
import RegisterForm from "../components/forms/RegisterForm";
import VerficationForm from "../components/forms/VerficationForm";

const LeftFormMap = new Map();
LeftFormMap.set(LeftForm.Login, <LoginForm />);
LeftFormMap.set(
  LeftForm.Verfication,
  <VerficationForm direction="left-form" />
);
LeftFormMap.set(LeftForm.Redeem, <RedeemForm />);

const RightFormMap = new Map();
RightFormMap.set(RightForm.Register, <RegisterForm />);
RightFormMap.set(
  RightForm.Verfication,
  <VerficationForm direction="right-form" />
);

export { LeftFormMap, RightFormMap };
