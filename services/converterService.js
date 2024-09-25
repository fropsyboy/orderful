const xml2js = require('xml2js');
const js2xmlparser = require('js2xmlparser');

const convertStringToJson = (input, elementSeparator, segmentSeparator) => {
    const segments = input.split(segmentSeparator);
    const jsonResult = {};
  
    segments.forEach((segment) => {
      if (segment.trim() === "") return;  // Skip empty segments
      const elements = segment.split(elementSeparator);
      const segmentName = elements.shift();
      if (segmentName) {
        jsonResult[segmentName] = elements;
      }
    });
  
    return jsonResult;
  };
  

// Convert JSON to String
const convertJsonToString = (json, elementSeparator, segmentSeparator) => {
  return Object.entries(json).map(([key, value]) => {
    return key + elementSeparator + value.join(elementSeparator);
  }).join(segmentSeparator);
};

// Convert JSON to XML
const convertJsonToXml = (json) => {
    return js2xmlparser.parse("root", json, { format: { doubleQuotes: true } });
};


// Convert XML to JSON (async)
const convertXmlToJson = (xml) => {
    return new Promise((resolve, reject) => {
      xml2js.parseString(xml, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  };

module.exports = {
  convertStringToJson,
  convertJsonToString,
  convertJsonToXml,
  convertXmlToJson
};
