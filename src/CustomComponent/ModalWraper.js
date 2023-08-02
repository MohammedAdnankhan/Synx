import { style, Deletestyle } from "./Msg";
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
function ModalWraper({
  open,
  handleClose,
  setOpen,
  handleTableData,
  Component,
  UserId,
  viewData,
  viewId = "abc",
  dl,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={dl ? Deletestyle : style}>
        <Component
          setOpen={setOpen}
          handleTableData={handleTableData}
          viewData={viewData}
          UserId={UserId}
          viewId={viewId}
          handleClose={handleClose}
        />
      </Box>
    </Modal>
  );
}

export default ModalWraper;
