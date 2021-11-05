import {config} from "./config.js"
import { initializeApp } from 'firebase/app'
import { Realtime as Database } from './index.js'
import fetch from 'node-fetch'

initializeApp(config)
console.log(`connected`)

const getInfo = async () => {
    const data = await Database.onceArray('/firebaseSuper/Push')
    console.log(`item 2 :: ${ data[0] }`)
    console.log(`content :: ${ JSON.stringify(data) }`)
}

 getInfo()
 
