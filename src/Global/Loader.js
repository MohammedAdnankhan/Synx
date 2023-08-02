import Loader from "react-js-loader";

export const SpinnerLoader = ({ state }) =>
  state === true ? (
    <div style={style.LoaderPosition}>
      <Loader
        type="spinner-cub"
        bgColor={"#6B5EFF"}
        color={"#6B5EFF"}
        size={100}
      />
    </div>
  ) : null;

const style = {
  LoaderPosition: {
    position: "sticky",
    top: "50%",
    left: "50%",
  },
};
