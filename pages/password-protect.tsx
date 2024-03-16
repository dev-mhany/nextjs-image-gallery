import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const PasswordProtectPage = () => {
  const router = useRouter();
  const error = router.query.error;
  return (
    <div className="container">
      <div className="grid place-content-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <p className="text-white">Enter Password:</p>
          <form action="/api/password-protect" method="post">
          {error && (
          <label className="label text-white">
            <span className="label-text text-error">{error}</span>
          </label>
        )}
            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  name="password"
                  className="input input-bordered"
                />
              </div>
                <button className="btn text-white">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default PasswordProtectPage;
