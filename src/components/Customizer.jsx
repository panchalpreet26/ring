import React from "react";
export default function Customizer({ setColor }) {
  return (
    <div className="position-fixed bottom-0 start-50 translate-start-x p-3 bg-light shadow rounded-pill d-flex gap-3 z-3">
      {/* <button className="btn btn-warning" onClick={() => setColor('#d4af37')}>Gold</button>
      <button className="btn btn-secondary" onClick={() => setColor('#c0c0c0')}>Silver</button>
      <button className="btn btn-dark" onClick={() => setColor('#000000')}>Black</button> */}
    </div>
  );
}
