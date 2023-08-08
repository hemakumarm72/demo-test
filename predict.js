const XLSX = require('xlsx');
const { ExponentialRegression } = require('ml-regression');
const fs = require('fs');

// Specify the path to your Excel file
const filePath = './sentosareport.xlsx';

// Read the Excel file
const workbook = XLSX.readFile(filePath);

// Get the first sheet name
const sheetName = workbook.SheetNames[0];

// Get the worksheet
const worksheet = workbook.Sheets[sheetName];

// Convert the worksheet to JSON format
const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
// Prepare the data in the required format for time series analysis
const preparedData = jsonData.map((row) => {
  if (row[0] !== 'date' && row[1] !== 'counts') {
    const [dd, mm, yyyy] = row[0].split('-');
    const date = new Date(`${mm}-${dd}-${yyyy}`);

    return {
      x: date.getTime(),
      y: row[1],
    };
  }
  return {
    x: 1671215400000,
    y: 2,
  };
});

// Extract the input (x) and output (y) arrays
const x = preparedData.map((data) => data.x);
const y = preparedData.map((data) => data.y);

// Create a new Exponential Regression model
const model = new ExponentialRegression(x, y);

// Assuming you have a trained model object named "model"

// Convert the model object to JSON string

// Perform time series forecasting for future values
const inputdata = new Date('2023-06-20').getTime();
const tomorrowValue = model.predict(inputdata);

console.log(`Forecasted value for tomorrow: ${Math.floor(tomorrowValue)}`);
// fs.writeFileSync('./model.json', JSON.stringify(model));

// const { ExponentialRegression } = require('ml-regression');

// // Assuming you have a specific date for forecasting
// const inputDate = '2023-07-09'; // Specify the date in the format 'YYYY-MM-DD'

// // Assuming you have an array of date and count values
// const data = [
//   { date: '2023-04-29', count: 8 },
//   { date: '2023-03-22', count: 3 },
//   // ... Add more date and count values
// ];

// // Prepare the data in the required format for time series analysis
// const preparedData = data.map((entry) => ({
//   x: new Date(entry.date).getTime(),
//   y: entry.count,
// }));

// // Extract the input (x) and output (y) arrays
// const x = preparedData.map((data) => data.x);
// const y = preparedData.map((data) => data.y);

// // Create a new Exponential Regression model
// const model = new ExponentialRegression(x, y);

// // Perform time series forecasting for the input date
// const forecastedValue = model.predict(new Date(inputDate).getTime());

// console.log(`Forecasted value for ${inputDate}: ${forecastedValue}`);

// const modelData = JSON.stringify(model, null, 2);

// // Write the model data to the file
// fs.writeFile('model.json', modelData, (err) => {
//   if (err) {
//     console.error('Error writing model file:', err);
//   } else {
//     console.log('Model file exported successfully.');
//   }
// });

// // Load the model from the file
// const loadedModelData = JSON.parse(fs.readFileSync('./model.json', 'utf8'));
// const loadedModel = new ExponentialRegression(loadedModelData.A, loadedModelData.B);

// // Use the loaded model for predictions
// const inputdata1 = new Date('2023-07-04').getTime();
// const predictedValue = loadedModel.predict(inputdata1);

// console.log('Predicted value:', predictedValue);
