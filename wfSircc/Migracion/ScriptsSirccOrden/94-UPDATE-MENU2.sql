UPDATE MENU2 SET TITULO = 'Radicación' WHERE MENUID = '305';
UPDATE MENU2 SET TITULO = 'Legalización' WHERE MENUID = '306';
UPDATE MENU2 SET TITULO = 'Gestión' WHERE TITULO = 'Gestion';
UPDATE MENU2 SET TITULO = 'Anulación' WHERE MENUID = '308';
UPDATE MENU2 SET TITULO = 'Modificación Fecha' WHERE MENUID = '311';
UPDATE MENU2 SET TITULO = 'Terminación' WHERE MENUID = '312';
COMMIT;

Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, ICONO, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL, USAP, USBD, FREG, FNOV)
 Values
   ('395', 'Radicación (Estudio Previo)', 'Radicación (Estudio Previo)', '3', 1, 
    NULL, 1, '/Contratos/RadicacionEst/RadicacionEst.aspx', 'CONT4', 'CT_RADEST', 
    '_self', 'N', NULL, NULL, NULL, 
    NULL);
COMMIT;