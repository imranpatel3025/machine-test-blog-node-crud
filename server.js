
const cl = console.log;

const app = require("./app")

const PORT = 5000;

app.listen(PORT, () => {
    cl(`Server is Running on Port ${PORT}`)
})