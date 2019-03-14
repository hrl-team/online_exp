<?php


include 'connectDB.php';

$EXP = stripslashes(htmlspecialchars($_POST['exp']));
$EXPID = stripslashes(htmlspecialchars($_POST['expID']));
$ID = stripslashes(htmlspecialchars($_POST['id']));
$QUESTIONNAIRE = stripslashes(htmlspecialchars($_POST['qid']));
$ITEM = stripslashes(htmlspecialchars($_POST['item']));
$ANSWER = stripslashes(htmlspecialchars($_POST['ans']));
$VAL = stripslashes(htmlspecialchars($_POST['val']));
$RTIME = stripslashes(htmlspecialchars($_POST['reaction_time']));

$stmt = $db->prepare("INSERT INTO questionnaire_data VALUE(?,?,?,?,?,?,?,?,NOW())");
$stmt->bind_param("ssssiiis",$EXP,$EXPID,$ID,$QUESTIONNAIRE,$ITEM,$ANSWER,$VAL,$RTIME);
$stmt->execute();
$err = $stmt->errno ;
$data[] = array(
      'ErrorNo' => $err,
    );
$stmt->close();
 $db->close();
echo json_encode($data);
 ?>
