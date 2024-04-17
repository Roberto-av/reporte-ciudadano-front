import React, { useState, useEffect } from "react";
import styles from "../../Assets/css/dashboard.module.css";
import NewUserCard from "../../Components/NewUserCard";
import { ReactComponent as PlusIcon } from "../../Assets/img/plus.svg";
import axiosInstance from "../../Services/axiosInstance";
import { useAuth } from "../../Services/AuthContext";
//import { Stomp } from "@stomp/stompjs";
import TableUsers from "../../Components/TableUsers";
import moment from 'moment';


function Users() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [cardUsers, setCardUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const handleUserClick = (user) => {
    console.log("Si se estan pasando el user mira", user);
    if (selectedUser && selectedUser.id === user.id) {
      // Si ya hay un usuario seleccionado y es el mismo que se ha clicado, ocultar la tabla
      setSelectedUser(null);
      setShowTable(false);
    } else {
      setSelectedUser(user);
      setShowTable(true);
    }
  };

  const handleMoreClick = () => {
    if (showTable && !selectedUser) {
      // Si la tabla está visible y no hay usuario seleccionado, ocultar la tabla
      setShowTable(false);
    } else {
      setSelectedUser(null);
      setShowAllUsers(true);
      setShowTable(true);
      setUsers(allUsers);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!token) {
          return;
        }

        const response = await axiosInstance.get("/api/users/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const usersData = response.data.map((user) => ({
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          created_at: user.created_at,
        }));

        const filteredUsers = usersData.filter(user => {
          return user.username !== 'admin' && !user.username.startsWith('empleado');
        });
    
        setAllUsers(usersData);

        // Separar usuarios con y sin created_at
        const usersWithCreatedAt = usersData.filter((user) => user.created_at);
        const usersWithoutCreatedAt = usersData.filter(
          (user) => !user.created_at
        );

        // Ordenar usuarios con created_at
        const sortedUsersWithCreatedAt = usersWithCreatedAt.sort((a, b) =>
          b.created_at.localeCompare(a.created_at)
        );

        // Unir usuarios ordenados con los que no tienen created_at
        const allUsers = [
          ...sortedUsersWithCreatedAt,
          ...usersWithoutCreatedAt,
        ];

        const displayedUsers = showAllUsers ? allUsers : allUsers.slice(0, 7);
        setUsers(displayedUsers);

        if (!showAllUsers) {
          setCardUsers(displayedUsers);
        }

        console.log("Usuarios obtenidos", usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();

    /*
    const socket = new WebSocket("ws://localhost:3000/ws");
    const stompClient = Stomp.over(socket);

    socket.onopen = () => {
      console.log("Conexión WebSocket establecida.");
      stompClient.connect({}, () => {
        console.log("Conexión Stomp establecida.");
        stompClient.subscribe("/topic/users", (message) => {
          console.log("Mensaje recibido del servidor:", message);
          try {
            const updatedUsers = JSON.parse(message.body);
            console.log("Usuarios actualizados:", updatedUsers);
            setUsers(updatedUsers);
          } catch (error) {
            console.error("Error al analizar el mensaje:", error);
          }
        });
      });
    };

    socket.onerror = (error) => {
      console.error("Error en la conexión WebSocket:", error);
    };

    stompClient.debug = (message) => {
      console.log("Debug Stomp:", message);
    };

    return () => {
      stompClient.disconnect();
    };*/
  }, [token, showAllUsers]);

  const handleDeleteUser = async (userId) => {
    try {
      // Mostrar mensaje de confirmación
      const confirmed = window.confirm(
        `¿Seguro que quieres eliminar al usuario con el ID ${userId}?`
      );

      if (!confirmed) {
        return;
      }

      // Realizar la solicitud para eliminar el usuario con el ID proporcionado
      await axiosInstance.delete(`/api/users/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Actualizar la lista de usuarios después de la eliminación
      const updatedUsers = users.filter((user) => user.id !== userId);

      // Ordenar la lista de usuarios por ID de menor a mayor
      updatedUsers.sort((a, b) => a.id - b.id);

      setAllUsers(updatedUsers);
      console.log("Usuario con id:", userId, "eliminado con éxito.");
      console.log("Usuarios actualizados:", updatedUsers);
    } catch (error) {
      console.error("Error eliminando usuario:", error);
    }
  };

  const columns = [
    { header: "ID", field: "id" },
    { header: "Nombre de usuario", field: "username" },
    { header: "Nombre", field: "firstName" },
    { header: "Apellidos", field: "lastName" },
    { header: "email", field: "email" },
    { header: "Numero de telefono", field: "phoneNumber" },
    { header: "Creación", field: "created_at" },
  ];

  return (
    <div className={styles.newUser}>
      <h2>Usuarios nuevos</h2>
      <div className={styles.userList}>
        {cardUsers.map((user) => (
          (user.username !== 'admin' && !user.username.startsWith('empleado')) && (
            <NewUserCard
              key={user.id}
              name={user.username}
              info={`${moment(user.created_at).fromNow(true)}`}
              customIcon={null}
              onClick={() => handleUserClick(user)}
            />
          )
        ))}
        <NewUserCard
          key="more"
          name="More"
          info="New Users"
          customIcon={<PlusIcon />}
          onClick={handleMoreClick}
        />
      </div>
      {showTable && (selectedUser || showAllUsers) && (
        <>
          <h2>Informacion del usuario</h2>
          <TableUsers
            data={selectedUser ? [selectedUser] : allUsers}
            columns={columns}
            onDelete={handleDeleteUser}
          />
        </>
      )}
    </div>
  );
}
export default Users;
