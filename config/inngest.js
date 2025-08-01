import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";
//inngest module not found solution


// Create a client to send and receive events
export const inngest = new Inngest({ id: "filofoam-next" });

// Inngest function to save user data to the database
export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk"
  },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id:id,
      email: email_addresses[0].email_address,
      name: first_name+' '+last_name,
      imageUrl: image_url,
    };

    await connectDB();
    await User.create(userData);
  }
);

// Inngest function to update user data in the database
export const syncUserUpdation = inngest.createFunction(
  {
    id: "update-user-from-clerk",
    name: "Update User From Clerk"
  },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id:id,
      email: email_addresses[0].email_address,
      name: first_name+' '+last_name,
      imageUrl: image_url,
    };

    await connectDB();
    await User.findByIdAndUpdate(id, userData);
  }
);

// Inngest function to delete user from the database
export const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-with-clerk",
    name: "Delete User With Clerk"
  },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;

    await connectDB();
    await User.findByIdAndDelete(id);
  }
);
