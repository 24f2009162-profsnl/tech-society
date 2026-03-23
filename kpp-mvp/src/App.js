import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [tokens, setTokens] = useState(0);
  const [history, setHistory] = useState([]);
  const [wallet, setWallet] = useState("");

  // Load user data
  useEffect(() => {
    if (user) {
      const data = JSON.parse(localStorage.getItem(user)) || {
        points: 0,
        tokens: 0,
        history: []
      };
      setPoints(data.points);
      setTokens(data.tokens);
      setHistory(data.history);
    }
  }, [user]);

  const saveData = (p, t, h) => {
    localStorage.setItem(user, JSON.stringify({
      points: p,
      tokens: t,
      history: h
    }));
  };

  // 🔗 Wallet Connect
  const connectWallet = async () => {
  try {
    // Modern Freighter
    if (window.freighterApi) {
      const publicKey = await window.freighterApi.getPublicKey();
      setWallet(publicKey);
      return;
    }

    // Fallback (older versions)
    if (window.freighter) {
      const publicKey = await window.freighter.getPublicKey();
      setWallet(publicKey);
      return;
    }

    // If nothing found → graceful UI message
    setWallet("not-installed");

  } catch (e) {
    console.log(e);
  }
};

  // ➕ Earn Points
  const earnPoints = () => {
    const newPoints = points + 10;
    const newHistory = [...history, `${user} earned 10 points`];

    setPoints(newPoints);
    setHistory(newHistory);
    saveData(newPoints, tokens, newHistory);
  };

  // 🔄 Convert
  const convert = () => {
    if (points < 10) return alert("Not enough points");

    const newPoints = points - 10;
    const newTokens = tokens + 5;

    const newHistory = [
      ...history,
      `${user} converted 10 points → 5 tokens`
    ];

    setPoints(newPoints);
    setTokens(newTokens);
    setHistory(newHistory);
    saveData(newPoints, newTokens, newHistory);
  };

  // 🔁 Switch User
  const switchUser = () => {
    setUser(null);
    setName("");
    setWallet("");
  };

  // 🟢 LOGIN SCREEN
  if (!user) {
    return (
      <div style={styles.bg}>
        <div style={styles.card}>
          <h1>KPP MVP</h1>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            style={styles.input}
          />

          <button
            onClick={() => setUser(name)}
            style={styles.button}
          >
            Start Earning
          </button>
        </div>
      </div>
    );
  }

  // 🟣 DASHBOARD
  return (
    <div style={styles.bg}>
      <div style={styles.card}>

        <h2>Welcome, {user}</h2>

        {/* Wallet */}
        <button onClick={connectWallet} style={styles.walletBtn}>
  {wallet
    ? wallet === "not-installed"
      ? "Install Freighter"
      : "Wallet Connected ✅"
    : "Connect Wallet"}
</button>

{wallet && wallet !== "not-installed" && (
  <p style={styles.walletText}>{wallet}</p>
)}
        <p>Points: {points}</p>
        <p>Tokens: {tokens}</p>

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button onClick={earnPoints} style={styles.button}>
            +10 Points
          </button>

          <button onClick={convert} style={styles.button}>
            Convert
          </button>
        </div>

        <h3 style={{ marginTop: "20px" }}>History</h3>
        <ul>
          {history.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>

        <button onClick={switchUser} style={styles.button}>
          Switch User
        </button>

      </div>
    </div>
  );
}

const styles = {
  bg: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #0f172a, #1e293b)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "sans-serif"
  },
  card: {
    background: "#1e293b",
    color: "white",
    padding: "30px",
    borderRadius: "20px",
    width: "350px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.4)"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "none"
  },
  button: {
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#38bdf8",
    cursor: "pointer",
    fontWeight: "bold"
  },
  walletBtn: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#22c55e",
    cursor: "pointer",
    fontWeight: "bold"
  },
  walletText: {
    fontSize: "12px",
    wordBreak: "break-all",
    marginTop: "5px"
  }
};

export default App;