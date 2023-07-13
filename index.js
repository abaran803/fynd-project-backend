const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const SchemaTypes = mongoose.Types.ObjectId;
// const main = require('./helper/email');

app.use(cors());
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://abaran803:zk4HiRi4HySsFtwe@cluster0.e5adcni.mongodb.net/ff?retryWrites=true&w=majority')
    .then(() => console.log("Connected to Database"))
    .catch(err => console.log("Error:", err.message));

const ticketSchema = new mongoose.Schema({
    type: String,
    employeeId: {
        type: String,
        required: true
    },
    manager: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        require: true
    },
    ticketId: {
        type: String,
        default: SchemaTypes.ObjectId
    },
    ticketStatus: {
        type: String,
        default: 'pending'
    },
    days: String,
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const TicketModal = new mongoose.model("ticket", ticketSchema);

const PORT = 3001;

app.post("/generateTicket", async (req, res) => {
    try {
        const ticket = new TicketModal(req.body);
        await ticket.save();
        res.status(200).json({message: "OK"});
    } catch(err) {
        res.status(500).json({message: "Some error occured"});
    }
})

app.get('/getAllTicketsOfClient/:employeeId', async (req, res) => {
    try {
        const employeeId = req.params.employeeId;
        const tickets = await TicketModal.findMany({employeeId});
        await main();
        res.status(200).json({message: "OK", tickets});
    } catch(err) {
        res.status(500).send("Some error occured");
    }
})

// app.get("/sendMail/:body", async (req, res) => {
//     try {
//         console.log("Sending");
//         await main();
//         res.status(200).send("Email sent successfully");
//     } catch(err) {
//         res.status(404).send(err.message);
//     }
// })

app.listen(PORT, () => {
    console.log("Server started at port", PORT);
})