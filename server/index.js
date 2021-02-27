import bodyParser from "body-parser";
import mongoose from "mongoose";
import express from "express";
import cors from "cors"

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

