const validateTicket = (req, res, next) => {

    const { title, description, status, priority } = req.body;

    if (!title || !description || !status || !priority) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    next();

};

module.exports = validateTicket;