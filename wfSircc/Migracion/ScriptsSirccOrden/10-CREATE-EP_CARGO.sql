CREATE TABLE EP_CARGO
(
  COD_CARGO  VARCHAR2(2 BYTE),
  DES_CARGO  VARCHAR2(100 BYTE),
  VIG_CARGO  VARCHAR2(4 BYTE),
  EST_CARGO  VARCHAR2(2 BYTE)
);


CREATE UNIQUE INDEX EP_CARGO_PK ON EP_CARGO
(COD_CARGO);


ALTER TABLE EP_CARGO ADD (
  CONSTRAINT EP_CARGO_PK
 PRIMARY KEY
 (COD_CARGO));