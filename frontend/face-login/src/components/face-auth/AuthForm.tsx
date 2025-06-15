import React, { useState } from 'react';
import './AuthForm.css';

interface AuthFormProps {
  onComplete: (data: { name: string; email: string }) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onComplete(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2 className="form-title">User Form</h2>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div> */}

      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
};

export default AuthForm;
