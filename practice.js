// require('dotenv').config() // didnt work
import 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.PORT || 3000
const teas = []
let nextId = 1
app.use(express.json())


// add tea to the array
app.post('/teas', (req, res) => {
    const {name, price} = req.body
    const newTea = {id:nextId++, name, price}
    teas.push(newTea)
    res.send(`${newTea.name} added`);
})

// Show tea with ID
app.get('/teas/:id', (req, res) => {
    const id = req.params.id
    const index = teas.findIndex( t => t.id === parseInt(id))
    if(index !== -1){
        res.status(200).send(teas[index])
    } else {
        res.status(404).send('Tea not found')
    }
})

// update tea with ID
app.put('/teas/:id', (req, res) => {
    const tea = teas.find(t => t.id === parseInt(req.params.id))
    const {name, price} = req.body
    if(tea) {
        tea.name = name
        tea.price = price
        res.status(201).send(`Tea with id: ${tea.id} updated succesfully`)
    } else {
        res.status(408).send(`Tea not found`)
    }
})

// Delete tea with ID
app.delete('/teas/:id', (req, res) => {
    const index = teas.findIndex(t => t.id === parseInt(req.params.id))
    if(index !== -1) {
        teas.splice(index, 1)
        res.status(201).send(`Tea deleted successfully`)
    } else {
        res.status(404).send(`Tea not found.`)
    }
})

// Show all teas
app.get('/teas', (req,res) => {
    res.send(teas)
})

app.listen(port, () => {
    console.log(`Server running on port : ${port}`)    
})