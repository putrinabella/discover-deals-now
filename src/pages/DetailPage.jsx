import DetailProduct from "../components/DetailProduct";

const DetailPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {/* <h1>Detail Page</h1> */}
        <DetailProduct />
      </div>
    </div>
  );
};

export default DetailPage;
