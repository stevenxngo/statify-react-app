import { ScaleLoader } from "react-spinners";

function Spinner() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center my-4">
      loading...
      <ScaleLoader className="mt-2" color="white" />
    </div>
  );
}

export default Spinner;