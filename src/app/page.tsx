import Chat from "./components/Chat/Chat";
import Notes from "./components/Notes/Notes";
import FileTree from "./components/FileTree/FileTree";
import GridBackground from "./components/GridBackground/GridBackground";
import NavBar from "./components/NavBar/NavBar";
import "./styles.scss";
export default function Home() {
  return (
    <main className="main">
      <NavBar />
      <GridBackground />
      <section className="dataSection">
        <FileTree />
        <Chat />
        <Notes />
      </section>
    </main>
  );
}
