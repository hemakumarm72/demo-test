const fs = require('fs');
const { ExponentialRegression } = require('ml-regression');

// Example training data
const x = [1, 2, 3, 4, 5];
const y = [2, 4, 6, 8, 10];

// Create an instance of the ExponentialRegression model and train it
const model = new ExponentialRegression(x, y);
model.train();

// Save the model parameters to a file
const saveModel = (model, filePath) => {
  const modelData = {
    A: model.A,
    B: model.B,
  };
  fs.writeFileSync(filePath, JSON.stringify(modelData));
};

// Load the model parameters from the file
const loadModel = (filePath) => {
  const modelData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const loadedModel = new ExponentialRegression();
  loadedModel.A = modelData.A;
  loadedModel.B = modelData.B;
  return loadedModel;
};

// Save the model
const filePath = 'model.json';
saveModel(model, filePath);

// Load the model
const loadedModel = loadModel(filePath);

// Use the loaded model for predictions
const inputData = 10; // Replace with your input value
const predictedValue = loadedModel.predict(inputData);

console.log('Predicted value:', predictedValue);
