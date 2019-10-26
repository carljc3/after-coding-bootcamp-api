const express = require("express")
const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// const db = require("./models")

// require("./routes").apiRoutes(app)

app.listen(PORT, function(){
    console.log("listening on http://localhost:" + PORT)
})
