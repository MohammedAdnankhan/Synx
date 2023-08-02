import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ViewDetailModal from "./ViewTeam";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteModal from "./DeleteModal";
import { DELETEIT } from "../Api/Delete";
import CreateIcon from "@mui/icons-material/Create";
import "../css/Modal.css";
import { getToken } from "../Api/GetData";
import EditTeamMemberModal from "./EditTeamMemberModal";
import ModalWraper from "./ModalWraper";
import { SubHeader } from "../Global/TableHeaders";

const SubscriberTable = ({ tableDATA, handleTableData, deleteAccess }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [openDelteModal, setopenDelteModal] = React.useState(false);
  const [openModalId, setEditmodalId] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const handleEditCloseit = () => setOpenEditModal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseDeleteModal = () => setopenDelteModal(false);
  const handleOpenDeleteModal = (id) => {
    setopenDelteModal(true);
    setDeleteId(id);
  };
  const handleOpenEditModal = (id) => {
    setOpenEditModal(true);
    setEditmodalId(id);
  };
  const [viewId, setViewId] = React.useState("");
  const [deletId, setDeleteId] = React.useState("");
  let token = getToken();
  async function handleDelte() {
    setopenDelteModal(false);
    DELETEIT(
      `team/delete/${deletId}`,
      "Team member deleted successfully",
      token,
      handleTableData
    );
  }

  return (
    <div>
      {/* <PageContainer title="Dashboard"> */}
      <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "3%" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {SubHeader.map((column, index) => (
                  <TableCell
                    key={index}
                    // align={column.align}
                    // style={{ minWidth: column.minWidth }}
                    className="HeaderCenter"
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableDATA
                ? // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  tableDATA.map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index}
                        style={{
                          background: index % 2 === 0 ? "#EEEEEE" : "",
                        }}
                      >
                        <TableCell className="centerCell">{row.name}</TableCell>
                        <TableCell className="centerCell">
                          {row.email}
                        </TableCell>
                        <TableCell className="centerCell">
                          {row.roles}
                        </TableCell>
                        <TableCell className="centerCell">
                          {row.status}
                        </TableCell>
                        {/* <TableCell className="centerCell">{row.type}</TableCell> */}
                        <TableCell className="centerCell">
                          <Tooltip
                            title="View detail"
                            onClick={() => {
                              setOpen(!open);
                              setViewId(row._id);
                            }}
                          >
                            <IconButton>
                              <RemoveRedEyeIcon
                                style={{
                                  background: "#6B5EFF",
                                  color: "white",

                                  borderRadius: "10px",
                                  padding: "5px",
                                }}
                              />
                            </IconButton>
                          </Tooltip>
                          <Tooltip
                            title="Edit"
                            onClick={() => handleOpenEditModal(row._id)}
                          >
                            <IconButton>
                              <CreateIcon
                                style={{
                                  background: "#6B5EFF",
                                  color: "white",

                                  borderRadius: "10px",
                                  padding: "5px",
                                }}
                              />
                            </IconButton>
                          </Tooltip>
                          {deleteAccess && (
                            <Tooltip
                              title="Delete"
                              onClick={() => handleOpenDeleteModal(row._id)}
                            >
                              <IconButton>
                                <DeleteIcon
                                  style={{
                                    background: "#6B5EFF",
                                    color: "white",

                                    borderRadius: "10px",
                                    padding: "5px",
                                  }}
                                />
                              </IconButton>
                            </Tooltip>
                          )}
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
        open={open}
        handleClose={handleClose}
        setOpen={setOpen}
        viewId={viewId}
        Component={ViewDetailModal}
      />
      <ModalWraper
        open={openEditModal}
        handleClose={handleEditCloseit}
        setOpen={setOpenEditModal}
        viewId={openModalId}
        handleTableData={handleTableData}
        Component={EditTeamMemberModal}
      />
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

export default SubscriberTable;
