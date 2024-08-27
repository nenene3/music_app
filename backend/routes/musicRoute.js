import * as controller from '../controllers/musicController.js'
import express from 'express'
import { protect } from '../middlewares/authHandler.js' 
const router = express.Router()

router.route('/').get(controller.getArtists)
router.route('/:artist').get(controller.albums)
router.route('/:artist/:album').get(controller.getSongsFromAlbum)


export default router 