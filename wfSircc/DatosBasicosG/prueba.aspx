<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="prueba.aspx.cs" Inherits="wfSircc.DatosBasicosG.prueba" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
        <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="Button" CssClass="" />
        <asp:FileUpload ID="FileUpload1" runat="server"  CssClass=""/>
        <asp:TextBox ID="TextBox1" runat="server" CssClass=""></asp:TextBox>
    
    </div>
    </form>
</body>
</html>
