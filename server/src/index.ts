import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
/* ROUTES Imports */
import taskRoutes from "./routes/taskRoutes";
import userRoutes from "./routes/userRoutes";
import searchRoutes from "./routes/searchRoutes";
import projectRoutes from "./routes/projectRoutes";


/* Configuration */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* Routes */
app.get('/', (req, res) => {
    res.send("This is home route");
});

app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes)
app.use("/search", searchRoutes)
app.use("/users", userRoutes)

/* Server */
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on Port ${port}`);
});

