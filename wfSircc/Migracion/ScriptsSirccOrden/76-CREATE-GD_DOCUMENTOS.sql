CREATE TABLE GD_DOCUMENTOS
(
  ID           NUMBER,
  NOMBRE       VARCHAR2(255 BYTE),
  LONGITUD     NUMBER,
  TYPE         VARCHAR2(255 BYTE),
  URL          VARCHAR2(255 BYTE),
  DESCRIPCION  VARCHAR2(1000 BYTE),
  USUARIO      VARCHAR2(20 BYTE),
  FEC_REG      DATE,
  FEC_MOD      DATE,
  ESTADO       VARCHAR2(2 BYTE)
);

COMMENT ON TABLE GD_DOCUMENTOS IS 'registro de documentos, registrados por un usuario.';

COMMENT ON COLUMN GD_DOCUMENTOS.ID IS 'id unico';

COMMENT ON COLUMN GD_DOCUMENTOS.NOMBRE IS 'nombre';

COMMENT ON COLUMN GD_DOCUMENTOS.LONGITUD IS 'longitud';

COMMENT ON COLUMN GD_DOCUMENTOS.TYPE IS 'tipo de contenido';

COMMENT ON COLUMN GD_DOCUMENTOS.URL IS 'url';

COMMENT ON COLUMN GD_DOCUMENTOS.DESCRIPCION IS 'descripcion';

COMMENT ON COLUMN GD_DOCUMENTOS.USUARIO IS 'usuario';

COMMENT ON COLUMN GD_DOCUMENTOS.FEC_REG IS 'fecha de regsitro';

COMMENT ON COLUMN GD_DOCUMENTOS.FEC_MOD IS 'fecha de modificacion';

COMMENT ON COLUMN GD_DOCUMENTOS.ESTADO IS 'estado';


CREATE UNIQUE INDEX GD_DOCUMENTOS_PK ON GD_DOCUMENTOS
(ID);


ALTER TABLE GD_DOCUMENTOS ADD (
  CONSTRAINT GD_DOCUMENTOS_PK
 PRIMARY KEY
 (ID));
