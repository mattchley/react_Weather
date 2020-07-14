import axios from "axios";

//methods for interacting with API Auth routes
export default {
   getWeather: (city) =>
      axios({
         method: 'get',
         url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=3a92bc0a0ca29575a3569a00c0268022`,
      })
};
