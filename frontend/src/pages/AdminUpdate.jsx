import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/authContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminUpdate = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const params = useParams();
  console.log("params data:", params); // Here the params basically gives us a object where id is there in the obj, so by parma.id we actually getting the actual url id
  const { authorizationToken } = useAuth();

  //to get the single user data
  const getSingleUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      console.log(`users single data: ${data}`);
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSingleUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({
      ...data,
      [name]: value,
    });
  };

  //? To update the data dynamically {
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast.success("Updated succesfully");
        navigate("/admin/users");
      } else {
        toast.error("Failed to update");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Update User Data</h1>
        </div>
        <div className="container grid grid-two-cols">
          <section className="section-form">
            <form onSubmit={handleUpdate}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={data.username}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={data.email}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone">Mobile</label>
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  value={data.phone}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <button
                  style={{ backgroundColor: "rgb(3, 205, 3)" }}
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </>
  );
};

export default AdminUpdate;
