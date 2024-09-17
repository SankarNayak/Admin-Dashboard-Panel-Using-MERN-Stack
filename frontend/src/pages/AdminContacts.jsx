import { useEffect, useState } from "react";
import { useAuth } from "../store/authContext";
import { toast } from "react-toastify";

const AdminContacts = () => {
  const [contactData, setContactData] = useState([]);
  const { authorizationToken } = useAuth();

  const getContactsData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();
      console.log("Contacts data:", data);

      if (response.ok) {
        setContactData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContactById = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      if (response.ok) {
        getContactsData();
        toast.success("Deleted succesfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to delete the user");
    }
  };

  useEffect(() => {
    getContactsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <section className="admin-contacts-section">
        <div className="container">
          <h1>User Messages</h1>
        </div>
        <div className="container admin-contacts">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Message</th>
                <th>Delete</th>
                <th>Reply</th>
              </tr>
            </thead>
            <tbody>
              {contactData.map((curContactdata, index) => {
                const { username, email, message, _id } = curContactdata;

                return (
                  <tr key={index}>
                    <td>{username}</td>
                    <td>{email}</td>
                    <td>{message}</td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => deleteContactById(_id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button className="btn">Reply</button>
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

export default AdminContacts;
