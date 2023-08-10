/* eslint-disable no-unreachable */
const { default: axios } = require("axios");
const dotenv = require("dotenv");
dotenv.config();

exports.handler = async function (event, context, cb) {
  const { id } = event.queryStringParameters;

  if (id) {
    try {
      let product = await axios.get(
        `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/${process.env.AIRTABLE_TABLE}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          },
        }
      );
      product = { id: product.data.id, ...product.data.fields };
      return {
        statusCode: 200,
        body: JSON.stringify(product),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "There was an error",
      };
    }
  }

  return {
    statusCode: 400,
    body: "Please provide product id",
  };
};
