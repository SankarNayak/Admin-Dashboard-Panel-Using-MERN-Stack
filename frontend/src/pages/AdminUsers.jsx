import { useEffect, useState } from "react";
import { useAuth } from "../store/authContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { authorizationToken } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`users: ${data}`);
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      // const data = await response.json();
      // console.log(`Users after delete: ${data}`);

      if (response.ok) {
        getAllUsersData();
        toast.success("User deleted successfully!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Unable to delete the user");
    }
  };

  useEffect(() => {
    getAllUsersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1>Admin Users Data</h1>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((currUser, index) => {
                return (
                  <tr key={index}>
                    <td>{currUser.username}</td>
                    <td>{currUser.email}</td>
                    <td>{currUser.phone}</td>
                    <td>
                      <Link to={`/admin/users/${currUser._id}/edit`}>Edit</Link>
                    </td>
                    <td>
                      <button onClick={() => deleteUser(currUser._id)}>
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

export default AdminUsers;
