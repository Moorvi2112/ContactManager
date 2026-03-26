import axios from "axios";

function ContactList({ contacts, fetchContacts }) {

  const deleteContact = async (id) => {
    await axios.delete(`hhttps://contactmanager-eg48.onrender.com/api/contacts/${id}`);
    fetchContacts();
  };

  return (
    <div>
      {contacts.map(c => (
        <div key={c._id} className="card">
          <h3>{c.name}</h3>
          <p>{c.email}</p>
          <p>{c.phone}</p>
          <button onClick={()=>deleteContact(c._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ContactList;