Insert into DT_PARAMETROS
   (ID, NOMBRE, VALOR, DESCRIPCION)
 Values
   (2, 'API_RP', 'http://localhost:8295/api/rp/', 'EndPoints, para la integración con Financiero - RP');
Insert into DT_PARAMETROS
   (ID, NOMBRE, VALOR, DESCRIPCION)
 Values
   (1, 'API_CDP', 'http://localhost:8295/api/cdp/', 'EndPoints, para la integración con Financiero - CDP');
COMMIT;
