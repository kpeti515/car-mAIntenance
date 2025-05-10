import React from 'react';

const SignupPage = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <label>Email:</label>
        <input type="email" /><br />
        <label>Password:</label>
        <input type="password" /><br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
