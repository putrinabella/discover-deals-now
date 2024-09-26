import Product from "../components/Product";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {/* <h1 className="content-label">Explore Your Style</h1> */}
        <Product />
      </div>
    </div>
  );
};

export default HomePage;
