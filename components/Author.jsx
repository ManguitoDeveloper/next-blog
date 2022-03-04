import React from 'react';
import Image from 'next/image';
import styles from '../styles/components/author.module.scss';

const Author = ({ author }) => {
  return (
  <div className={styles.card}>
    <div className={styles.imageBox}>
        <Image src={author.photo.url} alt={author.name} layout='fill' className={styles.customImg}/>
      </div>
      <div className={styles.info}>
        <h3 className={styles.name} >{author.name}</h3>
        <p>{author.bio}</p>
      </div>
  </div>
  );
};

export default Author;