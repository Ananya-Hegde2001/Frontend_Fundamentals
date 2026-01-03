import { useState } from "react";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";

function Home() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const handleSubmit = (name) => {
    if (editUser) {
      setUsers(
        users.map((u) =>
          u.id === editUser.id ? { ...u, name } : u
        )
      );
      setEditUser(null);
    } else {
      setUsers([...users, { id: Date.now(), name }]);
    }
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <main className="app">
      <h2 className="app__title">React CRUD App</h2>
      <UserForm onSubmit={handleSubmit} editUser={editUser} />
      <UserList users={users} onEdit={setEditUser} onDelete={handleDelete} />
    </main>
  );
}

export default Home;
