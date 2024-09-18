import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/authContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminUpdateServices = () => {
  const [service, setService] = useState({
    service: "",
    description: "",
    price: "",
    provider: "",
  });

  const navigate = useNavigate();

  const params = useParams();
  console.log("params data:", params); // Here the params basically gives us a object where id is there in the obj, so by parma.id we actually getting the actual url id
  const { authorizationToken } = useAuth();

  //to get the single user data
  const getSingleSeriviceData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/services/${params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      console.log(`Services single data: ${data}`);
      setService(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSingleSeriviceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setService({
      ...service,
      [name]: value,
    });
  };

  //? To update the data dynamically {
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/services/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(service),
        }
      );

      if (response.ok) {
        toast.success("Updated succesfully");
        navigate("/admin/services");
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
          <h1 className="main-heading">Update Service Data</h1>
        </div>
        <div className="container grid grid-two-cols">
          <section className="section-form">
            <form onSubmit={handleUpdate}>
              <div>
                <label htmlFor="service">Service</label>
                <input
                  type="text"
                  name="service"
                  id="service"
                  autoComplete="off"
                  value={service.service}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  autoComplete="off"
                  value={service.description}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  autoComplete="off"
                  value={service.price}
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label htmlFor="provider">Provider</label>
                <input
                  type="text"
                  name="provider"
                  id="provider"
                  autoComplete="off"
                  value={service.provider}
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

export default AdminUpdateServices;
