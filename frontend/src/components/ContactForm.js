import { useState } from "react";
import axios from "axios";

function ContactForm({ fetchContacts }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/contacts", form);
    fetchContacts();
    setForm({ name: "", email: "", phone: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input placeholder="Name" value={form.name}
        onChange={(e)=>setForm({...form, name:e.target.value})}/>
      <input placeholder="Email" value={form.email}
        onChange={(e)=>setForm({...form, email:e.target.value})}/>
      <input placeholder="Phone" value={form.phone}
        onChange={(e)=>setForm({...form, phone:e.target.value})}/>
      <button>Add Contact</button>
    </form>
  );
}

export default ContactForm;