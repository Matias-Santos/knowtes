import Link from "next/link";
import "./styles.scss";
export default function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Knowtes</Link>
        </li>
        <li>
          <Link href="/files">Files</Link>
        </li>
        <li>
          <Link href="/chat">Chat</Link>
        </li>
        <li>
          <Link href="/graphs">Graphs</Link>
        </li>
        <li>
          <Link href="/templates">Templates</Link>
        </li>
        <li>
          <Link href="/brain">Brain</Link>
        </li>
        <li className="login">
          <Link href="/login">Login</Link>
        </li>
        <li className="settings">
          <Link href="/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  );
}
