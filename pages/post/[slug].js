import React from 'react';
import {getPosts, getPostDetails} from '../../services';
import {PostDetail, Categories, PostWidget, Author, Comments, CommentsForm } from '../../components';
import styles from '../../styles/DetailedPost.module.scss'

const postDetails = ({ post }) => {
  return (
    <main className={styles.wrapper}>

      <div className={styles.post}>
        <PostDetail post={post} />
        <Author author={post.author} />
        <CommentsForm slug={post.slug}/>
        <Comments slug={post.slug}/>
      </div>

      <aside className={styles.sidebar}>

          <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug )}/>
          <Categories/>

      </aside>

  </main>
  );
};

export default postDetails;

export async function getStaticProps({ params }) {

  const data = await getPostDetails(params.slug);

  return{
    props: { post: data }
  } 

};  

export async function getStaticPaths() {
  const posts = await getPosts();

  return{
    paths: posts.map(({ node: { slug }}) => ({ params: { slug }})),
    fallback: false,
  }
}