import { useState } from "react";
import axios from "axios";

function AddContact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  // ✅ YOUR DEPLOYED BACKEND URL
  const API = "https://contactmanager-eg48.onrender.com/api/contacts";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ VALIDATION
    if (form.phone.length !== 10) {
      alert("❌ Phone must be 10 digits");
      return;
    }

    try {
      await axios.post(API, {
        name: form.name,
        email: form.email,
        phone: form.phone
      });

      alert("✅ Contact Added Successfully");

      // reset form
      setForm({
        name: "",
        email: "",
        phone: ""
      });

    } catch (err) {
      console.log("Add Error:", err);
      alert("❌ Failed to add contact");
    }
  };

  return (
    <div className="container">
      <div className="box">
        <h2>➕ Add Contact</h2>

        <form onSubmit={handleSubmit}>
          <table className="form-table">
            <tbody>

              {/* NAME */}
              <tr>
                <td>Name</td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    required
                  />
                </td>
              </tr>

              {/* EMAIL */}
              <tr>
                <td>Email</td>
                <td>
                  <input
                    type="email"
                    placeholder="Enter email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </td>
              </tr>

              {/* PHONE */}
              <tr>
                <td>Phone</td>
                <td>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength="10"
                    placeholder="Enter 10-digit number"
                    value={form.phone}
                    onChange={(e) => {
                      const val = e.target.value;

                      // only numbers allowed
                      if (/^\d*$/.test(val)) {
                        setForm({ ...form, phone: val });
                      }
                    }}
                    required
                  />
                </td>
              </tr>

              {/* BUTTON */}
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  <button className="add-btn">Add Contact</button>
                </td>
              </tr>

            </tbody>
          </table>
        </form>

      </div>
    </div>
  );
}

export default AddContact;