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
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="user-form__field">
        <label className="user-form__label" htmlFor="user-name">
          Name
        </label>
        <input
          id="user-name"
          className="user-form__input"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
        />
      </div>

      <button className="user-form__button" type="submit">
        {editUser ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default UserForm;
