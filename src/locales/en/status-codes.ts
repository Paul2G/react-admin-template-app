export const statusCodes = {
  100: {
    short: "Continue",
    large:
      "The request has been received and the server is continuing the process.",
  },
  101: {
    short: "Switching Protocols",
    large: "The server is changing protocols based on your request.",
  },
  102: {
    short: "Processing",
    large: "The server has accepted your request and is processing it.",
  },
  103: {
    short: "Early Hints",
    large: "The server is providing early hints for the response.",
  },
  200: {
    short: "OK",
    large:
      "The request was successful, and the server returned the requested data.",
  },
  201: {
    short: "Created",
    large: "The request was successful, and a new resource has been created.",
  },
  202: {
    short: "Accepted",
    large:
      "The request has been accepted for processing, but it's not completed yet.",
  },
  203: {
    short: "Non-Authoritative Information",
    large:
      "The request was successful, but the information may not be from the original source.",
  },
  204: {
    short: "No Content",
    large: "The request was successful, but there is no content to send back.",
  },
  205: {
    short: "Reset Content",
    large: "The request was successful; please reset the view or input fields.",
  },
  206: {
    short: "Partial Content",
    large: "The server is only delivering part of the content requested.",
  },
  207: {
    short: "Multi-Status",
    large:
      "The server is returning multiple status codes for different parts of the request.",
  },
  208: {
    short: "Already Reported",
    large: "The resource was already reported in a previous response.",
  },
  226: {
    short: "IM Used",
    large:
      "The server completed the request, and an instance manipulation was used.",
  },
  300: {
    short: "Multiple Choices",
    large:
      "There are multiple options for the resource, and you may choose one.",
  },
  301: {
    short: "Moved Permanently",
    large: "The requested resource has been moved to a new URL permanently.",
  },
  302: {
    short: "Found",
    large:
      "The requested resource is temporarily available at a different URL.",
  },
  303: {
    short: "See Other",
    large: "Please retrieve the resource from a different URL as specified.",
  },
  304: {
    short: "Not Modified",
    large: "The resource has not changed since the last request.",
  },
  305: {
    short: "Use Proxy",
    large: "The requested resource must be accessed through a proxy.",
  },
  306: {
    short: "Switch Proxy",
    large: "This status code is no longer used but was reserved.",
  },
  307: {
    short: "Temporary Redirect",
    large:
      "The requested resource is temporarily available at a different URL.",
  },
  308: {
    short: "Permanent Redirect",
    large: "The requested resource has permanently moved to a new URL.",
  },
  400: {
    short: "Bad Request",
    large: "The server couldn't understand the request due to invalid syntax.",
  },
  401: {
    short: "Unauthorized",
    large: "Authorization is required for this request.",
  },
  402: {
    short: "Payment Required",
    large: "Payment is required to access the requested resource.",
  },
  403: {
    short: "Forbidden",
    large: "You do not have permission to access this resource.",
  },
  404: {
    short: "Not Found",
    large: "The server couldn't find the requested resource.",
  },
  405: {
    short: "Method Not Allowed",
    large: "The request method is not allowed for this resource.",
  },
  406: {
    short: "Not Acceptable",
    large: "The server can't produce content matching the request.",
  },
  407: {
    short: "Proxy Authentication Required",
    large:
      "Authentication is required to access this resource through a proxy.",
  },
  408: {
    short: "Request Timeout",
    large: "The server timed out waiting for the request.",
  },
  409: {
    short: "Conflict",
    large: "The request couldn't be completed due to a conflict.",
  },
  410: {
    short: "Gone",
    large: "The requested resource is no longer available.",
  },
  411: {
    short: "Length Required",
    large: "The request requires a valid Content-Length header.",
  },
  412: {
    short: "Precondition Failed",
    large: "The server does not meet a precondition specified by the request.",
  },
  413: {
    short: "Payload Too Large",
    large: "The request is larger than the server is willing to process.",
  },
  414: {
    short: "URI Too Long",
    large: "The URI is too long for the server to process.",
  },
  415: {
    short: "Unsupported Media Type",
    large: "The server does not support the request's media type.",
  },
  416: {
    short: "Range Not Satisfiable",
    large: "The range specified in the request is not valid.",
  },
  417: {
    short: "Expectation Failed",
    large: "The server cannot meet the expectations of the request.",
  },
  418: {
    short: "I'm a Teapot",
    large: "The server refuses to brew coffee because it is a teapot.",
  },
  421: {
    short: "Misdirected Request",
    large: "The request was directed to a server unable to produce a response.",
  },
  422: {
    short: "Unprocessable Entity",
    large: "The server cannot process the request due to semantic errors.",
  },
  423: {
    short: "Locked",
    large: "The requested resource is currently locked.",
  },
  424: {
    short: "Failed Dependency",
    large: "The request failed due to a previous request failure.",
  },
  425: {
    short: "Too Early",
    large:
      "The server is unwilling to risk processing the request at this time.",
  },
  426: {
    short: "Upgrade Required",
    large: "The client must upgrade to a different protocol.",
  },
  428: {
    short: "Precondition Required",
    large: "The request requires a precondition to be met.",
  },
  429: {
    short: "Too Many Requests",
    large: "You have sent too many requests in a short time.",
  },
  431: {
    short: "Request Header Fields Too Large",
    large: "The server cannot process the request due to large headers.",
  },
  451: {
    short: "Unavailable For Legal Reasons",
    large: "The requested resource is unavailable due to legal reasons.",
  },
  500: {
    short: "Internal Server Error",
    large: "The server encountered an error and couldn't complete the request.",
  },
  501: {
    short: "Not Implemented",
    large: "The server does not support the requested functionality.",
  },
  502: {
    short: "Bad Gateway",
    large: "The server received an invalid response from an upstream server.",
  },
  503: {
    short: "Service Unavailable",
    large: "The server is currently unavailable (overloaded or down).",
  },
  504: {
    short: "Gateway Timeout",
    large:
      "The server did not receive a timely response from an upstream server.",
  },
  505: {
    short: "HTTP Version Not Supported",
    large: "The server does not support the HTTP protocol version used.",
  },
  506: {
    short: "Variant Also Negotiates",
    large: "The server has an internal configuration error.",
  },
  507: {
    short: "Insufficient Storage",
    large:
      "The server cannot store the representation needed to complete the request.",
  },
  508: {
    short: "Loop Detected",
    large: "The server detected an infinite loop while processing the request.",
  },
  510: {
    short: "Not Extended",
    large: "The server requires further extensions to fulfill the request.",
  },
  511: {
    short: "Network Authentication Required",
    large: "Network authentication is required to access this resource.",
  },
};
