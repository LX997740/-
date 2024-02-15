//导入expres框架
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
//导入cors
const cors = require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({
	extends: false
}))
app.use(bodyParser.json())

app.listen(8000, () => {
	console.log('http://localhost:8000')
})