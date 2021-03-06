CREATE TABLE PR_DB_CLAUSULAS
(
  ID         NUMBER,
  ID_PLA     NUMBER,
  TIP_PLA    VARCHAR2(4 BYTE),
  CLA_TIT    VARCHAR2(200 BYTE),
  CLA_NUM    NUMBER,
  CLA_CAM    VARCHAR2(200 BYTE),
  CLA_PAR    VARCHAR2(200 BYTE),
  CLA_TEXTO  VARCHAR2(2000 BYTE)
);

COMMENT ON TABLE PR_DB_CLAUSULAS IS 'COFIGURACION CLAUSULAS DE CONTRATOS';

COMMENT ON COLUMN PR_DB_CLAUSULAS.ID IS 'ID UNICO';

COMMENT ON COLUMN PR_DB_CLAUSULAS.ID_PLA IS 'ID A PLANTILLA A LA QUE PERTENECE';

COMMENT ON COLUMN PR_DB_CLAUSULAS.TIP_PLA IS 'TIPO DE PLANTILLA';

COMMENT ON COLUMN PR_DB_CLAUSULAS.CLA_TIT IS 'TITULO DE LA CLAUSULA';

COMMENT ON COLUMN PR_DB_CLAUSULAS.CLA_NUM IS 'N�MERO DE LA CLAUSULA';

COMMENT ON COLUMN PR_DB_CLAUSULAS.CLA_CAM IS 'CAMPOS RELACIONADOS';

COMMENT ON COLUMN PR_DB_CLAUSULAS.CLA_PAR IS 'PARRAGRAFOS ASOCIADOS';

COMMENT ON COLUMN PR_DB_CLAUSULAS.CLA_TEXTO IS 'TEXTO DE LA CLAUSULA';


CREATE UNIQUE INDEX PR_DB_CLAUSULAS_PK ON PR_DB_CLAUSULAS
(ID);


ALTER TABLE PR_DB_CLAUSULAS ADD (
  CONSTRAINT PR_DB_CLAUSULAS_PK
 PRIMARY KEY
 (ID));