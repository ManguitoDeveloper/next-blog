import React, { useState, useEffect} from 'react';
import Link from 'next/link';
import { getCategories } from '../services';
import styles from '../styles/components/categories.module.scss';

const Categories = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
      getCategories().then((newCategories) => setCategories(newCategories))
    }, []);

    return (
  
        <div className={styles.card}>
            <h3 className={styles.title}>
                Categories
            </h3>
            {categories.map((category) => (
                <Link key={category.slug} href={`/${category.slug}`} passHref>
                    <p className={styles.category}>
                        {category.name}
                    </p>
                </Link>
            ))}
        </div>
    
      );
    };

export default Categories;
