import express from 'express'
import { createUser, loginUser, logoutCurrentUser, getAllUsers,  getCurrentUserProfile } from '../controllers/userController.js'
import { authenticate, authorizeAdmin,} from '../middlewares/authMiddkewares.js'

const router = express.Router()

router.route('/').post(createUser).get(authenticate, authorizeAdmin, getAllUsers);
router.post('/auth', loginUser)
router.post('/logout', logoutCurrentUser)

router.route('/profile').get(authenticate, getCurrentUserProfile)



export default router;