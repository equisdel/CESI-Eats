import React, { useState } from "react";

interface Props {
  total: number;
  onPaid: () => void;
  onBack: () => void;
}

const PaymentForm: React.FC<Props> = ({ total, onPaid, onBack }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [address, setAddress] = useState("");
  const [cvv, setCvv] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("Processing payment...");

    setTimeout(() => {
      setMessage("Payment successful! ✅");
      setIsLoading(false);
      setTimeout(() => {
        onPaid();
      }, 1000);
    }, 1500);
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
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <div
          style={{
            cursor: "pointer",
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "2px solid #2F2E41",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          title="Back"
          onClick={onBack}
        >
          <svg width="22" height="22" viewBox="0 0 22 22">
            <polyline points="13,7 9,11 13,15" fill="none" stroke="#2F2E41" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 style={{ flexGrow: 1, textAlign: "center", fontWeight: 800, letterSpacing: 1.5 }}>MAKE A PAYMENT</h2>
        <div style={{ width: 36, height: 36 }}></div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <div style={{ flex: 1, position: "relative" }}>
          <label style={{ fontWeight: 700, fontSize: 12, marginBottom: 2, display: "block" }}>CARD NUMBER</label>
          <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} style={inputStyle} required />
        </div>
        <div style={{ flex: 1, position: "relative" }}>
          <label style={labelStyle}>EXPIRATION DATE</label>
          <input type="text" value={expiry} onChange={(e) => setExpiry(e.target.value)} style={inputStyle} required />
          {!expiry && (
            <span style={placeholderStyle}>
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
          <label style={labelStyle}>ADDRESS</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} style={inputStyle} required />
        </div>
        <div style={{ flex: 1, position: "relative" }}>
          <label style={labelStyle}>CVV</label>
          <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} style={inputStyle} required />
          {!cvv && <span style={cvvPlaceholder}>XXX</span>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        style={{
          width: "100%",
          background: isLoading ? "#ccc" : "#000",
          color: "white",
          fontWeight: "bold",
          padding: "10px 0",
          borderRadius: 10,
          marginTop: 16,
          cursor: isLoading ? "not-allowed" : "pointer"
        }}
      >
        {isLoading ? "Processing..." : "PAY €" + total.toFixed(2)}
      </button>

      {message && (
        <div style={{
          background: "#FFF9F3",
          color: message.includes("successful") ? "green" : "red",
          borderRadius: 10,
          padding: 10,
          textAlign: "center",
          fontWeight: "bold",
          marginTop: 14,
          fontSize: 15
        }}>
          {message}
        </div>
      )}
    </form>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: 8,
  border: "none",
  fontSize: 15,
  background: "#FFF9F3",
  fontWeight: 600,
  color: "#2F2E41",
};

const labelStyle = {
  fontWeight: 700,
  fontSize: 12,
  marginBottom: 2,
  display: "block",
  color: "#2F2E41"
};

const placeholderStyle = {
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  top: 36,
  display: "flex",
  alignItems: "center",
  color: "#FFBF81",
  fontSize: 15,
  fontWeight: 700,
  pointerEvents: "none" as const
};

const cvvPlaceholder = {
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  top: 36,
  fontSize: 15,
  color: "#FFBF81",
  pointerEvents: "none" as const
};

export default PaymentForm;
