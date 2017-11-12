let notFoundResponse = {
    message: 'Document not found'
}

exports.getById = (id, res, model) => {
    model.findById(id, (err, doc) => {
        if (err) return res.status(400).json({ message: err })
        if (!doc) return res.status(404).json(notFoundResponse)
        return res.status(200).json(doc);
    });
}

exports.getByQuery = (query, res, model) => {
    console.log(query)
    model.find(query, (err, docs) => {
        if (err) return res.status(400).json({ message: err })
        return res.status(200).json(docs)
    });
}

exports.create = (modelObj, res, model) => {
    let newModel = new model(modelObj);
    newModel.save((err, savedModel) => {
        if (err) return res.status(400).json({ message: err })
        return res.status(201).json(savedModel)
    });
}

exports.update = (id, updateObj, options, res, model) => {
    model.findByIdAndUpdate(id, updateObj, options, (err, updated) => {
        if (err) return res.status(400).json({ message: err })
        if (!updated) return res.status(404).json(notFoundResponse)
        return res.status(200).json(updated)
    });
}

exports.delete = (id, res, model) => {
    model.findByIdAndRemove(id, (err, deleted) => {
        if (err) return res.status(400).json({ message: err })
        if (!deleted) return res.status(404).json(notFoundResponse);
        return res.status(200).json(deleted)
    })
}
