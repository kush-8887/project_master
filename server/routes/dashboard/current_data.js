const router = require('express').Router();
const {getUserId} = require('../../services/user_id');
const CurrentData = require('../../models/current_data');
const User = require('../../models/user');

router.get("/getYears",async (req, res) => {
  try {
    const userId = await getUserId(req);
    const data = await CurrentData.findOne({ userId }, 'years');
    
    if (!data) {
      return res.status(404).json({ message: "No data found for this user" });
    }

    // Sort years in descending order
    const sortedYears = data.years.sort((a, b) => b - a);

    res.status(200).json({ years: sortedYears });
  } catch (error) {
    console.error("Error fetching years:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.get('/getMonths/:year',async (req, res) => {
  const year = req.params.year;
  try {
    const userId = await getUserId(req); 
    const currentData = await CurrentData.findOne({ userId });

    if (!currentData) {
      return res.status(404).json({ message: 'Data not found' });
    }

    // Filter months based on the year parameter
    const monthsOfYear = currentData.months.filter((month) => month.startsWith(year));

    // Sort the filtered months in ascending order (chronological order)
    const sortedMonthsOfYear = monthsOfYear.sort((a, b) => new Date(a) - new Date(b));

    res.json(sortedMonthsOfYear);
  } catch (error) {
    console.error('Error fetching months:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/getQuarters/:year', async (req, res) => {
  const year = req.params.year;

  try {
    const userId = await getUserId(req);  
    const currentData = await CurrentData.findOne({ userId });

    if (!currentData) {
      return res.status(404).json({ message: 'Data not found' });
    }

    // Filter quarters by the specified year and sort them in ascending order
    const filteredQuarters = currentData.quarters
      .filter(q => q.startsWith(year))  // Filter by the year parameter
      .sort((a, b) => a.localeCompare(b));  // Sort in ascending order

    res.status(200).json({ quarters: filteredQuarters });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/getProfile', async (req, res) => {
  try {
    // Extract userId from request (from session or token)
    const userId = await getUserId(req);

    // Find user by their unique _id (userId)
    const userDat = await User.findById(userId).select('-password'); // Exclude password in response

    if (!userDat) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user data excluding sensitive information like password
    res.status(200).json({ userData: userDat });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router