import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes);

  const [formValues, handleInputChange, reset] = useForm(note);
  const { title, body } = formValues;

  const activeId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

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
            value={title}
            onChange={handleInputChange}
          />
          <textarea
            placeholder='What happened today'
            className='notes__textarea'
            value={body}
            onChange={handleInputChange}
          ></textarea>

          {note.url && (
            <div className='note__image'>
              <img
                alt='imagen'
                src='https://img.freepik.com/vector-gratis/paisaje-natural-nocturno-rio-noche-estrellada_104785-54.jpg?size=626&ext=jpg'
              ></img>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
