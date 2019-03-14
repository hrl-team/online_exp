<?php




$EXPID = stripslashes(htmlspecialchars($_POST['expID']));
$ID = stripslashes(htmlspecialchars($_POST['id']));
$EXP = stripslashes(htmlspecialchars($_POST['exp']));
$LOG = stripslashes(htmlspecialchars($_POST['log']));
$EXT = stripslashes(htmlspecialchars($_POST['ext']));


$myfile = fopen("log/" . $EXPID . "_" . $ID . "_" . $EXP . "." . $EXT, "w") or die("Unable to open file!");


fwrite($myfile, $LOG);
fclose($myfile);

$err = $myfile->errno ;
$data[] = array(
      'ErrorNo' => $err,
    );

echo json_encode($data);

 ?>
