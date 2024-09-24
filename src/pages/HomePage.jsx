import Navbar from "../components/Navbar";
import Product from "../components/Product";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Navbar />
        {/* <h1 className="content-label">Explore Your Style</h1> */}
        {/* <h4 className="content-sub">Hello!</h4> */}
        <Product />
      </div>
    </div>
  );
};

export default HomePage;
