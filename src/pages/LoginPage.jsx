import FormLogin from "../components/FormLogin";

const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <FormLogin />
      </div>
    </div>
  );
};

export default LoginPage;
