import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authContext";
import { toast } from "react-toastify";

const URL = "http://localhost:5000/api/auth/login";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeToken } = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      console.log("login form", response);

      const res_data = await response.json();

      if (response.ok) {
        toast.success("login successfull");
        storeToken(res_data.token);

        setUser({ email: "", password: "" });
        navigate("/");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
        console.log("invalid credentials");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/register.png"
                  alt="a nurse with a cute look"
                  width="400"
                  height="500"
                />
              </div>
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <a style={{}} onClick={() => navigate("/forgot-password")}>
                    Forgot your password?
                  </a>
                  <button type="submit" className="btn btn-submit">
                    Login Now
                  </button>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "1.6rem",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ color: "white" }}>
                      Don&apos;t have an account?
                    </p>
                    <a
                      style={{ paddingLeft: "1rem" }}
                      onClick={() => navigate("/register")}
                    >
                      Register
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Login;
