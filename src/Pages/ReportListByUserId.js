import React, { useEffect, useState } from "react";
import axiosInstance from "../Services/axiosInstance";
import CustomTable from "../Components/CustomTable";
import { Pagination } from "react-bootstrap";
import { useAuth } from "../Services/AuthContext";
import { useParams } from "react-router-dom";

function ReporListByUserId() {
  const { token, user } = useAuth();
  const { userId } = useParams();

  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/report/findAll/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const reportsWithUserId = response.data.map((report) => ({
          ...report,
          userId: report.user.id,
        }));
        setReports(reportsWithUserId);
        console.log("Reportes obtenidos", reportsWithUserId);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, [token, userId]);

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const columns = [
    { header: "ID", field: "id" },
    { header: "Tipo de incidencia", field: "tiposIncidencia" },
    { header: "Descripción", field: "description" },
    { header: "Dirección", field: "address" },
    { header: "Comentarios", field: "comments" },
    {
      header: "Estado",
      field: "status",
      style: (status) => {
        switch (status) {
          case "PENDIENTE":
            return { color: "red" };
          case "PROCESO":
            return { color: "#e5be01" };
          case "RESUELTO":
            return { color: "green" };
          default:
            return { color: "inherit" };
        }
      },
    },
    { header: "Fecha de creación", field: "createdAt" },
  ];

  const handleUpdateStatusClick = async (reportId) => {
    try {
      // Obtener el reporte actual
      const response = await axiosInstance.get(`/api/report/${reportId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const report = response.data;

      // Definir el nuevo estado basado en el estado actual del reporte
      let newStatus;
      switch (report.status) {
        case "PENDIENTE":
          newStatus = "PROCESO";
          break;
        case "PROCESO":
          newStatus = "RESUELTO";
          break;
        case "RESUELTO":
          console.warn("El reporte ya está en estado RESUELTO.");
          return;
        default:
          console.error("Estado de reporte no reconocido:", report.status);
          return;
      }
      console.log("status: ", report.status);

      // Confirmar la actualización del estado
      if (
        window.confirm("¿Estás seguro de que quieres actualizar el estado?")
      ) {
        // Enviar la solicitud para actualizar el estado del reporte
        await axiosInstance.put(
          `/api/report/update/${reportId}`,
          { status: newStatus },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Actualizar la lista de reportes después de la actualización
        const updatedReports = reports.map((r) => {
          if (r.id === reportId) {
            return { ...r, status: newStatus };
          }
          return r;
        });
        setReports(updatedReports);

        console.log("Estado del reporte actualizado con éxito.");
      }
    } catch (error) {
      console.error("Error actualizando el estado del reporte:", error);
    }
  };

  const actions = [
    {
      label: "Actualizar estado",
      onClick: (report) => handleUpdateStatusClick(report.id),
      isDisabled: (report) => {
        return report.status === "RESUELTO";
      },
    },
  ];

  const handleSortByStatus = () => {
    setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
  };

  const sortedReports = sortOrder
    ? currentReports.sort((a, b) =>
        sortOrder === "ASC"
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status)
      )
    : currentReports;

    if (!user || !user.roles || !user.roles.includes("ROLE_ADMIN")) {
        return <p>No tienes permiso para acceder a esta página.</p>;
    }

  return (
    <div className="table-container">
      <h1>Reportes asociados con el id {userId}</h1>

      {reports.length === 0 ? (
        <p>Este usuario no tiene alta de reportes.</p>
      ) : (
        <CustomTable
          data={sortedReports}
          columns={columns}
          actions={actions}
          handleSortByStatus={handleSortByStatus}
        />
      )}
      <div className="pagination-container">
        <Pagination>
          {Array.from({
            length: Math.ceil(reports.length / reportsPerPage),
          }).map((_, index) => (
            <Pagination.Item
              key={index}
              onClick={() => paginate(index + 1)}
              active={index + 1 === currentPage}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
}

export default ReporListByUserId;
