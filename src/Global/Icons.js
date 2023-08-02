import Loader from "react-js-loader";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockClockIcon from "@mui/icons-material/LockClock";
import LockIcon from "@mui/icons-material/Lock";
import GroupIcon from "@mui/icons-material/Group";
import GroupsIcon from "@mui/icons-material/Groups";
import VerifiedIcon from "@mui/icons-material/Verified";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import UploadIcon from "@mui/icons-material/Upload";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import CancelIcon from "@mui/icons-material/Cancel";
import "./Const.css";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
export const LEFTARROW = () => <ChevronLeftIcon />;
export const LETTER = (hidd) => <MailOutlineIcon style={style.IconColor} />;
export const HIDEBALANCE = (hidd) => <MailOutlineIcon style={style.hide} />;
export const KEYICON = (hidd) => <VpnKeyIcon style={style.hide} />;
export const LOCK = () => <LockIcon style={style.IconColor} />;
export const OTP = () => <LockClockIcon style={style.IconColor} />;
export const CROSSICON = () => <CloseIcon style={style.IconColor} />;
export const SEARCHICON = () => <SearchIcon style={style.Blk} />;
export const GROUPICON = () => <GroupIcon style={style.SuperBigIcon} />;
export const TEAMICON = () => (
  <GroupsIcon style={style.SuperBigIcon} className="dk" />
);
export const VERIFYICON = () => (
  <VerifiedIcon style={style.SuperBigIcon} className="dk" />
);
export const UPLOADICON = () => (
  <UploadIcon style={style.SuperBigIcon} className="dk" />
);
export const NOTACAMERA = () => <VideocamOffIcon className="VICON" />;
export const NOTAIMAGE = () => <ImageNotSupportedIcon className="VICON" />;
export const LIMITICONS = () => (
  <TimelapseIcon style={style.SuperBigIcon} className="dk" />
);
export const DELETEICON = () => <DeleteIcon style={style.RDD} />;
export const ICONSUCCESS = (size) => (
  <CheckCircleOutlineIcon style={size ? style.smalSize : style.Size} />
);
export const ICONSUCCESSBig = (size) => (
  <CheckCircleOutlineIcon style={style.bigOne} />
);
export const CANCELICON = () => <CancelIcon className="ICONSIZE" />;
export const SpinnerLoader = ({ state }) =>
  state === true ? (
    <div style={style.LoaderPosition}>
      <Loader
        type="spinner-cub"
        bgColor={"#6B5EFF"}
        // title={"box-up"}
        color={"#6B5EFF"}
        size={100}
      />
    </div>
  ) : null;

const style = {
  IconColor: {
    color: "#6B5EFF",
  },
  White: {
    color: "#fff",
  },
  Blk: {
    color: "#888888",
  },

  LoaderPosition: {
    position: "absolute",
    top: "10%",
    left: "50%",
  },
  Size: {
    color: "#6B5EFF",
    height: "90px",
    width: "90px",
  },
  bigOne: {
    height: "50px",
    width: "50px",
    color: "#6B5EFF",
  },
  NOTVID: {
    height: "70px",
    width: "70px",
    color: "white",
  },
  SuperBigIcon: {
    height: "50px",
    width: "50px",
    // border: "1px solid #6b5eff",
    borderRadius: "100px",
    color: "#6b5eff",
    backgroundColor: "white",
  },
  smalSize: {
    backgroundColor: "#6B5EFF",
    color: "white",
    height: "20px",
    width: "20px",
    borderRadius: "100px",
  },
  Grey: {
    backgroundColor: "white",
    color: "rgb(205 205 205)",
    height: "20px",
    width: "20px",
    borderRadius: "100px",
    cursor: "pointer",
  },
  RDD: {
    backgroundColor: "white",
    color: "#f56969",
    height: "25px",
    width: "25px",
    borderRadius: "100px",
    cursor: "pointer",
  },
  hide: {
    visibility: "hidden",
  },
};
