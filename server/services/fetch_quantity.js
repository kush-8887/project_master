const express = require("express");
const router = express.Router();
require('dotenv').config();
const mongoose = require('mongoose');
const YearData = require('../models/year_data');
const MonthData = require('../models/month_data');
const QuarterData = require('../models/quarter_data');

async function get_year_quant(year, userId) {
    try {
        const data = await YearData.find({
            year: year,
            userId: userId
        });

        // Map over the result and create a new array of objects
        const result = data.map(doc => ({
            id: doc.item_name,         
            label: doc.item_name,   
            value: doc.quantity    
        }));

        return result;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}
async function get_month_quant(month, userId) {
    try {
        const data = await MonthData.find({
            month: month,
            userId: userId
        });

        // Map over the result and create a new array of objects
        const result = data.map(doc => ({
            id: doc.item_name,           
            label: doc.item_name,   
            value: doc.quantity     
        }));

        return result;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}
async function get_quarter_quant(quarter, userId) {
    try {
        const data = await QuarterData.find({
            quarter : quarter,
            userId: userId
        });

        // Map over the result and create a new array of objects
        const result = data.map(doc => ({
            id: doc.item_name,          
            label: doc.item_name,  
            value: doc.quantity     
        }));

        return result;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

module.exports = {
    get_year_quant,
    get_month_quant,
    get_quarter_quant
}