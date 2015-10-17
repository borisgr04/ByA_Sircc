<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="printMinuta.aspx.cs" Inherits="wfSircc.Solicitudes.Gestion.printMinuta" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <style type="text/css">
        <!--
        @page
        {
            size: 8.5in 11in;
            margin: 2cm;
        }

        @page
        {
            size: portrait;
        }

        @page rotated
        {
            size: landscape;
        }

        @media print
        {
            .print
            {
            }
        }

        @media screen
        {
            
            .print
            {
                margin-left: 4cm;
                margin-right: 4cm;
                padding: 10px;
                background-color: white;
                width: 8.5in;
            }
        }

        Body
        {
            font-family: 'Times New Roman';
            font-size: 10pt;
        }

        table
        {
            page: rotated;
        }

        .tbconborde
        {
            border-collapse: collapse;
        }

            .tbconborde td
            {
                border: 1px solid black;
                padding: 2mm;
            }

            .tbconborde th
            {
                background-color: #f8f3f3;
                border: 1px solid black;
                padding: 2mm;
            }

       
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div id="dvdClausulaEdit" contenteditable  class="print">
            <div style="text-align: justify;">
            <asp:Literal ID="Literal1" runat="server"></asp:Literal>
            </div>
        </div>
    </form>
</body>
</html>
