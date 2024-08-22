import express from 'express'
import { getProducts, createProduct,deleteProduct, putProduct,patchProduct } from '../controllers/productController.js'


const router = express.Router()

router.get('/',getProducts)
router.post('/',createProduct)
router.delete('/:id',deleteProduct)
router.put('/:id',putProduct)
router.patch('/:id',patchProduct)




export default router