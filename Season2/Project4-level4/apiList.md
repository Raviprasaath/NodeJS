#DevTinder APIs

authRouter
- POST /signup
- POST /login
- POST /logout

profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

connectionRequestRouter
<!-- - POST /request/send/interested/:userId
- POST /request/send/ignored/:userId --> 
<!-- we can use the below dynamic api -->
- POST /request/send/:status/:userId

<!-- - POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId -->
- POST /request/review/:status/:requestId


- GET /connections
- GET /requests/received
- GET /feed - Gets you the profile of other users on platform





