import { openDB} from 'idb';
import { TripInfo } from "./models/TripInfo";


const DATABASE_NAME = "TripInfoDB";


export async function insertTripInfo(tripInfo:TripInfo){
    const db = await openDB(DATABASE_NAME, 1)
    const id = await db.put("trips", tripInfo)
    return id;
}

export async function getAllTripInfo(){
    const dbGetAll = await openDB(DATABASE_NAME, 1)
    return await dbGetAll.getAll("trips")
}

export async function getOneTripInfo(id:number){
    const dbGetOne = await openDB(DATABASE_NAME, 1)
    return dbGetOne.get("trips",id)
    
}


export async function deleteOneTripInfo(id:number){
    const dbRemovedOne = await openDB(DATABASE_NAME, 1)
    await dbRemovedOne.delete("trips",id);
    window.location.href="/home";
}

export async function deleteAllTripInfo(){
    const dbRemoved = await openDB(DATABASE_NAME, 1)
    return await dbRemoved.clear("trips")
}



initDatabase().then(()=>{
    console.log("database" + DATABASE_NAME + " was created!")
})

async function initDatabase() {
    const db = await openDB(DATABASE_NAME, 1, {
        upgrade(db) {
            //create a store of objects
            const store = db.createObjectStore('trips', {
                // The 'id' property of the object will be the key
                keyPath: 'id', // primary key column
                //if it is not exlicitly set, create a value by auto incrementing.
                autoIncrement: true, // dont need to set the value for PK
            });           
        },
    });
}
















