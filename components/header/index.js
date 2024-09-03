import Link from "next/link";
import styles from "./styles.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <ul className="list-disc pl-5">
        <li>
          <Link href="/" className="underline">
            Home
          </Link>
        </li>
        <li>
          <Link href="/users" className="underline">
            Users
          </Link>
        </li>
        <li>
          <Link href="/users/detail" className="underline">
            Detail
          </Link>
        </li>
        <li>
          <Link href="/profile" className="underline">
            Profile
          </Link>
        </li>
        <li>
          <Link href="/notes" className="underline">
            Notes
          </Link>
        </li>
        <li>
          <Link href="/posts" className="underline">
            Posts
          </Link>
        </li>
      </ul>
    </div>
  );
}
