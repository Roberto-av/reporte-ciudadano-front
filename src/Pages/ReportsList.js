import React, { useEffect, useState } from "react";
import axiosInstance from '../Services/axiosInstance';
import CustomTable from "../Components/CustomTable";
import { Pagination } from "react-bootstrap";
import { useAuth } from '../Services/AuthContext';

function ReportsList() {
  const { token, user } = useAuth(); // Obtén el token del contexto de autenticación

  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(10);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        let response;
        // Verificar si el usuario tiene el rol de "ROLE_ADMIN" o "ROLE_EMPLOYEE"
        if (user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_EMPLOYEE")) {
          // Si el usuario tiene uno de estos roles, obtener todos los reportes
          response = await axiosInstance.get(`/api/report/all`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        } else {
          // Si el usuario no tiene esos roles, obtener los reportes asociados al ID del usuario
          response = await axiosInstance.get(`/api/report/findAll/user/${user.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        }

        const reportsWithUserId = response.data.map(report => ({
          ...report,
          userId: report.user.id
        }));

        // Actualizar el estado con los reportes obtenidos
        setReports(reportsWithUserId);
        console.log('Repostres obtenidos', reportsWithUserId);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, [token, user]);

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const columns = [
    { header: "USER_ID", field: "userId" },
    { header: "ID", field: "id" },
    { header: "Tipo de incidencia", field: "tiposIncidencia" },
    { header: "Descripción", field: "description" },
    { header: "Dirección", field: "address" },
    { header: "Comentarios", field: "comments" },
    { header: "Estado", field: "status" },
    { header: "Fecha de creación", field: "createdAt" },
  ];

  const handleUpdateStatusClick = async (reportId) => {
    try {
      // Obtener el reporte actual
      const response = await axiosInstance.get(`/report/${reportId}`);
      const report = response.data;

      // Actualizar el estado según la lógica deseada
      let newStatus;
      if (report.status === 'PENDIENTE') {
        newStatus = 'PROCESO';
      } else if (report.status === 'PROCESO') {
        newStatus = 'RESUELTO';
      } else {
        console.warn('El reporte ya está en estado RESUELTO.');
        return; // No se puede actualizar más
      }

      if (window.confirm("¿Estás seguro de que quieres actualizar el estado?")) {
        await axiosInstance.put(`/report/update/${reportId}`, { status: newStatus });
      }
      
      // Actualizar la lista de reportes después de la actualización
      const updatedReports = reports.map(r => {
        if (r.id === reportId) {
          return { ...r, status: newStatus };
        }
        return r;
      });
      setReports(updatedReports);

      console.log('Estado del reporte actualizado con éxito.');
    } catch (error) {
      console.error('Error actualizando el estado del reporte:', error);
    }
  };

  const actions = [
    {
      label: "Actualizar estado",
      onClick: (report) => handleUpdateStatusClick(report.id),
    },
    // Puedes agregar más acciones según tus necesidades
  ];

  return (
    <div className="table-container">
      <h1>Reportes</h1>
      <CustomTable data={currentReports} columns={columns} actions={actions} />
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

export default ReportsList;
