import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../store/authContext";
import { toast } from "react-toastify";

const AdminReply = () => {
  const [reply, setReply] = useState("");
  const [contactData, setContactData] = useState({
    username: "",
    email: "",
    message: "",
  });
  const { authorizationToken } = useAuth();

  const getSingleContactsData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/contacts/${params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        }
      );

      const data = await response.json();
      setContactData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    getSingleContactsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReply = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/contacts/reply/${params.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify({ reply, email: contactData.email }),
        }
      );

      if (response.ok) {
        toast.success("Replied succesfully");
        navigate("/admin/contacts");
      } else {
        toast.error("Failed to reply");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Reply The User For Their Query</h1>
        </div>
        <div className="container grid grid-two-cols">
          <section className="section-form">
            <form onSubmit={handleReply}>
              <div>
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  defaultValue={contactData.username}
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
                  defaultValue={contactData.email}
                  required
                />
              </div>
              <div>
                <label htmlFor="message">message</label>
                <input
                  type="text"
                  name="message"
                  id="message"
                  autoComplete="off"
                  defaultValue={contactData.message}
                  required
                />
              </div>
              <div>
                <label htmlFor="reply">reply</label>
                <textarea
                  name="reply"
                  id="reply"
                  value={reply}
                  autoComplete="off"
                  placeholder="Type your reply here..."
                  onChange={(e) => setReply(e.target.value)}
                  required
                />
              </div>
              <div>
                <button
                  style={{ backgroundColor: "rgb(3, 205, 3)" }}
                  type="submit"
                >
                  Reply
                </button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </>
  );
};

export default AdminReply;
