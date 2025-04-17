export const statusCodes = {
  100: {
    short: "Continuar",
    large:
      "La solicitud ha sido recibida y el servidor continúa con el proceso.",
  },
  101: {
    short: "Cambiando protocolos",
    large: "El servidor está cambiando de protocolo según tu solicitud.",
  },
  102: {
    short: "Procesando",
    large: "El servidor ha aceptado tu solicitud y está procesándola.",
  },
  103: {
    short: "Pistas iniciales",
    large:
      "El servidor está proporcionando pistas iniciales para la respuesta.",
  },
  200: {
    short: "Ok",
    large:
      "La solicitud fue exitosa y el servidor devolvió los datos solicitados.",
  },
  201: {
    short: "Creado",
    large: "La solicitud fue exitosa y se ha creado un nuevo recurso.",
  },
  202: {
    short: "Aceptado",
    large:
      "La solicitud ha sido aceptada para su procesamiento, pero no se ha completado aún.",
  },
  203: {
    short: "Información no autorizada",
    large:
      "La solicitud fue exitosa, pero la información puede no ser del origen original.",
  },
  204: {
    short: "Sin contenido",
    large: "La solicitud fue exitosa, pero no hay contenido que enviar.",
  },
  205: {
    short: "Restablecer contenido",
    large:
      "La solicitud fue exitosa; por favor restablece la vista o los campos de entrada.",
  },
  206: {
    short: "Contenido parcial",
    large:
      "El servidor está entregando solo una parte del contenido solicitado.",
  },
  207: {
    short: "Multi-estado",
    large:
      "El servidor está devolviendo múltiples códigos de estado para diferentes partes de la solicitud.",
  },
  208: {
    short: "Ya reportado",
    large: "El recurso ya fue reportado en una respuesta anterior.",
  },
  226: {
    short: "Im usado",
    large:
      "El servidor completó la solicitud y se usó una manipulación de instancia.",
  },
  300: {
    short: "Múltiples opciones",
    large: "Hay múltiples opciones para el recurso y puedes elegir una.",
  },
  301: {
    short: "Movido permanentemente",
    large:
      "El recurso solicitado ha sido movido a una nueva URL de forma permanente.",
  },
  302: {
    short: "Encontrado",
    large:
      "El recurso solicitado está temporalmente disponible en una URL diferente.",
  },
  303: {
    short: "Ver otro",
    large:
      "Por favor, recupera el recurso desde una URL diferente especificada.",
  },
  304: {
    short: "No modificado",
    large: "El recurso no ha cambiado desde la última solicitud.",
  },
  305: {
    short: "Usar proxy",
    large: "El recurso solicitado debe ser accedido a través de un proxy.",
  },
  306: {
    short: "Cambiar proxy",
    large: "Este código de estado ya no se usa, pero estaba reservado.",
  },
  307: {
    short: "Redirección temporal",
    large:
      "El recurso solicitado está temporalmente disponible en una URL diferente.",
  },
  308: {
    short: "Redirección permanente",
    large:
      "El recurso solicitado se ha movido permanentemente a una nueva URL.",
  },
  400: {
    short: "Solicitud incorrecta",
    large:
      "El servidor no pudo entender la solicitud debido a una sintaxis no válida.",
  },
  401: {
    short: "No autorizado",
    large: "Se requiere autorización para esta solicitud.",
  },
  402: {
    short: "Pago requerido",
    large: "Se requiere un pago para acceder al recurso solicitado.",
  },
  403: {
    short: "Prohibido",
    large: "No tienes permiso para acceder a este recurso.",
  },
  404: {
    short: "No encontrado",
    large: "El servidor no pudo encontrar el recurso solicitado.",
  },
  405: {
    short: "Método no permitido",
    large: "El método de solicitud no está permitido para este recurso.",
  },
  406: {
    short: "No aceptable",
    large:
      "El servidor no puede producir contenido que coincida con la solicitud.",
  },
  407: {
    short: "Autenticación de proxy requerida",
    large:
      "Se requiere autenticación para acceder a este recurso a través de un proxy.",
  },
  408: {
    short: "Tiempo de solicitud excedido",
    large: "El servidor agotó el tiempo de espera para la solicitud.",
  },
  409: {
    short: "Conflicto",
    large: "La solicitud no se pudo completar debido a un conflicto.",
  },
  410: {
    short: "Desaparecido",
    large: "El recurso solicitado ya no está disponible.",
  },
  411: {
    short: "Longitud requerida",
    large: "La solicitud requiere un encabezado Content-Length válido.",
  },
  412: {
    short: "Precondición fallida",
    large:
      "El servidor no cumple una precondición especificada en la solicitud.",
  },
  413: {
    short: "Carga demasiado grande",
    large:
      "La solicitud es mayor de lo que el servidor está dispuesto a procesar.",
  },
  414: {
    short: "Uri demasiado larga",
    large: "La URI es demasiado larga para que el servidor la procese.",
  },
  415: {
    short: "Tipo de medio no soportado",
    large: "El servidor no admite el tipo de medio de la solicitud.",
  },
  416: {
    short: "Rango no satisfactorio",
    large: "El rango especificado en la solicitud no es válido.",
  },
  417: {
    short: "Expectativa fallida",
    large: "El servidor no puede cumplir con las expectativas de la solicitud.",
  },
  418: {
    short: "Soy una tetera",
    large: "El servidor se niega a hacer café porque es una tetera.",
  },
  421: {
    short: "Solicitud mal dirigida",
    large: "La solicitud fue dirigida a un servidor que no puede responder.",
  },
  422: {
    short: "Entidad no procesable",
    large:
      "El servidor no puede procesar la solicitud debido a errores semánticos.",
  },
  423: {
    short: "Bloqueado",
    large: "El recurso solicitado está actualmente bloqueado.",
  },
  424: {
    short: "Dependencia fallida",
    large: "La solicitud falló debido a un fallo en una solicitud anterior.",
  },
  425: {
    short: "Demasiado temprano",
    large:
      "El servidor no está dispuesto a procesar la solicitud en este momento.",
  },
  426: {
    short: "Actualización requerida",
    large: "El cliente debe actualizar a un protocolo diferente.",
  },
  428: {
    short: "Precondición requerida",
    large: "La solicitud requiere que se cumpla una precondición.",
  },
  429: {
    short: "Demasiadas solicitudes",
    large: "Has enviado demasiadas solicitudes en poco tiempo.",
  },
  431: {
    short: "Campos de encabezado de solicitud demasiado grandes",
    large:
      "El servidor no puede procesar la solicitud debido a encabezados grandes.",
  },
  451: {
    short: "No disponible por razones legales",
    large: "El recurso solicitado no está disponible por razones legales.",
  },
  500: {
    short: "Error interno del servidor",
    large: "El servidor encontró un error y no pudo completar la solicitud.",
  },
  501: {
    short: "No implementado",
    large: "El servidor no admite la funcionalidad solicitada.",
  },
  502: {
    short: "Puerta de enlace incorrecta",
    large:
      "El servidor recibió una respuesta no válida de un servidor externo.",
  },
  503: {
    short: "Servicio no disponible",
    large:
      "El servidor está actualmente no disponible (sobrecargado o fuera de servicio).",
  },
  504: {
    short: "Tiempo de espera de la puerta de enlace",
    large:
      "El servidor no recibió una respuesta a tiempo de un servidor externo.",
  },
  505: {
    short: "Versión de http no soportada",
    large: "El servidor no admite la versión del protocolo HTTP usada.",
  },
  506: {
    short: "Variante también negocia",
    large: "El servidor tiene un error de configuración interno.",
  },
  507: {
    short: "Almacenamiento insuficiente",
    large:
      "El servidor no puede almacenar la representación necesaria para completar la solicitud.",
  },
  508: {
    short: "Bucle detectado",
    large:
      "El servidor detectó un bucle infinito mientras procesaba la solicitud.",
  },
  510: {
    short: "No extendido",
    large: "El servidor requiere más extensiones para cumplir la solicitud.",
  },
  511: {
    short: "Autenticación de red requerida",
    large: "Se requiere autenticación de red para acceder a este recurso.",
  },
};
