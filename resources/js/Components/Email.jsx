import React from 'react';

function Email(props) {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="font-bold text-lg mb-2">{props.data.subject}</h2>
      <p>{props.data.body}</p>
    </div>
  );
}

export default Email;