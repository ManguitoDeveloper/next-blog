import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/components/postCard.module.scss';

const PostsCard = ({ post }) => {
  return (
  
    <div className={styles.card}>
      
      <div className={styles.imageBox}>
        <Image src={post.featuredImage.url} alt={post.title} layout='fill' className={styles.customImg}/>
      </div>
      
      <p className={styles.title}>
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </p>

      <div className={styles.authorBox}>
        <div className={styles.imageBox}>
          <Image src={post.author.photo.url} alt={post.author.name} layout="fill" className={styles.customImg} id={styles.author}></Image>
        </div>
        <p>{post.author.name}</p>
        <span className={styles.date}>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
      </div>


      <p className={styles.excerpt}>{post.excerpt}</p>

      <div className={styles.postButton}>
        <Link href= {`/post/${post.slug}`} passHref>
          <span >Continue Reading...</span>
        </Link>
      </div>

    </div>
      
  );
};

export default PostsCard;
