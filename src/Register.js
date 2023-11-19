import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

const Register = () => {
  const [name, namechange] = useState("");

  const [location, locationchange] = useState("");

  const [password, passwordchange] = useState("");

  const nameChange = (e) => {
    namechange(e.target.value);
  };

  const locationChange = (e) => {
    locationchange(e.target.value);
  };

  const passwordChange = (e) => {
    passwordchange(e.target.value);
  };

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (name.length === 0) {
      alert("Name field is Empty");
    } else if (location.length >= 0) {
      const empData = { name, location, password };

      await axios.post("https://stg.dhunjam.in/account/admin/login", empData);

      alert("Registered Successfully!");

      navigate("/");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://static2.bigstockphoto.com/7/7/2/large1500/277401307.jpg')`,
        height: "750px",
      }}
    >
      <div className="Auth-form-container">
        <div
          className="Auth-form"
          style={{ backgroundColor: "black", color: "white" }}
        >
          <div className="Auth-form-content">
            <h1> &emsp;SignUp !</h1>
            <br></br>

            <form className="container" onSubmit={handlesubmit}>
              <div className="">
                <label className="label">Name </label>&emsp;&ensp;
                <input
                  type="text"
                  onChange={nameChange}
                  placeholder="Enter Name"
                ></input>
              </div>
              <br></br>

              <div className="">
                <label className="label">Location </label>&emsp;&ensp;&nbsp;
                <input
                  type="location"
                  required
                  onChange={locationChange}
                  placeholder="Enter Location"
                ></input>
              </div>
              <br></br>

              <div className="">
                <label className="label" required>
                  Password
                </label>
                &nbsp;
                <input
                  type="password"
                  required
                  onChange={passwordChange}
                  placeholder="Enter password"
                ></input>
              </div>
              <br></br>

              <div className="login-div-con">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
              <br></br>

              <div className="log-div">
                Have an account? <Link to={"/"}>login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
