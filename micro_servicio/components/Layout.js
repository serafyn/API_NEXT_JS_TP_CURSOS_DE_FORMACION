import Head from "next/head";
import NavBar from "./NavBar";



function Layout({ children }) {

    return (
        <div>
            <Head></Head>
            <NavBar />
            <main className="layout">{children}</main>

        </div>
    );
}

export default Layout;
