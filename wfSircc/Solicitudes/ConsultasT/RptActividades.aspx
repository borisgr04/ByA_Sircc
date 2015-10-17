<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="RptActividades.aspx.cs" Inherits="wfSircc.Solicitudes.ConsultasT.RptActividades" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
    <ul class="nav nav-tabs">
        <li><a href="PanelConsT.aspx">Panel de Consolidados</a></li>
        <li><a href="GesSolicitudesT.aspx">Consultas Solicitudes</a></li>
        <li><a href="RptSolicitudesT.aspx">Reporte de Solicitudes</a></li>
        <li><a href="GesProcesosT.aspx">Consultas de Procesos</a></li>
        <li><a href="RptProcesosT.aspx">Reporte de Procesos</a></li>
        <li class="active"><a href="RptActividades.aspx">Reporte de Actividades</a></li>
        <li ><a href="GetActividadesT.aspx">Actividades</a></li>
    </ul>
    <div class="panel panel-default">
        <div class="panel-body">
            <h2>Reporte de Crograma de Actividades de Contratación </h2>
            <div class="row">
                <div class="col-lg-12">
                    <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" Font-Size="8pt" WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="1071px" Height="701px">
                        <LocalReport ReportPath="Solicitudes\ConsultasT\RptAct.rdlc">
                            <DataSources>
                                <rsweb:ReportDataSource DataSourceId="ObjectDataSource1" Name="DataSet1" />
                            </DataSources>
                        </LocalReport>
                    </rsweb:ReportViewer>

                </div>
            </div>
        </div>
    </div>

    <script src="js/RptProcesosT.js"></script>

    <asp:ObjectDataSource ID="ObjectDataSource1" runat="server" SelectMethod="getListaEstAviAct" TypeName="BLL.PROCESOS.ConsultaT.Actividades.Est_Avi_Actividad" OnSelecting="ObjectDataSource1_Selecting">
        <SelectParameters>
            <asp:Parameter DefaultValue="2013" Name="vigencia" Type="Int16" />
        </SelectParameters>
    </asp:ObjectDataSource>
</asp:Content>
