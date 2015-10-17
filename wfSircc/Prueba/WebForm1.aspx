<%@ Page Title="" Language="C#" MasterPageFile="~/SiteBS.Master" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="wfSircc.Prueba.WebForm1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <%--<link href="estilos/ace-skins.min.css" rel="stylesheet" />--%>
    <link href="estilos/ace.min.css" rel="stylesheet" />
    <%--<link href="estilos/ace-rtl.min.css" rel="stylesheet" />--%>
    <link href="estilos/bootstrap-editable.css" rel="stylesheet" />
    <link href="estilos/bootstrap.min.css" rel="stylesheet" />
    <link href="estilos/css.css" rel="stylesheet" />
   <link href="estilos/font-awesome.min.css" rel="stylesheet" />
    <link href="estilos/jquery-ui-1.10.3.custom.min.css" rel="stylesheet" />
    <link href="estilos/jquery.gritter.css" rel="stylesheet" />
    <link href="estilos/select2.css" rel="stylesheet" />
    <div class="panel panel-default">
        <div class="panel-heading">Entidad</div>
        <div class="panel-body">

            <div class="row">

                <div class="col-sm-12 col-md-3">

                    <div class="input-group input-group-sm">
                        <span class="input-group-addon">codigo de la entidad</span>
                        <input type="text" class="form-control" placeholder="Username">
                    </div>

                </div>


                <div class="col-sm-12 col-md-3">

                    <div class="input-group input-group-sm">
                        <span class="input-group-addon">Nombre Sede Principal</span>
                        <input type="text" class="form-control" placeholder="Username">
                    </div>

                </div>

            </div>
            
            <%--DOS COLOMNAS--%>
            <div class="row">

                <div class="col-md-6">

                    <div class="input-group input-group-sm">
                        <span class="input-group-addon">codigo de la entidad</span>
                        <input type="text" class="form-control" placeholder="Username">
                    </div>

                </div>
                <div class="col-md-6">

                    <div class="input-group input-group-sm">
                        <span class="input-group-addon">Nombre Sede Principal</span>
                        <input type="text" class="form-control" placeholder="Username">
                    </div>

                </div>

            </div>
            <%--TRES COLOMUNAS--%>
            <div class="row">

                <div class="col-md-4">

                    <div class="input-group input-group-md">
                        <span class="input-group-addon">codigo de la entidad</span>
                        <input type="text" class="form-control" placeholder="Username">
                    </div>

                </div>
                <div class="col-md-4">

                    <div class="input-group input-group-sm">
                        <span class="input-group-addon">Nombre Sede Principal</span>
                        <input type="text" class="form-control" placeholder="Username">
                    </div>

                </div>
                <div class="col-md-4">

                    <div class="input-group input-group-sm">
                        <span class="input-group-addon">Nombre Sede Principal</span>
                        <input type="text" class="form-control" placeholder="Username">
                    </div>

                </div>

            </div>

            
        </div>
    </div>


    <div class="space-12" ></div>

    <div class="profile-user-info profile-user-info-striped">

        <div class="profile-info-row">
            <div class="profile-info-name">Código de la Entidad </div>

            <div class="profile-info-value">
                <span class="editable" id="username">alexdoe</span>
            </div>
        </div>



        <div class="profile-info-row">
            <div class="profile-info-name">Nit </div>

            <div class="profile-info-value">
                <span class="editable" id="age">38</span>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">Nombre de la Entidad </div>

            <div class="profile-info-value">
                <span class="editable" id="Noment">20/06/2010</span>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">Representante Legal </div>

            <div class="profile-info-value">
                <span class="editable" id="signup">20/06/2010</span>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">Telefono </div>

            <div class="profile-info-value">
                <span class="span.editable-container" id="login">3 hours ago</span>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">Fax </div>

            <div class="profile-info-value">
                <span class="editable" id="about">Editable as WYSIWYG</span>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">Correo Electronico </div>

            <div class="profile-info-value">
                <span class="editable" id="email">Editable as WYSIWYG</span>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">direccion </div>

            <div class="profile-info-value">
                <span class="editable" id="dir">Editable as WYSIWYG</span>
            </div>
        </div>

        <div class="profile-info-row">
            <div class="profile-info-name">Lugar </div>

            <div class="profile-info-value">
                <i class="icon-map-marker light-orange bigger-110"></i>
                <span class="editable" id="Pais">Netherlands</span>
                <span class="editable" id="dpto">Amsterdam</span>
                <span class="editable" id="mpio">Amsterdam</span>
            </div>
        </div>

    </div>
    <hr />
<div class="form-horizontal" role="form">
  <div class="form-group">
    <label for="inputEmail1" class="col-sm-2 control-label">Email</label>
    <div class="col-sm-5 input-group-sm">
      <input type="email" class="form-control" id="inputEmail1" placeholder="Email">
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword1" class="col-sm-2 control-label">Password</label>
    <div class="col-sm-5 input-group-sm">
      <input type="password" class="form-control" id="inputPassword1" placeholder="Password">
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword1" class="col-sm-2 control-label">Password</label>
    <div class="col-sm-5 input-group-sm">
      <span class="form-control" id="Span1">Amsterdam</span>
    </div>
  </div>
  <div class="form-group">
    <div class="col-lg-offset-2 col-lg-10">
      <div class="checkbox">
        <label>
          <input type="checkbox"> Remember me
        </label>
      </div>
    </div>
  </div>
  <div class="form-group">
    <div class="col-lg-offset-2 col-lg-10">
      <button type="submit" class="btn btn-default">Sign in</button>
    </div>
  </div>
</div>    
</asp:Content>
