import React, { useState, type FormEvent } from 'react';
import './Panel.css'

interface PartnerPayload {
  name: string;
}

const Panel: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [clientID, setClientID] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [showApp, setShowApp] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload: PartnerPayload = {
      name    
    };

    //const backendUrl = import.meta.env.VITE_API_URL;;
    const backendUrl = 'http://localhost:8000/';
    try {
      const response = await fetch(backendUrl + 'api/public/apps/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
        const data = await response.json();
      if (response.ok) {
        setMessage('Partner created successfully!');
        setClientID(data.client_id);
        setSecret(data.client_secret);
        setName(data.name);
        setShowApp(true);
      } else {
        setMessage('Error: ' + (data.error || 'Something went wrong'));
      }
    } catch (error: any) {
      setMessage('Network error: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h2>Add New Partner</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="nameInput">Name:</label>
          <input
            id="nameInput"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="input"
          />
        </div>
        <button type="submit" className="btn">
          Create Partner
        </button>
      </form>
      {message && <p className="message">{message}</p>}
      {showApp && (
        <div className="app-info">
          <div className="app-info-title">Your app:</div>
          <div><strong>Name:</strong> {name}</div>
          <div><strong>ID:</strong> {clientID}</div>
          <div><strong>Secret:</strong> {secret}</div>
        </div>
      )}
    </div>
  );
};

export default Panel;
