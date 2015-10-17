CREATE TABLE EP_CAP_JUR
(
  ID        NUMBER,
  ID_EP     NUMBER,
  ID_CAPJ   NUMBER,
  DES_CAPJ  VARCHAR2(400 BYTE)
);

COMMENT ON TABLE EP_CAP_JUR IS 'ESTUDIO PREVIO: CAPACIDAD JURIDICA';

COMMENT ON COLUMN EP_CAP_JUR.ID IS 'ID UNICO';

COMMENT ON COLUMN EP_CAP_JUR.ID_EP IS 'IDENTIFICACION DEL ESTUDIO PREVIO';

COMMENT ON COLUMN EP_CAP_JUR.ID_CAPJ IS 'ID DE LA CAPACIDAD JURIDICA';

COMMENT ON COLUMN EP_CAP_JUR.DES_CAPJ IS 'COPIA DE LA DESCRIPCION DE LA CAPACIDAD JURIDICA';

CREATE UNIQUE INDEX EP_CAP_JUR_PK ON EP_CAP_JUR
(ID);


CREATE UNIQUE INDEX EP_CAPJ_UK ON EP_CAP_JUR
(ID_EP, ID_CAPJ);


ALTER TABLE EP_CAP_JUR ADD (
  CONSTRAINT EP_CAP_JUR_PK
 PRIMARY KEY
 (ID),
  CONSTRAINT EP_CAPJ_UK
 UNIQUE (ID_EP, ID_CAPJ));

ALTER TABLE EP_CAP_JUR ADD (
  CONSTRAINT EP_CAPJ_DB 
 FOREIGN KEY (ID_CAPJ) 
 REFERENCES EP_DT_CAP_JUR (ID),
  CONSTRAINT EP_CAPJ_EP 
 FOREIGN KEY (ID_EP) 
 REFERENCES ESTPREV (ID));