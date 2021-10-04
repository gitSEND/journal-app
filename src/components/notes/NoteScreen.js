import React from 'react';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
  return (
    <div className='notes__main-content'>
      <NotesAppBar />

      <div className='notes__content'>
        <form className='notes__content'>
          <input
            type='text'
            placeholder='Some awesome title'
            className='notes__title-input'
            autoComplete='off'
          />
          <textarea
            placeholder='What happened today'
            className='notes__textarea'
          ></textarea>

          <div className='note__image'>
            <img
              alt='imagen'
              src='https://img.freepik.com/vector-gratis/paisaje-natural-nocturno-rio-noche-estrellada_104785-54.jpg?size=626&ext=jpg'
            ></img>
          </div>
        </form>
      </div>
    </div>
  );
};
