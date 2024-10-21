const router = require('express').Router();
const { getUserId } = require("../../services/user_id");
const { spawn } = require('child_process');
const currentDataSchema = require('../../models/current_data');

router.get('/getPricePred/:product', async (req, res) => {
    const operation = "price";
    const product = req.params.product;
    const userId = await getUserId(req); 
    // const userId = "66f10a130e58cd7c0b512d6c";

    const pythonScriptPath = "./python/prediction.py";
    const pythonProcess = spawn("python", [pythonScriptPath, userId, product, operation]);

    let scriptOutput = "";

    // Capture the output from the Python script
    pythonProcess.stdout.on("data", (data) => {
        scriptOutput += data.toString(); 
    });

    pythonProcess.on("close", (code) => {
        // Only send a response if it hasn't already been sent
        if (!res.headersSent) {
            if (code === 0) {
                try {
                    // console.log(scriptOutput);
                    const data = JSON.parse(scriptOutput)
                    res.status(200).json(data) //Changed to return json
                } catch (error) {
                    console.error("Error parsing Python script output:", error);
                    res.status(500).json({ error: "Failed to parse Python script output" });
                }
            } else {
                // Handle non-zero exit codes
                console.error(`Python script exited with code ${code}`);
                res.status(500).json({ error: `Python script failed with code ${code}` });
            }
        }
    });
});

router.get('/getQuantityPred/:product', async (req, res) => {
    const operation = "quantity";
    const product = req.params.product;
    const userId = await getUserId(req);
    // const userId = "66f10a130e58cd7c0b512d6c";

    const pythonScriptPath = "./python/prediction.py";
    const pythonProcess = spawn("python", [pythonScriptPath, userId, product, operation]);

    let scriptOutput = "";

    // Capture the output from the Python script
    pythonProcess.stdout.on("data", (data) => {
        scriptOutput += data.toString(); 
        // console.log(scriptOutput);
    });

    pythonProcess.on("close", (code) => {
        // Only send a response if it hasn't already been sent
        if (!res.headersSent) {
            if (code === 0) {
                try {
                    // console.log(scriptOutput);
                    const data = JSON.parse(scriptOutput)
                    res.status(200).json(data)
                } catch (error) {
                    console.error("Error parsing Python script output:", error);
                    res.status(500).json({ error: "Failed to parse Python script output" });
                }
            } else {
                // Handle non-zero exit codes
                console.error(`Python script exited with code ${code}`);
                res.status(500).json({ error: `Python script failed with code ${code}` });
            }
        }
    });
});

router.get('/fetchPredItems', async (req, res) => {
    try {
        const userId = await getUserId(req);

        // Fetch the user-specific data from the 'time_data' collection where the items are stored
        const userData = await currentDataSchema.findOne({ userId: userId }, { items: 1, _id: 0 }); // Only retrieve the 'items' field

        if (userData) {
            res.status(200).json({
                items: userData.items // Return the list of items
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No data found for this user."
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching items.",
            error: error.message
        });
    }
});

router.get('/getQuantPredQuarter/:product', async (req, res) => {
    const operation = "quantity";
    const product = req.params.product;
    const userId = await getUserId(req);
    // const userId = "66f10a130e58cd7c0b512d6c";

    const pythonScriptPath = "./python/prediction.py";
    const pythonProcess = spawn("python", [pythonScriptPath, userId, product, operation]);

    let scriptOutput = "";

    // Capture the output from the Python script
    pythonProcess.stdout.on("data", (data) => {
        scriptOutput += data.toString();
    });

    pythonProcess.on("close", (code) => {
        if (!res.headersSent) {
            if (code === 0) {
                try {
                    // console.log(scriptOutput);
                    
                    const data = JSON.parse(scriptOutput);

                    // Function to aggregate monthly data into quarterly data
                    const aggregateToQuarter = (data) => {
                        const quarterlyData = {};
                        
                        data.forEach(item => {
                            const [year, month] = item.x.split("-");
                            const quarter = `Q${Math.ceil(parseInt(month) / 3)}-${year}`;
                            
                            if (!quarterlyData[quarter]) {
                                quarterlyData[quarter] = 0;
                            }
                            quarterlyData[quarter] += item.y;
                        });

                        // Convert the aggregated data back to the desired format
                        return Object.keys(quarterlyData).map(quarter => ({
                            x: quarter,
                            y: quarterlyData[quarter]
                        }));
                    };

                    // Modify the data to return quarter-wise predictions
                    const quarterWiseData = [{
                        id: data[0].id,
                        data: aggregateToQuarter(data[0].data)
                    }];

                    res.status(200).json(quarterWiseData);
                } catch (error) {
                    console.error("Error parsing Python script output:", error);
                    res.status(500).json({ error: "Failed to parse Python script output" });
                }
            } else {
                console.error(`Python script exited with code ${code}`);
                res.status(500).json({ error: `Python script failed with code ${code}` });
            }
        }
    });
});

router.get('/getPricePredQuarter/:product', async (req, res) => {
    const operation = "price";
    const product = req.params.product;
    const userId = await getUserId(req);
    // const userId = "66f10a130e58cd7c0b512d6c";

    const pythonScriptPath = "./python/prediction.py";
    const pythonProcess = spawn("python", [pythonScriptPath, userId, product, operation]);

    let scriptOutput = "";

    // Capture the output from the Python script
    pythonProcess.stdout.on("data", (data) => {
        scriptOutput += data.toString();
    });

    pythonProcess.on("close", (code) => {
        if (!res.headersSent) {
            if (code === 0) {
                try {
                    // console.log(scriptOutput);
                    
                    const data = JSON.parse(scriptOutput);

                    // Function to aggregate monthly data into quarterly data
                    const aggregateToQuarter = (data) => {
                        const quarterlyData = {};
                        
                        data.forEach(item => {
                            const [year, month] = item.x.split("-");
                            const quarter = `Q${Math.ceil(parseInt(month) / 3)}-${year}`;
                            
                            if (!quarterlyData[quarter]) {
                                quarterlyData[quarter] = 0;
                            }
                            quarterlyData[quarter] += item.y;
                        });

                        // Convert the aggregated data back to the desired format
                        return Object.keys(quarterlyData).map(quarter => ({
                            x: quarter,
                            y: quarterlyData[quarter]
                        }));
                    };

                    // Modify the data to return quarter-wise predictions
                    const quarterWiseData = [{
                        id: data[0].id,
                        data: aggregateToQuarter(data[0].data)
                    }];

                    res.status(200).json(quarterWiseData);
                } catch (error) {
                    console.error("Error parsing Python script output:", error);
                    res.status(500).json({ error: "Failed to parse Python script output" });
                }
            } else {
                console.error(`Python script exited with code ${code}`);
                res.status(500).json({ error: `Python script failed with code ${code}` });
            }
        }
    });
});

module.exports = router;