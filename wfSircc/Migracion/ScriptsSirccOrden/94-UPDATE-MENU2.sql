UPDATE MENU2 SET TITULO = 'Radicaci�n' WHERE MENUID = '305';
UPDATE MENU2 SET TITULO = 'Legalizaci�n' WHERE MENUID = '306';
UPDATE MENU2 SET TITULO = 'Gesti�n' WHERE TITULO = 'Gestion';
UPDATE MENU2 SET TITULO = 'Anulaci�n' WHERE MENUID = '308';
UPDATE MENU2 SET TITULO = 'Modificaci�n Fecha' WHERE MENUID = '311';
UPDATE MENU2 SET TITULO = 'Terminaci�n' WHERE MENUID = '312';
COMMIT;

Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, ICONO, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL, USAP, USBD, FREG, FNOV)
 Values
   ('395', 'Radicaci�n (Estudio Previo)', 'Radicaci�n (Estudio Previo)', '3', 1, 
    NULL, 1, '/Contratos/RadicacionEst/RadicacionEst.aspx', 'CONT4', 'CT_RADEST', 
    '_self', 'N', NULL, NULL, NULL, 
    NULL);
COMMIT;