import express from "express";
import {addToWatchlist,updateWatchlistItem,removeFromWatchlist,getMyWatchlist} from '../controllers/watchlistController.js';
import { authMiddleware } from "../middleware/authmiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { addToWatchlistSchema } from "../validators/watchlistValidators.js";

const router = express.Router();

router.use(authMiddleware); // Apply authentication middleware to all routes in this router

router.post("/",validateRequest(addToWatchlistSchema ), addToWatchlist);

//{{baseurl}}/watchlist/:id
router.delete("/:id",removeFromWatchlist);

//{{baseurl}}/watchlist/:id
router.put("/:id",updateWatchlistItem);


router.get("/", getMyWatchlist);


export default router;
 