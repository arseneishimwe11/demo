import { v4 as uuidv4 } from "uuid";

export const generateTicketNumber = (): string => {
  // Generating a unique ticket number with a prefix
  return `TKT-${uuidv4().substring(0, 8).toUpperCase()}`;
};
