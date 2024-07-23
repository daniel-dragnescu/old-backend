const Qso = require('../models/Qso');
const IndicativeCount = require('../models/IndicativeCount');
const asyncHandler = require('express-async-handler');

const getAllQso = asyncHandler(async (req, res) => {
  try {
    const qsos = await Qso.find().lean();
    if (!qsos.length) {
      return res.status(404).json({ message: 'No QSOs found' });
    }
    res.json(qsos);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while retrieving QSOs', error: error.message });
  }
});

const createNewQso = asyncHandler(async (req, res) => {
  const { callsign, rst_received, rst_sent, op, qth, comments } = req.body;

  if (!callsign || !rst_received || !rst_sent) {
    return res.status(422).json({ message: 'Unprocessable Entity: Callsign, RST received, and RST sent are required' });
  }

  try {
    // Create or update indicative count
    let indicativeCount = await IndicativeCount.findOne({ callsign });
    if (!indicativeCount) {
      indicativeCount = await IndicativeCount.create({ callsign });
    }
    indicativeCount.count += 1;
    await indicativeCount.save();

    // Create QSO
    const createQso = await Qso.create({ callsign, rst_received, rst_sent, op, qth, comments });

    if (createQso instanceof Qso) {
      res.status(201).json({ message: `New QSO ${callsign} created`, qso: createQso });
    } else {
      res.status(422).json({ message: 'Unprocessable Entity: QSO creation failed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while creating the QSO', error: error.message });
  }
});

const updateQso = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { callsign, rst_received, rst_sent, op, qth, comments } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'QSO ID required' });
  }

  const fieldsToUpdate = {};
  if (callsign !== undefined) fieldsToUpdate.callsign = callsign;
  if (rst_received !== undefined) fieldsToUpdate.rst_received = rst_received;
  if (rst_sent !== undefined) fieldsToUpdate.rst_sent = rst_sent;
  if (op !== undefined) fieldsToUpdate.op = op;
  if (qth !== undefined) fieldsToUpdate.qth = qth;
  if (comments !== undefined) fieldsToUpdate.comments = comments;

  if (Object.keys(fieldsToUpdate).length === 0) {
    return res.status(400).json({ message: 'No changes requested' });
  }

  try {
    const qso = await Qso.findByIdAndUpdate(id, fieldsToUpdate, { new: true });

    if (qso) {
      res.status(200).json({ message: `QSO ${id} updated`, qso });
    } else {
      res.status(404).json({ message: 'QSO not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the QSO', error: error.message });
  }
});

const deleteQso = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'QSO ID required' });
  }

  try {
    const qso = await Qso.findById(id).exec();

    if (!qso) {
      return res.status(404).json({ message: 'QSO not found' });
    }

    const { callsign, _id } = qso;

    await Qso.deleteOne({ _id });

    // Decrease indicative count when deleting a QSO
    const indicativeCount = await IndicativeCount.findOne({ callsign });
    if (indicativeCount) {
      indicativeCount.count -= 1;
      await indicativeCount.save();
    }

    const reply = `QSO ${callsign} with ID ${_id} deleted`;

    res.json({ message: reply });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the QSO', error: error.message });
  }
});

const getIndicativeCount = asyncHandler(async (req, res) => {
  const { callsign } = req.params;

  if (!callsign) {
    return res.status(400).json({ message: 'Callsign required' });
  }

  try {
    const indicativeCount = await IndicativeCount.findOne({ callsign });

    if (indicativeCount) {
      res.json({ callsign, count: indicativeCount.count });
    } else {
      res.status(404).json({ message: 'Indicative count not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching indicative count', error: error.message });
  }
});

module.exports = {
  getAllQso,
  createNewQso,
  updateQso,
  deleteQso,
  getIndicativeCount,
};
