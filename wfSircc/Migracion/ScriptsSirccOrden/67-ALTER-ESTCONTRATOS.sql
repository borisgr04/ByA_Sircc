ALTER TABLE ESTCONTRATOS ADD (
  CONSTRAINT ESTCON_CODCON 
 FOREIGN KEY (COD_CON) 
 REFERENCES CONTRATOS (COD_CON));