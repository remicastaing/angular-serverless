'use strict'; 

export const confirmPassword = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
  <head>
    <link rel="stylesheet" type="text/css" href="css/app.css">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width">
    <title>My Drip Email Template Subject</title>
    <!-- <style> -->
  </head>
  <body>
    <span class="preheader"></span>
    <table class="body">
      <tr>
        <td class="center" align="center" valign="top">
          <center data-parsed="">
            
            <table align="center" class="container header float-center"><tbody><tr><td>
              <table class="row collapse"><tbody><tr>
                <th class="small-12 large-12 columns first last"><table><tr><th>
                  <img src="http://placehold.it/150x30/663399" alt="">
                </th>
<th class="expander"></th></tr></table></th>
              </tr></tbody></table>
            </td></tr></tbody></table>
            
            <table class="spacer float-center"><tbody><tr><td height="16px" style="font-size:16px;line-height:16px;">&#xA0;</td></tr></tbody></table> 
            
            <table align="center" class="container body-drip float-center"><tbody><tr><td>
            
              <table class="spacer"><tbody><tr><td height="16px" style="font-size:16px;line-height:16px;">&#xA0;</td></tr></tbody></table> 
            
              <center data-parsed="">
                <img src="http://placehold.it/120/663399" alt="" align="center" class="float-center">
              </center>
            
              <table class="spacer"><tbody><tr><td height="16px" style="font-size:16px;line-height:16px;">&#xA0;</td></tr></tbody></table> 
            
              <table class="row"><tbody><tr>
                <th class="small-12 large-12 columns first last"><table><tr><th>
                  <h4 class="text-center">Bienvenue</h4>
                  <p class="text-center">15 sections | 567 Min</p>
                </th>
<th class="expander"></th></tr></table></th>
              </tr></tbody></table>
            
              <hr>
            
              <table class="row"><tbody><tr>
                <th class="small-12 large-12 columns first last"><table><tr><th>
                  <p class="text-center">Pour finaliser votre inscription à <b>Famli Quest</b>, veuillez cliquer sur le bouton ci-dessous pour valider votre adresse mail.</p>
                  <center data-parsed="">
                    <table class="button success float-center"><tr><td><table><tr><td><a href="<%= callbackUrl %>">Cliquer ici pour confirmer votre adresse mail</a></td></tr></table></td></tr></table>
                  </center>
                </th>
<th class="expander"></th></tr></table></th>
              </tr></tbody></table>
            
              <table class="row collapsed footer"><tbody><tr>
                <th class="small-12 large-12 columns first last"><table><tr><th>
                  <table class="spacer"><tbody><tr><td height="16px" style="font-size:16px;line-height:16px;">&#xA0;</td></tr></tbody></table> 
                  <p class="text-center">@copywrite nobody<br>
                  <a href="#">hello@nocopywrite.com</a> | <a href="#">Manage Email Notifications</a> | <a href="#">Unsubscribe</a></p>
                  <center data-parsed="">
                    <table align="center" class="menu float-center"><tr><td><table><tr>
                      <th class="menu-item float-center"><a href="undefined"><img src="http://placehold.it/25/663399" alt=""></a></th>
                      <th class="menu-item float-center"><a href="undefined"><img src="http://placehold.it/25/663399" alt=""></a></th>
                      <th class="menu-item float-center"><a href="undefined"><img src="http://placehold.it/25/663399" alt=""></a></th>
                      <th class="menu-item float-center"><a href="undefined"><img src="http://placehold.it/25/663399" alt=""></a></th>
                      <th class="menu-item float-center"><a href="undefined"><img src="http://placehold.it/25/663399" alt=""></a></th>
                    </tr></table></td></tr></table>
                  </center>
                </th>
<th class="expander"></th></tr></table></th>
              </tr></tbody></table>
            
            </td></tr></tbody></table>
            
          </center>
        </td>
      </tr>
    </table>
    <!-- prevent Gmail on iOS font size manipulation -->
   <div style="display:none; white-space:nowrap; font:15px courier; line-height:0;"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
  </body>
</html>
`
