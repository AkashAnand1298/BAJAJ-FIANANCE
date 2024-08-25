import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [options, setOptions] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput); // Validate JSON
      const apiResponse = await axios.post('https://your-backend.com/bfhl', parsedInput);
      setResponse(apiResponse.data);
      setError('');
    } catch (e) {
      setError('Invalid JSON format');
    }
  };

  const filterResponse = () => {
    if (!response) return null;
    const selectedOptions = options.map(opt => opt.value);

    let filteredData = {};
    if (selectedOptions.includes('alphabets')) {
      filteredData.alphabets = response.alphabets;
    }
    if (selectedOptions.includes('numbers')) {
      filteredData.numbers = response.numbers;
    }
    if (selectedOptions.includes('highest_lowercase')) {
      filteredData.highest_lowercase = response.highest_lowercase;
    }

    return filteredData;
  };

  const multiSelectOptions = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase', label: 'Highest lowercase alphabet' }
  ];

  return (
    <div>
      <h1>Roll Number</h1>

      <textarea
        placeholder="Enter JSON"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        rows="4"
        cols="50"
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {response && (
        <div>
          <h2>Select Filters</h2>
          <Select
            isMulti
            options={multiSelectOptions}
            onChange={setOptions}
          />

          <h3>Filtered Response:</h3>
          <pre>{JSON.stringify(filterResponse(), null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
