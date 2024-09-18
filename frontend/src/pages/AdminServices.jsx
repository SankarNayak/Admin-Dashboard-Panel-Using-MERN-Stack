import { useEffect, useState } from "react";
import { useAuth } from "../store/authContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const { authorizationToken } = useAuth();

  const getAllServicesData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/services", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const serviceData = await response.json();
      setServices(serviceData);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteService = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/services/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (response.ok) {
        getAllServicesData();
        toast.success("Serivice deleted successfully!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Unable to delete the service");
    }
  };

  useEffect(() => {
    getAllServicesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <section className="admin-services-section">
        <div className="container">
          <h1>Admin Services</h1>
        </div>
        <div className="container admin-services">
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Description</th>
                <th>Price</th>
                <th>Provider</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {services.map((currService, index) => {
                return (
                  <tr key={index}>
                    <td>{currService.service}</td>
                    <td>{currService.description}</td>
                    <td>{currService.price}</td>
                    <td>{currService.provider}</td>
                    <td>
                      <Link to={`/admin/services/${currService._id}/edit`}>
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button onClick={() => deleteService(currService._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AdminServices;
