import { v4 as uuid } from "uuid";

export let sessionId = uuid();

export const sessionUpdater = () => {
  sessionId = uuid();
  console.log(sessionId);
};
