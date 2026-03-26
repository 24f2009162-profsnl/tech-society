import { useState, useEffect } from "react";

const ALL_USERS = [
  "Riya Soni",
  "Sunay Lahiri",
  "Avyansh sharma",
  "Yashovardhan",
  "Anshu",
  "Billaw",
  "Aditya maru",
  "Twisha",
  "Gaurav",
  "Shekhar"
];

function App() {
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [tokens, setTokens] = useState(0);
  const [history, setHistory] = useState([]);
  const [wallet, setWallet] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);

  // Load user data
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const today = new Date().toDateString();
    const lastLogin = localStorage.getItem(user + "_lastLogin");

    if (lastLogin !== today) {
      const bonusPoints = data.points + 5;
      const newHistory = [...data.history, "+5 Points (Daily Login Bonus 🎉)"];

      setPoints(bonusPoints);
      setHistory(newHistory);

      localStorage.setItem(user + "_lastLogin", today);

      localStorage.setItem(user, JSON.stringify({
        points: bonusPoints,
        tokens: data.tokens,
        history: newHistory
      }));
    }

    updateLeaderboard();
  }
}, [user]);

  const saveData = (p, t, h) => {
    localStorage.setItem(user, JSON.stringify({
      points: p,
      tokens: t,
      history: h
    }));
    updateLeaderboard();
  };

  // 🏆 Leaderboard logic
  const updateLeaderboard = () => {
    let usersData = ALL_USERS.map((u) => {
      const d = JSON.parse(localStorage.getItem(u)) || { points: 0 };
      return { name: u, points: d.points };
    });

    usersData.sort((a, b) => b.points - a.points);
    setLeaderboard(usersData);
  };

  // 🔗 Wallet Connect
  const waitForFreighter = async () => {
    return new Promise((resolve) => {
      let count = 0;

      const interval = setInterval(() => {
        if (window.freighterApi) {
          clearInterval(interval);
          resolve(window.freighterApi);
        }

        count++;
        if (count > 10) {
          clearInterval(interval);
          resolve(null);
        }
      }, 300);
    });
  };

  const connectWallet = async () => {
    try {
      const freighter = await waitForFreighter();

      if (!freighter) {
        setWallet("not-installed");
        return;
      }

      const publicKey = await freighter.getPublicKey();
      setWallet(publicKey);

    } catch (e) {
      console.log(e);
    }
  };

  // ➕ Earn Points
  const earnPoints = () => {
    const newPoints = points + 10;
    const newHistory = [...history, "+10 Points Earned"];

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
      "-10 Points → +5 Tokens Converted"
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

  // LOGIN SCREEN
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

          <button onClick={() => setUser(name)} style={styles.button}>
            Start Earning
          </button>
        </div>
      </div>
    );
  }

  // DASHBOARD
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
        <p style={{ fontSize: "12px" }}>10 Points = 5 Tokens</p>

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

        {/* 🏆 LEADERBOARD */}
        <h3 style={{ marginTop: "20px" }}>🏆 Leaderboard</h3>
        <ul>
          {leaderboard.map((u, i) => (
            <li key={i}>
              {i + 1}. {u.name} - {u.points} pts
            </li>
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