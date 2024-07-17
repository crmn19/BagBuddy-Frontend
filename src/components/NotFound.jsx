import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center mt-5 bg-light not-found">
      <h1 className="fw-bold">OOPS!</h1>
      <h2>404 — Risorsa non trovata!</h2>

      <Link to="/" className="btn btn-warning mt-3">
        Torna alla home
      </Link>
    </div>
  );
};

export default NotFound;
