CREATE TABLE EP_HESTADOEP
(
  ID       NUMBER,
  ID_EP    NUMBER,
  FEC_EP   DATE,
  FSIS_EP  DATE,
  USAP_EP  VARCHAR2(20 BYTE),
  OBS_EP   VARCHAR2(200 BYTE),
  TIP_EP   VARCHAR2(2 BYTE),
  EST_EP   VARCHAR2(2 BYTE)
);

COMMENT ON TABLE EP_HESTADOEP IS 'Estudio Previo - Historico de Estado';

COMMENT ON COLUMN EP_HESTADOEP.ID IS 'Id Unico';

COMMENT ON COLUMN EP_HESTADOEP.ID_EP IS 'Ide Estudio Previo';

COMMENT ON COLUMN EP_HESTADOEP.FEC_EP IS 'Fecha de Estudio Previo';

COMMENT ON COLUMN EP_HESTADOEP.FSIS_EP IS 'Fecha de Sistema';

COMMENT ON COLUMN EP_HESTADOEP.USAP_EP IS 'Usuario de la aplicacion';

COMMENT ON COLUMN EP_HESTADOEP.OBS_EP IS 'Observacion';

COMMENT ON COLUMN EP_HESTADOEP.TIP_EP IS 'Tipo de Est Prev';

COMMENT ON COLUMN EP_HESTADOEP.EST_EP IS 'Estado';


CREATE UNIQUE INDEX EP_HESTADOEP_PK ON EP_HESTADOEP
(ID);


ALTER TABLE EP_HESTADOEP ADD (
  CONSTRAINT EP_HESTADOEP_PK
 PRIMARY KEY
 (ID));