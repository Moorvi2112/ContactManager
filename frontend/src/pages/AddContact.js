import { useState } from "react";
import axios from "axios";

function AddContact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.phone.length !== 10) {
      alert("❌ Phone must be 10 digits");
      return;
    }

    await axios.post("http://localhost:5000/api/contacts", form);
    alert("✅ Contact Added");

    setForm({ name: "", email: "", phone: "" });
  };

  return (
    <div className="container">
      <div className="box">
        <h2>➕ Add Contact</h2>

        <form onSubmit={handleSubmit}>
          <table className="form-table">
            <tbody>

              <tr>
                <td>Name</td>
                <td>
                  <input
                    value={form.name}
                    onChange={(e)=>setForm({...form,name:e.target.value})}
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>Email</td>
                <td>
                  <input
                    value={form.email}
                    onChange={(e)=>setForm({...form,email:e.target.value})}
                  />
                </td>
              </tr>

              <tr>
                <td>Phone</td>
                <td>
                  <input
                    inputMode="numeric"
                    maxLength="10"
                    placeholder="10-digit number"
                    value={form.phone}
                    onChange={(e)=>{
                      const val = e.target.value;
                      if (/^\d*$/.test(val)) {
                        setForm({...form, phone: val});
                      }
                    }}
                    required
                  />
                </td>
              </tr>

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