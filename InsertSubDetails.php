<?php


include 'connectDB.php';
$ID = stripslashes(htmlspecialchars($_POST['id']));
$AGE = stripslashes(htmlspecialchars($_POST['age']));
$GEN = stripslashes(htmlspecialchars($_POST['gender']));
$COUNTRY = '';
$EDU = '';

$stmt = $db->prepare("INSERT INTO users VALUE(?,?,?,?,?,NOW())");
$stmt->bind_param("sisss",$ID,$AGE,$GEN,$COUNTRY,$EDU);
$stmt->execute();
$err = $stmt->errno ;
$data[] = array(
      'ErrorNo' => $err,
    );
$stmt->close();
 $db->close();
echo json_encode($data);
 ?>
