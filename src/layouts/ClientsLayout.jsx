import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Tasks from "../views/tasks/Index";

function ClientsLayout() {
  const role = window.localStorage.getItem("role");
  const navigate = useNavigate();
  
  const [displayClientPages, setDisplayClientPages] = useState(false);

  useEffect(() => {
    if (role === "client") {
      setDisplayClientPages(true)
    } else {
      navigate("/")
    }
  }, [role]);

  return (
    <>
    {displayClientPages && (
      <Tasks />
    )}
    </>
  )
}

export default ClientsLayout;
