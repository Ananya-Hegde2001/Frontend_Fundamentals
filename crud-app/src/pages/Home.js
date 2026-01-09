import { useState } from "react";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";

function Home() {
  // State to store the list of users
  const [users, setUsers] = useState([]);
  
  // State to track which user is being edited (null if none)
  const [editUser, setEditUser] = useState(null);

  // Handle form submission for both creating and updating users
  const handleSubmit = (name) => {
    if (editUser) {
      // Update existing user: map through users and replace the one being edited
      setUsers(
        users.map((u) => u.id === editUser.id ? { ...u, name } : u)
      );
      // Clear edit mode after updating
      setEditUser(null);
    } else {
      // Create new user: add to the users array with a unique ID
      setUsers([...users, { id: Date.now(), name }]);
    }
  };

  // Delete a user by filtering out the user with the matching ID
  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div>
      <h1>React CRUD App</h1>
      {/* Form component for adding/editing users */}
      <UserForm onSubmit={handleSubmit} editUser={editUser} />
      {/* List component to display all users with edit/delete actions */}
      <UserList users={users} onEdit={setEditUser} onDelete={handleDelete} />
    </div>
  );
}

export default Home;
