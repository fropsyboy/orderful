const {
  convertStringToJson,
  convertJsonToString,
  convertJsonToXml,
  convertXmlToJson
} = require('../services/converterService');

// POST: /api/converter
const convertDocument = async (req, res) => {
  const { input, fromFormat, toFormat, elementSeparator, segmentSeparator } = req.body;

  try {
    let result;
    let json;

    // Convert from String to JSON/XML
    if (fromFormat === 'string') {
      json = convertStringToJson(input, elementSeparator, segmentSeparator);
    } else if (fromFormat === 'json') {
      json = JSON.parse(input);
    } else if (fromFormat === 'xml') {
      json = await convertXmlToJson(input);  // Make this async
    } else {
      return res.status(400).json({ message: 'Invalid input format' });
    }

    // Convert JSON to desired output format
    if (toFormat === 'string') {
      result = convertJsonToString(json, elementSeparator, segmentSeparator);
      res.status(200).json({ result });
    } else if (toFormat === 'json') {
      res.status(200).json({ result: json });  // Only return JSON
    } else if (toFormat === 'xml') {
      result = convertJsonToXml(json);

      // Set content type to XML and return the result
      res.header('Content-Type', 'application/xml');
      res.status(200).send(result);  // Only return XML
    } else {
      return res.status(400).json({ message: 'Invalid output format' });
    }
    
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = {
  convertDocument
};
