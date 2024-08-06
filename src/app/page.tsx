import Chat from "./components/Chat/Chat";
import FileTree from "./components/FileTree/FileTree";
import NavBar from "./components/NavBar/NavBar";
import "./styles.scss";
export default function Home() {
  return (
    <main className="main">
      <NavBar />
      <div className="body">
        <FileTree></FileTree>
        <Chat></Chat>
      </div>
    </main>
  );
}
