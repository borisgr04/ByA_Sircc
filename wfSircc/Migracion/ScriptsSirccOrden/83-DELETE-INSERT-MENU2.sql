DELETE FROM MENU_PERFIL;
COMMIT;
DELETE FROM MENU2;
COMMIT;

Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, MODULO, ROLES, PPAL)
 Values
   ('1', 'Solicitudes', 'Gestion de Solicitudes', '1', 1, 1, 'PREC', 'SOLICITUDES', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('105', 'Solicitudes', 'Nuevas Solicitudes, Reabrir Solicitudes', '1', 1, 1, 'Solicitudes/NuevaSolicitud/NuevaSolicitud.aspx', 'PREC', 'PROCNuevaSolicitud', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('110', 'Asignaciones', 'Asignar y ReAsinar Solicitudes', '1', 1, 1, 'Solicitudes/Asignaciones/Asignaciones.aspx', 'PREC', 'PROCAsignacionesSolicitudes', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('115', 'Solicitudes a Cargo', 'Recibir Solicitudes, Solicitudes a Cargo', '1', 1, 1, 'Solicitudes/Recibido/Recibido.aspx', 'PREC', 'PROCRecibido', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('120', 'Revisión', 'Revisar Solicitudes', '1', 1, 1, 'Solicitudes/ReporteRevision/ReporteRevision.aspx', 'PREC', 'PROCRevision', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('125', 'Modificar', 'Modificacion de Solicitudes', '1', 1, 1, 'Solicitudes/ModSolicitud/ModSolicitud.aspx', 'PREC', 'PROCModificarSolicitudes', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, MODULO, ROLES, PPAL, USAP, USBD, FREG, FNOV)
 Values
   ('2', 'Procesos', 'Terminos de Referencias <br> y Pliego de Condicion', '2', 1, 1, 'PREC', 'PROCESOS', 'N', 'admin', 'SIRCC', TO_DATE('01/12/2010 20:37:16', 'MM/DD/YYYY HH24:MI:SS'), TO_DATE('01/12/2010 20:37:55', 'MM/DD/YYYY HH24:MI:SS'));
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, MODULO, ROLES, TARGET, PPAL)
 Values
   ('2', 'Supervisión', '.', '2', 1, 1, 'SUPV4', 'SP', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, MODULO, ROLES, TARGET, PPAL)
 Values
   ('2', 'Administración', '.', '2', 1, 1, 'ADMI4', 'ADMI4', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, MODULO, ROLES, PPAL)
 Values
   ('2', 'Modificaciones', 'Modificaciones a Contratos', '2', 1, 1, 'CONT', 'MODIFICACIONES', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, MODULO, ROLES, TARGET, PPAL)
 Values
   ('205', 'Designaciones', '.', '2', 3, 1, 'SUPV4', 'SP_DESIG', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('205', 'Solicitudes', 'Nuevas Solicitudes, Reabrir Solicitudes', '2', 1, 1, 'Modificaciones/Solicitud/Solicitud.aspx', 'CONT', 'CONTNuevaSolicitud', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('205', 'Seguridad', '.', '2', 3, 1, '/Seguridad/gesUsuarios.aspx', 'ADMI4', 'AD_SEC_USUARIO', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL, USAP, USBD, FNOV)
 Values
   ('205', 'Crear Procesos', 'Crear nuevos procesos a contratar', '2', 1, 1, 'Procesos/NuevoProceso/NuevoProceso.aspx', 'PREC', 'PROCNuevoProceso', 'N', 'admin', 'SIRCC', TO_DATE('09/27/2010 16:02:59', 'MM/DD/YYYY HH24:MI:SS'));
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('208', 'Supervisores', '.', '2', 5, 1, '/ContratosGestion/Supervisor/GesContratos.aspx', 'SUPV4', 'SP_SUPER', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('210', 'Asignaciones', 'Asignar y ReAsinar Solicitudes', '2', 1, 1, 'Modificaciones/Asignar/Asignaciones.aspx', 'CONT', 'CONTAsignarSol', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('210', 'Asignaciones', 'Asignar y Reasignar Procesos a Funcionarios', '2', 1, 1, 'Procesos/Asignaciones/Asignaciones.aspx', 'PREC', 'PROCAsignar', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('211', 'Contratista', '.', '2', 7, 1, '/ContratosGestion/Contratista/GesContratos.aspx', 'SUPV4', 'SP_CTIST', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('214', 'Contabilidad', '.', '2', 10, 1, '/ControlPagos/Contabilidad/PanelCT.aspx', 'SUPV4', 'SP_CONT', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('215', 'Solicitudes a Cargo', 'Recibir Solicitudes, Todas las soliciutes a cargo', '2', 1, 1, 'Modificaciones/Recibir/RecibirSol.aspx', 'CONT', 'CONTRecibirSol', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('215', 'Cronograma', 'Programar Cronograma', '2', 1, 1, 'Procesos/Programacion/Programacion.aspx', 'PREC', 'PROCProgramacion', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('215', 'Tesoreria', '.', '2', 13, 1, '/ControlPagos/Tesoreria/RecDocumentos.aspx', 'SUPV4', 'SP_TESO', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('220', 'Datos del Proceso', 'Registro de Datos del Proceso Contractual', '2', 1, 1, 'Procesos/DBProcesos/DBProcesos.aspx', 'PREC', 'PROCDatosGenerales', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('220', 'Revisión', 'Revisar Solicitudes', '2', 1, 1, 'Modificaciones/Revisar/ReporteRevision.aspx', 'CONT', 'CONTRevisarSol', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('221', 'Datos de la Modificación', 'Modificar Información de Contratos', '2', 1, 1, 'Modificaciones/DBModificacion/DBModificacion.aspx', 'CONT', 'MODDBModificacion', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('225', 'Modificar', 'Modificacion de Solicitudes', '2', 1, 1, 'Modificaciones/Modificar/Modificar.aspx', 'CONT', 'CONTModificarSol', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('230', 'Proponentes', 'Registro de Proponentes', '2', 1, 0, 'Procesos/Proponentes/Proponentes.aspx', 'PREC', 'PROCProponentes', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('235', 'Radicacion', 'Radicar Modificaciones y/o Adiciones a Contratos', '2', 1, 1, 'Modificaciones/Radicacion/Radicacion.aspx', 'CONT', 'CONTRadicarSol', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('240', 'Adjudicación', 'Adjudicación del Contrato', '2', 1, 0, 'Procesos/Adjudicacion/Adjudicacion.aspx', 'PREC', 'PROCAdjudicacion', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('245', 'Radicacion', 'Radicacion Automatica de Procesos', '2', 1, 0, 'Procesos/RadicarProc/PRadicacion.aspx', 'PREC', 'PROCPRadicacion', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL, USAP, USBD, FNOV)
 Values
   ('250', 'Datos del Contrato', 'Gestionar Subprocesos', '2', 1, 1, 'Procesos/GProcesosN/GProcesosN.aspx', 'PREC', 'PROCGProcesosN', 'N', 'admin', 'SIRCC', TO_DATE('09/27/2010 16:02:59', 'MM/DD/YYYY HH24:MI:SS'));
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('255', 'Proponentes', 'Registro de Proponentes a SubProcesos', '2', 1, 1, 'Procesos/GPProponentes/GPProponentes.aspx', 'PREC', 'PROGProponentes', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('260', 'Adjudicacion', 'Adjudicacion de SubProcesos', '2', 1, 1, 'Procesos/GAdjudicacion/GAdjudicacion.aspx', 'PREC', 'PROCGAdjudicacion', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('265', 'Anular Proceso', 'Anular Procesos', '2', 1, 1, 'Procesos/An_Proceso/An_Proceso.aspx', 'PREC', 'PROCAnular', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('265', 'Radicacion Automatica', 'Radicacion de Procesos Precontractuales', '3', 1, 1, 'Contratos/GRadicacion/GPRadicacion.aspx', 'CONT', 'PROCGRadicacion', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, MODULO, ROLES, TARGET, PPAL)
 Values
   ('3', 'Contratos', '.', '3', 1, 1, 'CONT4', 'CT', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, MODULO, ROLES, PPAL)
 Values
   ('3', 'Reportes', 'Reportes en PDF,XLS y DOC', '3', 1, 1, 'PREC', 'PROCReport', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('3', 'Contratos', 'Radicación y Control', '3', 1, 1, '-', 'CONT', 'CONTContratos', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('305', 'Radicación', 'Númeración y creación del Contrato', '3', 1, 1, 'Contratos/Radicacionm/Radicacionm.aspx', 'CONT', 'CONTRadicacion', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('305', 'Cronograma', 'Cronograma del Proceso Contractual', '3', 1, 1, 'Reportes/PCronogramasG/PCronogramasG.aspx', 'PREC', 'PROCRptCrono01', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('305', 'Radicacion', 'Radicar Contratos', '3', 1, 1, '/Contratos/Radicacion/Radicacion.aspx', 'CONT4', 'CT_RAD', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('306', 'Legalizacion', 'Legalizar Contratos', '3', 2, 1, '/Contratos/Legalizacion/Legalizacion.aspx', 'CONT4', 'CT_LEG', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('307', 'Asignar ', 'Asignar Contratos/Convenios', '3', 1, 1, 'Contratos/Asignar/Asignaciones.aspx', 'CONT', 'CONTAsignaciones', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('307
', 'Adiciones', 'Adicionar Contratos', '3', 3, 1, '/Contratos/Adiciones/Modificatorios.aspx', 'CONT4', 'CT_ADI', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('308', 'Anulacion', 'Anular Contratos', '3', 6, 1, '/Contratos/Anulacion/Anulacion.aspx', 'CONT4', 'CT_ANU', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('309', 'Cesiones', 'Cesiones Contratos', '3', 7, 1, '/Contratos/Cesiones/Cesiones.aspx', 'CONT4', 'CT_CES', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('310', 'Legalización', 'Rp, Polizas e Impuestos', '3', 1, 1, 'Contratos/Legalizacion/Legalizacion.aspx', 'CONT', 'CONTLegalizacion', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('310
', 'Gestion', 'Gestion Contratos', '3', 5, 1, '/Contratos/Gestion/Gestion.aspx', 'CONT4', 'CT_GES', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('311', 'ModFecha', 'Modificacion de Fecha al Contrato', '3', 8, 1, '/Contratos/ModFecha/ModFecha.aspx', 'CONT4', 'CT_MOD', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('312', 'Terminacion', 'Terminacion Contratos', '3', 9, 1, '/Contratos/Terminacion/Terminacion.aspx', 'CONT4', 'CT_TER', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('315', 'Legalización CA', 'Rp, Polizas e Impuestos de Contratos Automaticos', '3', 1, 1, 'Contratos/LegalizacionN/LegalizacionN.aspx', 'CONT', 'CONTLegalizacionN', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('320', 'Modificatorios', 'Adiciones,Modificatorios,Aclaratoris,Prorrogas,..', '3', 1, 1, 'Contratos/Adiciones/Adiciones.aspx', 'CONT', 'CONTAdiciones', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('325', 'Gestión', 'Registro de Actas/Informes de Interventorias', '3', 1, 1, 'Contratos/GesContratos/CGesContratos.aspx', 'CONT', 'CONTGestion', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('330', 'Cesiones', 'Registro de Cesiones', '3', 1, 1, 'Contratos/Cesiones/Cesiones.aspx', 'CONT', 'CONTCesiones', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('335', 'Documentos', 'Cargue de Documentos', '3', 1, 1, 'Contratos/Documentos/Documentos.aspx', 'CONT', 'CONTDocumentos', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('340', 'Anulación', 'Registro de Anulación', '3', 1, 1, 'Contratos/AnuContratos/AnuContratos.aspx', 'CONT', 'CONTAnulacion', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('345', 'Mod. Fecha Suscripción', 'Modificar Fecha de Suscripción', '3', 1, 1, 'Contratos/EdContratos/EdContratos.aspx', 'CONT', 'CONTEdFS', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('346', 'Terminacion de Contrato', 'Registro de Terminacion', '3', 1, 1, 'Contratos/TerminarContratos/TerminarContratos.aspx', 'CONT', 'ContTerminar', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, MODULO, ROLES, PPAL)
 Values
   ('4', 'Consultas', 'Consultas de Procesos', '4', 1, 1, 'PREC', 'PROCConsultras', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('4', 'Reportes', 'Reportes, Exportables a PDF, Word y Excel', '4', 1, 1, '-', 'CONT', 'CONTReportes', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('405', 'Cronograma', 'Cronograma por Dep. Necesidad', '4', 1, 1, 'Consultas/CronogramasDepN/CronogramasDepN.aspx', 'PREC', 'PROCConCronoNec', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('405', 'Parametrizado', 'Filtrar Información Contractual', '4', 1, 1, 'Reportes/Parametrizado/Parametrizado.aspx', 'CONT', 'CONTParametrizado', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('407', 'Panel de Procesos', 'Procesos y Cronogramas', '4', 1, 1, 'Reportes/PanelProcesos/PanelReporte.aspx', 'PREC', 'PROCPanelRpt', '_blank', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('407', 'Parametrizado (beta)', 'Información Báscia', '4', 1, 1, 'Reportes/ParametrizadoB/Parametrizado.aspx', 'CONT', 'CONTParametrizadoB', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('410', 'Parametrizado x Rubros', 'Filtrar Información Contractual', '4', 1, 1, 'Reportes/ParametrizadoR/Parametrizado.aspx', 'CONT', 'CONTParametrizadoR', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('410', 'Cronograma - Delegaciones', 'Cronograma Delegaciones', '4', 1, 1, 'Consultas/CronogramasDepP/CronogramasDepP.aspx', 'PREC', 'PROCConCronoP', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('411', 'Informe Adicones', 'Informe Adicones', '4', 1, 1, 'Informes4/Adiciones/InfAdicones.aspx', 'CONT', 'CONTADI', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL, USAP, USBD, FREG, FNOV)
 Values
   ('415', 'Oficios', 'Oficios', '4', 1, 1, 'Contratos/GDocumentos/OficiosGral.aspx', 'CONT', 'CONTEdFS', 'N', '12345-1', 'ADMIN', TO_DATE('02/20/2014 14:51:08', 'MM/DD/YYYY HH24:MI:SS'), TO_DATE('02/20/2014 14:51:08', 'MM/DD/YYYY HH24:MI:SS'));
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('415', 'Cronograma - Encargado', 'Cronograma por Encargado', '4', 1, 1, 'Consultas/CronogramasEnc/CronogramasEnc.aspx', 'PREC', 'PROCConCronoE', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL, USAP, USBD, FREG, FNOV)
 Values
   ('420', 'Oficios Modificatorios', 'Oficios Modificatorios', '4', 1, 1, 'Contratos/GDocumentos/OficiosAdiciones.aspx', 'CONT', 'CONTEdFS', 'N', '12345-1', 'ADMIN', TO_DATE('09/10/2014 10:42:08', 'MM/DD/YYYY HH24:MI:SS'), TO_DATE('09/10/2014 10:42:08', 'MM/DD/YYYY HH24:MI:SS'));
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('420', 'Avisos', 'Avisos', '4', 1, 1, 'Consultas/AvisosAct/AvisosAct.aspx', 'PREC', 'PROCConAvisos', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('421', 'Avisos x Dependencia', 'Avisos', '4', 1, 1, 'Consultas/AvisosActD/AvisosActD.aspx', 'PREC', 'PROCConAvisosD', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('423', 'Dependencias', 'Consulta de Solicitudes', '424', 1, 1, 'Consultas/SolicitudesDepN/SolicitudesDepN.aspx', 'PREC', 'PROCSolicitudesDepN', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, MODULO, ROLES, PPAL)
 Values
   ('424', 'Solicitudes', 'Consulta de Solicitudes', '4', 1, 1, 'PREC', 'SOLICITUDES', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('425', 'Delegaciones', 'Consulta de Solicitudes', '424', 1, 1, 'Consultas/SolicitudesCord/SolicitudesCord.aspx', 'PREC', 'PROCSolicitudesCord', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('430', 'Usuario Encargado', 'Consulta de Solicitudes', '424', 1, 1, 'Consultas/SolicitudesEnc/SolicitudesEnc.aspx', 'PREC', 'PROCSolicitudesEnc', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('433', 'Dependencias', 'Consulta de Procesos', '434', 1, 1, 'Consultas/PContratosDepN/PContratosDepN.aspx', 'PREC', 'PROCPContratosDepN', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, MODULO, ROLES, PPAL)
 Values
   ('434', 'Procesos', 'Consulta de Procesos', '4', 1, 1, 'PREC', 'PROCESOS', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('435', 'Delegaciones', 'Consulta de Procesos', '434', 1, 1, 'Consultas/PContratosCord/PContratosCord.aspx', 'PREC', 'PROCPContratosCord', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, MODULO, ROLES, PPAL)
 Values
   ('439', 'Historial de Revisiones', 'Consultar Historial de Revisión de Solicitudes', '4', 1, 1, 'PREC', 'HISTORIALREV', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('440', 'Certificaciones', 'Certificaciones Contractuales', '4', 1, 1, 'Reportes/Certificados/Certificados.aspx', 'CONT', 'CONTCertificados', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('440', 'Delegaciones', 'Consultar Historial de Revisión de una Solicitud', '439', 1, 1, 'Consultas/HrevSol/HrevSol.aspx', 'PREC', 'PROCHrevSolCord', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('445', 'Usuario Encargado', 'Consulta de Procesos', '434', 1, 1, 'Consultas/PContratosEnc/PContratosEnc.aspx', 'PREC', 'PROCPContratosEnc', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('450', 'Dinámico', 'Campos, Filtro y Consolidados Dinámicos,', '4', 1, 1, 'Reportes/Dinamico/RptDinamico.aspx', 'CONT', 'CONTrptdinamico', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('450', 'Usuario Encargado', 'Consultar Historial de Revisión de una Solicitud', '439', 1, 1, 'Consultas/HrevSolenc/HrevSolEnc.aspx', 'PREC', 'PROCHrevSolEnc', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, MODULO, ROLES, PPAL)
 Values
   ('455', 'Procesos1', 'Consulta de Procesos', '4', 1, 1, 'PREC', 'PROCESOS1', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('460', 'Alertas Contratos', 'Vencimientos, ', '4', 1, 1, 'Reportes/Alert_Contratos/Alert_Contratos.aspx', 'CONT', 'CONTRptAlertCont', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('465', 'Estadisticas CDP ', 'Estadisticas por CDP', '4', 1, 1, 'Reportes/Estadisticas/Estadisticas.aspx', 'CONT', 'CONTEstad', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('469', 'Informe', 'Consulta de Procesos Vigentes en el Periodo', '455', 1, 1, 'Consultas/PContratosInf/PContratosInf.aspx', 'PREC', 'PROCPContratosInf', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, MODULO, ROLES, PPAL)
 Values
   ('470', 'Consolidados x Mes', 'Dependencias, Modalidad, Clase', '4', 1, 1, 'CONT', 'CONTConsMes', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('475', 'x Dependencia', 'Consolidado Mensual', '470', 1, 1, 'Reportes/Mes/MesDep/ReportPMesDep.aspx', 'CONT', 'CONTConsMes', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('480', 'x Dependencia y Clase', 'Consolidado Mensual', '470', 1, 1, 'Reportes/Mes/MesDepClas/ReportPMesDepClas.aspx', 'CONT', 'CONTConsMes', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('485', 'x Dependencia y Modalidad', 'Consolidado Mensual', '470', 1, 1, 'Reportes/Mes/MesDepMod/ReportPMesDepMod.aspx', 'CONT', 'CONTConsMes', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('490', 'F18', 'Informes del F18 - DNP', '4', 1, 1, 'Reportes/Dnp/F18/F18.aspx', 'CONT', 'CONTF18', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('495', 'FUT', 'Informes del FUT - DNP', '4', 1, 1, 'Reportes/Dnp/Fut/Fut.aspx', 'CONT', 'CONTFUT', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('496', 'Informe Sireci', 'Informe Sireci', '4', 1, 1, 'Informes4/Sireci/RptSireci.aspx', 'CONT', 'CONTSIRECI', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, MODULO, ROLES, PPAL)
 Values
   ('5', 'Consultas', 'Consultas de Información Contractual', '5', 1, 1, 'CONT', 'CONTConsultas', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, ICONO, HABILITADO, MODULO, ROLES, TARGET, PPAL)
 Values
   ('5', 'Solicitudes', 'Gestión de Solicitudes', '5', 1, 'icon-dashboard', 1, 'SOLI4', 'SOLI4', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, MODULO, ROLES, TARGET, PPAL)
 Values
   ('5', 'Estudios Previos', 'Gestión de Estudios Previos', '5', 1, 1, 'ESPR4', 'EP_CREAR', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, ICONO, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('503', 'Delegación', 'En blanco', '5', 3, 'icon-dashboard', 1, '/Solicitudes/Registro/gesSolicitudes.aspx', 'SOLI4', 'PR_RECEP', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('503', 'Elaborar', 'Crear y Editar Estudios Previos', '5', 3, 1, '/EstPrev/Elaborar/rgEstPrev1.aspx', 'ESPR4', 'EP_CREAR', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('505', 'Consolidados', 'Consulta de Información Consolidada', '5', 1, 1, 'Consultas/Consolidados/Consolidados.aspx', 'CONT', 'CONTConsolidadas', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('505', 'Revisar', 'Revisión de Estudios Previos', '5', 5, 1, '/EstPrev/Revision/revEstPrev.aspx', 'ESPR4', 'EP_REVISAR', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, ICONO, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('507', 'Gestión', 'Gestión de Mis Solicitudes', '5', 7, 'icon-dashboard', 1, '/Solicitudes/Gestion/gesMisSolicitudes.aspx', 'SOLI4', 'PR_GEST', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('508', 'Aprobar', 'Aprobación de Estudios Previos', '5', 8, 1, '/EstPrev/Aprobacion/aprEstPrev.aspx', 'ESPR4', 'EP_APROBAR', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, ICONO, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('509', 'Consultas', 'Consultas', '5', 9, 'icon-dashboard', 1, '/Solicitudes/ConsultasT/PanelConsT.aspx', 'SOLI4', 'PR_CONS', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('510', 'Consultar', 'Consulta de Estudios Previos', '5', 10, 1, '/EstPrev/Consulta/GesEstPrev.aspx', 'ESPR4', 'EP_CONSULTAR', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('510', 'Verificación de RP', 'Consulta para Verificación de Rp', '5', 1, 1, '/EstPrev/Consulta/GesEstPrev.aspx', 'CONT', 'CONTCompararRp', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('515', 'Contratos', 'Consulta detallada del Contrato', '5', 1, 1, 'Consultas/Contratos/Contratos.aspx', 'CONT', 'CONTConContratos', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('520', 'Contratos x Proyecto', 'Consulta Contratos por Proyecs', '5', 1, 1, 'Consultas/ContratosSGR/ContratosxProy.aspx', 'CONT', 'CONTConContratosSGR', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('522', 'Contraloria Departamental F19', 'Reporte F19 de la Contraloria', '4', 1, 1, 'Consultas/Contraloria/Formato19/ParametrizadoF19.aspx', 'CONT', 'CONTF19', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('525', 'Contraloria Departamental F20', 'Reporte F20 de la Contraloria', '4', 1, 1, 'Informes4/SIAF20/SiaF20.aspx', 'CONT', 'CONTF20', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('530', 'Contratista', 'Información Basica del Contratista', '5', 1, 1, 'Consultas/ConContratista/ConContratista.aspx', 'CONT', 'CONTConContratista', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('535', 'Auditoria de Gestión', 'Auditoria de Gestión Contractual', '5', 1, 1, 'Consultas/Auditoria/Auditoria.aspx', 'CONT', 'CONTAUD', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('540', 'Consulta x RP', 'Consulta x Rp', '5', 1, 1, 'Consultas/ConsxRp/ConsxRp.aspx', 'CONT', 'CONTConsxRp', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('545', 'Verificación de Actas/Informes', 'Consulta de Verificación de Actas', '5', 1, 1, 'CGestion/VerActas/VerActas.aspx', 'CONT', 'CONTVERACTAS', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL, USAP, USBD, FNOV)
 Values
   ('6', 'Datos Básicos', '-', '6', 1, 1, '-', 'PREC', 'PROCDatosBasicos', 'N', '12345-1', 'DERWEB', TO_DATE('01/06/2010 14:47:33', 'MM/DD/YYYY HH24:MI:SS'));
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL, USAP, USBD, FNOV)
 Values
   ('6', 'Datos Básicos', 'Parametrización de Datos Básicos', '6', 1, 1, 'Configuración de Tablas Básicas', 'CONT', 'CONTDatosBasicos', 'N', '12345-1', 'DERWEB', TO_DATE('01/06/2010 14:47:33', 'MM/DD/YYYY HH24:MI:SS'));
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('605', 'Minutas', 'Plantilla de Minutas', '6', 1, 1, 'DatosBasicos/Minutas/Minutas.aspx', 'PREC', 'PROCMinutas', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('605', 'Entidad', 'Datos de la Entidad', '6', 1, 1, 'DatosBasicos/Entidad/Entidad.aspx', 'CONT', 'CONTEntidad', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('610', 'Actividades', 'Crear Actividades', '6', 1, 1, 'DatosBasicos/PActividades/PActividades.aspx', 'PREC', 'PROCPActividades', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('610', 'Dependencias', 'Dependencias', '612', 1, 1, 'DatosBasicos/Dependencias/Dependencias.aspx', 'CONT', 'CONTDependencias', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, MODULO, ROLES, PPAL)
 Values
   ('612', 'Dependencias', 'Gestión de Dependencias', '6', 1, 1, 'CONT', 'DBDependencias', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('615', 'Consecutivos', 'Crear Consecutivos para Procesos', '6', 1, 1, 'DatosBasicos/PConsProc/PConsProc.aspx', 'PREC', 'PROCPCons_Proc', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, MODULO, ROLES, PPAL)
 Values
   ('615', 'Contratos', 'Datos Básicos Para Contratos', '6', 1, 1, 'CONT', 'DBContratos', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, MODULO, ROLES, PPAL)
 Values
   ('617', 'Legalización', 'Datos Básicos', '6', 1, 1, 'CONT', 'DBLegalizacion', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('620', 'Estado de Actividades', 'Estados de Actividades', '6', 1, 1, 'DatosBasicos/PEstadosAct/PEstadosAct.aspx', 'PREC', 'PROCEstadosAct', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('620', 'Terceros', 'Terceros', '6', 1, 1, 'DatosBasicos/Terceros/Terceros.aspx', 'CONT', 'CONTTerceros', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('622', 'Alertas Informes', 'Configurar Recordatorios', '6', 1, 1, 'DatosBasicos/Alertas/AlertasInf.aspx', 'CONT', 'CONTAlertasInf', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, MODULO, ROLES, PPAL)
 Values
   ('624', 'Documentos', 'Datos Báscios', '6', 1, 1, 'CONT', 'DBDocumentos', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('630', 'Delegaciones', 'Dependencias delegadas', '612', 1, 1, 'DatosBasicos/DependenciasD/DependenciasD.aspx', 'CONT', 'CONTDelegaciones', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('635', 'Tipos de Contratos', 'Tipos de Contratos', '6', 12, 1, '/DatosBasicosG/TiposContratos/gTiposContratos.aspx', 'DTBS4', 'DBES4TiposCont', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL, FNOV)
 Values
   ('638', 'Tipos Documentos', 'Tipos Documentos', '6', 14, 1, '/DatosBasicosG/TiposDocumentos/gTiposDocumentos.aspx', 'DTBS4', 'DTBS4TipDocumento', '_self', 'N', TO_DATE('05/29/2015 00:00:00', 'MM/DD/YYYY HH24:MI:SS'));
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('640', 'Aseguradoras', 'Aseguradoras', '6', 1, 1, '/DatosBasicosG/Aseguradoras/gAseguradoras.aspx', 'DTBS4', 'DBES4Aseguradoras', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('645', 'Contrato por Vigencia', 'Consecutivo Contrato por Vigencia', '6', 2, 1, '/DatosBasicosG/ConsecutivoContratosPorVigencias/gConsecutivoContratosPorVigencias.aspx', 'DTBS4', 'DTBS4ConConVig', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('645', 'Subtipos de Contratos', 'Subtipos de Contratos', '615', 1, 1, 'DatosBasicos/SubtiposCont/SubtiposCont.aspx', 'CONT', 'CONTSubtiposCont', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('650', 'Con. por Modalidad', 'Consecutivo por modalidad', '6', 3, 1, '/DatosBasicosG/ConsecutivoPorModalidad/gConsecutivoPorModalidad.aspx', 'DTBS4', 'DTBS4ConMod', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('655', 'Dependencias', 'Dependencias', '6', 4, 1, '/DatosBasicosG/Dependencias/gDependencias.aspx', 'DTBS4', 'DTBS4Dependencias', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('655', 'Aseguradoras', 'Aseguradoras', '617', 1, 1, 'DatosBasicos/Aseguradoras/Aseguradoras.aspx', 'CONT', 'CONTAseguradoras', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('656', 'Proyectos', 'Proyectos', '6', 1, 1, 'DatosBasicos/Proyectos/Proyectos.aspx', 'CONT', 'CONTProyectos', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('660', 'Etapas', 'Etapas', '6', 5, 1, '/DatosBasicosG/Etapas/gEtapas.aspx', 'DTBS4', 'DTBS4Etapas', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL, FNOV)
 Values
   ('665', 'Modalidades', 'Modalidades', '6', 6, 1, '/DatosBasicosG/Modalidades/gModalidades.aspx', 'DTBS4', 'DTBS4Modalidades', '_self', 'N', TO_DATE('10/26/1901 00:00:00', 'MM/DD/YYYY HH24:MI:SS'));
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('665', 'Polizas', 'Polizas', '617', 1, 1, 'DatosBasicos/Polizas/Polizas.aspx', 'CONT', 'CONTPolizas', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL, FNOV)
 Values
   ('670', 'Mod. Tipo Plantilla', 'Modalidad por Tipo de Plantilla', '6', 7, 1, '/DatosBasicosG/ModalidadesPorTipoPlantilla/ModalidadesTipoPlantilla.aspx', 'DTBS4', 'DTBS4ModTipPla', '_self', 'N', TO_DATE('10/31/1901 00:00:00', 'MM/DD/YYYY HH24:MI:SS'));
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('670', 'Sectores', 'Sectores', '615', 1, 1, 'DatosBasicos/Sector/Sector.aspx', 'CONT', 'CONTSector', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('675', 'Polizas', 'Polizas', '6', 8, 1, '/DatosBasicosG/Polizas/gPolizas.aspx', 'DTBS4', 'DTBS4Polizas', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('675', 'Consorcios', 'Configurar Consorcios', '6', 1, 1, 'DatosBasicos/Consorcios/Consorcios.aspx', 'CONT', 'CONTConsorcios', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL, FNOV)
 Values
   ('680', 'Proyectos', 'Gestion de proyectos', '6', 9, 1, '/DatosBasicosG/Proyectos/GesProyectos.aspx', 'DTBS4', 'DTBS4Proyectos', '_self', 'N', TO_DATE('11/10/1901 00:00:00', 'MM/DD/YYYY HH24:MI:SS'));
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('680', 'Tipos de Procesos', 'Tipos de Procesos', '615', 1, 1, 'DatosBasicos/TiposProc/TiposProc.aspx', 'CONT', 'CONTTiposProc', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('683', 'Plantillas', 'Contratos, Certificaciones (*.Doc)', '6', 1, 1, 'DatosBasicos/PPlantillas/PPlantillas.aspx', 'CONT', 'DBPPlantillas', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('685', 'Subtipos Contratos', 'Subtipos contratos', '6', 10, 1, '/DatosBasicosG/SubTiposContratos/gSubTiposContratos.aspx', 'DTBS4', 'DTBS4SubTiposCon', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('690', 'Etapas', 'Etapas', '624', 1, 1, 'DatosBasicos/Etapas/Etapas.aspx', 'CONT', 'CONTEtapas', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('690', 'Terceros', 'Terceros', '6', 11, 1, '/DatosBasicosG/Terceros/gTerceros.aspx', 'DTBS4', 'DTBS4Terceros', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('691', 'Impuesto', 'Impuesto', '617', 1, 1, 'DatosBasicos/Impuestos/Impuestos.aspx', 'CONT', 'CONTImpuestos', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('692', 'Calculo de Polizas', 'Configuracion de Datos para Calcular Polizas', '617', 1, 1, 'DatosBasicos/CalcularPol/CalcularPol.aspx', 'CONT', 'CONTCalculoPol', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('694', 'Consecutivos de Contratos', 'Consecutivos de Contratos', '6', 1, 1, 'DatosBasicos/NroConVig/NroConVig.aspx', 'CONT', 'CONTNroconvig', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('695', 'Tipos de Documentos', 'Tipos de Documentos', '624', 1, 1, 'DatosBasicos/Tip_Doc/Tip_Doc.aspx', 'CONT', 'CONTTipDoc', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL)
 Values
   ('695', 'Vigencias', 'Vigencias', '6', 13, 1, '/DatosBasicosG/Vigencias/gVigencias.aspx', 'DTBS4', 'DTBS4Vigencias', '_self', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('696', 'Vigencias', 'Vigencias', '6', 1, 1, 'DatosBasicos/Vigencias/Vigencias.aspx', 'CONT', 'CONTVigencias', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('697', 'Regiones', 'Municipios y/o Corregimientos', '615', 1, 1, 'DatosBasicos/Regiones/Regiones.aspx', 'CONT', 'CONTRegiones', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL, USAP, USBD, FNOV)
 Values
   ('7', 'Administración', 'Seguridad y Configuración', '7', 2, 1, '-', 'CONT', 'CONTConfiguracion', 'N', '12345-1', 'DERWEB', TO_DATE('01/06/2010 14:51:08', 'MM/DD/YYYY HH24:MI:SS'));
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL, USAP, USBD, FNOV)
 Values
   ('705', 'Autorizaciones', 'Administración de Roles', '7', 2, 1, 'Seguridad/Roles/Admin.aspx', 'CONT', 'CONTAutorizaciones', 'N', 'admin', 'DERWEB', TO_DATE('01/12/2010 21:31:04', 'MM/DD/YYYY HH24:MI:SS'));
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('720', 'Usuarios', 'Administración de Usuarios', '7', 2, 1, 'Seguridad/Usuarios/RegUsuarios.aspx', 'CONT', 'CONTUsuarios', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('725', 'Forzar Contraseña', 'Cambio de Contraseña del Administrador', '7', 2, 1, 'Seguridad/FClave/CambCont_us.aspx', 'CONT', 'CONTForzarPass', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('730', 'Cambio Contraseña', 'Cambiar Contraseña', '7', 2, 1, 'Seguridad/Password/Change.aspx', 'CONT', 'CONTCambiarPass', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('735', 'Delegaciones x Usuario', 'Asignación de Delagaciones a Usuarios', '7', 1, 1, 'Seguridad/Deleg_User/Deleg_User.aspx', 'CONT', 'CONTDeleg_User', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('740', 'Perfiles', 'Autorizaciones por Perfiles', '7', 2, 1, 'Seguridad/Perfiles/CrearPerfil.aspx', 'CONT', 'CONTPerfiles', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL)
 Values
   ('790', 'Pruebas de Correos-E', 'Pruebas de Envio de Notificaciones y Correos', '7', 2, 1, 'Admin/Email/TestEmail.aspx', 'CONT', 'CONTAdminMail', 'N');
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, PPAL, USAP, USBD, FREG, FNOV)
 Values
   ('8', 'Reportes', 'Reportes', '8', 1, 1, '-', 'REPO4', 'REPO4', 'N', 'admin', 'DERWEB', TO_DATE('05/20/2015 21:31:04', 'MM/DD/YYYY HH24:MI:SS'), TO_DATE('05/20/2015 21:31:04', 'MM/DD/YYYY HH24:MI:SS'));
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL, USAP, USBD, FREG, FNOV)
 Values
   ('810', 'Parametrizado', 'Parametrizado', '8', 1, 1, '/Reportes/Contratos/Contratos.aspx', 'REPO4', 'REPO4Contratos', '_self', 'N', 'admin', 'DERWEB', TO_DATE('05/20/2015 21:31:04', 'MM/DD/YYYY HH24:MI:SS'), TO_DATE('05/20/2015 21:31:04', 'MM/DD/YYYY HH24:MI:SS'));
Insert into MENU2
   (MENUID, TITULO, DESCRIPCION, PADREID, POSICION, HABILITADO, URL, MODULO, ROLES, TARGET, PPAL, USAP, USBD, FREG, FNOV)
 Values
   ('820', 'Dinámico', 'Dinamico', '8', 2, 1, '/Reportes/Dinamico/Dinamico.aspx', 'REPO4', 'REPO4Dinamico', '_self', 'N', 'admin', 'DERWEB', TO_DATE('08/10/2015 00:00:00', 'MM/DD/YYYY HH24:MI:SS'), TO_DATE('08/10/2015 00:00:00', 'MM/DD/YYYY HH24:MI:SS'));
COMMIT;