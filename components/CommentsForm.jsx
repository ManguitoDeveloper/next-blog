import React, {useRef ,useState, useEffect} from 'react';
import { submitComment } from '../services';
import styles from '../styles/components/commentsForm.module.scss'

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name');
    emailEl.current.value = window.localStorage.getItem('email');
  }, [])

  const handleCommentSubmission = () => {
    
    setError(false);
    
    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;
    
    if(!comment || !name || !email){
      setError(true);
      return;
    }

    const commentObj = { name, email, comment, slug }

    if(storeData) {
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', email);
    }else {
      window.localStorage.removeItem('name', name);
      window.localStorage.removeItem('email', email);
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);
      
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    })
    
  };

  return (
  <div className={styles.card}>
    <h3 className={styles.title}>Leave a Reply</h3>
    <form className={styles.form}>  
      <textarea ref={commentEl} className={styles.commentBox} name="comment" cols="30" rows="5" placeholder='Comment'></textarea>
      <input placeholder='Name' type="text" name="nameInput" id={styles.nameInput} ref={nameEl}/>
      <input placeholder='Email' type="email" name="email" id={styles.emailInput} ref={emailEl}/>
      <div className={styles.store}>
        <input type="checkbox" name="storeData" id="storeData" value="true" ref={storeDataEl}/>
        <label htmlFor="storeData">Save my e-mail and name for the next time I comment</label>
      </div>  
    </form>
    {error && <p className={styles.error}>All fields are required</p>}
    <button type="button" onClick={handleCommentSubmission}>Post Comment</button>
    {showSuccessMessage && <span className={styles.submitted}>Comment submitted for review</span>}
  </div>
  );
};

export default CommentsForm;