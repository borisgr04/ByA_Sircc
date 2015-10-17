ALTER TABLE ESTPREV
MODIFY(CAR_RES_EP VARCHAR2(100 BYTE));

INSERT INTO ESTPREV (ID, OBJE_EP, PLAZ1_EP, TPLA1_EP, TPLA2_EP, LUGE_EP, PLIQ_EP, VAL_ENT_EP, VAL_OTR_EP, IDE_DIL_EP, DEP_NEC_EP, STIP_CON_EP, FEC_ELA_EP, FEC_REG_EP, FEC_MOD_EP, USAP_REG_EP, USAP_MOD_EP, FEC_REV_EP, USAP_REV_EP, USAP_ELA_EP, FEC_ELAS_EP, USAP_APR_EP, FEC_APR_EP, USAP_ANU_EP, FEC_ANU_EP, USAP_DAN_EP, FEC_DAN_EP, DEP_SUP_EP, VIG_EP, CODIGO_EP, GRUPOS_EP, NUM_EMP_EP, IDE_RES_EP, MOD_SEL_EP, NRO_EP, EST_EP, EST_FLU_EP, ES_PLAN_EP, DEP_DEL_EP, ENPLANC_EP, NOM_PLA_EP, ID_REV, ID_APR, OBLIGC, OBLIGE, PERSONA_APOYO, ANTI_PORC, TIPO_FP, IDE_CON_EP, IDE_REP_EP, NEC_EP, OBLIGGRC, OBLIGGRE, JUST_VALOR_EP, CAP_JURIDICA_EP, CAP_FINANCIERA_EP, CAP_RESIDUAL_EP, PERS_LEGAL_EP, PERS_ORGA_EP, CAP_EXPERIENCA_EP, NEC_CONT_INT_EP, SOM_ACUE_COMER_EP, CONST_CUMP_DEBERES_EP, IDE_SUP_EP, CAR_SUP_EP, COD_UNSPSC_EP, DES_UNSPSC_EP, ESP_OBJ_EP, AUTPERLIC_EP, DOCTECNICOS_EP, VARIABLESPPTO_EP, IDONEIDAD_EP, CAP_ORGANIZACIONAL_EP, FACTORES_EVALUACION_EP, REGLAS_DESEMPATE_EP, TIPO_PPTO, PAADESC, PAAID, FUN_JUR_MOD, CAR_RES_EP, PLAZ2_EP, ACT_CONT_EP, DESC_APORTES_PROPIOS_EP, REQ_CDP_EP, OBS_CDP_EP, OBS_POL_EP, REQ_POL_EP, INICIO_APARTIR_DE_EP, FEC_INICIO_EP, FEC_FIN_EP, FEC_SUS_EP, CONSIDERACIONES_EP)
SELECT 1, OBJE_EP, PLAZ1_EP, TPLA1_EP, TPLA2_EP, LUGE_EP, PLIQ_EP, VAL_ENT_EP, VAL_OTR_EP, IDE_DIL_EP, DEP_NEC_EP, STIP_CON_EP, FEC_ELA_EP, FEC_REG_EP, FEC_MOD_EP, USAP_REG_EP, USAP_MOD_EP, FEC_REV_EP, USAP_REV_EP, USAP_ELA_EP, FEC_ELAS_EP, USAP_APR_EP, FEC_APR_EP, USAP_ANU_EP, FEC_ANU_EP, USAP_DAN_EP, FEC_DAN_EP, DEP_SUP_EP, VIG_EP, CODIGO_EP, GRUPOS_EP, NUM_EMP_EP, IDE_RES_EP, MOD_SEL_EP, NRO_EP, EST_EP, EST_FLU_EP, ES_PLAN_EP, DEP_DEL_EP, ENPLANC_EP, NOM_PLA_EP, ID_REV, ID_APR, OBLIGC, OBLIGE, PERSONA_APOYO, ANTI_PORC, TIPO_FP, IDE_CON_EP, IDE_REP_EP, NEC_EP, OBLIGGRC, OBLIGGRE, JUST_VALOR_EP, CAP_JURIDICA_EP, CAP_FINANCIERA_EP, CAP_RESIDUAL_EP, PERS_LEGAL_EP, PERS_ORGA_EP, CAP_EXPERIENCA_EP, NEC_CONT_INT_EP, SOM_ACUE_COMER_EP, CONST_CUMP_DEBERES_EP, IDE_SUP_EP, CAR_SUP_EP, COD_UNSPSC_EP, DES_UNSPSC_EP, ESP_OBJ_EP, AUTPERLIC_EP, DOCTECNICOS_EP, VARIABLESPPTO_EP, IDONEIDAD_EP, CAP_ORGANIZACIONAL_EP, FACTORES_EVALUACION_EP, REGLAS_DESEMPATE_EP, TIPO_PPTO, PAADESC, PAAID, FUN_JUR_MOD, CAR_RES_EP, PLAZ2_EP, ACT_CONT_EP, DESC_APORTES_PROPIOS_EP, REQ_CDP_EP, OBS_CDP_EP, OBS_POL_EP, REQ_POL_EP, INICIO_APARTIR_DE_EP, FEC_INICIO_EP, FEC_FIN_EP, FEC_SUS_EP, CONSIDERACIONES_EP FROM SIRCC_MIG.ESTPREV WHERE ID = 19;
COMMIT;

UPDATE ESTPREV SET PAADESC = '' WHERE ID = '1';
COMMIT;