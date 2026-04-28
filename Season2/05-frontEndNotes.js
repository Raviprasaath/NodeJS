/*

Let's take a login api example
in the front end when we call this api, expected is cookies need to store there
but to store the cookies in the browser we need to do few setups

CORS - install in backend  => add middleware to configurations: origin, credentials: true
in front end - when we call the api we need to add this option: withCredentials: true in axios

fetch('https://reqbin.com/echo/get/json', {
  credentials: 'include',
})



##----------- in axios
axios
  .get(
    '/cookie-auth-protected-route',
    { withCredentials: true }
  )
  .then(res => res.data)
  .catch(err => err)




  
*/