CREATE TABLE GD_DOC_ACTAS
(
  ID       NUMBER,
  ID_DOC   NUMBER,
  COD_CON  VARCHAR2(10 BYTE),
  ID_INF   NUMBER,
  FEC_REG  DATE,
  USAP     VARCHAR2(20 BYTE),
  EST_REL  VARCHAR2(2 BYTE),
  TIP_DOC  VARCHAR2(2 BYTE)
);

COMMENT ON TABLE GD_DOC_ACTAS IS 'Documentos Asociados al Acta';

COMMENT ON COLUMN GD_DOC_ACTAS.ID IS 'Consecutivo';

COMMENT ON COLUMN GD_DOC_ACTAS.ID_DOC IS 'Id del documento';

COMMENT ON COLUMN GD_DOC_ACTAS.COD_CON IS 'C�digo del contrato';

COMMENT ON COLUMN GD_DOC_ACTAS.ID_INF IS 'N�mero del Informe.';

COMMENT ON COLUMN GD_DOC_ACTAS.FEC_REG IS 'Fecha de Registro';

COMMENT ON COLUMN GD_DOC_ACTAS.USAP IS 'Usuario de la Aplicaci�n';

COMMENT ON COLUMN GD_DOC_ACTAS.EST_REL IS 'Estado';


CREATE UNIQUE INDEX DOC_ACTAS_PK ON GD_DOC_ACTAS
(ID);


ALTER TABLE GD_DOC_ACTAS ADD (
  CONSTRAINT DOC_ACTAS_PK
 PRIMARY KEY
 (ID));

ALTER TABLE GD_DOC_ACTAS ADD (
  CONSTRAINT DOC_ACTAS_CON 
 FOREIGN KEY (COD_CON) 
 REFERENCES CONTRATOS (COD_CON),
  CONSTRAINT DOC_ACTAS_INF 
 FOREIGN KEY (ID_INF) 
 REFERENCES INT_INFOCONT (ID),
  CONSTRAINT GD_DOC_ACTAS_TDOC 
 FOREIGN KEY (TIP_DOC) 
 REFERENCES TIP_DOC (COD_TIP));