import "dotenv/config";
import "./db.js";
import "./model/Video";
import "./model/User";
import "./model/Comment";
import app from "./server.js";

const PORT = 4000;

const handleListening = () =>
  console.log(`✅Server is listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
