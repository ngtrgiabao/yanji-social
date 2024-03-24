import { BG_NOT_AVAILABLE } from "../../../assets";

const InvalidScreen = () => {
  return (
    <div
      className="text-white bg-center bg-cover d-flex justify-content-center align-items-center text-center"
      style={{
        background: `url(${BG_NOT_AVAILABLE}) no-repeat center`,
        height: "100vh",
        scale: "1.2",
      }}
    >
      <div
        className="bg-black w-fit p-5 fs-6"
        style={{
          borderRadius: "1rem",
        }}
      >
        <p className="fw-bold">
          Yanji Social is not available on mobile or tablet now 🫠
        </p>
        <p className="mt-2 font-thin">We will update in another version soon</p>
      </div>
    </div>
  );
};

export default InvalidScreen;
