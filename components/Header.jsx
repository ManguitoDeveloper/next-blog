import React, { useState, useEffect} from 'react';
import Link from 'next/link';
import { getCategories } from '../services';
import styles from '../styles/components/header.module.scss';

const Header = (props) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      getCategories().then((newCategories) => setCategories(newCategories))
    }, []);

    return (
    
        <div className={styles.header}>

            <Link href="/" passHref>
                <span className={styles.logo}>
                    Blog
                </span>
            </Link>

            <ol className={styles.categories}>
                {categories.map((category) => (
                    <Link key={category.slug} href={`/category/${category.slug}`} passHref>
                        <span className={styles.category}>
                            {category.name}
                        </span>
                    </Link>
                ))}
            </ol>

        </div>
    
    );
};

export default Header;
