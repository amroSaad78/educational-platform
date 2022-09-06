const DoubleBtns = ({ leftBtn, rightBtn, onClick }) => {
  return (
    <div className="btns-container">
      <input
        type="button"
        value={leftBtn}
        className="auth-btn solid"
        onClick={onClick}
      />
      <input type="submit" value={rightBtn} className="auth-btn solid" />
    </div>
  );
};

export default DoubleBtns;
