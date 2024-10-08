const Assignment = require('../models/Assignment');

// Upload assignment
exports.uploadAssignment = async (req, res) => {
    const { task, admin } = req.body;
    try {
        const assignment = await Assignment.create({
            userId: req.user._id,
            task,
            admin,
        });
        res.status(201).json({ message: 'Assignment uploaded', assignment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// View assignments for an admin
exports.getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({ admin: req.user._id }).populate('userId');
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Accept assignment
exports.acceptAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (assignment) {
            assignment.status = 'Accepted';
            await assignment.save();
            res.json({ message: 'Assignment accepted' });
        } else {
            res.status(404).json({ message: 'Assignment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Reject assignment
exports.rejectAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (assignment) {
            assignment.status = 'Rejected';
            await assignment.save();
            res.json({ message: 'Assignment rejected' });
        } else {
            res.status(404).json({ message: 'Assignment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
