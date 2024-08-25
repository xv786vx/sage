import { v4 as uuidv4 } from "uuid";

let sessionId: string | null = null;

export function initializeSessionId() {
  if (!sessionId) {
    sessionId = uuidv4();
  }
  console.log("sessionID from sessiontracker.ts: " + `${sessionId}`);
  return sessionId;
}

export function updateSessionId() {
  sessionId = uuidv4();
  return sessionId;
}

export function getSessionId() {
  if (!sessionId) {
    throw new Error("Session ID not initialized");
  }
  return sessionId;
}
