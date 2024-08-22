const errorHandler = (err, req, res, next) => {
    if (err.status) {
        return res.status(err.status).json({ msg: err.message});
    } else {
        return res.status(500).json({ msg: err.message});
    }
}

export default errorHandler;