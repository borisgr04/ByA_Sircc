CREATE TABLE EP_MPAA
(
  ID         NUMBER,
  VIGENCIA   NUMBER(4),
  OBSERV     VARCHAR2(300 BYTE),
  FEC_INI    DATE,
  FEC_FIN    DATE,
  ESTADO     VARCHAR2(2 BYTE),
  COD_SECOP  VARCHAR2(20 BYTE)
);

COMMENT ON TABLE EP_MPAA IS 'TABLA MAESTRA DE PLAN ANUAL DE ADQUISICIONES';

COMMENT ON COLUMN EP_MPAA.ID IS 'ID UNICO';

COMMENT ON COLUMN EP_MPAA.VIGENCIA IS 'VIGENCIA DEL PAA';

COMMENT ON COLUMN EP_MPAA.OBSERV IS 'OBSERVACION - DESCRIPCION';

COMMENT ON COLUMN EP_MPAA.FEC_INI IS 'FEC_INI DONDE SE HABILITA';

COMMENT ON COLUMN EP_MPAA.FEC_FIN IS 'FEC FIN DONDE NO SE MUESTRA EL PAA PARA MODIFICAR';

COMMENT ON COLUMN EP_MPAA.ESTADO IS 'ESTADO (AC, CE, PU)';

COMMENT ON COLUMN EP_MPAA.COD_SECOP IS 'CODIGO QUE ASIGNEN EN EL SECOP';


ALTER TABLE EP_MPAA ADD (
  PRIMARY KEY
 (ID));