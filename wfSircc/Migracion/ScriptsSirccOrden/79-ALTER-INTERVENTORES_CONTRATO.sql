ALTER TABLE INTERVENTORES_CONTRATO ADD (
  CONSTRAINT INT_CON_FK 
 FOREIGN KEY (COD_CON) 
 REFERENCES CONTRATOS (COD_CON));