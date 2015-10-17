CREATE TABLE GD_DDOCUMENTOS
(
  ID         NUMBER,
  DOCUMENTO  BLOB
);

COMMENT ON TABLE GD_DDOCUMENTOS IS 'tabla que contine el documento binario';

COMMENT ON COLUMN GD_DDOCUMENTOS.ID IS 'id ';

COMMENT ON COLUMN GD_DDOCUMENTOS.DOCUMENTO IS 'document binario';


CREATE UNIQUE INDEX GD_DDOCUMENTOS_PK ON GD_DDOCUMENTOS
(ID);


ALTER TABLE GD_DDOCUMENTOS ADD (
  CONSTRAINT GD_DDOCUMENTOS_PK
 PRIMARY KEY
 (ID));

ALTER TABLE GD_DDOCUMENTOS ADD (
  CONSTRAINT GD_DDOCUMENTOS_R01 
 FOREIGN KEY (ID) 
 REFERENCES GD_DOCUMENTOS (ID));