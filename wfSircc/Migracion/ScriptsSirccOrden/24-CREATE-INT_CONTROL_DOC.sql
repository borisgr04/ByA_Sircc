CREATE TABLE INT_CONTROL_DOC
(
  ID           NUMBER,
  IDACTA       NUMBER(10),
  FEC_REC      DATE,
  FEC_REC_SIS  DATE,
  OBS_REC      VARCHAR2(100 BYTE),
  EST_DOC      VARCHAR2(2 BYTE),
  ETA_DOC      VARCHAR2(2 BYTE),
  FEC_REV      DATE,
  OBS_REV      VARCHAR2(500 BYTE),
  USAP_REC     VARCHAR2(20 BYTE),
  USAP_REV     VARCHAR2(20 BYTE),
  USAP_MOD     VARCHAR2(20 BYTE),
  FEC_MOD      DATE,
  FEC_REV_SIS  DATE,
  IDPADRE      NUMBER,
  EST_REG      VARCHAR2(2 BYTE)
);

COMMENT ON TABLE INT_CONTROL_DOC IS 'REGISTRA LAS DIFERENTES ETAPAS DE UN DOCUMENTO';

COMMENT ON COLUMN INT_CONTROL_DOC.ID IS 'unico consecutivo';

COMMENT ON COLUMN INT_CONTROL_DOC.IDACTA IS 'ide del acta';

COMMENT ON COLUMN INT_CONTROL_DOC.FEC_REC IS 'fecha del recibido';

COMMENT ON COLUMN INT_CONTROL_DOC.FEC_REC_SIS IS 'fecha del recibido en el sistema';

COMMENT ON COLUMN INT_CONTROL_DOC.OBS_REC IS 'observacion del recibido';

COMMENT ON COLUMN INT_CONTROL_DOC.EST_DOC IS 'estado del item';

COMMENT ON COLUMN INT_CONTROL_DOC.ETA_DOC IS 'etapa';

COMMENT ON COLUMN INT_CONTROL_DOC.FEC_REV IS 'fecha de revisado';

COMMENT ON COLUMN INT_CONTROL_DOC.OBS_REV IS 'observacion de revisado';

COMMENT ON COLUMN INT_CONTROL_DOC.USAP_REC IS 'usuario recibido';

COMMENT ON COLUMN INT_CONTROL_DOC.USAP_REV IS 'usuario quien reviso';

COMMENT ON COLUMN INT_CONTROL_DOC.USAP_MOD IS 'usuario quien modfico por ultima vez';

COMMENT ON COLUMN INT_CONTROL_DOC.FEC_MOD IS 'fecha de modficacion';

COMMENT ON COLUMN INT_CONTROL_DOC.FEC_REV_SIS IS 'fecha de revisado en el sistema';

COMMENT ON COLUMN INT_CONTROL_DOC.IDPADRE IS 'ide de la etapa anterior.';

COMMENT ON COLUMN INT_CONTROL_DOC.EST_REG IS 'Estado del registro.';


CREATE UNIQUE INDEX INT_CONTROL_CUENTA_PK ON INT_CONTROL_DOC
(ID);


ALTER TABLE INT_CONTROL_DOC ADD (
  CONSTRAINT INT_CONTROL_CUENTA_PK
 PRIMARY KEY
 (ID));

ALTER TABLE INT_CONTROL_DOC ADD (
  CONSTRAINT INT_CTR_DOC_ACTA 
 FOREIGN KEY (IDACTA) 
 REFERENCES ESTCONTRATOS (ID),
  CONSTRAINT INT_CTR_TRAM 
 FOREIGN KEY (IDPADRE) 
 REFERENCES INT_CONTROL_DOC (ID));