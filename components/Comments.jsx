import React, {useState, useEffect} from 'react';
import moment from 'moment';
import parse from 'html-react-parser';
import { getComments } from '../services';
import styles from '../styles/components/comments.module.scss'

const Comments = ({ slug }) => {

  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(slug).then((result) => setComments(result));
  }, [])

  return (
    <>
      {comments.length > 0 && (      
        <div className={styles.card}>
            <h3 className={styles.title}>
              {comments.length}
              {' '}
              Comments
            </h3>
            {comments.map((comment) => (
              <div key={comment.createdAt} className={styles.comment}>
                <p>
                  <span className={styles.author}>{comment.name}</span>
                  {' '}
                  on
                  {' '}
                  {moment(comment.createdAt).format('MMM DD, YYYY')}
                </p>
                <p>{parse(comment.comment)}</p>
              </div>
            ) )}
        </div>
      )}
    </>
    );
};

export default Comments;