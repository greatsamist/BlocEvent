import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs'
import * as dotenv from 'dotenv'
const router = express.Router();
import { ethers } from 'ethers'
import { connect, resultsToObjects, SUPPORTED_CHAINS } from '@tableland/sdk'
import { Web3Storage, getFilesFromPath } from 'web3.storage'
import { EventValidator } from './validator/index.js'
dotenv.config()

const polygonTestnet = SUPPORTED_CHAINS['polygon-mumbai']
let __dirname = path.resolve();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname))
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`)
    }
})
const upload = multer({ storage: storage })


router.post("/", upload.single('image'), async (req, res, next) => {
    const { error, value } = EventValidator(req.body);
    if (error) return res.status(400).json({ statusCode: 400, error: error.details[0].message });
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
    const provider = new ethers.providers.JsonRpcProvider("https://matic-mumbai.chainstacklabs.com")
    const signer = wallet.connect(provider)
    const tableLand = await await connect({ signer, network: "testnet", host: polygonTestnet.host, contract: polygonTestnet.contract, chainId: polygonTestnet.chainId })
    try {
        const { eventName, eventType, category, eventDate, startTime, endTime, description, shortDescription, organizers, participantsNumber, ticketPrice } = req.body;
        const uploadName = ["ImageGallery", req.file.originalname].join('|')
        console.log(uploadName)

        const web3Storage = new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN })
        console.log(`> 🤖 calculating content ID for ${req.file.originalname}`)

        const fileee = await getFilesFromPath(path.join(__dirname, `${req.file.originalname}`))

        const cid = await web3Storage.put(fileee, {
            name: uploadName,
            onRootCidReady: (localCid) => {
                console.log(`> 🔑 locally calculated Content ID: ${localCid} `)
                console.log('> 📡 sending files to web3.storage ')
            }
        })

        const imageURI = `ipfs://${cid}/${req.file.originalname}`
      
        await fs.unlinkSync(path.join(__dirname, `${req.file.originalname}`))

        // const writeRes = await tableLand.write(`INSERT INTO blockevents_80001_450 (id, eventName, eventType, category, eventDate, startTime, endTime, description, shortDescription, organizers, participantsNumber, ticketPrice, eventFile) 
        // VALUES (1, '${value.eventName}' , '${value.eventType}', '${value.category}', '${value.eventDate}', '${value.startTime}', '${value.endTime}', '${value.description}', '${value.shortDescription}', '${value.organizers}', ${Number(value.participantsNumber)}, ${Number(value.ticketPrice)}, '${cid}')`);

        const writeRes = await tableLand.write(`INSERT INTO blockevents_80001_502 (id, eventName, eventType, category, eventDate, startTime, endTime, description, organizers, participantsNumber, ticketPrice, eventFile) 
        VALUES (${Number(1)}, '${value.eventName}' , '${value.eventType}', '${value.category}', '${value.eventDate}', '${value.startTime}', '${value.endTime}', '${value.description}', '${value.organizers}', ${Number(value.participantsNumber)}, ${Number(value.ticketPrice)}, '${imageURI}')`);
        
        res.status(200).json({
            cid,
            imageURI,
            writeRes,
            //writeRess
        })

    }
    catch (e) {
        res.status(500).send({
            statusCode: 500,
            error: e.message
        })
    }
})


router.post('/table', upload.none(), async (req, res, next) => {
    try {
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
        const provider = new ethers.providers.JsonRpcProvider("https://matic-mumbai.chainstacklabs.com")
        const signer = wallet.connect(provider)
        const tableLand = await await connect({ signer, network: "testnet", host: polygonTestnet.host, contract: polygonTestnet.contract, chainId: polygonTestnet.chainId })

        // const { name } = await tableLand.create(
        //     `eventName text, eventType text, category text, eventDate text, startTime text, endTime text, description text, shortDescription text, organizers text, participantsNumber int, ticketPrice int, eventFile text, primary key(id)`,
        //     `blockevents`
        // )
        const { name } = await tableLand.create(
            `eventName text, eventType text, category text, eventDate text, startTime text, endTime text, description text, organizers text, participantsNumber int, ticketPrice int, eventFile text, id int, primary key(id)`,
            `blockevents`
        )
        return res.status(200).json({ statusode: 200, data: name })
    }
    catch (e) {
        res.status(500).json({
            statusCode: 500,
            error: e.message
        })
    }
})

router.get('/', async (req, res, next) => {
    try {
        let data = []
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
        const provider = new ethers.providers.JsonRpcProvider("https://matic-mumbai.chainstacklabs.com")
        const signer = wallet.connect(provider)
        const tableLand = await await connect({ signer, network: "testnet", host: polygonTestnet.host, contract: polygonTestnet.contract, chainId: polygonTestnet.chainId })

        const events = await tableLand.read(`SELECT * FROM  blockevents_80001_502`)

        console.log(events)
        const entries = resultsToObjects(events)

        for (const {
            eventName, eventType, category,
            eventDate, startTime, endTime, description, eventFile, organizers, participantsNumber, ticketPrice, id } of entries) {
            let structure = {
                'id': id,
                'eventName': eventName,
                'eventType': eventType,
                'category': category,
                'eventDate': eventDate,
                'startTime': startTime,
                'endTime': endTime,
                'description': description,
                'eventFile': eventFile,
                'organizers': organizers,
                'participantsNumber': participantsNumber,
                'ticketPrice': ticketPrice
            }
            data.push(structure)
        }

        res.status(200).json({
            statusCode: 200,
            message: "All events fetched",
            data: data
        })




    }
    catch (e) {
        res.status(500).json({
            statusCode: 500,
            error: e.message
        })
    }
})

router.get('/query', async (req, res, next) => {
    try {
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
        const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
        const signer = wallet.connect(provider)
        const tableLand = await await connect({ signer, network: "testnet", host: polygonTestnet.host, contract: polygonTestnet.contract, chainId: polygonTestnet.chainId })

        const events = await tableLand.read(`SELECT * FROM blockevents_80001_502 WHERE id=${req.query.id}`)
        const entries = resultsToObjects(events)
        res.status(200).json({
            statusCode: 200,
            message: "All events fetched",
            data: entries
        })

    }
    catch (e) {
        res.status(500).json({
            statusCode: 500,
            error: e.message
        })
    }
})


//module.exports = router
export default router