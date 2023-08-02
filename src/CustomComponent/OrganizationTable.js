import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Modal from "@mui/material/Modal";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteModal from "./DeleteModal";
import { DELETEIT } from "../Api/Delete";
import { useNavigate } from "react-router";
import { getToken } from "../Api/GetData";
import { UserHeader } from "../Global/TableHeaders";
import ModalWraper from "./ModalWraper";

const OrganizationTable = ({
  TableRowData,
  handleTableData,
  editAccess,
  viewAccess,
  deleteAccess,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deletId, setDeleteId] = React.useState("");
  const [viewId, setViewId] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openDelteModal, setopenDelteModal] = React.useState(false);
  const handleCloseDeleteModal = () => setopenDelteModal(false);
  const navigate = useNavigate();
  let token = getToken();
  const handleOpenDeleteModal = (id) => {
    setDeleteId(id);

    setopenDelteModal(true);
  };

  function handleDelte() {
    setopenDelteModal(false);
    DELETEIT(
      `user/delete/${deletId}`,
      "User deleted successfully",
      token,
      handleTableData
    );
  }

  return (
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {UserHeader.map((column, index) => (
                  <TableCell
                    key={index}
                    className="HeaderCenter"
                    style={{
                      background: "#efeef9",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {TableRowData
                ? // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  TableRowData.map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index}
                        style={{
                          background: index % 2 !== 0 ? "#efeef9" : "",
                        }}
                      >
                        <TableCell className="centerCell">{row._id}</TableCell>
                        <TableCell className="centerCell">{row.name}</TableCell>
                        <TableCell className="centerCell">
                          {/* {row.date} */}
                          {row.createdAt?.substr(0, 10)}
                        </TableCell>
                        <TableCell
                          className="centerCell"
                          style={{ textTransform: "capitalize" }}
                        >
                          {row.status}
                        </TableCell>
                        {/* <TableCell className="centerCell">
                        {row.platform}
                      </TableCell> */}
                        <TableCell className="centerCell">
                          {row.document[0]?.documentName}
                        </TableCell>
                        {/* <TableCell className="centerCell">
                          {row.document[0].documentType}
                        </TableCell> */}
                        {/* <TableCell className="centerCell">
                        {row.country}
                      </TableCell> */}

                        <TableCell className="centerCell">
                          {viewAccess && (
                            <Tooltip
                              title="View detail"
                              // onClick={() => {
                              //   setOpen(!open);
                              //   setViewId(row?._id);
                              // }}
                              onClick={() =>
                                navigate("/user-verification-detail", {
                                  state: { ID: row._id },
                                })
                              }
                            >
                              <IconButton>
                                <RemoveRedEyeIcon
                                  style={{
                                    background: "#efeef9",
                                    color: "#6b5eff",
                                    height: "30px",
                                    width: "30px",
                                    borderRadius: "10px",
                                    padding: "5px",
                                  }}
                                />
                              </IconButton>
                            </Tooltip>
                          )}
                          {deleteAccess && (
                            <Tooltip
                              title="Delete"
                              onClick={() => handleOpenDeleteModal(row._id)}
                            >
                              <IconButton>
                                <DeleteIcon
                                  style={{
                                    background: "#efeef9",
                                    color: "#6b5eff",
                                    borderRadius: "10px",
                                    padding: "5px",
                                    height: "30px",
                                    width: "30px",
                                  }}
                                />
                              </IconButton>
                            </Tooltip>
                          )}
                          {/* <button
                            onClick={() =>
                              navigate("/user-verification-detail", {
                                state: { ID: row._id },
                              })
                            }
                          >
                            Detail
                          </button> */}
                          {/* <Tooltip title="edit" onClick={handleEdit}>
                          <IconButton>
                            <EditIcon
                              style={{
                                background: "#6B5EFF",
                                color: "#c3f5ed",
                                borderRadius: "10px",
                                padding: "5px",
                              }}
                            />
                          </IconButton>
                        </Tooltip> */}
                        </TableCell>
                      </TableRow>
                    );
                  })
                : null}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>

      <ModalWraper
        open={openDelteModal}
        handleClose={handleCloseDeleteModal}
        setOpen={setopenDelteModal}
        handleTableData={handleDelte}
        Component={DeleteModal}
        dl={"delete"}
      />
    </div>
  );
};

export default OrganizationTable;

export function CustomDeleteModal({ open, handleClose, setOpen, handleDelte }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="Xyz">
        <DeleteModal
          // setOpen={setOpen}
          handleClose={handleClose}
          handleDelte={handleDelte}
        />
      </div>
    </Modal>
  );
}
