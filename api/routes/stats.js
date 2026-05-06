const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');

// POST /api/stats/track - Log a new visit
router.post('/track', async (req, res) => {
  try {
    // In production, we get the IP from req.headers['x-forwarded-for']
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    // For local dev, if IP is ::1 or 127.0.0.1, we'll mock it so the user sees results
    if (ip === '::1' || ip === '127.0.0.1') {
      const mockVisitor = new Visitor({
        country: 'India',
        city: 'Mumbai (Local)',
        flag: '🇮🇳'
      });
      await mockVisitor.save();
      return res.status(201).json(mockVisitor);
    }

    // Use ipstack if key is provided, otherwise fallback to ip-api
    const apiKey = process.env.IPSTACK_ACCESS_KEY;
    const url = apiKey 
      ? `http://api.ipstack.com/${ip}?access_key=${apiKey}`
      : `http://ip-api.com/json/${ip}`;

    const response = await fetch(url);
    const data = await response.json();

    // Handle different response formats from both APIs
    const isSuccess = apiKey ? !!data.country_name : (data.status === 'success');
    
    if (isSuccess) {
      const visitor = new Visitor({
        country: apiKey ? data.country_name : data.country,
        city: apiKey ? data.city : data.city,
        flag: getFlagEmoji(apiKey ? data.country_code : data.countryCode)
      });
      await visitor.save();
      res.status(201).json(visitor);
    } else {
      throw new Error('IP tracking failed');
    }
  } catch (error) {
    console.error('Tracking error:', error);
    res.status(500).json({ error: 'Failed to track visit' });
  }
});

// GET /api/stats/recent - Get last 5 visitors
router.get('/recent', async (req, res) => {
  try {
    const recent = await Visitor.find()
      .sort({ createdAt: -1 })
      .limit(5);
    
    const total = await Visitor.countDocuments();
    
    res.json({ recent, total });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch insights' });
  }
});

// Helper to convert country code to flag emoji
function getFlagEmoji(countryCode) {
  if (!countryCode) return '🌐';
  return countryCode
    .toUpperCase()
    .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt()));
}

module.exports = router;
