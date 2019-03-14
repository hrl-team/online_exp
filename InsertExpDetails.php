<?php


include 'connectDB.php';

$EXPID = stripslashes(htmlspecialchars($_POST['expID']));
$ID = stripslashes(htmlspecialchars($_POST['id']));
$EXP = stripslashes(htmlspecialchars($_POST['exp']));
$BROW = stripslashes(htmlspecialchars($_POST['browser']));


$stmt = $db->prepare("INSERT INTO experiment_data VALUE(?,?,?,?,NOW())");
$stmt->bind_param("ssss",$EXPID,$ID,$EXP,$BROW);
$stmt->execute();
$err = $stmt->errno ;
$data[] = array(
      'ErrorNo' => $err,
    );
$stmt->close();
 $db->close();
echo json_encode($data);
 ?>
