import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name: {
        type:String,
        required:true,
    },
    description :{
        type:String,
        required:false,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    },
    stock:{
        type:Number,
        default:0,
    },
    createdAt:{
        type:Date,
        default: () =>{
            const now = new Date();
            const formatter = new Intl.DateTimeFormat('en-GB',{
                timeZone: 'Europe/Madrid',
                year:'numeric',
                month: '2-digit',
                day:'2-digit',
                hour:'2-digit',
                minute:'2-digit',
                second:'2-digit',
            });
            const formattedDate = formatter.format(now);

            const [day,month,year,hour,minute,second] = formattedDate.match(/\d+/g);
            return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);        }
    }
})

const Product = mongoose.model('Product',productSchema)

export default Product