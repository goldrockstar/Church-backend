const fs = require('fs').promises;
const path = require('path');

const dataFilePath = path.join(__dirname, '../data.json');

const readData = async () => {
    try {
        const data = await fs.readFile(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Failed to read data file:", error);
        return null;
    }
};

const writeData = async (data) => {
    try {
        await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error("Failed to write data file:", error);
    }
};

exports.getAllContent = async (req, res) => {
    const data = await readData();
    if (data) {
        res.json(data);
    } else {
        res.status(500).send("Server error.");
    }
};

exports.getSection = (section) => async (req, res) => {
    const data = await readData();
    if (data && data[section]) {
        res.json(data[section]);
    } else if (data) {
        res.status(404).send(`Section '${section}' not found.`);
    } else {
        res.status(500).send("Server error.");
    }
};

exports.updateSection = (section) => async (req, res) => {
    const newData = req.body;
    if (!newData) {
        return res.status(400).send("Invalid data provided.");
    }

    const currentData = await readData();
    if (currentData) {
        currentData[section] = newData;
        await writeData(currentData);
        res.status(200).send(`${section} section updated successfully.`);
    } else {
        res.status(500).send("Server error.");
    }
};
