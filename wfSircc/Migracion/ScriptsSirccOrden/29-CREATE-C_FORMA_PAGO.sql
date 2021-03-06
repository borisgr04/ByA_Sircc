CREATE TABLE C_FORMA_PAGO
(
  ID         NUMBER,
  COD_CON    VARCHAR2(10 BYTE),
  ORD_FPAG   NUMBER,
  TIP_FPAG   VARCHAR2(2 BYTE),
  VAL_FPAG   NUMBER(17,4),
  POR_FPAG   NUMBER(17,4),
  CON_FPAG   VARCHAR2(2000 BYTE),
  PGEN_FPAG  CHAR(1 BYTE),
  FEC_REG    DATE,
  USAP_REG   VARCHAR2(12 BYTE),
  FEC_MOD    DATE,
  USAP_MOD   VARCHAR2(12 BYTE),
  CAN_PAG    NUMBER
);

COMMENT ON TABLE C_FORMA_PAGO IS 'FORMA DE PAGO DEL ESTUDIO PREVIO PARA EL CONTRATO';

COMMENT ON COLUMN C_FORMA_PAGO.ID IS 'ID UNICO';

COMMENT ON COLUMN C_FORMA_PAGO.COD_CON IS 'CODIGO DEL CONTRATO';

COMMENT ON COLUMN C_FORMA_PAGO.ORD_FPAG IS 'ORDEN DEL PAGO PARA MOSTRAR';

COMMENT ON COLUMN C_FORMA_PAGO.TIP_FPAG IS 'TIPO DE PAGO';

COMMENT ON COLUMN C_FORMA_PAGO.VAL_FPAG IS 'VALOR A PAGAR';

COMMENT ON COLUMN C_FORMA_PAGO.POR_FPAG IS 'PORCENTAJE DEL VALOR TOTAL';

COMMENT ON COLUMN C_FORMA_PAGO.CON_FPAG IS 'CONDICIÓN DE LA FORMA DE PAGO';

COMMENT ON COLUMN C_FORMA_PAGO.PGEN_FPAG IS 'APORTES DE LA ENTIDAD';

COMMENT ON COLUMN C_FORMA_PAGO.FEC_REG IS 'FEC DE REGISTRO';

COMMENT ON COLUMN C_FORMA_PAGO.USAP_REG IS 'USUARIO QUIEN REGISTRO';

COMMENT ON COLUMN C_FORMA_PAGO.FEC_MOD IS 'FECHA DE MODIFICACIÓN';

COMMENT ON COLUMN C_FORMA_PAGO.USAP_MOD IS 'USUARIO QUIEN MODIFICO';

COMMENT ON COLUMN C_FORMA_PAGO.CAN_PAG IS 'CANTIDAD DE PAGOS';


CREATE UNIQUE INDEX C_FORMA_PAGO_PK ON C_FORMA_PAGO
(ID);


ALTER TABLE C_FORMA_PAGO ADD (
  CONSTRAINT C_FORMA_PAGO_PK
 PRIMARY KEY
 (ID));

ALTER TABLE C_FORMA_PAGO ADD (
  CONSTRAINT FK_C_FP_TIPPAG 
 FOREIGN KEY (TIP_FPAG) 
 REFERENCES TIPO_PAGO (ID_PAGO),
  CONSTRAINT FK_CFP_CONTRATO 
 FOREIGN KEY (COD_CON) 
 REFERENCES CONTRATOS (COD_CON));