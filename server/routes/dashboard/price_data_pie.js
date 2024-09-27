const express = require("express");
const router = express.Router();
const { getUserId } = require('../../services/user_id');
const { get_year_quant ,get_month_quant ,get_quarter_quant} = require('../../services/fetch_price_pie');

router.get("/getPricePie/year/:year",async(req,res)=>{
    let year = req.params.year;
    let userId = await getUserId(req);

    let data = await get_year_quant(year,userId);

    res.json(data)

});

router.get("/getPricePie/month/:month",async(req,res)=>{
    let month = req.params.month
    let userId = await getUserId(req);

    let data = await get_month_quant(month,userId);

    res.json(data);
});

router.get("/getPricePie/quarter/:quarter",async(req,res)=>{
    let quarter = req.params.quarter;
    let userId = await getUserId(req);

    let data = await get_quarter_quant(quarter,userId);

    res.json(data);
})

module.exports = router;