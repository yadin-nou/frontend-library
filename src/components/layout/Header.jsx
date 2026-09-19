import React from "react";

const Header = () => {
  return (
    <div>
      <header className="d-flex justify-content-between align-item-center border">
        <div>
          <div>Logo</div>
          {/* if login we show this */}
          {/* <div>Welcome to Yadin</div> */}
        </div>
        <div className="d-flex justify-content-between align-items-center gap-3">
          <div>Signup</div>
          <div>Login</div>
        </div>
      </header>
      <hr />
    </div>
  );
};

export default Header;
