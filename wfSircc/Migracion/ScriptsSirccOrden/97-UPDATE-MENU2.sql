UPDATE MENU2 SET POSICION = '18' WHERE MENUID = '695' AND MODULO = 'DTBS4';

Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('674', 'Plantillas', 'Plantillas', '6', 8, 1, '/Plantillas/gPlantillas.aspx', 'DTBS4', 'DTBS4Plantillas', '_self', 'N');

COMMIT;