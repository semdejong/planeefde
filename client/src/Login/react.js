import { useState } from "react";
import { Input, Button } from "antd";

import { useLoggedIn } from "../Context/LoggedInContext";
import useLogin from "./hooks/useLogin";

export default function Login() {
  const setLoggedIn = useLoggedIn().setLoggedIn;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, performLogin } = useLogin();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-64 h-64 flex flex-col items-center justify-center">
        {" "}
        <h1 className="text-gray-800 font-semibold text-5xl mb-3">Login</h1>
        <div className="w-full flex flex-col items-center justify-center space-y-4">
          <Input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input.Password
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!loading ? (
            <Button
              className="w-full"
              type="primary"
              onClick={() => performLogin(email, password, setLoggedIn)}
            >
              login
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
