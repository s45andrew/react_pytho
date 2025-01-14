import React, { useState, useEffect } from 'react';
import './styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


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
   if(newMember.length>2){ 
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
    } else {
      console.error('no stock')
    }
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
    <div className="joiner">
      <div className="side">
        <h1>Hello</h1>
        {(typeof data.members === 'undefined') ? (
          <p>Loading...</p>
        ) : (
          data.members.map((member, i) => (
            <div className='mem' key={i}>
             <span>{member}</span> <button className="but"onClick={() => removeMember(member)}>
                <i className="fas fa-trash-alt" /></button>
            </div>
          ))
        )}
        <div className='joiner'>
           <input className='inp'
          type="text"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          placeholder="Add new stock"
        />
        <button className='b11' onClick={addMember}>+</button>
        </div>  
      </div>
      <div className="info">
      {typeof data.members === 'undefined' ? (
  <p>loading...</p>
) : (
  data.members.map((member, i) => (
    <button key={i} className="Jbut"> {member} </button>
  ))
)}
<p>info page</p>

          
        <text>info page</text>

      </div>
    </div>
  );
}

export default App;

