CREATE TABLE INTTIPO_ESS
(
  COD_TIP  VARCHAR2(2 BYTE)                     NOT NULL,
  NOM_TIP  VARCHAR2(30 BYTE)                    NOT NULL,
  EST_TIP  VARCHAR2(2 BYTE)                     DEFAULT 'AC'
);


CREATE UNIQUE INDEX TIPO_ESS ON INTTIPO_ESS
(COD_TIP);


ALTER TABLE INTTIPO_ESS ADD (
  CONSTRAINT TIPO_ESS
 PRIMARY KEY
 (COD_TIP));