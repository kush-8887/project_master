const express = require("express");
const router = express.Router();
const { getUserId } = require('../../services/user_id');
const {get_line_year_price,get_line_quarter_price,get_line_month_price} = require('../../services/fetch_quantity_line')

router.get("/getLineGP/quantity/year/:startyear/:endyear",async(req,res)=>{
    let startyear = req.params.startyear;
    let endyear = req.params.endyear;
    let userId = await getUserId(req);

    let data = await get_line_year_price(startyear,endyear,userId)

    res.json(data)

});

router.get("/getLineGP/quantity/month/:year",async(req,res)=>{
    let year = req.params.year;
    let userId = await getUserId(req);

    let data = await get_line_month_price(year,userId);

    res.json(data);
});

router.get("/getLineGP/quantity/quarter/:year",async(req,res)=>{
    let year = req.params.year;
    let userId = await getUserId(req);

    let data = await get_line_quarter_price(year,userId);

    res.json(data);
})

module.exports = router;