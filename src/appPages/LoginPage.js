import React, { useContext, useState, useRef } from "react";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useNavigate } from "react-router-dom";
import { LayoutContext } from "../context/layoutcontext";
import { Toast } from "primereact/toast";
import { UserSessionUtils } from "../utils/UserSessionUtils";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const { layoutConfig } = useContext(LayoutContext);
  const [username, setName] = useState("");
  const containerClassName = classNames(
    "surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  );
  const navigate = useNavigate();
  const toast = useRef();

  const logo =
    layoutConfig.colorScheme === "light"
      ? require("../assets/logos/purple_logo.png")
      : require("../assets/logos/white.png");

  const handleSubmit = () => {
    if (username.length > 0 && password.length > 0) {
      UserSessionUtils.setIsUserLoggedIn(true);
      UserSessionUtils.isUserLoggedIn()
      UserSessionUtils.setUserDetails({ username, password });
      navigate("/dashboard", { replace: true });
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Invalid username or password",
        life: 5000,
      });
    }
  };
  return (
    <div className={containerClassName}>
      <div className="flex flex-column align-items-center justify-content-center">
        <div
          style={{
            borderRadius: "56px",
            padding: "0.3rem",
            background:
              "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)",
          }}
        >
          <div
            className="w-full surface-card py-8 px-5 sm:px-8"
            style={{ borderRadius: "53px" }}
          >
            <div className="text-center mb-5">
              <img src={logo} alt="Waci logo" height="60" className="mb-3" />
              <div className="text-900 text-3xl font-medium mb-3">
                Welcome, User!
              </div>
              <span className="text-600 font-medium">Sign in to continue</span>
            </div>
            <Toast ref={toast} />
            <div>
              <label
                htmlFor="email1"
                className="block text-900 text-xl font-medium mb-2"
              >
                Email
              </label>
              <InputText
                inputid="email1"
                type="text"
                placeholder="Email address"
                className="w-full md:w-30rem mb-5"
                style={{ padding: "1rem" }}
                value={username}
                onChange={(e) => setName(e.target.value)}
              />

              <label
                htmlFor="password1"
                className="block text-900 font-medium text-xl mb-2"
              >
                Password
              </label>
              <Password
                inputid="password1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                toggleMask
                className="w-full mb-5"
                inputClassName="w-full p-3 md:w-30rem"
                feedback={false}
              ></Password>

              <div className="flex align-items-center justify-content-between mb-5 gap-5">
                <div className="flex align-items-center">
                  <Checkbox
                    inputid="rememberme1"
                    checked={checked}
                    onChange={(e) => setChecked(e.checked)}
                    className="mr-2"
                  ></Checkbox>
                  <label htmlFor="rememberme1">Remember me</label>
                </div>
                <a
                  href="/"
                  className="font-medium no-underline ml-2 text-right cursor-pointer"
                  style={{ color: "var(--primary-color)" }}
                >
                  Forgot password?
                </a>
              </div>
              <Button
                label="Sign In"
                className="w-full p-3 text-xl"
                onClick={() => handleSubmit()}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
