<?php
  $count = 0;
  function get_current_options()
  {
    $contents = file_get_contents('options.json');
    $contents_array = json_decode($contents, TRUE);
    GLOBAL $count;
    foreach($contents_array as $an_array)
    {
      foreach($an_array as $key => $value)
      {
        if($key !== '')
        {
        if($value === 1)
          echo '<input type="text" name="tags[]" value="' . $key . '"><input type="checkbox" name="true[' . $count . ']" checked><br>';
        else
          echo '<input type="text" name="tags[]" value="' . $key . '"><input type="checkbox" name="true[' . $count . ']"><br>';
          
          $count++;
        }
      }
    }
  }
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>CodeMachine</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Le styles -->
    <link href="http://twitter.github.com/bootstrap/assets/css/bootstrap.css" rel="stylesheet">
    <style>
      body {
        padding-top: 60px; /* 60px to make the container go all the way to the bottom of the topbar */
      }
    </style>
    <link href="http://twitter.github.com/bootstrap/assets/css/bootstrap-responsive.css" rel="stylesheet">

    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <!-- Le fav and touch icons -->
    <link rel="shortcut icon" href="http://twitter.github.com/bootstrap/assets/ico/favicon.ico">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="http://twitter.github.com/bootstrap/assets/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="http://twitter.github.com/bootstrap/assets/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="http://twitter.github.com/bootstrap/assets/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="http://twitter.github.com/bootstrap/assets/ico/apple-touch-icon-57-precomposed.png">
  
    <script language="Javascript">
      function addInput(divName){
        var newdiv = document.createElement('div');
        newdiv.innerHTML = '<input type="text" name="tags[]" value=""><input type="checkbox" name="true[<?php echo $count;?>]"><br>';
        document.getElementById(divName).appendChild(newdiv);
        webcounter++;
    }
    </script>
  </head>

  <body>

    <div class="navbar navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          <a class="brand" href="#">CodeMachine</a>
          <div class="nav-collapse">
            <ul class="nav">
              <li class="active"><a href="#">Home</a></li>
            </ul>
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>

    <div class="container">

      <h1>Admin</h1>
      <p>Edit the options file, below.</p>
      
      <form action="write_json.php" method="post">
      <div id="options">
      <?php
        get_current_options();
      ?>
      </div>
      <input type="button" value="Add another option" onClick="addInput('options');"><br>
      <input type="submit" class="btn btn-success btn-large" value="Save Options" style="margin-top: 20px">
      </form>
      <div id="options">
      </div>
    </div> <!-- /container -->

    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="http://twitter.github.com/bootstrap/assets/js/jquery.js"></script>
    <script src="http://twitter.github.com/bootstrap/assets/js/bootstrap-transition.js"></script>
    <script src="http://twitter.github.com/bootstrap/assets/js/bootstrap-alert.js"></script>
    <script src="http://twitter.github.com/bootstrap/assets/js/bootstrap-modal.js"></script>
    <script src="http://twitter.github.com/bootstrap/assets/js/bootstrap-dropdown.js"></script>
    <script src="http://twitter.github.com/bootstrap/assets/js/bootstrap-scrollspy.js"></script>
    <script src="http://twitter.github.com/bootstrap/assets/js/bootstrap-tab.js"></script>
    <script src="http://twitter.github.com/bootstrap/assets/js/bootstrap-tooltip.js"></script>
    <script src="http://twitter.github.com/bootstrap/assets/js/bootstrap-popover.js"></script>
    <script src="http://twitter.github.com/bootstrap/assets/js/bootstrap-button.js"></script>
    <script src="http://twitter.github.com/bootstrap/assets/js/bootstrap-collapse.js"></script>
    <script src="http://twitter.github.com/bootstrap/assets/js/bootstrap-carousel.js"></script>
    <script src="http://twitter.github.com/bootstrap/assets/js/bootstrap-typeahead.js"></script>

  </body>
</html>
