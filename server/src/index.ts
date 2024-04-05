import { config } from "dotenv";

// Configure enviroment variables
config({ path: "./.env" });

//////////////////////////

import app from "./app";
import "./server";

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Application Running on port ${PORT}...`);
});
