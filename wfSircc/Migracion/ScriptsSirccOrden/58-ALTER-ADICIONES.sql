ALTER TABLE ADICIONES ADD (
  CONSTRAINT ADICIONES_CODCON1 
 FOREIGN KEY (COD_CON) 
 REFERENCES CONTRATOS (COD_CON));