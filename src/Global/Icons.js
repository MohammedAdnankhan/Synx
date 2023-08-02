import {
  FiCheckCircle,
  FiCamera,
  FiArrowRight,
  FiX,
  FiArrowLeft,
  FiRefreshCw,
} from "react-icons/fi";
import { FaFileUpload } from "react-icons/fa";
import { BsFillEmojiFrownFill } from "react-icons/bs";
import { RiRepeatFill } from "react-icons/ri";
import { BiCheck, BiMessageSquareError } from "react-icons/bi";
import "./Icon.css";
export const RIGHTICON = () => <FiCheckCircle className="ICON ri" />;
export const REPEAT = ({ doit }) => (
  <RiRepeatFill className="RP" onClick={doit} />
);
export const UPLOAD = () => <FaFileUpload className="ICON PRI smallIcon" />;
export const CAMERA = () => <FiCamera className="ICON CM smallIcon" />;
export const REVERCAMERA = () => (
  <FiRefreshCw className="ICON CM smallIcon WC" />
);
export const CAMERAICON = () => <FiCamera className="ICON WC smallIcon" />;
export const CHECK = () => <BiCheck className="SLTICON" />;
export const RIGHTARROWICON = () => <FiArrowRight className="SLTICON" />;
export const LEFTARROW = ({ handlesomthing }) => (
  <FiArrowLeft className="SLTICON PRI" onClick={handlesomthing} />
);
export const CROSS = ({ func }) => (
  <FiX className="SLTICON RD" onClick={func} />
);
export const PENDING = () => <BiMessageSquareError className="SLTICON YL" />;
export const SAD_EMOJI = () => <BsFillEmojiFrownFill className="SADIMOJI " />;
