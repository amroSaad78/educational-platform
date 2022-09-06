import { GoogleLogin } from "react-google-login";
import { config } from "../config/configurations";
const GoogleLoginBtns = ({ leftBtn, rightBtn, onSuccess, onFailure }) => {
  return (
    <div className="btns-container">
      <GoogleLogin
        clientId={config.GOOGLE_CLIENT_ID}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        render={(props) => (
          <input
            type="button"
            value={leftBtn}
            className="auth-btn solid"
            onClick={props.onClick}
            disabled={props.disabled}
          />
        )}
      ></GoogleLogin>
      <input type="submit" value={rightBtn} className="auth-btn solid" />
    </div>
  );
};

export default GoogleLoginBtns;
