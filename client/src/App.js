import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState({ members: [] });
  const [newMember, setNewMember] = useState('');

  useEffect(() => {
    fetch("members")
      .then(res => res.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const addMember = () => {
    fetch("members", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ member: newMember })
    })
      .then(res => res.json())
      .then(data => {
        setData(data);
        setNewMember('');
      })
      .catch(error => {
        console.error('Error adding member:', error);
      });
  };

  const removeMember = (member) => {
    fetch(`members/${member}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error removing member:', error);
      });
  };

  return (
    <div>
      <h1>Hello</h1>
      {(typeof data.members === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        data.members.map((member, i) => (
          <p key={i}>
            {member} <button onClick={() => removeMember(member)}>Remove</button>
          </p>
        ))
      )}
      <input
        type="text"
        value={newMember}
        onChange={(e) => setNewMember(e.target.value)}
        placeholder="Add new member"
      />
      <button onClick={addMember}>Add Member</button>
    </div>
  );
}

export default App;
