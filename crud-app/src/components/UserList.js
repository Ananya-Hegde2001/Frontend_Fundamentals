function UserList({ users, onEdit, onDelete }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name}
          <div>
            <button onClick={() => onEdit(user)}>Edit</button>
            <button onClick={() => onDelete(user.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default UserList;
