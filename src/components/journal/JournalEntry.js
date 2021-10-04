import React from 'react';

export const JournalEntry = () => {
  return (
    <div className='journal__entry pointer'>
      <div
        className='journal__entry-picture'
        style={{
          backgroundSize: 'cover',
          backgroundImage:
            'url(https://img.freepik.com/vector-gratis/paisaje-natural-nocturno-rio-noche-estrellada_104785-54.jpg?size=626&ext=jpg)',
        }}
      ></div>
      <div className='journal__entry-body'>
        <p className='journal__entry-title'>Un nuevo día</p>
        <p className='journal__entry-content'>
          o get started with React Router in a web app, you’ll need a React web
          app.
        </p>
      </div>
      <div className='journal__entry-date-box'>
        <span>Monday</span>
        <h4>28</h4>
      </div>
    </div>
  );
};
