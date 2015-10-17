<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="RptProcesosT.aspx.cs" Inherits="wfSircc.Solicitudes.ConsultasT.RptProcesosT" %>

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
        <li class="active"><a href="RptProcesosT.aspx">Reporte de Procesos</a></li>
        <li><a href="RptActividades.aspx">Reporte de Actividades</a></li>
        <li><a href="GetActividadesT.aspx">Actividades</a></li>
    </ul>

    <div class="panel panel-default">
        <div class="panel-body">
            <h2>Reporte de Procesos de Contratación </h2>


            <div class="panel-group" id="accordion">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">Filtro
                            </a>
                        </h4>
                    </div>
                    <div id="collapseOne" class="panel-collapse collapse in">
                        <div class="panel-body">
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-4">
                                        <asp:CheckBox ID="chkNumPro" runat="server" />
                                        <label for="txtNumPro">
                                            N° de Proceso:
                                        </label>
                                        <asp:TextBox ID="TxtNumPro" runat="server" CssClass="form-control input-sm"></asp:TextBox>
                                    </div>
                                    <div class="col-md-4">
                                        <asp:CheckBox ID="chkDepDel" runat="server" />
                                        <label for="CboDepDel">
                                            Dependencia Delegada
                                        </label>
                                        <asp:DropDownList ID="CboDepDel" runat="server" CssClass="form-control  input-sm"></asp:DropDownList>
                                    </div>
                                    <div class="col-md-4">
                                        <asp:CheckBox ID="chkFuncionario" runat="server" />
                                        <label for="txtIDEP">
                                            Funcionario encargado
                                        </label>
                                        <asp:DropDownList ID="CboEncargados" runat="server" CssClass="form-control  input-sm"></asp:DropDownList>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <asp:CheckBox ID="chkFecha" runat="server" />
                                        <label for="cboTipoFecha">
                                            Fecha de Filtro
                                        </label>
                                        <asp:DropDownList ID="cboTipoFecha" runat="server" CssClass="form-control  input-sm">
                                            <asp:ListItem Value="0" Text="Seleccione " />
                                            <asp:ListItem Value="1" Text="Fecha Registro " />
                                            <asp:ListItem Value="2" Text="Fecha Asignado " />
                                            <asp:ListItem Value="3" Text="Fecha Recibido " />
                                        </asp:DropDownList>
                                    </div>
                                    <div class="col-md-4">
                                        <label for="txtFecIni">
                                            Fecha Inicial
                                        </label>
                                        <asp:TextBox ID="txtFechaIni" runat="server" CssClass="form-control input-sm"></asp:TextBox>
                                        
                                    </div>
                                    <div class="col-md-4">
                                        <label for="txtFecFin">
                                            Fecha Final
                                        </label>
                                        <asp:TextBox ID="txtFechaFin" runat="server" CssClass="form-control input-sm"></asp:TextBox>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <asp:CheckBox ID="chkObj" runat="server" />
                                        <label for="CboDepDel">
                                            Objeto
                                        </label>
                                        <asp:TextBox ID="txtObj" runat="server" CssClass="form-control input-sm"></asp:TextBox>
                                    </div>
                                    <div class="col-md-4">
                                        <label>
                                            Tipo de Reporte
                                        </label>

                                        <asp:DropDownList ID="cboTipRpt" runat="server" CssClass="form-control  input-sm">
                                            <asp:ListItem Value="SA" Text="Sin Agrupar " />
                                            <asp:ListItem Value="AG" Text="Agrupado " />
                                        </asp:DropDownList>
                                    </div>
                                    <div class="col-md-4">
                                        <label>
                                        </label>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div class="row">
                <div class="col-lg-2">Dependencia</div>
                <div class="col-lg-4">
                </div>
                <div class="col-lg-2">
                    <asp:Button ID="BtnGenerarRpt" runat="server" Text="Generar" OnClick="BtnGenerarRpt_Click" CssClass="btn btn-success" />
                </div>
                <br />
            </div>
            <rsweb:ReportViewer ID="ReportViewer1" runat="server" Font-Names="Verdana" Height="1000px"
                Font-Size="8pt" WaitMessageFont-Names="Verdana" WaitMessageFont-Size="14pt" Width="100%">
                <LocalReport ReportPath="Solicitudes\ConsultasT\RptProcesos.rdlc" EnableHyperlinks="true">
                    <DataSources>
                        <rsweb:ReportDataSource DataSourceId="ObjProcesosT" Name="DataSet1" />
                    </DataSources>
                </LocalReport>
            </rsweb:ReportViewer>

        </div>
    </div>
   <%--<asp:ObjectDataSource ID="ObjProcesosT" runat="server" SelectMethod="GetProcesosD" TypeName="BLL.PROCESOS.ProcesosBLL" OnSelecting="ObjProcesosT_Selecting">
        <SelectParameters>
            <asp:Parameter DefaultValue="2013" Name="Vigencia" Type="Int16" />
            <asp:Parameter DefaultValue="06" Name="Dep_Del" Type="String" />
        </SelectParameters>
    </asp:ObjectDataSource>--%>

    <asp:ObjectDataSource ID="ObjProcesosT" runat="server" SelectMethod="Consultar" TypeName="BLL.PROCESOS.ProcesosBLL" OnSelecting="ObjProcesosT_Selecting"></asp:ObjectDataSource>


    <asp:HiddenField ID="hdVigencia" runat="server" />
   <%-- <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>--%>
    <script src="js/RptProcesosT.js"></script>
     <script src="../../Content/aceadmin/js/date-time/bootstrap-datepicker.min.js"></script>
</asp:Content>
