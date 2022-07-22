import express from 'express';
import * as dotenv from 'dotenv'
const router = express.Router();
import multer from 'multer';
import path from 'path';
import fs from 'fs'
import {Web3Storage, getFilesFromPath} from 'web3.storage'
dotenv.config();



const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, __dirname)
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`)
    }   
})
const upload = multer({storage: storage})

router.post("/", upload.single('image'), async(req,res,next) => {
    try{
        const uploadName = ["ImageGallery", req.file.originalname].join('|')
        console.log(uploadName)

        const web3Storage = new Web3Storage({token: process.env.WEB3STORAGE_TOKEN})
        console.log(`> 🤖 calculating content ID for ${req.file.originalname}`)
        
        const fileee = await getFilesFromPath(path.join(__dirname, `${req.file.originalname}`))

        const cid = await web3Storage.put(fileee, {
            name: uploadName,
            onRootCidReady:(localCid)=> {
                console.log(`> 🔑 locally calculated Content ID: ${localCid} `)
                console.log('> 📡 sending files to web3.storage ')
            }
        })

        const imageURI = `ipfs://${cid}/${req.file.originalname}`

        await fs.unlinkSync(path.join(__dirname, `${req.file.originalname}`))
    
        res.status(200).json({
            cid, 
             imageURI
        })

    }
    catch(e){
        res.status(500).send({
            statusCode:500,
            error:e.message
        })
    }
})

//module.exports = router
export default router