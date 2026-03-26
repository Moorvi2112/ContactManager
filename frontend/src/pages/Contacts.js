import { useEffect, useState } from "react";
import axios from "axios";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const API = "https://contactmanager-eg48.onrender.com/api/contacts ";

  const fetchContacts = async () => {
    const res = await axios.get(API);
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const deleteContact = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchContacts();
  };

  const editContact = (c) => {
    setEditId(c._id);
    setForm({
      name: c.name,
      email: c.email,
      phone: c.phone
    });
  };

  const updateContact = async () => {
    if (form.phone.length !== 10) {
      alert("❌ Phone must be 10 digits");
      return;
    }

    try {
      await axios.put(`${API}/${editId}`, {
        name: form.name,
        email: form.email,
        phone: form.phone
      });

      alert("✅ Contact Updated Successfully");

      setEditId(null);
      setForm({ name: "", email: "", phone: "" });

      fetchContacts();
    } catch (err) {
      console.log(err);
      alert("❌ Update failed");
    }
  };

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <div className="box">
        <h2>📋 Contact List</h2>

        <input
          className="search"
          placeholder="🔍 Search..."
          onChange={(e)=>setSearch(e.target.value)}
        />

        {filtered.map(c => (
          <div className="card" key={c._id}>

            {editId === c._id ? (
              <div className="edit-form">
                <input
                  value={form.name}
                  onChange={(e)=>setForm({...form,name:e.target.value})}
                />
                <input
                  value={form.email}
                  onChange={(e)=>setForm({...form,email:e.target.value})}
                />
                <input
                  value={form.phone}
                  maxLength="10"
                  inputMode="numeric"
                  onChange={(e)=>{
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      setForm({...form, phone: val});
                    }
                  }}
                />

                {/* IMPORTANT FIX */}
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
                <div className="info">
                  <h3>{c.name}</h3>
                  <p>{c.email}</p>
                  <p>{c.phone}</p>
                </div>

                <div className="actions">
                  <button
                    className="edit"
                    onClick={()=>editContact(c)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete"
                    onClick={()=>deleteContact(c._id)}
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