<?php


include 'connectDB.php';

$EXP = stripslashes(htmlspecialchars($_POST['exp']));
$EXPID = stripslashes(htmlspecialchars($_POST['expID']));
$ID = stripslashes(htmlspecialchars($_POST['id']));
$TRIAL = stripslashes(htmlspecialchars($_POST['trial']));
$OP1 = stripslashes(htmlspecialchars($_POST['option1']));
$OP2 = stripslashes(htmlspecialchars($_POST['option2']));
$V1 = stripslashes(htmlspecialchars($_POST['v1']));
$V2 = stripslashes(htmlspecialchars($_POST['v2']));
$CTIME = stripslashes(htmlspecialchars($_POST['choice_time']));
$CLR = stripslashes(htmlspecialchars($_POST['choice_left_right']));
$CGB = stripslashes(htmlspecialchars($_POST['choice_good_bad']));
$RTIME = stripslashes(htmlspecialchars($_POST['reaction_time']));

$stmt = $db->prepare("INSERT INTO post_learning_data VALUE(?,?,?,?,?,?,?,?,?,?,?,?,NOW())");
$stmt->bind_param("sssiiiddsiis", $EXP,$EXPID,$ID,$TRIAL,$OP1,$OP2,$V1,$V2,$CTIME,$CLR,$CGB,$RTIME);
$stmt->execute();
$err = $stmt->errno ;
$data[] = array(
      'ErrorNo' => $err,
    );
$stmt->close();
 $db->close();
echo json_encode($data);
 ?>
