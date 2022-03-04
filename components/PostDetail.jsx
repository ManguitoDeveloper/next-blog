import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import styles from '../styles/components/postDetail.module.scss'

const PostDetail = ({ post }) => {

  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }
    }

    switch (type) {
      case 'heading-three':
        return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'image':
        return (
          <Image
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };
  return (
  <div className={styles.post}>

    <div className={styles.imageBox}>
        <Image src={post.featuredImage.url} alt={post.title} layout='fill' className={styles.customImg}/>
    </div>  

    <div className={styles.authorBox}>
        <div className={styles.imageBox}>
          <Image src={post.author.photo.url} alt={post.author.name} layout="fill" className={styles.customImg} id={styles.author}></Image>
        </div>
        <p>{post.author.name}</p>
        <span className={styles.date}>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
      </div>

    <h1 className={styles.title}>{post.title}</h1>

    <div className={styles.text}>
      {post.content.raw.children.map((typeObj, index) => {
        const children = typeObj.children.map((item, itemIndex) => getContentFragment(itemIndex, item.text, item));
        return getContentFragment(index, children, typeObj, typeObj.type);
      })}
    </div>

  </div>
  );
};

export default PostDetail;
