Key Principles of RESTful API's

1. Client-Server Seperation of responibility:
    - Clear Seperation b/w Client and Server responsibilities.
    - Clients handle user interface, while servers manage data storage and processing.

<!--Ecommerce
Users
Reviews
Products
Bookings
Returns
-->
app.get("/getUser")->app.get("/user")
appget("/reviewOfIphone")->app.get("/review")

2.API's should be statelessness 

3. -GET -> getting data back
    -POST -> Creating resource
    -PATCH -> Update an existing resource
    -DELETE -> Delete resource