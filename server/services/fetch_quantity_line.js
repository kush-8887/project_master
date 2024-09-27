const express = require("express");
const router = express.Router();
require('dotenv').config();
const mongoose = require('mongoose');
const YearData = require('../models/year_data');
const MonthData = require('../models/month_data');
const QuarterData = require('../models/quarter_data');

async function get_line_year_price(startyear, endyear, userId) {
    try {
        const data = await YearData.find({
            year: { $gte: startyear, $lte: endyear },
            userId: userId
        });

        const allItems = new Set();
        data.forEach(doc => allItems.add(doc.item_name));

        const allItemsArray = Array.from(allItems);

        const result = [];

        for (let year = startyear; year <= endyear; year++) {
            const yearlyData = data.filter(doc => doc.year === String(year));

            const yearlyMap = {};
            yearlyData.forEach(doc => {
                yearlyMap[doc.item_name] = doc.quantity;
            });

            const formattedData = allItemsArray.map(item => ({
                x: item,              
                y: yearlyMap[item] || 0  
            }));

            result.push({
                id: String(year),   
                data: formattedData
            });
        }

        return result;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

async function get_line_quarter_price(year, userId) {
    try {
        // Define the four quarters for the given year
        const quarters = [`${year}Q1`, `${year}Q2`, `${year}Q3`, `${year}Q4`];

        // Fetch data for the specified year and userId
        const data = await QuarterData.find({
            quarter: { $in: quarters },  // Look for quarters within the selected year
            userId: userId
        });

        // Collect all unique item names across all quarters
        const allItems = new Set();
        data.forEach(doc => allItems.add(doc.item_name));

        // Convert the set of allItems to an array
        const allItemsArray = Array.from(allItems);

        // Prepare the result for each quarter
        const result = quarters.map(quarter => {
            // Filter data for the current quarter
            const quarterData = data.filter(doc => doc.quarter === quarter);

            // Create a map for the current quarter data (item_name -> total)
            const quarterMap = {};
            quarterData.forEach(doc => {
                quarterMap[doc.item_name] = doc.quantity;
            });

            // Ensure all items are included, even if missing (set y to 0 if not present)
            const formattedData = allItemsArray.map(item => ({
                x: item,              // Item name
                y: quarterMap[item] || 0  // Total value or 0 if not present for that quarter
            }));

            return {
                id: quarter,     // Use the quarter (e.g., 2024Q1) as the id
                data: formattedData  // Array of {x, y} pairs for the quarter
            };
        });

        return result;
    } catch (error) {
        console.error("Error fetching quarterly data:", error);
        return [];
    }
}
async function get_line_month_price(year, userId) {
    try {
        // Define all 12 months for the given year
        const months = Array.from({ length: 12 }, (_, i) => {
            const month = (i + 1).toString().padStart(2, '0'); // Format month as "01", "02", etc.
            return `${year}-${month}`;  // E.g., "2024-01", "2024-02", etc.
        });

        // Fetch data for the specified year and userId
        const data = await MonthData.find({
            month: { $in: months },  // Look for months within the selected year
            userId: userId
        });

        // Collect all unique item names across all months
        const allItems = new Set();
        data.forEach(doc => allItems.add(doc.item_name));

        // Convert the set of allItems to an array
        const allItemsArray = Array.from(allItems);

        // Prepare the result for each month
        const result = months.map(month => {
            // Filter data for the current month
            const monthData = data.filter(doc => doc.month === month);

            // Create a map for the current month data (item_name -> total)
            const monthMap = {};
            monthData.forEach(doc => {
                monthMap[doc.item_name] = doc.quantity;
            });

            // Ensure all items are included, even if missing (set y to 0 if not present)
            const formattedData = allItemsArray.map(item => ({
                x: item,              // Item name
                y: monthMap[item] || 0  // Total value or 0 if not present for that month
            }));

            return {
                id: month,     // Use the month (e.g., "2024-01") as the id
                data: formattedData  // Array of {x, y} pairs for the month
            };
        });

        return result;
    } catch (error) {
        console.error("Error fetching monthly data:", error);
        return [];
    }
}



module.exports = {
    get_line_year_price,
    get_line_quarter_price,
    get_line_month_price
}