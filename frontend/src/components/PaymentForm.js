import React, { useState } from "react";
import axios from "axios";

const PaymentForm = ({ product = "Pepperoni Pizza", price = 10 }) => {
  const [units, setUnits] = useState(1);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [address, setAddress] = useState("");
  const [cvv, setCvv] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Simula un userId y orderId de prueba
  const userId = "user123";
  const orderId = "order456";

  const handlePay = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("Procesando pago...");

    try {
      const response = await axios.post("http://localhost:5005/api/v1/payments/process", {
        orderId,
        userId,
        amount: price * units,
      });

      if (response.status === 200) {
        setMessage(`¡Pago exitoso! ID de transacción: ${response.data.transactionId}`);
      } else {
        setMessage(`Pago procesado, pero respuesta inesperada: ${response.data.message}`);
      }
    } catch (error) {
      if (error.response) {
        setMessage(`Payment failed: ${error.response.data.message ? error.response.data.message.replace('(simulated: paid)', '').trim() : "Server error."}`);
      } else if (error.request) {
        setMessage("No se pudo conectar con el servicio de pagos.");
      } else {
        setMessage("Ocurrió un error inesperado.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handlePay}
      style={{
        background: "#ACA8AC",
        borderRadius: 18,
        padding: 18,
        width: 340,
        color: "#2F2E41",
        fontFamily: "Montserrat, Arial, sans-serif",
        margin: "40px auto",
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        position: "relative"
      }}
    >
      {/* New flex container for arrow and title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 16 // Moved from h2
        }}
      >
        {/* Back arrow div (without absolute positioning) */}
        <div
          style={{
            cursor: "pointer",
            width: 36,
            height: 36,
            background: "none",
            borderRadius: "50%",
            border: "2px solid #2F2E41",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          title="Volver"
        >
          <svg width="22" height="22" viewBox="0 0 22 22">
            <circle cx="11" cy="11" r="10" fill="none" />
            <polyline points="13,7 9,11 13,15" fill="none" stroke="#2F2E41" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 style={{ flexGrow: 1, textAlign: "center", fontWeight: 800, letterSpacing: 1.5 }}>MAKE AN ORDER</h2>
        {/* Placeholder div for centering the title */}
        <div style={{ width: 36, height: 36 }}></div>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
        <img
          src="https://images.unsplash.com/photo-1601924579440-6c2b7b3b5b2b"
          alt="Pizza"
          style={{
            width: 90,
            height: 90,
            objectFit: "cover",
            borderRadius: 14,
            border: "2px solid #FFF9F3",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 2, display: "flex", alignItems: "center" }}>
            ${price}
            <span style={{ fontSize: 13, fontWeight: 500, marginLeft: 6, color: "#2F2E41" }}>Restaurant Menu</span>
          </div>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{product}</div>
          <div
            style={{
              background: "#FFF9F3",
              borderRadius: 8,
              padding: "5px 8px",
              fontSize: 12.5,
              color: "#2F2E41",
              fontWeight: 500,
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
            }}
          >
            Enjoy a crispy crust, tasty tomato sauce, melted cheese, and plenty of spicy pepperoni. <b>A simple favorite!</b> 🍕
          </div>
        </div>
      </div>
      {/* Campos de tarjeta */}
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <div style={{ flex: 1, position: "relative" }}>
          <label style={{ fontWeight: 700, fontSize: 12, marginBottom: 2, display: "block", color: "#2F2E41" }}>CARD NUMBER</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 38px 10px 10px",
              borderRadius: 8,
              border: "none",
              fontSize: 15,
              background: "#FFF9F3",
              fontWeight: 600,
              color: "#2F2E41",
              boxSizing: "border-box"
            }}
            required
          />
          {/* Aquí puedes agregar un placeholder visual si quieres */}
          
        </div>
        <div style={{ flex: 1, position: "relative" }}>
          <label style={{ fontWeight: 700, fontSize: 12, marginBottom: 2, display: "block", color: "#2F2E41" }}>EXPIRATION DATE</label>
          <input
            type="text"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 8,
              border: "none",
              fontSize: 15,
              background: "#FFF9F3",
              fontWeight: 600,
              color: "#2F2E41",
              boxSizing: "border-box"
            }}
            required
          />
          {/* Icono calendario y placeholder juntos (solo se muestran si el campo está vacío) */}
          {!expiry && (
            <span style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: 36,
              display: "flex",
              alignItems: "center",
              color: "#FFBF81",
              fontSize: 15,
              fontWeight: 700,
              pointerEvents: "none"
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFBF81" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span style={{ marginLeft: 4 }}>MM/YY</span>
            </span>
          )}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontWeight: 700, fontSize: 12, marginBottom: 2, display: "block", color: "#2F2E41" }}>ADRESS</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 8,
              border: "none",
              fontSize: 15,
              background: "#FFF9F3",
              fontWeight: 600,
              color: "#2F2E41",
              boxSizing: "border-box"
            }}
            required
          />
        </div>
        <div style={{ flex: 1, position: "relative" }}>
          <label style={{ fontWeight: 700, fontSize: 12, marginBottom: 2, display: "block", color: "#2F2E41" }}>CVV</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 8,
              border: "none",
              fontSize: 15,
              background: "#FFF9F3",
              fontWeight: 600,
              color: "#2F2E41",
              boxSizing: "border-box"
            }}
            required
          />
          {/* Placeholder "XXX" en naranjita */}
          {!cvv && (
            <span style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: 36,
              fontSize: 15,
              color: "#FFBF81",
              pointerEvents: "none"
            }}>XXX</span>
          )}
        </div>
      </div>
      {/* Unidades y botón */}
      <div style={{ display: "flex", alignItems: "center", marginTop: 14 }}>
        <span style={{ fontWeight: 700, fontSize: 15, marginRight: 10 }}>UNITS</span>
        <button
          type="button"
          onClick={() => setUnits(Math.max(1, units - 1))}
          style={{
            background: "#FFBF81",
            border: "none",
            borderRadius: "50%",
            width: 30,
            height: 30,
            fontSize: 18,
            fontWeight: "bold",
            marginRight: 6,
            cursor: "pointer",
            color: "#2F2E41"
          }}
        >
          -
        </button>
        <input
          type="text"
          value={units}
          readOnly
          style={{
            width: 28,
            textAlign: "center",
            border: "none",
            background: "#FFF9F3",
            borderRadius: 8,
            marginRight: 6,
            fontSize: 15,
            fontWeight: 700,
            color: "#2F2E41"
          }}
        />
        <button
          type="button"
          onClick={() => setUnits(units + 1)}
          style={{
            background: "#FFBF81",
            border: "none",
            borderRadius: "50%",
            width: 30,
            height: 30,
            fontSize: 18,
            fontWeight: "bold",
            marginRight: 12,
            cursor: "pointer",
            color: "#2F2E41"
          }}
        >
          +
        </button>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            background: "#FBE216",
            color: "#2F2E41",
            fontWeight: "bold",
            border: "none",
            borderRadius: 10,
            padding: "8px 28px",
            fontSize: 18,
            marginLeft: "auto",
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.7 : 1,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}
        >
          {isLoading ? "Procesando..." : "PAY"}
        </button>
      </div>
      {message && (
        <div
          style={{
            background: "#FFF9F3",
            color: message.includes("exitoso") ? "green" : "red",
            borderRadius: 10,
            padding: 10,
            textAlign: "center",
            fontWeight: "bold",
            marginTop: 14,
            fontSize: 15
          }}
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default PaymentForm;