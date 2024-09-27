import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authContext";
import { toast } from "react-toastify";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
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
    // const { username, email, phone, password } = user;
    // console.log(user);

    try {
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      console.log("res from server", res_data.extraDetails);

      if (response.ok) {
        storeToken(res_data.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        toast.success("Registration successful");
        navigate("/");
      } else {
        //? Here we can actually handle those erros through the error midldeware and validate schema
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols">
            <div className="registration-image reg-img">
              <img
                src="./images/register.png"
                alt="loading..."
                width="400"
                height="500"
              />
            </div>
            <div className="registration-form">
              <h1 className="main-heading mb-3">Registration form</h1>
              <br />
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username">username</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="username"
                    autoComplete="off"
                    value={user.username}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="email">email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="email"
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="phone">phone</label>
                  <input
                    type="number"
                    name="phone"
                    placeholder="phone"
                    autoComplete="off"
                    value={user.phone}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <label htmlFor="password">password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInput}
                  />
                </div>
                <button type="submit" className="btn btn-submit">
                  Register Now
                </button>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "1.6rem",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ color: "white" }}>Already have an account?</p>
                  <a
                    style={{ paddingLeft: "1rem" }}
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Register;
