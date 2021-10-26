class Authentication {
	test = () => {
		console.log('success')
	}
}

class Realtime {
	once = () => {
		console.log("read:success")
	}
}



const Auth = new Authentication()
const RealTime = new Realtime()

module.exports = {
	Auth,
	RealTime
}

