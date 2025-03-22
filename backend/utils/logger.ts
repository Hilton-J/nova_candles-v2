import logger from "pino";
import dayjs from "dayjs";
import env from "../schemas/envSchema";

const isDevelopment = env.NODE_ENV === "development";

const log = logger({
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format("YYYY-MM-DDTHH:mm:ssZ[Z]")}"`,
  ...(isDevelopment && {
    transport: {
      target: "pino-pretty",
    },
  }),
});

export default log;
