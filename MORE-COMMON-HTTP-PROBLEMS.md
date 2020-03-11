# More Common Http Problems
This document does not map all http codes, but the more common http problems. To see all possibilities for http error codes, see [this document](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes).

## HTTP request failed to respond due to internal server failure
Just as errors can occur unexpectedly within the Front-End, they can happen within the Back-End, and when the Back-End does not know how to deal with it, or when any service that it depends on behaves in an unpredictable way, this error will be thrown. Assuming RestFull, the error code will be 500.

## Http request does not meet the requirements required by the server and is rejected
When the request in the Front-End does not meet any requirement, for example, a header or the format of the model is different from what is expected, then the server will complain with an error. Assuming Restfull, the error code will be 400 (Bad Request) and some variations, like 404 (Not Found), 403 (Forbidden), 405 (Method Not Allowed), 413 (Payload Too Large) etc.

## Business error, something that the user could solve
The business error will be a beautiful message delivered by the server signaling the user what to do, or there will be an error code or other type of signal in the response to the request indicating to the software some behavior, such as a field for typing a document, a password, the redirection to a register, a set of buttons for making a decision, something that diverts the user from that flow so that he completes any previous step necessary for the completion of that operation.
Assuming Restfull and considering that the problem is authentication, the code will be 401 or 419. Considering that it is a conventional business error, there is no standard in the restfull covering, so codes that are not intended for this are used, but fit if their descriptions are interpreted roughly, namely: 402 (Payment Required), 409 (Conflict), 418 (I'm a teapot), 422 (Unprocessable Entity), 451 (Unavailable For Legal Reasons).

## The data delivered by the server is not the data expected by the application
Similar to code 400, but in this case the Front-End rejects the data from the Back-End and not the opposite. As a Front-End validation, there is no Restfull code to cover this problem.

## The server is down, the local machine has no internet or other network problems
These are three different errors, but the normal thing is that they are treated as a single thing and are represented by a single message, which can be a problem in the traceability of the problem.

In Restfull there is no error code established for these, other than the server timeout, which must be answered by error 504.

The JavaScript implementation delivers zero code in the error structure, although this zero code is not specified. The code specified for server timeout is ignored and the zero code will always be delivered.

There are techniques to identify each status, such as consumption of static files unrelated to the API (consuming them successfully signals that there is internet) and making endpoints available without effect that always respond 204 (consuming it successfully signals that the last one operation was a timeout and the server is available).