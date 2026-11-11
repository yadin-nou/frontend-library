import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.userInfo);
  return (
    <div>
      <main class="profile">
        <header class="profile-header">
          <img
            class="avatar"
            src="https://via.placeholder.com/90"
            alt="User avatar"
          />
          <div>
            <h1>
              {user.fName} {user.lName}
            </h1>
            <p>{user.email}</p>
          </div>
        </header>

        <section class="section">
          <h2>Personal Details</h2>
          <dl class="details">
            <div>
              <dt>First name</dt>
              <dd>{user.fName}</dd>
            </div>
            <div>
              <dt>Last name</dt>
              <dd>{user.lName}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>0400 000 000</dd>
            </div>
            <div>
              <dt>Member since</dt>
              <dd>Oct 2026</dd>
            </div>
            <div>
              <dt>Password</dt>
              <dd>
                <Link to="/forget-password">Change</Link>
              </dd>
            </div>
          </dl>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
