INSERT INTO EP_CLAUSULAS (ID, ID_PLA, TIP_PLA, CLA_TIT, CLA_NUM, CLA_CAM, CLA_PAR, IDE_PMIN, TIP_PAR, IS_ENTER_FINAL, ORDEN, ID_EP, CLA_TEXTO, CLA_CRUZADA)
SELECT ID, ID_PLA, TIP_PLA, CLA_TIT, CLA_NUM, CLA_CAM, CLA_PAR, IDE_PMIN, TIP_PAR, IS_ENTER_FINAL, ORDEN, 1, CLA_TEXTO, CLA_CRUZADA FROM SIRCC_MIG.EP_CLAUSULAS WHERE ID_EP = '19';
COMMIT;