import DetailProduct from "../components/DetailProduct";

const DetailPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <DetailProduct />
      </div>
    </div>
  );
};

export default DetailPage;
