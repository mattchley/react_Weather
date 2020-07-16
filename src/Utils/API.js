import axios from "axios";

//methods for interacting with API Auth routes
export default {
   getWeather: (city) =>
      axios({
         method: 'get',
         url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=3a92bc0a0ca29575a3569a00c0268022`,
      }),
   getFiveDay: (lat, lon) =>
      axios({
         method: 'get',
         url: `https://api.openweathermap.org/data/2.5/forecast?appid=3a92bc0a0ca29575a3569a00c0268022&&lat=${lat}&lon=${lon}&units=imperial`,
      }),
   getUV: (lat, lon) =>
      axios({
         method: 'get',
         url: `https://api.openweathermap.org/data/2.5/uvi?appid=3a92bc0a0ca29575a3569a00c0268022&lat=${lat}&lon=${lon}`
      })

};
