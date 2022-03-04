import React from 'react';
import { useRouter } from 'next/router';

import { getCategories, getCategoryPost } from '../../services';
import { PostCard, Categories, Loader } from '../../components';

import styles from '../../styles/components/category.module.scss'

const CategoryPost = ({ posts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <main className={styles.wrapper}>

      <div className={styles.posts}>
        {posts.map((post) => <PostCard post={post.node} key={post.title} />)}
      </div>

      <aside className={styles.sidebar}>

          <Categories/>

      </aside>

  </main>
  );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug);

  return {
    props: { posts },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}