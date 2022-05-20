import { useState } from "react";
import { Input, Button } from "antd";

import useRegister from "./hooks/useRegister";

export default function Login() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const { loading, performRegister } = useRegister();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-2/5 h-1/2 flex flex-col items-center justify-center">
        {" "}
        <h1 className="text-gray-800 font-semibold text-5xl">Register</h1>
        <div className="w-full flex flex-col  justify-center space-y-4">
          <Input
            placeholder="fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <Input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="w-full h-full flex flex-row space-x-4">
            <Input.Password
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input.Password
              placeholder="repeat password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          {!loading ? (
            <Button
              className="w-full"
              type="primary"
              onClick={() =>
                performRegister(
                  fullname,
                  username,
                  email,
                  password,
                  repeatPassword
                )
              }
            >
              Register
            </Button>
          ) : (
            <Button className="w-full" type="primary" loading>
              Loading
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
