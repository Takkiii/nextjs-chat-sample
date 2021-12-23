import Link from 'next/link';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <ul className={styles.listContainer}>
          <li className={styles.list}>
            <Link href="/virtuoso">
              <a>
                Virtuoso Sample
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
