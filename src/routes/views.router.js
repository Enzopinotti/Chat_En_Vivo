import express from "express";


export const viewsRouter = express.Router();

viewsRouter.get("/", (req, res) => {

    res.render("index", {});

});

export default viewsRouter;