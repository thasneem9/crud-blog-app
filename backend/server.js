
import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import cors from 'cors'
import sequelize from './database/database.js'
import UserRoute from './routes/UserRoute.js'
import cookieParser from 'cookie-parser'
import PostRoute from './routes/PostRoute.js'

const app=express();


app.use(cors())
app.use(cookieParser()); 
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ limit: '10mb', extended: true })); // For form submissions
const PORT=5000;


app.use(express.json())
app.use('/api/users',UserRoute)
app.use('/api/posts',PostRoute)



// Sync models and start server
sequelize.sync({ force: false }) // means dont create tables unles necary
.then(() => {
    console.log('Database synced successfully');
})
.catch((err) => {
    console.log('Error syncing the database:', err);
});



app.listen(PORT,()=>{
 console.log(`Server has started on ${PORT}`)
})

