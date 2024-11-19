import Header from "./header";
import Footer from "./footer";

function Layout(props) {
  return (
    <div className="flex flex-col min-h-screen bg-[#ee0e6f]">
      <header className="sticky top-0 w-full"> 
        <Header />
      </header>
      <main className="flex-grow mt-24"> {/* This will allow the main content to grow and push the footer down */}
        {props.children}
      </main>
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;