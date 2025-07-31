import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User"

// Create a client to send and receive events
export const inngest = new Inngest({ id: "filofoam next" });


// ingest function to save user data to a database

export const = syncUserCreation = ingest.createFunction(
{
 id:'sync-user-from-clerck'
}
{event: 'clerck/user.created'}
async ({event})=>{
const {id,first_name, last_name, eamil_addresses, image_url } = event.data
const userData = {
    _id:id,
    email:eamil_addresses[0].eamil_address,
    name: first_name + ' ' + last_name,
    imageUrl:image_url
}
await connectDB()
    await User.create(userData)

}
)

//ingest function to update adata in the database
export cosnt syncUserUpdtaion = ingest.createFunction(
    {
        id: 'update user from clerk'
    },
    {event: 'clerk/user.updated'},
    async ({event}) => {
const {id,first_name, last_name, eamil_addresses, image_url } = event.data
const userData = {
    _id:id,
    email:eamil_addresses[0].eamil_address,
    name: first_name + ' ' + last_name,
    imageUrl:image_url
    }
    await connectDB()
    await User.findByIdAndUpdate(id,userData)
}
)

//ingest function to delete user from the database
export const syncUserDeletion = ingest.createFunction(
    {
        id: 'delete-user-with-clerk'
    },
    {event: 'clerk/user.deleted'},
    async({event})=>{
const {id} = event.data

await connectDB()
await User.findByIdAndDelete(id)
    }
)