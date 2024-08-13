import React, { useEffect, useState } from "react";
import Routing from "./Router/Routing";

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      const userConfirmed = window.confirm(
        "¿Quieres agregar esta aplicación a tu pantalla de inicio?"
      );
      if (userConfirmed && deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("Usuario aceptó la instalación");
          } else {
            console.log("Usuario rechazó la instalación");
          }
          setDeferredPrompt(null);
        });
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, [deferredPrompt]);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
