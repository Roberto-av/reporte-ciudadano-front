import React, { useContext } from "react";
import styles from "../Assets/css/home.module.css";
import WorkImage from "../Assets/img/work.jpg";
import { AuthContext } from "../Services/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const backgroundImageStyle = {
    backgroundImage: `url(${WorkImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const handleReportClick = () => {
    if (isLoggedIn) {
      navigate("/reports/add");
    } else {
      console.log("El usuario no está logueado");
      navigate("/login");
    }
  };


  return (
    <div className={styles.containerHome} style={backgroundImageStyle}>
      <div className={styles.containerFrame}>
      <h1>Reporte Ciudadano</h1>
        <div className={styles.containerTxt}>
          <h2>Nuestro Compromiso</h2>
          <p>
            Nos comprometemos con todo el pueblo, <br />
            por eso hacemos que tus inconformidades <br />
            sean atendidas lo más rápido posible.
          </p>
          <h2>Haz tu Reporte</h2>
          <p>
            Si ves por tu zona los siguentes problemas
            <br />
            <br />
            • Baches <br />
            • Prolemas de alumbrado <br />
            • Problemas de basura <br />
            <br />
            te invitamos a que hagas tu reporte.
          </p>
          <div className={styles.customButtom}>
            <button onClick={handleReportClick}>Hacer Reporte</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
