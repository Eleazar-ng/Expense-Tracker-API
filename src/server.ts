
import { app } from "./app";
import { env } from "./config/env";

const PORT = env.PORT;
const ENV = env.NODE_ENV;

console.log(`\nStarting server...`);
console.log(`Starting server in ${ENV} mode`);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}\n`);
});