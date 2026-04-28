## DevTinder APIs

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
<!-- - POST /request/send/interested/:userId
- POST /request/send/ignored/:userId --> 
<!-- we can use the below dynamic api -->
- POST /request/send/:status/:userId

<!-- - POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId -->
- POST /request/review/:status/:requestId

## userRouter
- GET /user/requests/received
- GET /user/connections
- GET /user/feed - Gets you the profile of other users on platform

- /feed?page=1&limit=10 => first 10 users 1-10
- /feed?page=2&limit=10 => 11-20 users

Status: ignored, interested, accepted, rejected

in mongoDB important functions
.skip() & .limit()

.skip(0) & limit(10) => 1-10 users will took
