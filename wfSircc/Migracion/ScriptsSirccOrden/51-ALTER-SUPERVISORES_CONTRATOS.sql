ALTER TABLE SUPERVISORES_CONTRATO ADD (
  CONSTRAINT CODCONTRATO_FK1 
 FOREIGN KEY (COD_CON) 
 REFERENCES CONTRATOS (COD_CON));