import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
  params: {
    q: 'London',
    days: '3'
  },
  headers: {
    'x-rapidapi-key': '',
    'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}

