import { useEffect, useState } from "react";
import axios from "axios";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  // ✅ YOUR DEPLOYED BACKEND URL
  const API = "https://contactmanager-eg48.onrender.com/api/contacts";

  // FETCH CONTACTS
  const fetchContacts = async () => {
    try {
      const res = await axios.get(API);
      setContacts(res.data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // DELETE
  const deleteContact = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchContacts();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  // EDIT
  const editContact = (c) => {
    setEditId(c._id);
    setForm({
      name: c.name,
      email: c.email,
      phone: c.phone
    });
  };

  // UPDATE
  const updateContact = async () => {
    if (form.phone.length !== 10) {
      alert("❌ Phone must be 10 digits");
      return;
    }

    try {
      await axios.put(`${API}/${editId}`, form);

      alert("✅ Updated Successfully");

      setEditId(null);
      setForm({ name: "", email: "", phone: "" });

      fetchContacts();
    } catch (err) {
      console.log("Update error:", err);
      alert("❌ Update failed");
    }
  };

  // SEARCH FILTER
  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <div className="box">
        <h2>📋 Contact List</h2>

        {/* SEARCH */}
        <input
          className="search"
          placeholder="🔍 Search contact..."
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* LIST */}
        {filtered.map(c => (
          <div className="card" key={c._id}>

            {/* EDIT MODE */}
            {editId === c._id ? (
              <div className="edit-form">
                <input
                  value={form.name}
                  onChange={(e)=>setForm({...form,name:e.target.value})}
                  placeholder="Name"
                />
                <input
                  value={form.email}
                  onChange={(e)=>setForm({...form,email:e.target.value})}
                  placeholder="Email"
                />
                <input
                  value={form.phone}
                  maxLength="10"
                  inputMode="numeric"
                  placeholder="Phone"
                  onChange={(e)=>{
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      setForm({...form, phone: val});
                    }
                  }}
                />

                <button
                  type="button"
                  className="save"
                  onClick={updateContact}
                >
                  Save
                </button>
              </div>
            ) : (

              <>
                {/* CONTACT INFO */}
                <div className="info">
                  <h3>{c.name}</h3>
                  <p>{c.email}</p>
                  <p>{c.phone}</p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="actions">
                  <button
                    className="edit"
                    onClick={() => editContact(c)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete"
                    onClick={() => deleteContact(c._id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}

export default Contacts;