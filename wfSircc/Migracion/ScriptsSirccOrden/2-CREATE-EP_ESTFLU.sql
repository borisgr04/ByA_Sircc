CREATE TABLE EP_ESTFLU
(
  COD_EST  VARCHAR2(2 BYTE),
  NOM_EST  VARCHAR2(20 BYTE)
);

COMMENT ON TABLE EP_ESTFLU IS 'ESTADO DEL FLUJO DE DOCUMENTOS';

COMMENT ON COLUMN EP_ESTFLU.COD_EST IS 'ESTADO';

COMMENT ON COLUMN EP_ESTFLU.NOM_EST IS 'NOMBRE';


CREATE UNIQUE INDEX EP_ESTFLU_PK ON EP_ESTFLU
(COD_EST);


ALTER TABLE EP_ESTFLU ADD (
  CONSTRAINT EP_ESTFLU_PK
 PRIMARY KEY
 (COD_EST));