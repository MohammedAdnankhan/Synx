import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteModal from "./DeleteModal";
import { DELETEIT } from "../Api/Delete";
import "../css/Modal.css";
import CreateIcon from "@mui/icons-material/Create";
import { getToken } from "../Api/GetData";
import { useNavigate } from "react-router";
import ModalWraper from "./ModalWraper";
import { TeamHeader } from "../Global/TableHeaders";

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const RoleTab = ({
  roleTabData,
  handleTableData,
  editAccess,
  viewAccess,
  deleteAccess,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [openDelteModal, setopenDelteModal] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseDeleteModal = () => setopenDelteModal(false);
  let navigate = useNavigate();
  const handleOpenDeleteModal = (id) => {
    setopenDelteModal(true);
    setDeleteId(id);
  };
  const [viewId, setViewId] = React.useState("");
  const [deletId, setDeleteId] = React.useState("");
  let token = getToken();
  async function handleDelte() {
    setopenDelteModal(false);
    DELETEIT(
      `role/delete/${deletId}`,
      "Role deleted successfully",
      token,
      handleTableData
    );
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div>
      {/* <PageContainer title="Dashboard"> */}
      <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "3%" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {TeamHeader.map((column, index) => (
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
              {roleTabData
                ? // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  roleTabData.map((row, index) => {
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
                        <TableCell className="centerCell">
                          {row?.name}
                        </TableCell>
                        <TableCell className="centerCell">
                          {row.fields.length > 7 ? "Full" : "Partial"}
                        </TableCell>
                        <TableCell className="centerCell">
                          {viewAccess && (
                            <Tooltip
                              title="View detail"
                              onClick={() => {
                                // setOpen(!open);
                                // setViewId(row._id);
                                navigate("/view-roles", { state: row._id });
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
                          )}
                          {editAccess && (
                            <Tooltip
                              title="Edit"
                              onClick={() =>
                                navigate("/edit-roles", { state: row._id })
                              }
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
                          )}
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
      {/* </PageContainer> */}

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

export default RoleTab;
