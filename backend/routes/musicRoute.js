import * as controller from '../controllers/musicController.js'
import express from 'express'
import { protect } from '../middlewares/authHandler.js' 
const router = express.Router()

router.route('/').get(protect,controller.getArtists)
router.route('/:artist').get(protect,controller.albums)
router.route('/:artist/:album').get(protect,controller.getSongsFromAlbum)


export default router 