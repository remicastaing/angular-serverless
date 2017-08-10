'use strict'; 

export const ressetPasswordHtml = `

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">

<head>
    <link rel="stylesheet" type="text/css" href="css/app.css">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width">
    <title>My Password Email Template Subject</title>
    <!-- <style> -->
</head>

<body>
    <span class="preheader"></span>
    <table class="body">
        <tr>
            <td class="center" align="center" valign="top">
                <center data-parsed="">

                    <table align="center" class="container float-center">
                        <tbody>
                            <tr>
                                <td>

                                    <table class="row header">
                                        <tbody>
                                            <tr>
                                                <th class="small-12 large-12 columns first last">
                                                    <table>
                                                        <tr>
                                                            <th>

                                                                <table class="spacer">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td height="16px" style="font-size:16px;line-height:16px;">&#xA0;</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>

                                                                <h4 class="text-center"><%= tittle %></h4>
                                                            </th>
                                                            <th class="expander"></th>
                                                        </tr>
                                                    </table>
                                                </th>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table class="row">
                                        <tbody>
                                            <tr>
                                                <th class="small-12 large-12 columns first last">
                                                    <table>
                                                        <tr>
                                                            <th>

                                                                <table class="spacer">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td height="32px" style="font-size:32px;line-height:32px;">&#xA0;</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>

                                                                <center data-parsed="">
                                                                    <img src="http://placehold.it/250x250" align="center" class="float-center">
                                                                </center>

                                                                <table class="spacer">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td height="16px" style="font-size:16px;line-height:16px;">&#xA0;</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>

                                                                <h1 class="text-center">Forgot Your Password?</h1>

                                                                <table class="spacer">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td height="16px" style="font-size:16px;line-height:16px;">&#xA0;</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>

                                                                <p class="text-center">It happens. Click the link below to reset your password.</p>
                                                                <table class="button large expand">
                                                                    <tr>
                                                                        <td>
                                                                            <table>
                                                                                <tr>
                                                                                    <td>
                                                                                        <center data-parsed=""><a href="#" align="center" class="float-center">Reset Password</a></center>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                        <td class="expander"></td>
                                                                    </tr>
                                                                </table>

                                                                <hr>

                                                                <p><small>You're getting this email because you've signed up for email updates. If you want to opt-out of future emails, <a href="#">unsubscribe here</a>.</small></p>
                                                            </th>
                                                            <th class="expander"></th>
                                                        </tr>
                                                    </table>
                                                </th>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <table class="spacer">
                                        <tbody>
                                            <tr>
                                                <td height="16px" style="font-size:16px;line-height:16px;">&#xA0;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </center>
            </td>
        </tr>
    </table>
    <!-- prevent Gmail on iOS font size manipulation -->
    <div style="display:none; white-space:nowrap; font:15px courier; line-height:0;"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
</body>

</html>

`