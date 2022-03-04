import React, { useState, useEffect }from 'react';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/components/postWidget.module.scss'

import {getRecentPosts, getSimilarPosts} from '../services'

const PostWidget = ({ categories, slug }) => {

    const [relatedPosts, setRelatedPosts] = useState([]);

    useEffect(() => {
        if(slug){
            getSimilarPosts(categories, slug)
                .then((result) => setRelatedPosts(result))
        } else {
            getRecentPosts()
                .then((result) => setRelatedPosts(result))
        }
    }, [slug]);

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>
                {slug ? 'Related Posts' : 'Recent Posts'}
            </h3>
            { relatedPosts.map((post) => (
                <div key={post.title} className={styles.related}>
                    <div className={styles.imageBox}>
                        <Image src={post.featuredImage.url} alt={post.title} layout='fill' ></Image>
                    </div>
                    <div>
                        <p>
                            {moment(post.createdAt).format('MMM DD, YYYY')}
                        </p>
                        <Link href={`/post/${post.slug}`} passHref>
                            <span className={styles.name}>
                                {post.title}
                            </span>
                        </Link>
                    </div>
                </div>
            ))
            }
        </div>
    );
};


export default PostWidget;
