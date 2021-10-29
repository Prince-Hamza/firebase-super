// import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set , push , get , child } from "firebase/database";

export class RealTime {

	Set (path , Json) {
		const db = getDatabase();
		set(ref(db, path), Json)
		// console.log(`successfully written`);
	}

	
	Push (path , Json) {
		const db = getDatabase();
		// set(ref(db, path), Json)
		push(ref(db ,path) , Json)
		// console.log(`successfully written`);
	}

	async Once (path) {
		const dbRef = ref(getDatabase())
		try {
			const snapshot = await get(child(dbRef , path))
			const snapValue = snapshot.exists() ? snapshot.val() : "no information is availabe"	
			return snapValue
		} catch (ex) {
            console.log(ex)
			return ex
		}
	}

	async onceArray (path) {
		// consider inputs :  limit (e.g first 20) ,  keys , cache
		const dbRef = ref(getDatabase())
		var respArray = []
		try {
			const snapshots = await get(child(dbRef , path))
			snapshots.forEach((snap)=> {  respArray.push(snap.val()) })
			return respArray
		} catch (ex) {
            console.log(ex)
			return ex
		}
	}

}