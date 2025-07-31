import { serve } from "inngest/next";
import { inngest, syncUserCreation, syncUserUpdtaion, syncUserDeletion } from ".@/config/inngest";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdtaion,
    syncUserDeletion
  ],
});