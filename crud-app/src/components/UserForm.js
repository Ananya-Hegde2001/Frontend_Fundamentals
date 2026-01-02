import { useState, useEffect } from "react";

function UserForm({ onSubmit, editUser }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editUser) setName(editUser.name);
  }, [editUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">
        {editUser ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default UserForm;
