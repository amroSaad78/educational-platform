const Panel = ({ position, title, body, btnId, btnVal, imgSrc, onClick }) => {
  return (
    <div className={`panel ${position}`}>
      <div className="content">
        <h3>{title}</h3>
        <p>{body}</p>
        <button className="auth-btn transparent" id={btnId} onClick={onClick}>
          {btnVal}
        </button>
      </div>
      <img src={imgSrc} className="auth-image" alt="" />
    </div>
  );
};

export default Panel;
