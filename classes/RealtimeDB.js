// import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set , push , get , child , onValue , update , runTransaction } from "firebase/database";

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
		// consider inputs : limit (e.g first 20) , keys , cache
		const dbRef = ref(getDatabase())
		var respArray = []
		try {
			const snapshots = await get(child(dbRef , path))
			snapshots.forEach((snap)=> { respArray.push(snap.val()) })
			return respArray
		} catch (ex) {
			console.log(ex)
			return ex
		}
	}

	On (path , Event) {
		const db = getDatabase()
		// onChildAdded , onChildChanged , onChildRemoved
		return Event(ref(db, path), (snapshot) => {
			return snapshot.val() || 'Anonymous'
		})
	}

	async Update (info) {
		const db = getDatabase();
		return await update(ref(db), info);
	}

	Compute = (path , method) => {
		const db = getDatabase()
		const postRef = ref(db, path)

		await runTransaction(postRef, (post) => {
			post = method(post)
			return post;
				}) 
	}

	Query (path , where) {
		const db = getDatabase()
        return await query(ref(db, path), orderByChild('starCount'))
	}




}
