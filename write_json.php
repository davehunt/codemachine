<?php
    $tags = $_POST['tags'];
    $true = $_POST['true'];
    $count = 0;
    $echoing = '[';
    
    foreach($_POST['tags'] as $a_tag)
    {
        if(isset($true[$count]))
        $echoing.= '{"' . $a_tag . '" : 1},';
        else
        $echoing.= '{"' . $a_tag . '" : 0},';
        
        $count++;
    }
    
    $echoing = substr($echoing, 0, -1);
    
    $echoing.= ']';
    
    unlink('options.json');
    
    $myfile = 'options.json';
    $fh = fopen($myfile, 'w');
    fwrite($fh, $echoing);
    fclose($fh);
    
    header( 'Location: admin.php' ) ;
?>