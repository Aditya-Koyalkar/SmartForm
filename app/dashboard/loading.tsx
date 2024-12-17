import { Spinner } from "../_components/Spinner";

const loading = () => {
  return (
    <div className=" h-full w-full flex justify-center items-center">
      <Spinner />
    </div>
  );
};

export default loading;
