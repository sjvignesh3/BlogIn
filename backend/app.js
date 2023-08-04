import express from 'express';
import mongoose from 'mongoose';
import blogRouter from './routes/blog-routes';
import router from './routes/user-route';
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/user',router);
app.use('/api/blog',blogRouter);


mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://sjvignesh333:Vignesh3nec@cluster0.8l52yyp.mongodb.net/?retryWrites=true&w=majority")
.then(()=> app.listen(5000)).then(()=> console.log("Mongoose connected"))
.catch((err)=> console.log(err));


