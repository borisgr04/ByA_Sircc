CREATE TABLE EP_PAA_UNSPSC
(
  ID         NUMBER(10),
  ID_EP_PAA  NUMBER(10),
  UNSPSC     VARCHAR2(8 BYTE)
);


CREATE UNIQUE INDEX EP_PAA_UNSPSC_PK ON EP_PAA_UNSPSC
(ID);


ALTER TABLE EP_PAA_UNSPSC ADD (
  CONSTRAINT EP_PAA_UNSPSC_PK
 PRIMARY KEY
 (ID));

ALTER TABLE EP_PAA_UNSPSC ADD (
  CONSTRAINT EP_PAA_UNSPSC_FK 
 FOREIGN KEY (UNSPSC) 
 REFERENCES EP_CODIGOSUNSPSC (UNSPSC),
  CONSTRAINT EP_PAA_UNSPSC_FK_EP_PAA 
 FOREIGN KEY (ID_EP_PAA) 
 REFERENCES EP_PAA (ID));