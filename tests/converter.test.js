const request = require('supertest');
const app = require('../app');  // Import the app without starting the server

jest.setTimeout(30000);  // Set timeout for all tests

describe('Document Converter API', () => {

  // Test case for converting string format to JSON
  it('should convert string to JSON', async () => {
    const res = await request(app)
      .post('/api/converter')
      .send({
        input: "ProductID*4*8*15*16*23~AddressID*42*108*3*14~ContactID*59*26~",
        fromFormat: "string",
        toFormat: "json",
        elementSeparator: "*",
        segmentSeparator: "~"
      });

    expect(res.statusCode).toEqual(200);

    // Parse the result as it might be stringified
    const result = res.body.result;

    expect(result).toHaveProperty('ProductID');
    expect(result).toHaveProperty('AddressID');
    expect(result).toHaveProperty('ContactID');
  });

  // Test case for converting JSON format to string
  it('should convert JSON to string', async () => {
    const res = await request(app)
      .post('/api/converter')
      .send({
        input: '{"ProductID":["4","8","15","16","23"], "AddressID":["42","108","3","14"], "ContactID":["59","26"]}',
        fromFormat: "json",
        toFormat: "string",
        elementSeparator: "*",
        segmentSeparator: "~"
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.result).toContain('ProductID*4*8*15*16*23');
  });

  // Test case for converting JSON format to XML
  it('should convert JSON to XML', async () => {
    const res = await request(app)
      .post('/api/converter')
      .send({
        input: '{"ProductID":["4","8","15","16","23"], "AddressID":["42","108","3","14"], "ContactID":["59","26"]}',
        fromFormat: "json",
        toFormat: "xml"
      });

    expect(res.statusCode).toEqual(200);
    expect(res.header['content-type']).toContain('application/xml');  // Check that the response is XML
    expect(res.text).toContain('<?xml version="1.0"');  // XML declaration should be present
    expect(res.text).toContain('<ProductID>4</ProductID>');
    expect(res.text).toContain('<AddressID>42</AddressID>');
  });

  // Test case for converting XML format to JSON
  it('should convert XML to JSON', async () => {
    const xmlInput = `
      <root>
        <ProductID>
          <ProductID1>4</ProductID1>
          <ProductID2>8</ProductID2>
          <ProductID3>15</ProductID3>
          <ProductID4>16</ProductID4>
          <ProductID5>23</ProductID5>
        </ProductID>
        <AddressID>
          <AddressID1>42</AddressID1>
          <AddressID2>108</AddressID2>
          <AddressID3>3</AddressID3>
          <AddressID4>14</AddressID4>
        </AddressID>
        <ContactID>
          <ContactID1>59</ContactID1>
          <ContactID2>26</ContactID2>
        </ContactID>
      </root>
    `;
    const res = await request(app)
      .post('/api/converter')
      .send({
        input: xmlInput,
        fromFormat: "xml",
        toFormat: "json"
      });

    expect(res.statusCode).toEqual(200);
    
    // Parse the result as JSON
    const result = res.body.result;

    expect(result).toHaveProperty('root');
    expect(result.root.ProductID[0]).toHaveProperty('ProductID1', ['4']);
    expect(result.root.ProductID[0]).toHaveProperty('ProductID2', ['8']);
    expect(result.root.ProductID[0]).toHaveProperty('ProductID3', ['15']);
    expect(result.root.ProductID[0]).toHaveProperty('ProductID4', ['16']);
    expect(result.root.ProductID[0]).toHaveProperty('ProductID5', ['23']);
  });

  // Test case for handling invalid input format
  it('should return 400 for invalid input format', async () => {
    const res = await request(app)
      .post('/api/converter')
      .send({
        input: "Invalid input",
        fromFormat: "invalidFormat",
        toFormat: "json"
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Invalid input format');
  });

  // Test case for handling invalid output format
  it('should return 400 for invalid output format', async () => {
    const res = await request(app)
      .post('/api/converter')
      .send({
        input: '{"ProductID":["4","8","15","16","23"]}',
        fromFormat: "json",
        toFormat: "invalidFormat"
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Invalid output format');
  });

});
