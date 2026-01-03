function UserList({ users, onEdit, onDelete }) {
  return (
    <ul className="user-list">
      {users.map((user) => (
        <li className="user-list__item" key={user.id}>
          <span className="user-list__name">{user.name}</span>
          <div className="user-list__actions">
            <button className="user-list__button" onClick={() => onEdit(user)}>
              Edit
            </button>
            <button
              className="user-list__button"
              onClick={() => onDelete(user.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default UserList;
