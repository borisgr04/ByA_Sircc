CREATE TABLE INT_DETTRASLADO
(
  ID           NUMBER,
  ID_TRASLADO  NUMBER,
  ID_CTRDOC    NUMBER,
  EST_TRA      VARCHAR2(2 BYTE),
  ID_CTRDOC2   NUMBER
);

COMMENT ON TABLE INT_DETTRASLADO IS 'detalle de documentos del traslado';

COMMENT ON COLUMN INT_DETTRASLADO.ID IS 'id unico';

COMMENT ON COLUMN INT_DETTRASLADO.ID_TRASLADO IS 'id del traslado';

COMMENT ON COLUMN INT_DETTRASLADO.ID_CTRDOC IS 'id del control de documento origen';

COMMENT ON COLUMN INT_DETTRASLADO.EST_TRA IS 'estado del traslado';

COMMENT ON COLUMN INT_DETTRASLADO.ID_CTRDOC2 IS 'id_controldoc destino';


CREATE UNIQUE INDEX INT_DETTRASLADO_PK ON INT_DETTRASLADO
(ID);


ALTER TABLE INT_DETTRASLADO ADD (
  CONSTRAINT INT_DETTRASLADO_PK
 PRIMARY KEY
 (ID));

ALTER TABLE INT_DETTRASLADO ADD (
  CONSTRAINT INT_DETTRAS_FK 
 FOREIGN KEY (ID_CTRDOC) 
 REFERENCES INT_CONTROL_DOC (ID),
  CONSTRAINT INT_DETTRAS_R03 
 FOREIGN KEY (ID_CTRDOC2) 
 REFERENCES INT_CONTROL_DOC (ID),
  CONSTRAINT INT_DETTRASLADO_FK 
 FOREIGN KEY (ID_TRASLADO) 
 REFERENCES INT_TRASLADOS (ID));