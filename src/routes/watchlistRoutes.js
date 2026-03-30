import express from "express";
import {addToWatchlist,updateWatchlistItem,removeFromWatchlist,getMyWatchlist} from '../controllers/watchlistController.js';
import { authMiddleware } from "../middleware/authmiddleware.js";

const router = express.Router();

router.use(authMiddleware); // Apply authentication middleware to all routes in this router

router.post("/", addToWatchlist);

//{{baseurl}}/watchlist/:id
router.delete("/:id",removeFromWatchlist);

//{{baseurl}}/watchlist/:id
router.put("/:id",updateWatchlistItem);


router.get("/", getMyWatchlist);


export default router;
 