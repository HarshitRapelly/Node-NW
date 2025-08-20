## HTTP Packet
* Header: metadata about the packet
* Cookies: part of the header
* Body: contains actual data that is being sent


## Cookies 
* Cookies is a client side storage
* It stores the data in the format of `key:value` pairs. These pairs should be of type string.
* Server sends these cookies to client
* On the client side these cookies are stored and mapped to the server that has send the response.
*For next request -> Client will automatically share this cookies with server.


### Learning :
* cookies are used to share some data to the client that server can access later.

## Identification vs Authentication vs Authorization


* Identification: identification is the process of stating or claiming who you are, it is the initial stop where a user asserts an identity, but it doesn't validate the authenticity of the claim.

* Authentication: is the process of verifying whether the claimed identity is valid and accurate. It ensures that the user's identity is genuine before granting access to protected resources or functionalities. usages are:
    * login, otp,biometric
    * web token -> JSON Web Token(JWT) -> creation -> login
                                          validation -> when you want protected data/functionality

    *Constraints -> if every token is user specific -> we have to store all of them.

    -> these should be secure


* Authorization: is the process of determining what actions an authenticated user is permitted to access within a system or application.


## JSON Web Token
JSON web token is build out of 3 components
    * `Payload`: plain text(Identifier of user)
    * `Algorithm`: plain text in the name of algorithm
    * `Signature`: encrypted text build using an algorithm encrypting three texts
        (payload+algo+secret key)
    * secret key is only known by the server