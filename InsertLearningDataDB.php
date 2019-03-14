<?php


include 'connectDB.php';

$EXP = stripslashes(htmlspecialchars($_POST['exp']));
$EXPID = stripslashes(htmlspecialchars($_POST['expID']));
$ID = stripslashes(htmlspecialchars($_POST['id']));
$SESSION = stripslashes(htmlspecialchars($_POST['session']));
$TRIAL = stripslashes(htmlspecialchars($_POST['trial']));
$P1 = stripslashes(htmlspecialchars($_POST['p1']));
$P2 = stripslashes(htmlspecialchars($_POST['p2']));
$MAG = stripslashes(htmlspecialchars($_POST['magnitude']));
$VAL = stripslashes(htmlspecialchars($_POST['valence']));
$INF = stripslashes(htmlspecialchars($_POST['information']));
$OP1 = stripslashes(htmlspecialchars($_POST['option1']));
$OP2 = stripslashes(htmlspecialchars($_POST['option2']));
$INV = stripslashes(htmlspecialchars($_POST['inverted']));
$CTIME = stripslashes(htmlspecialchars($_POST['choice_time']));
$CLR = stripslashes(htmlspecialchars($_POST['choice_left_right']));
$CGB = stripslashes(htmlspecialchars($_POST['choice_good_bad']));
$RGB = stripslashes(htmlspecialchars($_POST['reward_good_bad']));
$CFGB = stripslashes(htmlspecialchars($_POST['other_reward_good_bad']));
$RTIME = stripslashes(htmlspecialchars($_POST['reaction_time']));




$stmt = $db->prepare("INSERT INTO learning_data VALUE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW())");
$stmt->bind_param("sssiidddiiiiisiiiis", $EXP,$EXPID,$ID,$SESSION,$TRIAL,$P1,$P2,$MAG,$VAL,$INF,$OP1,$OP2,$INV,$CTIME,$CLR,$CGB,$RGB,$CFGB,$RTIME);
$stmt->execute();
$err = $stmt->errno ;
$data[] = array(
      'ErrorNo' => $err,
    );
$stmt->close();
 $db->close();
echo json_encode($data);
 ?>
