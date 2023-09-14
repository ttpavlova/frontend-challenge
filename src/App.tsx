import "./App.css";
import { Navbar } from "./components/Navbar";
import { Layout } from "./pages/Layout";
import { HomePage } from "./pages/HomePage";

function App() {
    return (
        <>
            <Navbar />
            <Layout>
                <HomePage />
            </Layout>
        </>
    );
}

export default App;
