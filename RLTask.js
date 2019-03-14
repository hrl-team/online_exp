$(document).ready(function() {
    
    
    //Initial Experiment Parameters
    var ExpName = 'ipsostask';
    var Language = "fr";
    var CompLink = 1;
    var NumSessions = 2;
    var PostLearning = 0;
    var Questionnaire = 0;
    var MaxTrainingSessions = 2;
    var NbTrainingTrials = 3;
    var TrialsPerCondition = 20;
    var StatesPerCondition = 2;
    var InterLeaved = 0;
    
    
    var IMGPath = 'images/cards_gif/';
    var NbIMG = 24;
    var IMGExt = 'gif';


    var fb_dur = 1000;
    var border_color = "white";
    
    //On calcule les différentes conditions possibles
    var Conditions = [[0.75,0.25,1,1,0,],[0.75,0.25,1,1,1,],[0.75,0.25,1,-1,0,],[0.75,0.25,1,-1,1,],];


    var MagCond = [1,];
    var ValCond = [1,-1,];
    var InfCond = [0,1,];
    

    var TrainingConditions = Conditions.slice(0);//copy
    var NumTrainingCond = TrainingConditions.length;

    //console.log(TrainingConditions);
    
    

    //console.log(TrainingConditions);
    
    var Conds = [];
    for (j = 0; j < StatesPerCondition; j++) {
	Conditions = shuffle(Conditions);
	for (i = 0; i < Conditions.length; i++) {
	    Conds.push(Conditions[i]);
	}
    }

    Conditions = Conds;

    //console.log(Conditions);
    
    //Nombre de conditions en fonction de la magnitude, la valence, l'information et le stimulus
    var NumCond = Conditions.length;


    var NumCondPerSession = NumCond/NumSessions; 


    var NumTrials = TrialsPerCondition*NumCond/NumSessions;



   //  ///juste pour ipsos
   //  colors = ["red","green","blue","yellow","purple"];
   //  shapes = ["circle","square","triangle","pentagone","star","cross"];

   //  available_options = [];
   //  for (var i = 0;i<colors.length;i++){
   // 	for (var j = 0;j<shapes.length;j++){
   // 	    available_options.push([colors[i],shapes[j]]);
   // 	}
   //  }

   //  //console.log(available_options);
    
   //  //On les randomise
   //  available_options = shuffle(available_options);



    
   // //console.log(Conditions.toString());
   // //On affecte un couple d'options pour chaque condition
   //  var AllOptions = [];
   //  var AllOptionValues = [];
   //  var Options = [];
   //  for (var i=0;i<NumCond;i++){

   // 	op1 = Math.floor((Math.random() * available_options.length));
   // 	col1 = available_options[op1][0];
   // 	sha1 = available_options[op1][1];
   // 	//console.log(col1+"_"+sha1);
   // 	do {
   // 	    op2 = Math.floor((Math.random() * available_options.length));
   // 	    col2 = available_options[op2][0];
   // 	    sha2 = available_options[op2][1];
	    
   // 	}
   // 	while (col2==col1 || sha2==sha1 || (col1=="red" && col2 =="green") || (col1=="green" && col2 =="red"));

   // 	available_options.splice(op1,1);
   // 	available_options.splice(op2,1);

   // 	op1 = col1+"_"+sha1;
   // 	op2 = col2+"_"+sha2;
	
   // 	Options.push([op1,op2]);
   // 	AllOptions.push(op1);
   // 	AllOptions.push(op2);
	
   // 	AllOptionValues.push(Value(Conditions[i],0));
   // 	AllOptionValues.push(Value(Conditions[i],1));
   //  }
    
   //  var TrainingOptions = [];
   //  for (var i=NumCond;i<NumCond+NumTrainingCond;i++){

   // 	op1 = Math.floor((Math.random() * available_options.length));
   // 	col1 = available_options[op1][0];
   // 	sha1 = available_options[op1][1];	
   // 	do {
   // 	    op2 = Math.floor((Math.random() * available_options.length));
   // 	    col2 = available_options[op2][0];
   // 	    sha2 = available_options[op2][1];
	
   // 	}
   // 	while (col2==col1 || sha2==sha1 || (col1=="red" && col2 =="green") || (col1=="green" && col2 =="red"));

   // 	available_options.splice(op1,1);
   // 	available_options.splice(op2,1);

   // 	op1 = col1+"_"+sha1;
   // 	op2 = col2+"_"+sha2;
	
   // 	TrainingOptions.push([op1,op2]);

   //  }


    
    // On recupere les options disponibles
    var images=[];
    var available_options = [];
    for (var i = 1; i <= NbIMG; i++){
	available_options.push(i);
	images[i] = new Image();
	images[i].src = IMGPath+'stim/'+i+'.'+IMGExt;
	images[i].className = "img-responsive center-block";
	images[i].style.border="5px solid "+ border_color;
	images[i].style.position="relative";
	images[i].style.top="0px";

    }

    fbs = ["empty","0","1","-1","cf_0","cf_1","cf_-1"];
    var fb_images = [];
    for (var i = 0; i < fbs.length; i++){
	fb = fbs[i];
	fb_images[fb] = new Image();
	fb_images[fb].src = IMGPath+'fb/'+fb+'.'+IMGExt;
	fb_images[fb].className = "img-responsive center-block";
	fb_images[fb].style.border="5px solid "+ border_color;
	fb_images[fb].style.position="relative";
	fb_images[fb].style.top="0px";
    }
    
    //console.log(images);

    //On les randomise
    available_options = shuffle(available_options);

    // console.log(TrainingOptions.toString());
    // console.log(Options.toString());

    //console.log(Conditions.toString());

   // //On affecte un couple d'options pour chaque condition
    var AllOptions = [];
    var AllOptionValues = [];
    var Options = [];
    for (var i=0;i<NumCond;i++){
    	Options.push([available_options[2*i],available_options[2*i+1]]);
    	AllOptions.push(available_options[2*i]);
    	AllOptions.push(available_options[2*i+1]);
    	AllOptionValues.push(Value(Conditions[i],0));
    	AllOptionValues.push(Value(Conditions[i],1));
    }
    var TrainingOptions = [];
    for (var i=NumCond;i<NumCond+NumTrainingCond/2;i++){
    	TrainingOptions.push([available_options[2*i],available_options[2*i+1]]);
    	TrainingOptions.push([available_options[2*i],available_options[2*i+1]]);
    }
    //console.log(TrainingOptions.toString());




    

    function Value(cond,o){
    	P = cond[o];
    	Mag = cond[2];
    	Val = cond[3];

    	if(Val>0){
    	    return parseInt(P*Mag*1000)/1000;
    	}else if(Val <0){
    	    return parseInt(-(1-P)*Mag*1000)/1000;
    	}else{
    	    return parseInt( (P*Mag-(1-P)*Mag) *1000)/1000;
    	}
    }

    
    // console.log(TrainingCond);
    // console.log(TrainingOptions);
    
    //construire postlearning
    var PLOptions = [];
    var PLOptionValues = [];
    var indexes = [];
    var k = 0;
    for(var i = 0;i<NumCond*2;i++){
    	for(var j = 0;j<NumCond*2;j++){
    // for(var i = 0;i<2;i++){
    // 	for(var j = 0;j<2;j++){
	    if (i!=j){
		PLOptions.push([AllOptions[i],AllOptions[j]]);
		PLOptionValues.push([AllOptionValues[i],AllOptionValues[j]]);
		indexes.push(k);
		k++;

		//montrer deux fois chaque paire dans un ordre particulier
		PLOptions.push([AllOptions[i],AllOptions[j]]);
		PLOptionValues.push([AllOptionValues[i],AllOptionValues[j]]);
		indexes.push(k);
		k++;

	    }
	}
    }

    
    indexes = shuffle(indexes);

    
    var PostLearningOptions = [];
    var PostLearningOptionValues = [];
    for(var i = 0;i<indexes.length;i++){
	PostLearningOptions.push(PLOptions[indexes[i]]);
	PostLearningOptionValues.push(PLOptionValues[indexes[i]]);
    }

    //console.log(PostLearningOptionValues);

    var NumPostLearningTrials = PostLearningOptions.length;

    //Construire les trials a priori? oui parceque chaque condition doit etre tiree un nombre exacte de fois
    var Sessions = [];
    for (s = 0; s < NumSessions; s++) {
	Sessions[s] = [];

	for (c = 0; c < NumCondPerSession; c++) {
    	    for (t = 0; t < TrialsPerCondition; t++) {
    		Sessions[s].push([Conditions[s*NumCondPerSession+c],Options[s*NumCondPerSession+c]]);
	    }
	}

	if(InterLeaved){
	    while (hasRepetitiveValues(Sessions[s],5)){
		Sessions[s]=shuffle(Sessions[s])
            }	    
	}
    
    }
    

    //Construire training
    var TrainingSession = [];
    for (c = 0; c < NumTrainingCond; c++) {
    	for (t = 0; t < NbTrainingTrials; t++) {
    	    TrainingSession.push([TrainingConditions[c],TrainingOptions[c]]);
    	}	
    }
    // if (InterLeaved){
    // 	TrainingSession = shuffle(TrainingSession);
    //}
    //    console.log(TrainingConditions);


    

    var SumReward = 0;
    var TotalReward = 0;

    var Init_time = (new Date()).getTime();

    var ExpID = CreateCode(); //utiliser expId comme identifiant supplementaire?

    //InitDB();

    // Initial Display Parameters
    // var thisHeight = $(document).height() * 0.9;
    // var thisWidth = thisHeight * 4 / 3;

    // var DispWidth = thisHeight * 5 / 6;

    // $('#Main').css('min-height', thisHeight);
    // $('#Main').css('width', thisWidth);


    var InvertedPosition = 0;
    var clickDisabeled = false;
    var TrainSess = -1;
    var maxDBCalls = 1;
    var browsInfo = GetOS()+' - '+GetBrowser();


    var log = '';
    var clog = '';
    
    var SubID = ExpID;


    var link = '';
    
    url = location.href;
    //console.log(url);
    if(url.split("?").length>1){
	SubID = url.split("?id=")[1].split("&link=")[0]
	link = url.split("&link=")[1]
	
	// args = url.split("?")[1].split("&")
	// for (i = 0; i < args.length; i++) {
	//     arg = args[i].split("=")[0];
	//     val = args[i].split("=")[1];
	//     if(arg=='id')
	// 	SubID=val;
	//     else if (arg=='link')
	// 	link=val;
	// }
	//EndExperiment();
	//console.log(SubID);
	//console.log(link);
	Information();
    }
    
    // if(args.length>1 && args[1].split("=").length>1 && args[1].split("=")[0]=="id"){
    // 	SubID = args[1].split("=")[1];
    // 	Information();
    // }
    else{
    	GetUserID();
    }
    //console.log(SubID);

    //Start experiment
    //GetUserID();
    //Information();

    
    // var SubID =  ExpID;
    // SendExpDataDB(0);
    // PlaySessions(0);

    // PlayTraining(0);
    //StartSessions();
    //StartPostLearning(1);
    //Instructions(1);
    //StartQuestionnaire();
    //GetUserInfo();
    //EndExperiment();
    
  
    

    function GetBrowser(){

	var nVer = navigator.appVersion;
	var nAgt = navigator.userAgent;
	var browserName  = navigator.appName;
	var fullVersion  = ''+parseFloat(navigator.appVersion);
	var majorVersion = parseInt(navigator.appVersion,10);
	var nameOffset,verOffset,ix;

	// In Opera, the true version is after "Opera" or after "Version"
	if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
	    browserName = "Opera";
	    fullVersion = nAgt.substring(verOffset+6);
	    if ((verOffset=nAgt.indexOf("Version"))!=-1)
		fullVersion = nAgt.substring(verOffset+8);
	}
	// In MSIE, the true version is after "MSIE" in userAgent
	else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
	    browserName = "Microsoft Internet Explorer";
	    fullVersion = nAgt.substring(verOffset+5);
	}
	// In Chrome, the true version is after "Chrome"
	else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
	    browserName = "Chrome";
	    fullVersion = nAgt.substring(verOffset+7);
	}
	// In Safari, the true version is after "Safari" or after "Version"
	else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
	    browserName = "Safari";
	    fullVersion = nAgt.substring(verOffset+7);
	    if ((verOffset=nAgt.indexOf("Version"))!=-1)
		fullVersion = nAgt.substring(verOffset+8);
	}
	// In Firefox, the true version is after "Firefox"
	else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
	    browserName = "Firefox";
	    fullVersion = nAgt.substring(verOffset+8);
	}
	// In most other browsers, "name/version" is at the end of userAgent
	else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) <
		  (verOffset=nAgt.lastIndexOf('/')) )
	{
	    browserName = nAgt.substring(nameOffset,verOffset);
	    fullVersion = nAgt.substring(verOffset+1);
	    if (browserName.toLowerCase()==browserName.toUpperCase()) {
		browserName = navigator.appName;
	    }
	}
	// trim the fullVersion string at semicolon/space if present
	if ((ix=fullVersion.indexOf(";"))!=-1)
	    fullVersion=fullVersion.substring(0,ix);
	if ((ix=fullVersion.indexOf(" "))!=-1)
	    fullVersion=fullVersion.substring(0,ix);

	majorVersion = parseInt(''+fullVersion,10);
	if (isNaN(majorVersion)) {
	    fullVersion  = ''+parseFloat(navigator.appVersion);
	    majorVersion = parseInt(navigator.appVersion,10);
	}
	
	//return   'Browser: '+browserName+' - Vers:'+fullVersion+' - MajorVers: '+majorVersion+' - NavAppName: '+navigator.appName+' - NavUserAge: '+navigator.userAgent;
	return   browserName+' '+fullVersion+' '+majorVersion+' '+navigator.appName+' '+navigator.userAgent;
	
    }


    function GetOS(){
	var OSName="Unknown OS";
	if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
	if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
	if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
	if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

	return OSName;
    }


    
    
    // Experiment Functions
    function GetUserID() {


        // $('#Top').css('height', thisHeight / 20);
        // $('#Stage').css('width', DispWidth);
        // $('#Stage').css('min-height', thisHeight * 17 / 20);
        // $('#Bottom').css('min-height', thisHeight / 20);

        CreateDiv('Stage', 'TextBoxDiv');
	
	if(Language=='en'){
            var Title = '<H3 align = "justify">Before you start, please:<br><br>- maximize your browser window<br><br>- switch off phone/e-mail/music & anything else distracting<br><br>- and please enter your Prolific ID: <input type="text" id = "textbox_id" name="ID"></H3>';
	    var Buttons = '<div align="center"><input align="center" type="button"  class="btn btn-default" id="toConsent" value="Next" ></div>';
	}
	else if(Language=='fr'){
	    //var Title = '<H3>Avant de commencer, veuillez:<br><br>- maximiser la fenêtre de votre navigateur<br><br>- désactiver téléphone/email/musique et toute autre distration<br><br>- renseigner votre identifiant IPSOS: <input type="text" id = "textbox_id" name="ID"></H3>';
	    var Title = '<H3>Veuillez choisir un identifiant: <input type="text" id = "textbox_id" name="ID"></H3>';
	    var Buttons = '<div align="center"><input align="center" type="button"  class="btn btn-default" id="toConsent" value="Suivant" ></div>';
	}
	var TextInput = '';
        $('#TextBoxDiv').html(Title+TextInput);


        
        $('#Bottom').html(Buttons);

        $('#toConsent').click(function() {

	    if(document.getElementById('textbox_id').value!=''){
		
		SubID = document.getElementById('textbox_id').value;
		$('#TextBoxDiv').remove();
		$('#Stage').empty();
		$('#Bottom').empty();

		//Instructions(1);//move to first page of instructions
		Information();
		//PlayQuestionnaire(1);
		//EndExperiment();
	    }else{
		alert('You must enter your Prolific ID.');
	    }
        });
    };

    
    
    // Experiment Functions
    function Information() {


        // $('#Top').css('height', thisHeight / 20);
        // $('#Stage').css('width', DispWidth);
        // $('#Stage').css('min-height', thisHeight * 17 / 20);
        // $('#Bottom').css('min-height', thisHeight / 20);

        CreateDiv('Stage', 'TextBoxDiv');
	//document.getElementById("TextBoxDiv").style.backgroundColor = "#DCDCDC";

        var Title = '<H2 align = "center"></H2>';
        var Info = '<H3 align = "justify">Dans ce jeu, vous devez gagner un maximum de points en découvrant quelles cartes ont le plus de chance de vous faire gagner des points... ou de vous en faire perdre !<br><br>Pour chacun de vos choix, vous verrez combien de points vous avez gagné ou perdu.<br><br>Parfois, vous verrez aussi combien vous auriez gagné ou perdu si vous aviez choisi l\'autre carte.<br><br>Commençons par un petit entraînement !</H3>';

        $('#TextBoxDiv').html(Title + Info);
	
	if(Language=='en'){
            var Buttons = '<div align="center"><input align="center" type="button"  class="btn btn-default" id="toConsent" value="Next" ></div>';
	}
	else if(Language=='fr'){
	    var Buttons = '<div align="center"><input align="center" type="button"  class="btn btn-default" id="toConsent" value="Suivant" ></div>';
	}

	
        $('#Bottom').html(Buttons);

        $('#toConsent').click(function() {

            $('#TextBoxDiv').remove();
            $('#Stage').empty();
            $('#Bottom').empty();
            //Consent();
	    SendExpDataDB(0);
	    PlayTraining(0);
	    
        });
    };

    function Consent() {


        // $('#Top').css('height', thisHeight / 20);
        // $('#Stage').css('width', DispWidth);
        // $('#Stage').css('min-height', thisHeight * 17 / 20);
        // $('#Bottom').css('min-height', thisHeight / 20);

        CreateDiv('Stage', 'TextBoxDiv');

        var Title = '<H2 align = "center">Consentement</H2><br>';
        var Info = '<H3>Veuillez confirmer les affirmations suivantes avant de commencer l\'expérience</H3><br><br>';
        var Ticks ='<input type="checkbox" name="consent" value="consent1" >J\'ai plus de 18 ans<br>' + '<input type="checkbox" name="consent" value="consent2" >Je comprends que je suis libre d\'arrêter l\'expérience à tout moment, sans devoir me justifier, et sans encourir aucune pénalité<br>' ;

        $('#TextBoxDiv').html(Title + Info + Ticks);

 	if(Language=='en'){
            var Buttons = '<div align="center"><input align="center" type="button"  class="btn btn-default" id="toInstructions" value="Next" ></div>';
	}
	else if(Language=='fr'){
	    var Buttons = '<div align="center"><input align="center" type="button"  class="btn btn-default" id="toInstructions" value="Suivant" ></div>';
	}
        $('#Bottom').html(Buttons);

        $('#toInstructions').click(function() {
            if ($("input:checkbox:not(:checked)").length > 0) {
                alert('You must tick all check boxes to continue.');

            } else {
                $('#TextBoxDiv').remove();
                $('#Stage').empty();
                $('#Bottom').empty();
                SubID = GetUserID();
		
            }
            ;
        });
    };

    function Instructions(PageNum) {


        // $('#Top').css('height', thisHeight / 20);
        // $('#Stage').css('width', DispWidth);
        // $('#Stage').css('min-height', thisHeight * 17 / 20);
        // $('#Bottom').css('min-height', thisHeight / 20);
	// var PicHeight = DispWidth / 2;

	var NumPages = 11;//number of pages
        

        CreateDiv('Stage', 'TextBoxDiv');

        var Title = '<H2 align = "center">Instructions</H2>';
	var flag='';
	var FB='';
	var CFB='';

        switch (PageNum) {
	case 1:
		var Info = '<H3 align="center">Cette expérience est divisée en 2 sessions, comprenant 20 essais chacune. La première session sera précédée d\'une session d\'entrainement de 20 essais.</h3><br><br>';
		flag='noimg';
		FB='';
		CFB='';
		break;
	
	case 2:
		var Info = '<H3 align="center">Dans chaque essai, vous devrez choisir un symbole parmi deux.</h3><br><br>';
		flag='1';
		FB='';
		CFB='';
		break;
	
	case 3:
		var Info = '<H3 align="center">Certains symboles <b>vous font SOUVENT GAGNER</b> des points ...</h3><br><br>';
		flag='1';
		FB='+1';
		CFB='?';
		break;
	
	case 4:
		var Info = '<H3 align="center">... alors que d\'autres <b>vous font RAREMENT GAGNER</b> des points.</h3><br><br>';
		flag='1';
		FB='?';
		CFB='0';
		break;
	
	case 5:
		var Info = '<H3 align="center">Il y a aussi des symboles qui <b>vous font SOUVENT PERDRE</b> des points ...</h3><br><br>';
		flag='2';
		FB='-1';
		CFB='?';
		break;
	
	case 6:
		var Info = '<H3 align="center">... et d\'autres qui <b>vous font RAREMENT PERDRE</b> des points.</h3><br><br>';
		flag='2';
		FB='?';
		CFB='0';
		break;
	
	case 7:
		var Info = '<H3 align="center">Parfois, le résultat correspondant au symbole non choisi sera aussi affiché.</h3><br><br>';
		flag='3';
		FB='';
		CFB='';
		break;
	
	case 8:
		var Info = '<H3 align="center">Par exemple, en choisissant le symbole à gauche vous gagneriez 0 points, tandis que vous auriez gagné 1 point si vous aviez choisi celui à droite.</h3><br><br>';
		flag='3';
		FB='0';
		CFB='+1';
		break;
	
	case 9:
		var Info = '<H3 align="center">De même, ici vous gagneriez 0 points alors que vous pourriez perdre 1 point en choisissant l\'autre symbole.</h3><br><br>';
		flag='4';
		FB='0';
		CFB='-1';
		break;
	
	case 10:
		var Info = '<H3 align="center">Essayez de gagner la maximum de points possibles<br>en choisissant les symboles qui vous font<br><br><b>GAGNER SOUVENT</b><br><br>et ceux qui vous font<br><br><b>PERDRE RAREMENT</b></h3><br><br>';
		flag='';
		FB='';
		CFB='';
		break;
	
	case 11:
		var Info = '<H3 align="center">Avant de commencer l\'expérience, nous vous proposons quelques exemples pour vous entrainer.</h3><br><br>';
		flag='noimg';
		FB='';
		CFB='';
		break;
	default:
            var Info;
            break;
        }
        ;

        //var ThisImage = '<div align = "center"><img src="images/Inst' + PageNum + '.png" alt="" height="' + PicHeight + '" align="center"><br><br></div>';

	FBcolor = getColor(parseFloat(FB));
	CFBcolor = getColor(parseFloat(CFB));
	
	var counterfact = !isNaN(parseFloat(FB)) && !isNaN(parseFloat(CFB));
	if (counterfact){
	    CFBcolor = border_color;
	}
	var condimg = parseInt(flag);
	//console.log(parseInt(FB));


	if(isNaN(condimg)){
	    //if(flag=='noimg'){
	    $('#TextBoxDiv').html(Title + Info);
	    // $('#leftfb').css("visibility", "hidden");
	    // $('#rightfb').css("visibility", "hidden");
	    // $('#leftimg').css("visibility", "hidden");
	    // $('#rightimg').css("visibility", "hidden");
	    
	}else{
	    
	    var Option1 = '<img id = "Option1" id = "Option1" src="'+IMGPath+'stim/'+TrainingOptions[condimg-1][0]+'.'+IMGExt+'" style="border:5px solid '+ FBcolor+'">';
            var Option2 = '<img id = "Option1" id = "Option2" src="'+IMGPath+'stim/'+TrainingOptions[condimg-1][1]+'.'+IMGExt+'" style="border:5px solid '+CFBcolor+'">';
	    	    
	    // $(Option1).css({"border-color": color,
	    // 			"border-width": "5px",
	    // 			"border-style": "solid"});

            var ThisImage = '</br></br><div class="row">  <div class="col-md-1"></div>  <div id = "leftimg" class="col-md-3" align = "center">' + Option1 + '</div><div id = "Middle" class="col-md-4"></div><div id="rightimg" class="col-md-3" align = "center">' + Option2 + '</div><div class="col-md-1"></div></div>';	
	    
            var Feedback = '<div class="row">  <div class="col-md-1"> </div> <div id = "leftfb" class="col-md-3" align = "center"><font size="5">' + FB + '</font></div> <div  id = "Middle"  class="col-md-4"></div><div id="rightfb" class="col-md-3" align = "center"> <font size="5">' + CFB + '</font> </div> <div  class="col-md-1"> </div> </div>';

	    $('#TextBoxDiv').html(Title + ThisImage + Feedback + Info);
	}


	//document.getElementById("Option1").style.borderColor=color;
	
	// if (PageNum >= 2) {
	//     $('#left').css("visibility", "visible");
	//     $('#right').css("visibility", "visible");
	//     document.getElementById("Option1").style.borderColor="hsla(120, 100%, 50%,1)";
	//     // document.getElementById("Option1").style.borderWidth="5px";
	//     // document.getElementById("Option1").style.borderStyle="solid";
	// }
	
        var Buttons = '<div align="center"><input align="center" type="button"  class="btn btn-default" id="Back" value="Back" >\n\
<input align="center" type="button"  class="btn btn-default" id="Next" value="Next" >\n\
<input align="center" type="button"  class="btn btn-default" id="Start" value="Start!" ></div>';
	
	if(Language=='en'){
            var Buttons = '<div align="center"><input align="center" type="button"  class="btn btn-default" id="Back" value="Back" >\n\
<input align="center" type="button"  class="btn btn-default" id="Next" value="Next" >\n\
<input align="center" type="button"  class="btn btn-default" id="Start" value="Start!" ></div>';
	
	}
	else if(Language=='fr'){
	    var Buttons = '<div align="center"><input align="center" type="button"  class="btn btn-default" id="Back" value="Précédent" >\n\
<input align="center" type="button"  class="btn btn-default" id="Next" value="Suivant" >\n\
<input align="center" type="button"  class="btn btn-default" id="Start" value="Commencer!" ></div>';
	    
	}

        $('#Bottom').html(Buttons);

	
	
        if (PageNum === 1) {
            $('#Back').hide();
        }
        ;
        if (PageNum === NumPages) {
            $('#Next').hide();
        }
        ;
        if (PageNum < NumPages) {
            $('#Start').hide();
        }
        ;


        $('#Back').click(function() {

            $('#TextBoxDiv').remove();
            $('#Stage').empty();
            $('#Bottom').empty();
            Instructions(PageNum - 1);

        });
        $('#Next').click(function() {

            $('#TextBoxDiv').remove();
            $('#Stage').empty();
            $('#Bottom').empty();
            Instructions(PageNum + 1);

        });
        $('#Start').click(function() {

            $('#TextBoxDiv').remove();
            $('#Stage').empty();
            $('#Bottom').empty();
	    
	    SendExpDataDB(0);
	    PlayTraining(0);
	    


        });

    };

    
    function SendExpDataDB(call){
    	clog = 'EXP: '+ExpName+' $ EXPID: '+ExpID+' $ ID: '+SubID+' $ BROW: '+browsInfo;
	//tosend: ID, questionnaire, question, answer
    	$.ajax({
    	    type: 'POST',
    	    data: {expID: ExpID, id: SubID, exp: ExpName, browser: browsInfo},
    	    //data: {expID: 'a', id: 'b', exp: 'c', browser: 'd'},
    	    async: true,
    	    url: 'InsertExpDetails.php',
    	    dataType: 'json',
    	    success: function(r) {
    		//clog = 'expdata: sucess $ '+clog+' $ call: '+call+' $ errno: '+r[0].ErrNo+'\n';
		clog = 'experiment_data $ '+clog+' $ dbcall success \n';
    		log+= clog;
		InsertLog(0,'exp');

    		if (r[0].ErrorNo > 0 && call+1<maxDBCalls){
    		    //SendErrorDB(cl);
    		    SendExpDataDB(call+1);
    		}
    	    },
    	    error: function(XMLHttpRequest, textStatus, errorThrown) {
    		//clog='expdata: error $ '+clog+' $ call: '+call+' $ stat: '+textStatus+' $ err: '+errorThrown+'\n';
    		clog = 'experiment_data $ '+clog+' $ dbcall failure \n';
		log+=clog;
    		InsertLog(0,'exp');

    		if(call+1<maxDBCalls){
    		    //SendErrorDB(cl);
    		    SendExpDataDB(call+1);
    		}
    		//alert("Status DB: "+ call+" "+ textStatus);
    		//alert("Error: " + errorThrown);
    	    },
	    // complete: function (data) {

	    // }
    	});
    }

    

    function InsertLog(call,ext){
    	//tosend: ID, questionnaire, question, answer
    	$.ajax({
    	    type: 'POST',
	    data: {expID: ExpID, id: SubID, exp: ExpName, log:log, ext:ext},
	    //data: {expID: 1, id: 2, exp: 3, log:log, ext:5},
	    async: true,
    	    url: 'InsertLog.php',
    	    dataType: 'json',
	    // success: function(r) {
	    // 	// cl = 'insertlog: sucess - expid: '+ExpID+' - id: '+SubID+' - exp: '+ExpName+' - call: '+call+'\n';//+' - errno: '+r[0].ErrNo+'\n';
	    // 	// log+= cl;
	    // 	//console.log(log);
	    // 	// if (r[0].ErrorNo > 0 && call+1<maxDBCalls){
	    // 	//     //SendErrorDB(cl);
	    // 	//     InsertLog(call+1,ext);
	    // 	// }
	    // },
    	    error: function(XMLHttpRequest, textStatus, errorThrown) {
    	    	clog='insertlog failure call '+call+' - status: '+textStatus+' - error: '+errorThrown+'\n';
    	    	log+=clog;
	    	//console.log(log);
	    	// if(call+1<maxDBCalls){
	    	//     InsertLog(call+1,ext);
	    	// }
    	    	//console.log(log);
    	    	//alert("Status log: "+ call+" " + textStatus);
    	    	//alert("Error: " + errorThrown);
		msg ="Internet connection";
		if(Language=='en'){
		    msg ="Please verify your internet connection before continuing the experiment";
		}
		else if(Language=='fr'){
		    msg="Veuillez vérifier votre connexion internet avant de continuer";
		}
		//console.log(clog);
		//alert(msg);
		InsertLog(call+1,ext);
    	    }
    	});
    }
    

    // $sep = " $ ";
    // $myfile = fopen("log/" . $EXPID . "_" . $ID . "_" . $EXP . ".exp", "w") or die("Unable to open file!");
    // $txt = $EXPID . $sep . $ID . $sep . $EXP . $sep . $BROW . $sep . $TIME . "\n";
    // fwrite($myfile, $txt);
    // fclose($myfile);

    //     $sep = " $ ";
    // $myfile = fopen("log/" . $EXPID . "_" . $ID . "_" . $EXP . ".learn", "w") or die("Unable to open file!");
    // $txt = $EXPID . $sep . $ID . $sep . $EXP . $sep . $SESSION . $sep . $TRIAL . $sep . $P1 . $sep . $P2 . $sep . $MAG . $sep . $VAL . $sep . $INF . $sep . $OP1 . $sep . $OP2 . $sep . $INV . $sep . $CTIME . $sep . $CLR  . $sep . $CGB  . $sep . $RGB . $sep . $CFGB . $sep . $RTIME . $sep . $TIME . "\n";
    // fwrite($myfile, $txt);
    // fclose($myfile);

    

    

    function PlayTraining(TrialNum) {


        // $('#Top').css('height', thisHeight / 20);
        // $('#Stage').css('width', DispWidth);
        // $('#Stage').css('min-height', thisHeight * 17 / 20);
        // $('#Bottom').css('min-height', thisHeight / 20);

	
	
	if($('#TextBoxDiv').length == 0){
            CreateDiv('Stage', 'TextBoxDiv');
	    document.getElementById("TextBoxDiv").style.backgroundColor = "white";
	}
	//Choisir une condition
	
	var Condition = TrainingSession[TrialNum][0];
	var Option = TrainingSession[TrialNum][1];

	//console.log(IMGPath+Option[0]+'.'+IMGExt);

	//var Option1 = '<img id = "Option1" src="'+IMGPath+'stim/'+Option[0]+'.'+IMGExt+'" class="img-responsive center-block" style="border:5px solid '+ border_color +'; position:relative; top:0px">';
        //var Option2 = '<img id = "Option2" src="'+IMGPath+'stim/'+Option[1]+'.'+IMGExt+'" class="img-responsive center-block" style="border:5px solid '+ border_color +'; position:relative; top:0px">';

	
	var Option1 = images[Option[0]];
	Option1.id = "Option1";
	Option1 = Option1.outerHTML;
	
	var Option2 = images[Option[1]];
	Option2.id = "Option2";
	Option2 = Option2.outerHTML;


	// var FB1 = '<img id = "FB1" src="'+IMGPath+'fb/empty.' +IMGExt+'" class="img-responsive center-block" style="border:5px solid '+ border_color +'">';
        // var FB2 = '<img id = "FB2" src="'+IMGPath+'fb/empty.'+IMGExt+'" class="img-responsive center-block" style="border:5px solid '+ border_color +'">';

	var FB1 = fb_images["empty"];
	FB1.id = "FB1";
	FB1 = FB1.outerHTML;
	
        var FB2 = fb_images["empty"];
	FB2.id = "FB2";
	FB2 = FB2.outerHTML;
	
	//var Title = '<div id = "Title"><H2 align = "center">Condition '+Condition[0]*Condition[1]+' '+Condition[2]+'<br><br><br><br></H2></div>';

	//var Title = '<div id = "Title"><H2 align = "center">Choose one symbol<br></H2></div>';
	//var Info = '<div id = "Title"><H3 align = "center">Press [e] for left and [p] for right<br><br><br></H3></div>';

	//var Title = '<div id = "Title"><H2 align = "center">Choisissez une carte<br><br><br><br></H2></div>';

	if(Language=='en'){
            var Title = '<div id = "Title"><H2 align = "center">Click on the card of your choice<br><br><br><br></H2></div>';
	}
	else if(Language=='fr'){
	    var Title = '<div id = "Title"><H2 align = "center">Cliquez sur la carte de votre choix<br><br><br><br></H2></div>';
	}
     
	

	// var Title = '<div id = "Title"><H2 align = "center">Choisissez une carte<br></H2></div>';
	// var Info = '<div id = "Title"><H3 align = "center">Appuyez sur [e] pour la gauche et sur [p] pour la droite<br><br><br></H3></div>';

	
	var Images = '<div id = "stimrow" class="row" style= "transform: translate(0%, -100%);position:relative"> <div class="col-xs-1 col-md-1"></div>  <div class="col-xs-3 col-md-3">' + Option1 + '</div><div id = "Middle" class="col-xs-4 col-md-4"></div><div class="col-xs-3 col-md-3">' + Option2 + '</div><div class="col-xs-1 col-md-1"></div></div>';

	var Feedback = '<div id = "fbrow" class="row">  <div class="col-xs-1 col-md-1"></div>  <div class="col-xs-3 col-md-3">' + FB1 + '</div><div id = "Middle" class="col-xs-4 col-md-4"></div><div class="col-xs-3 col-md-3">' + FB2 + '</div><div class="col-xs-1 col-md-1"></div></div>';


	
	
        var InvertedPosition = 0;
        if (Math.random() < 0.5) {
	var Images = '<div id = "stimrow" class="row" style= "transform: translate(0%, -100%);position:relative"> <div class="col-xs-1 col-md-1"></div>  <div class="col-xs-3 col-md-3">' + Option2 + '</div><div id = "Middle" class="col-xs-4 col-md-4"></div><div class="col-xs-3 col-md-3">' + Option1 + '</div><div class="col-xs-1 col-md-1"></div></div>';

	var Feedback = '<div id = "fbrow" class="row">  <div class="col-xs-1 col-md-1"></div>  <div class="col-xs-3 col-md-3">' + FB2 + '</div><div id = "Middle" class="col-xs-4 col-md-4"></div><div class="col-xs-3 col-md-3">' + FB1 + '</div><div class="col-xs-1 col-md-1"></div></div>';


	    InvertedPosition = 1;
        }


        $('#TextBoxDiv').html(Title  + Feedback + Images);
	


	var Choice_time = (new Date()).getTime();

	var myEventHandler = function(e){
	    //console.log(e.which);
	    
	    var key = getKeyCode(e);
	    
	    if ((key ==101 && !InvertedPosition) || (key ==112 && InvertedPosition)){
	    	if(clickDisabeled)
	    	    return;
	    	clickDisabeled = true;

	    	fb = Reward(1);
	    	color = getColor(fb);
	    	document.getElementById("Option1").style.borderColor="black";
		targetElement.removeEventListener('keypress', myEventHandler);
	    	//Next();
	    	
	    }
	    else if ((key ==112 && !InvertedPosition) || (key ==101 && InvertedPosition)){
	    	if(clickDisabeled)
	    	    return;
	    	clickDisabeled = true;

	    	fb = Reward(2);
	    	color = getColor(fb);
	    	document.getElementById("Option2").style.borderColor="black";
		targetElement.removeEventListener('keypress', myEventHandler);
	    	//Next();
	    }
	    
	};

	var targetElement = document.body;
	
	//with keyboard
	//targetElement.addEventListener('keypress',myEventHandler);
	

	////with mouse
	$('#Option1').click(function() {
	    if(clickDisabeled)
		return;
	    clickDisabeled = true;
	    
	    fb = Reward(1);
	    //color = getColor(fb);
	    document.getElementById("Option1").style.borderColor="black";            
	    //Next();

        });
        $('#Option2').click(function() {
	    if(clickDisabeled)
		return;
	    clickDisabeled = true;
	    
            fb = Reward(2);
	    //color = getColor(fb);
	    document.getElementById("Option2").style.borderColor="black";
            //Next();
        });

	
	function Reward(Choice) {
	    
	    var Reaction_time = (new Date()).getTime();

	    var left_right = -1;

	    if( (InvertedPosition && (Choice==1)) || (!InvertedPosition && (Choice==2)) ) {
		left_right = 1;
	    }

	    
            //$('#Title').empty();
	    
	    //var Condition = Sessions[SessionNum][TrialNum][0];

	    //var Condition = Trials[SessionNum*NumTrials+TrialNum];

            P1 = Condition[0];
	    P2 = Condition[1];
	    Mag = Condition[2];
	    Val = Condition[3];
	    Info = Condition[4];

	    var Rwd=0;
	    var Pun=0;
	    
	    if(Val>0){
		Rwd = Mag;
		Pun = 0;
	    }else if (Val<0){
		Rwd = 0;
		Pun = -Mag;
	    }else{
		Rwd = Mag;
		Pun = -Mag;
	    }
	    

	    var ThisReward = Pun;
	    var OtherReward= Pun;

            var RandomNum1 = Math.random();
	    var RandomNum2 = Math.random();
	    
            if (Choice === 1) {//Option1
		if (RandomNum1 < P1) {
                    ThisReward = Rwd;
		}
		if (RandomNum2 < P2) {
                    OtherReward = Rwd;
		}
		
            } else {//Option2
		if (RandomNum2 < P2) {
                    ThisReward = Rwd;
		}
		if (RandomNum1 < P1) {
                    OtherReward = Rwd;
		}
            }

	    var OtherReward_toprint = OtherReward;
	    if(Info===0){
		OtherReward_toprint = '';
		if (InfCond.length>1)
		    OtherReward_toprint = '?'; 
	    }
	    
	    
	    SumReward = SumReward + 1000* ThisReward;
	 
	    var fb1 = document.getElementById("FB1");
	    var fb2 = document.getElementById("FB2");

            var pic1 = document.getElementById("Option1");
	    var pic2 = document.getElementById("Option2");


	    fb_dur = 1500;
	    if(Info===1)
	    	fb_dur = fb_dur+500;
	    
	    if(Choice==1){
		fb1.src = fb_images[''+ThisReward].src;
		setTimeout(function() {

		    slideCard(pic1);
		    
		    if(Info===1){
			fb2.src = fb_images['cf_'+OtherReward].src;
			//setTimeout(function() {
			slideCard(pic2);
			//}, 1000)
			
			
		    }

		    
		}, 500)
		
	    }else{
		fb2.src = fb_images[''+ThisReward].src;
		setTimeout(function() {

		    slideCard(pic2);
		    
		    if(Info===1){
			fb1.src = fb_images['cf_'+OtherReward].src;
			//setTimeout(function() {
			slideCard(pic1);
			//}, 1000)
			
			
		    }

		    
                }, 500)

		
	    }



	    
	    SendTrainDataDB(0);


	    Next();



	    function slideCard(img){
	
		//console.log("draw");
		tl = new TimelineLite();
		tl.to(img, 1, {y:"100%"})
	    }

	    
	    // function slideCard(img){
	    // 	var pos = 0;
	    // 	var id = setInterval(frame, 1);
	    // 	function frame() {
	    // 	    if (pos == 100) {
	    // 		clearInterval(id);
	    // 	    } else {
	    // 		pos++; 
	    // 		console.log("draw");
	    // 		img.style.top = pos + '%'; 
	    // 	    }
	    // 	}
	    // }

	    //ID, SESSION, TRIAL, P1, P2, Magnitude, Valence, Information, Option1, Option2, InvertedPosition(0/1),Time_from_start, Choice_Left_Right(-11), Choice_Good_Bad(1/0), Reward_Good_Bad(1/0), CF_Reward_Good_Bad(1/0), Reaction_Time
	    function SendTrainDataDB(call){
		clog = 'EXP: '+ExpName+' $ EXPID: '+ExpID+' $ ID: '+SubID+' $ SESSION: '+TrainSess+' $ TRIAL: '+TrialNum+' $ P1: '+P1+' $ P2: '+P2+' $ MAG: '+Mag+' $ VAL: '+Val+' $ INF: '+Info+' $ OP1: '+Option[0]+' $ OP2: '+Option[1]+' $ INV: '+InvertedPosition+' $ CTIME: '+(Choice_time-Init_time)+' $ CLR: '+left_right+' $ CGB: '+((Choice == 1)?1:0)+' $ RGB: '+((ThisReward == Rwd)?1:0)+' $ CFGB: '+((OtherReward == Rwd)?1:0)+' $ RTIME: '+(Reaction_time-Choice_time);

		$.ajax({
		    type: 'POST',
		    data: {exp: ExpName, expID: ExpID, id: SubID, session: TrainSess, trial: TrialNum, p1:P1, p2:P2, magnitude:Mag, valence:Val, information:Info, option1:Option[0], option2:Option[1], inverted:InvertedPosition, choice_time:Choice_time-Init_time, choice_left_right:left_right, choice_good_bad:((Choice == 1)?1:0), reward_good_bad:((ThisReward == Rwd)?1:0), other_reward_good_bad:((OtherReward == Rwd)?1:0), reaction_time:Reaction_time-Choice_time},
		    async: true,
		    url: 'InsertLearningDataDB.php',
		    dataType: 'json',
		    success: function(r) {
			//clog = 'train: sucess $ '+clog+' $ call: '+call+' $ errno: '+r[0].ErrNo+'\n';
			clog = 'learning_data $ '+clog+' $ dbcall success \n';
			log+= clog;
			//update log before not after because variables get changed 
			
			if (r[0].ErrorNo > 0 && call+1<maxDBCalls){
			    //SendErrorDB(cl);
			    SendTrainDataDB(call+1);
			}
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown) {
			//clog = 'train: sucess $ '+clog+' $ call: '+call+' $ stat: '+textStatus+' $ err: '+errorThrown+'\n';
			clog = 'learning_data $ '+clog+' $ dbcall failure \n';
			log+=clog;
			//console.log(errorThrown);
			
			if(call+1<maxDBCalls){
			    //SendErrorDB(cl);
			    SendTrainDataDB(call+1);
			}
			//alert("Status: " + textStatus);
			//alert("Error: " + errorThrown);
		    }
		});

	    };

	    return ThisReward;

	};

	
	function Next(){
	    TrialNum++;
	    if (TrialNum < NbTrainingTrials*NumTrainingCond) {
		setTimeout(function() {
                    //$('#TextBoxDiv').fadeOut(500);
		    $('#stimrow').fadeOut(500);
		    $('#fbrow').fadeOut(500);
		    setTimeout(function() {
			//$('#Stage').empty();
			//$('#Bottom').empty();
			clickDisabeled=false;
			PlayTraining(TrialNum);
                    }, 500);
		}, fb_dur);
            } else {
		TrainSess--;
		setTimeout(function() {
                    $('#TextBoxDiv').fadeOut(500);
                    setTimeout(function() {
			$('#Stage').empty();
			$('#Bottom').empty();
			clickDisabeled=false;
			EndTrainingStartSessions();
			
                    }, 500);
		}, fb_dur);
            }
	}
	
    };
    
    

    function EndTraining(){

	InsertLog(0,'train');
	//console.log(log);
	
	// $('#Top').css('height', thisHeight / 20);
	// $('#Stage').css('width', DispWidth);
	// $('#Stage').css('min-height', thisHeight * 17 / 20);
	// $('#Bottom').css('min-height', thisHeight / 20);

	// var PicHeight = DispWidth / 2;

	CreateDiv('Stage', 'TextBoxDiv');

	var Title = '<H2 align = "center"></H2>';

	var toprint = parseInt(SumReward)/1000;

	
	var wonlost;	
	var Info;
        if(Language=='en'){
	    wonlost= ' earned ';
	    if (toprint<0){
		wonlost = ' lost ';
	    }
	    
	    Info = '<H3 align = "center">In this practice, you'+ wonlost +toprint+' points!</h3><br><br>';
	}
	else if(Language=='fr'){
	    wonlost= ' gagné ';
	    if (toprint<0){
		wonlost = ' perdu ';
	    }
	    
	    Info = '<H3 align = "center">Dans cet entrainement, vous avez'+ wonlost +toprint+' points!</h3><br><br>';
	}
	SumReward=0;

        $('#TextBoxDiv').html(Title + Info);

	if(Language=='en'){
	    var Buttons = '<div align="center"><input align="center" type="button"  class="btn btn-default" id="Next" value="Next" ></div>';
            
	}
	else if(Language=='fr'){
	    var Buttons = '<div align="center"><input align="center" type="button"  class="btn btn-default" id="Next" value="Suivant" ></div>';
	    
	}



	$('#Bottom').html(Buttons);


	$('#Next').click(function() {

	    $('#TextBoxDiv').remove();
	    $('#Stage').empty();
	    $('#Bottom').empty();
	    StartSessions();
	    
	})


    }


    
    function StartSessions(){
	// $('#Top').css('height', thisHeight / 20);
        // $('#Stage').css('width', DispWidth);
        // $('#Stage').css('min-height', thisHeight * 17 / 20);
        // $('#Bottom').css('min-height', thisHeight / 20);
	// var PicHeight = DispWidth / 2;
	
        var NumPages = 2;//number of pages
        

        CreateDiv('Stage', 'TextBoxDiv');

        var Title = '<H2 align = "center"></H2>';

	var Info;
	var instBut;
	var trainBut;
	var startBut;

	var ready;
	var steady;
	var go;
	
	if(Language=='en'){
            //Info = '<H3 align = "center">Now, you will start the experiment.<br>Click start when you are ready.</h3><br><br>';
	    Info = '<H3 align = "center">Now, you are about to start the game.<br>Click on start when you are ready.</h3><br><br>';

	    instBut  = "Return to instructions";
	    //trainBut = "Replay training";
	    trainBut = "Play the practice again";
	    //startBut = "Start experiment";
	    startBut = "Start the game";
	    
	    ready = 'Ready';
	    steady ='Steady';
	    go = 'Go!'
	}
	else if(Language=='fr'){
	    Info = '<H3 align = "center">Maintenant, vous allez commencer le jeu.<br>Cliquez sur commencer dès que vous êtes prêt.</h3><br><br>';
	    
	    instBut  = '"Retourner aux instructions"';
	    trainBut = '"Rejouer l\'entrainement"';
	    startBut = '"Commencer le jeu"';

	    ready = 'A vos marques...';
	    steady ='Prêts?';
	    go = 'Partez!'

	}
	
        $('#TextBoxDiv').html(Title + Info);


	
        var Buttons = '<div align="center">';
	if(TrainSess > -(MaxTrainingSessions+1)){
	    //Buttons+='<input align="center" type="button"  class="btn btn-default" id="Inst" value='+instBut+' >\n\ ';
	    Buttons+='<input align="center" type="button"  class="btn btn-default" id="Train" value='+trainBut+' >\n\ ';
	}
	Buttons+='<input align="center" type="button"  class="btn btn-default" id="Start" value='+startBut+' >';
	Buttons+='</div>';

        $('#Bottom').html(Buttons);

	//if(TrainSess > -4){
        $('#Inst').click(function() {

	    $('#TextBoxDiv').remove();
	    $('#Stage').empty();
	    $('#Bottom').empty();
	    Instructions(1);

        });

        $('#Train').click(function() {

	    $('#TextBoxDiv').remove();
	    $('#Stage').empty();
	    $('#Bottom').empty();
	    PlayTraining(0);

        });
	//}
        $('#Start').click(function() {

            $('#TextBoxDiv').remove();
            $('#Stage').empty();
            $('#Bottom').empty();
            setTimeout(function() {
		$('#Stage').html('<H1 align = "center">'+ready+'</H1>');
                setTimeout(function() {
                    $('#Stage').html('<H1 align = "center">'+steady+'</H1>');
                    setTimeout(function() {
                    	$('#Stage').html('<H1 align = "center">'+go+'</H1>');
                        setTimeout(function() {
                            $('#Stage').empty();
                            //DisplayOptions(1);//Start with the first trial
			    PlaySessions(0);
			    //PlayTraining(0);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 10);

        });

    }


    function EndTrainingStartSessions(){
	InsertLog(0,'train');
	// $('#Top').css('height', thisHeight / 20);
        // $('#Stage').css('width', DispWidth);
        // $('#Stage').css('min-height', thisHeight * 17 / 20);
        // $('#Bottom').css('min-height', thisHeight / 20);
	// var PicHeight = DispWidth / 2;
	
        var NumPages = 2;//number of pages
        

        CreateDiv('Stage', 'TextBoxDiv');

        var Title = '<H2 align = "center"></H2>';

	
	var instBut;
	var trainBut;
	var startBut;

	var ready;
	var steady;
	var go;


	

	
	
	var Info='';

        var toprint = parseInt(SumReward)/1000;
	var wonlost;	
	if(Language=='en'){
	    wonlost= ' you won ';
	    if (toprint<0){
		wonlost = ' you lost ';
	    }
	    
	    Info += '<H3 align = "center">In this training,'+ wonlost +toprint+' points.</h3><br><br>';
	}
	else if(Language=='fr'){
	    wonlost= ' gagné ';
	    if (toprint<0){
		wonlost = ' perdu ';
	    }
	    
	    Info += '<H3 align = "center">Dans cet entrainement, vous avez'+ wonlost +toprint+' points.</h3><br><br>';
	}
	SumReward=0;

	
	if(Language=='en'){
            //Info = Info+'<H3 align = "center">Now, you will start the experiment.<br><br>Click start when you are ready.</h3><br><br>';
	    Info += '<H3 align = "center">Now, you are about to start the game.<br>Click on start when you are ready.</h3><br><br>';
	    
	    instBut  = '"Return to instructions"';
	    //trainBut = '"Replay training"';
	    trainBut = '"Play the practice again"';
	    //startBut = '"Start experiment"';
	    startBut = '"Start the game"';
	    

	    ready = 'Ready';
	    steady ='Steady';
	    go = 'Go!'
	}
	else if(Language=='fr'){
	    Info += '<H3 align = "center">Maintenant, vous allez commencer le jeu.<br><br>Cliquez sur commencer dès que vous êtes prêt.</h3><br><br>';
	    
	    instBut  = '"Retourner aux instructions"';
	    trainBut = '"Rejouer l\'entrainement"';
	    startBut = '"Commencer le jeu"';

	    ready = 'A vos marques...';
	    steady ='Prêts?';
	    go = 'Partez!'

	}
	
        $('#TextBoxDiv').html(Title + Info);


	
        var Buttons = '<div align="center">';
	if(TrainSess > -(MaxTrainingSessions+1)){
	    //Buttons+='<input align="center" type="button"  class="btn btn-default" id="Inst" value='+instBut+' >\n\ ';
	    Buttons+='<input align="center" type="button"  class="btn btn-default" id="Train" value='+trainBut+' >\n\ ';
	}
	Buttons+='<input align="center" type="button"  class="btn btn-default" id="Start" value='+startBut+' >';
	Buttons+='</div>';

        $('#Bottom').html(Buttons);

	//if(TrainSess > -4){
        $('#Inst').click(function() {

	    $('#TextBoxDiv').remove();
	    $('#Stage').empty();
	    $('#Bottom').empty();
	    Instructions(1);

        });

        $('#Train').click(function() {

	    $('#TextBoxDiv').remove();
	    $('#Stage').empty();
	    $('#Bottom').empty();
	    PlayTraining(0);

        });
	//}
        $('#Start').click(function() {

            $('#TextBoxDiv').remove();
            $('#Stage').empty();
            $('#Bottom').empty();
            setTimeout(function() {
		$('#Stage').html('<H1 align = "center">'+ready+'</H1>');
                setTimeout(function() {
                    $('#Stage').html('<H1 align = "center">'+steady+'</H1>');
                    setTimeout(function() {
                    	$('#Stage').html('<H1 align = "center">'+go+'</H1>');
                        setTimeout(function() {
                            $('#Stage').empty();
                            //DisplayOptions(1);//Start with the first trial
			    PlaySessions(0);
			    //PlayTraining(0);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 10);

        });

    }

    
    function PlaySessions(SessionNum){
	
    	PlayOptions(SessionNum,0);


    }
    
    function PlayOptions(SessionNum,TrialNum) {


        // $('#Top').css('height', thisHeight / 20);
        // $('#Stage').css('width', DispWidth);
        // $('#Stage').css('min-height', thisHeight * 17 / 20);
        // $('#Bottom').css('min-height', thisHeight / 20);

	if($('#TextBoxDiv').length == 0){
            CreateDiv('Stage', 'TextBoxDiv');
	    document.getElementById("TextBoxDiv").style.backgroundColor = "white";
	}

	//Choisir une condition
	var Condition = Sessions[SessionNum][TrialNum][0];
	var Option = Sessions[SessionNum][TrialNum][1];


        // var Option1 = '<img id = "Option1" src="'+IMGPath+'stim/'+Option[0]+'.'+IMGExt+'" class="img-responsive center-block" style="border:5px solid '+ border_color +'; position:relative; top:0px">';
        // var Option2 = '<img id = "Option2" src="'+IMGPath+'stim/'+Option[1]+'.'+IMGExt+'" class="img-responsive center-block" style="border:5px solid '+ border_color +'; position:relative; top:0px">';

	
	var Option1 = images[Option[0]];
	Option1.id = "Option1";
	Option1 = Option1.outerHTML;
	
	var Option2 = images[Option[1]];
	Option2.id = "Option2";
	Option2 = Option2.outerHTML;

	// var FB1 = '<img id = "FB1" src="'+IMGPath+'fb/empty.' +IMGExt+'" class="img-responsive center-block" style="border:5px solid '+ border_color +'">';
        // var FB2 = '<img id = "FB2" src="'+IMGPath+'fb/empty.'+IMGExt+'" class="img-responsive center-block" style="border:5px solid '+ border_color +'">';

	var FB1 = fb_images["empty"];
	FB1.id = "FB1";
	FB1 = FB1.outerHTML;
	
        var FB2 = fb_images["empty"];
	FB2.id = "FB2";
	FB2 = FB2.outerHTML;
	
	//var Title = '<div id = "Title"><H2 align = "center">Choisissez une carte<br><br><br><br></H2></div>';
	
	if(Language=='en'){
            var Title = '<div id = "Title"><H2 align = "center">Click on the card of your choice<br><br><br><br></H2></div>';
	}
	else if(Language=='fr'){
	    var Title = '<div id = "Title"><H2 align = "center">Cliquez sur la carte de votre choix<br><br><br><br></H2></div>';
	}

        //height: 200px;width: 200px;z-index:9999;background:red;left:-50%;top: 50%;left: 50%; transform: translate(-50%, -50%);position:fixed;
	
	var Images = '<div id= "stimrow" class="row" style= "transform: translate(0%, -100%);position:relative"> <div class="col-xs-1 col-md-1"></div>  <div class="col-xs-3 col-md-3">' + Option1 + '</div><div id = "Middle" class="col-xs-4 col-md-4"></div><div class="col-xs-3 col-md-3">' + Option2 + '</div><div class="col-xs-1 col-md-1"></div></div>';

	var Feedback = '<div id= "fbrow" class="row">  <div class="col-xs-1 col-md-1"></div>  <div class="col-xs-3 col-md-3">' + FB1 + '</div><div id = "Middle" class="col-xs-4 col-md-4"></div><div class="col-xs-3 col-md-3">' + FB2 + '</div><div class="col-xs-1 col-md-1"></div></div>';


	
	
        var InvertedPosition = 0;
        if (Math.random() < 0.5) {
	    var Images = '<div id= "stimrow" class="row" style= "transform: translate(0%, -100%);position:relative"> <div class="col-xs-1 col-md-1"></div>  <div class="col-xs-3 col-md-3">' + Option2 + '</div><div id = "Middle" class="col-xs-4 col-md-4"></div><div class="col-xs-3 col-md-3">' + Option1 + '</div><div class="col-xs-1 col-md-1"></div></div>';

	    var Feedback = '<div id= "fbrow" class="row">  <div class="col-xs-1 col-md-1"></div>  <div class="col-xs-3 col-md-3">' + FB2 + '</div><div id = "Middle" class="col-xs-4 col-md-4"></div><div class="col-xs-3 col-md-3">' + FB1 + '</div><div class="col-xs-1 col-md-1"></div></div>';

	    InvertedPosition = 1;
        }

	$('#TextBoxDiv').html(Title +  Feedback + Images);
	
	
	
	var Choice_time = (new Date()).getTime();

	var myEventHandler = function(e){

	    var key = getKeyCode(e);
	    
	    if ((key ==101 && !InvertedPosition) || (key ==112 && InvertedPosition)){
	    	if(clickDisabeled)
	    	    return;
	    	clickDisabeled = true;

	    	fb = Reward(1);
	    	color = getColor(fb);
	    	document.getElementById("Option1").style.borderColor="black";
		//document.getElementById("FB1").style.borderColor=color;
		targetElement.removeEventListener('keypress', myEventHandler);
	    	//Next();
	    	
	    }
	    else if ((key ==112 && !InvertedPosition) || (key ==101 && InvertedPosition)){
	    	if(clickDisabeled)
	    	    return;
	    	clickDisabeled = true;

	    	fb = Reward(2);
	    	color = getColor(fb);
		document.getElementById("Option2").style.borderColor="black";
	    	//document.getElementById("FB2").style.borderColor=color;
		targetElement.removeEventListener('keypress', myEventHandler);
	    	//Next();
	    }
	    
	};

	var targetElement = document.body;
	
	//with keyboard
	//targetElement.addEventListener('keypress',myEventHandler);
	

	////with mouse
	$('#Option1').click(function() {
	    if(clickDisabeled)
		return;
	    clickDisabeled = true;
	    
	    fb = Reward(1);
	    //color = getColor(fb);
	    document.getElementById("Option1").style.borderColor="black";            
	    //Next();

        });
        $('#Option2').click(function() {
	    if(clickDisabeled)
		return;
	    clickDisabeled = true;
	    
            fb = Reward(2);
	    //color = getColor(fb);
	    document.getElementById("Option2").style.borderColor="black";
            //Next();
        });


	function Reward(Choice) {

	    
	    var Reaction_time = (new Date()).getTime();

	    var left_right = -1;
	    if( (InvertedPosition && (Choice==1)) || (!InvertedPosition && (Choice==2)) ) {	
		left_right = 1;
	    }

	    
            //$('#Title').empty();
	    
	    //var Condition = Sessions[SessionNum][TrialNum][0];

	    //var Condition = Trials[SessionNum*NumTrials+TrialNum];

            P1 = Condition[0];
	    P2 = Condition[1];
	    Mag = Condition[2];
	    Val = Condition[3];
	    Info = Condition[4];

	   
	    
	    var Rwd=0;
	    var Pun=0;
	    
	    if(Val>0){
		Rwd = Mag;
		Pun = 0;
	    }else if (Val<0){
		Rwd = 0;
		Pun = -Mag;
	    }else{
		Rwd = Mag;
		Pun = -Mag;
	    }
	    

	    var ThisReward = Pun;
	    var OtherReward= Pun;

            var RandomNum1 = Math.random();
	    var RandomNum2 = Math.random();
            if (Choice === 1) {//Option1
		if (RandomNum1 < P1) {
                    ThisReward = Rwd;
		}
		if (RandomNum2 < P2) {
                    OtherReward = Rwd;
		}
		
            } else {//Option2
		if (RandomNum2 < P2) {
                    ThisReward = Rwd;
		}
		if (RandomNum1 < P1) {
                    OtherReward = Rwd;
		}
            }

	    var OtherReward_toprint = OtherReward;
	    if(Info===0){
		OtherReward_toprint = '';
		if (InfCond.length>1)
		    OtherReward_toprint = '?';
	    }
	    
	    
	    SumReward = SumReward + 1000* ThisReward;


	    

	    var fb1 = document.getElementById("FB1");
	    var fb2 = document.getElementById("FB2");

            var pic1 = document.getElementById("Option1");
	    var pic2 = document.getElementById("Option2");


	    fb_dur = 1500;
	    if(Info===1)
	    	fb_dur = fb_dur+500;
	    
	    if(Choice==1){
		fb1.src = fb_images[''+ThisReward].src;
		setTimeout(function() {

		    slideCard(pic1);
		    
		    if(Info===1){
			fb2.src = fb_images['cf_'+OtherReward].src;
			//setTimeout(function() {
			slideCard(pic2);
			//}, 1000)
			
			
		    }

		    
		}, 500)
		
	    }else{
		fb2.src = fb_images[''+ThisReward].src;
		setTimeout(function() {

		    slideCard(pic2);
		    
		    if(Info===1){
			fb1.src = fb_images['cf_'+OtherReward].src;
			//setTimeout(function() {
			slideCard(pic1);
			//}, 1000)
			
			
		    }

		    
                }, 500)

		
	    }


	    
	    SendLearnDataDB(0);


	    Next();
	    






	    function slideCard(img){
	
		//console.log("draw");
		tl = new TimelineLite();
		tl.to(img, 1, {y:"100%"})
	    }

	    
	    // function slideCard(img){
	    // 	var pos = 0;
	    // 	var id = setInterval(frame, 1);
	    // 	function frame() {
	    // 	    if (pos == 100) {
	    // 		clearInterval(id);
	    // 	    } else {
	    // 		pos++; 
	    // 		img.style.top = pos + '%'; 
	    // 	    }
	    // 	}
	    // }
	    



	    //ID, SESSION, TRIAL, P1, P2, Magnitude, Valence, Information, Option1, Option2, InvertedPosition(0/1),Time_from_start, Choice_Left_Right(-11), Choice_Good_Bad(1/0), Reward_Good_Bad(1/0), CF_Reward_Good_Bad(1/0), Reaction_Time
	    function SendLearnDataDB(call){
		clog = 'EXP: '+ExpName+' $ EXPID: '+ExpID+' $ ID: '+SubID+' $ SESSION: '+SessionNum+' $ TRIAL: '+TrialNum+' $ P1: '+P1+' $ P2: '+P2+' $ MAG: '+Mag+' $ VAL: '+Val+' $ INF: '+Info+' $ OP1: '+Option[0]+' $ OP2: '+Option[1]+' $ INV: '+InvertedPosition+' $ CTIME: '+(Choice_time-Init_time)+' $ CLR: '+left_right+' $ CGB: '+((Choice == 1)?1:0)+' $ RGB: '+((ThisReward == Rwd)?1:0)+' $ CFGB: '+((OtherReward == Rwd)?1:0)+' $ RTIME: '+(Reaction_time-Choice_time);

		$.ajax({
		    type: 'POST',
		    data: {exp: ExpName, expID: ExpID, id: SubID, session: SessionNum, trial: TrialNum, p1:P1, p2:P2, magnitude:Mag, valence:Val, information:Info, option1:Option[0], option2:Option[1], inverted:InvertedPosition, choice_time:Choice_time-Init_time, choice_left_right:left_right, choice_good_bad:((Choice == 1)?1:0), reward_good_bad:((ThisReward == Rwd)?1:0), other_reward_good_bad:((OtherReward == Rwd)?1:0), reaction_time:Reaction_time-Choice_time},
		    async: true,
		    url: 'InsertLearningDataDB.php',
		    dataType: 'json',
		    success: function(r) {
			//clog = 'learn: sucess $ '+clog+' $ call: '+call+' $ errno: '+r[0].ErrNo+'\n';
			clog = 'learning_data $ '+clog+' $ dbcall success \n';
			log+= clog;
			
			if (r[0].ErrorNo > 0 && call+1<maxDBCalls){
			    //SendErrorDB(cl);
			    SendLearnDataDB(call+1);
			}
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown) {
			//clog = 'learn: error $ '+clog+' $ call: '+call+' $ stat: '+textStatus+' $ err: '+errorThrown+'\n';
			clog = 'learning_data $ '+clog+' $ dbcall failure \n';
			log+=clog;
			
			if(call+1<maxDBCalls){
			    //SendErrorDB(cl);
			    SendLearnDataDB(call+1);
			}
			//alert("Status: " + textStatus);
			//alert("Error: " + errorThrown);
		    }
		});

	    };


	    return ThisReward;

	};

	
	function Next(){
	    TrialNum++;
	    if (TrialNum < NumTrials) {
		setTimeout(function() {
                    //$('#TextBoxDiv').fadeOut(500);
		    $('#stimrow').fadeOut(500);
		    $('#fbrow').fadeOut(500);
                    setTimeout(function() {
			// $('#Stage').empty();
			// $('#Bottom').empty();
			clickDisabeled=false;
			PlayOptions(SessionNum,TrialNum);
                    }, 500);

		}, fb_dur);
            } else {
		SessionNum++;
		setTimeout(function() {
                    $('#TextBoxDiv').fadeOut(500);
                    setTimeout(function() {
			$('#Stage').empty();
			$('#Bottom').empty();
			clickDisabeled=false;
			NextSession(SessionNum);
			
                    }, 500);

		    
		}, fb_dur);
            }
	}
	
    };

    function NextSession(SessionNum){
	InsertLog(0,'learn');
	if(SessionNum < NumSessions){
	    EndSession(SessionNum);
	}else{
	    if(PostLearning){
		StartPostLearning(1);
	    }else if(Questionnaire){
		StartQuestionnaire();
	    }else{
		EndExperiment();
	    }
	}
    }
    function EndSession(SessionNum) {

	// if(SessionNum == NumSessions-1){
	//     console.log(SessionNum+' '+NumSessions);
	//     NextSession(SessionNum+1);
	//     break;
	// }
	
	// $('#Top').css('height', thisHeight / 20);
	// $('#Stage').css('width', DispWidth);
	// $('#Stage').css('min-height', thisHeight * 17 / 20);
	// $('#Bottom').css('min-height', thisHeight / 20);

	// var PicHeight = DispWidth / 2;

	CreateDiv('Stage', 'TextBoxDiv');

	var Title = '<H2 align = "center">SESSION</H2>';

	var toprint = parseInt(SumReward)/1000;
	
	var wonlost;
	var Info;
	var nextBut;

	if (Language=='en'){
	    wonlost= ' earned ';
	    if (toprint<0){
		wonlost = ' lost ';
	    }

	    //Info = '<H3 align = "center">You have finished this session. <br>You '+wonlost+toprint+' points!</h3><br><br>';
	    //Info = '<H3 align = "center">You have finished this session. <br>You '+wonlost+toprint+' points!</h3><br><br>';
	    Info = '<H3 align = "center">You have done half of the game. <br>So far, you have '+wonlost+toprint+' points.<br>Only 5 minutes of effort and you will be done !</h3><br><br>';
	    nextBut='"Next"';
	}
	else if (Language=='fr'){
	    wonlost= ' gagné ';
	    if (toprint<0){
		wonlost = ' perdu ';
	    }

	    //Info = '<H3 align = "center">Vous avez terminé cette session. <br>Vous avez'+wonlost+toprint+' points!</h3><br><br>';
	    Info = '<H3 align = "center">Vous êtes à la moitié du jeu. <br>Jusqu\'ici vous avez'+wonlost+toprint+' points.<br>Encore 5 minutes d\'effort et vous aurez terminé !</h3><br><br>';
	    
	    nextBut='"Suivant"';
	}
	TotalReward= TotalReward+SumReward;
	//TotalReward = parseInt(TotalReward*1000)/1000;
	SumReward = 0;
	
	$('#TextBoxDiv').html(Info);

	
	var Buttons = '<div align="center"><input align="center" type="button"  class="btn btn-default" id="Next" value='+nextBut+' ></div>';

	$('#Bottom').html(Buttons);


	$('#Next').click(function() {
	    //SessionNum++;
	    $('#TextBoxDiv').remove();
	    $('#Stage').empty();
	    $('#Bottom').empty();
	    
	    PlaySessions(SessionNum);
	    //NextSession(SessionNum);
	    
	})
    }

    

    function StartPostLearning(PageNum) {

	// $('#Top').css('height', thisHeight / 20);
	// $('#Stage').css('width', DispWidth);
	// $('#Stage').css('min-height', thisHeight * 17 / 20);
	// $('#Bottom').css('min-height', thisHeight / 20);
	// var PicHeight = DispWidth / 2; 

	var NumPages = 5;//number of pages
	

	CreateDiv('Stage', 'TextBoxDiv');

	var Title = '<H3 align = "center">SESSION 2</H3>';



        switch (PageNum) {
	case 1:
		var Info = '<H3 align="center">Now you will start the second session.<br></h3><br><br>';
		break;
	
	case 2:
		var Info = '<H3 align="center"><br>The aim of this session is to find out which was the most advantageous symbol in the previous session.<br></h3><br><br>';
		break;
	
	case 3:
		var Info = '<H3 align="center"><br>The symbols presented together in a given trial have not necessarily been presented together in the previous session.<br><br>Your task is to figure out which one won more points or lost less points.<br><br>If you have no idea, try to have a guess.<br></h3><br><br>';
		break;
	
	case 4:
		var Info = '<H3 align="center"><br>Your score for this sessions will correspond to the sum of the values of chosen symbols.<br><br>You will know your score only at the end of the session, and not trial-by-trial.<br></h3><br><br>';
		break;
	
	case 5:
		var Info = '<H3 align="center"><br>Click start when you are ready.<br></h3><br><br>';
		break;
	default:
            var Info;
            break;
        }
        ;


	$('#TextBoxDiv').html(Title + Info);


	
        var Buttons = '<div align="center"><input align="center" type="button"  class="btn btn-default" id="Back" value="Back" >\n\
<input align="center" type="button"  class="btn btn-default" id="Next" value="Next" >\n\
<input align="center" type="button"  class="btn btn-default" id="Start" value="Start!" ></div>';

        $('#Bottom').html(Buttons);

	
	
        if (PageNum === 1) {
            $('#Back').hide();
        }
        ;
        if (PageNum === NumPages) {
            $('#Next').hide();
        }
        ;
        if (PageNum < NumPages) {
            $('#Start').hide();
        }
        ;


        $('#Back').click(function() {

            $('#TextBoxDiv').remove();
            $('#Stage').empty();
            $('#Bottom').empty();
            StartPostLearning(PageNum - 1);

        });
        $('#Next').click(function() {

            $('#TextBoxDiv').remove();
            $('#Stage').empty();
            $('#Bottom').empty();
            StartPostLearning(PageNum + 1);

        });
        $('#Start').click(function() {

            $('#TextBoxDiv').remove();
            $('#Stage').empty();
            $('#Bottom').empty();
	    setTimeout(function() {
		//$('#Stage').html('<H1 align = "center">Ready</H1>');
		$('#Stage').html('<H1 align = "center">A vos marques...</H1>');
                setTimeout(function() {
                    //$('#Stage').html('<H1 align = "center">Steady</H1>');
		    $('#Stage').html('<H1 align = "center">Prêts?</H1>');
                    setTimeout(function() {
                        //$('#Stage').html('<H1 align = "center">Go!</H1>');
			$('#Stage').html('<H1 align = "center">Partez!</H1>');
                	setTimeout(function() {
			    $('#Stage').empty();
			    //DisplayOptions(1);//Start with the first trial
			    PlayPostLearning(0);
			}, 1000);
		    }, 1000);
		}, 1000);
	    }, 10);
          

        });

    };

    
    function PlayPostLearning(TrialNum) {


        // $('#Top').css('height', thisHeight / 20);
        // $('#Stage').css('width', DispWidth);
        // $('#Stage').css('min-height', thisHeight * 17 / 20);
        // $('#Bottom').css('min-height', thisHeight / 20);


        CreateDiv('Stage', 'TextBoxDiv');

	//Choisir une condition
	

	var Option = PostLearningOptions[TrialNum];

        var Option1 = '<img id = "Option1" src="'+IMGPath+'stim/'+Option[0]+'.'+IMGExt+'" class="img-responsive center-block" style="border:5px solid '+ border_color +'">';
        var Option2 = '<img id = "Option2" src="'+IMGPath+'stim/'+Option[1]+'.'+IMGExt+'" class="img-responsive center-block" style="border:5px solid '+ border_color +'">';

	//var Title = '<div id = "Title"><H2 align = "center">Condition '+Option[0]+' '+Option[1]+'<br><br><br><br></H2></div>';
	var Title = '<div id = "Title"><H2 align = "center">Which one is the best symbol?<br><br><br><br></H2></div>';

	
        var Images = '<div class="row">  <div class="col-md-1"></div>  <div class="col-md-3">' + Option1 + '</div><div id = "Middle" class="col-md-4"></div><div class="col-md-3">' + Option2 + '</div><div class="col-md-1"></div></div>';


        $('#TextBoxDiv').html(Title + Images);



	var Choice_time = (new Date()).getTime();

	var myEventHandler = function(e){

	    var key = getKeyCode(e);
	    
	    if (key ==101){
	    	if(clickDisabeled)
	    	    return;
	    	clickDisabeled = true;

		document.getElementById("Option1").style.borderColor="blue";
	    	Reward(1);
		targetElement.removeEventListener('keypress', myEventHandler);
	    	Next();
	    	
	    }
	    else if (key ==112){
	    	if(clickDisabeled)
	    	    return;
	    	clickDisabeled = true;

		document.getElementById("Option2").style.borderColor="blue";
	    	Reward(2);
		targetElement.removeEventListener('keypress', myEventHandler);
	    	Next();
	    }
	    
	};

	var targetElement = document.body;
	
	//targetElement.addEventListener('keydown',myEventHandler);
	targetElement.addEventListener('keypress',myEventHandler);
	
	////with click
        // $('#Option1').click(function() {
	//     if(clickDisabeled)
	// 	return;
	//     clickDisabeled = true;
	    
        //     $(this).css({"border-color": "white",
	// 		 "border-width": "5px",
	// 		 "border-style": "solid"});

        //     Reward(1);
	//     Next();

        // });
        // $('#Option2').click(function() {
        //     if(clickDisabeled)
	// 	return;
	//     clickDisabeled = true;

	//     $(this).css({"border-color": "white",
	// 		 "border-width": "5px",
	// 		 "border-style": "solid"});


        //     Reward(2);
	//     Next();
        // });

	

	function Reward(Choice) {
	    
	    var Reaction_time = (new Date()).getTime();

	    var OptionValues = PostLearningOptionValues[TrialNum];

	    var Rwd = 0;
	    if (OptionValues[0]==OptionValues[1]){
		Rwd = 0;
	    }else if ( ((OptionValues[0]>OptionValues[1]) && (Choice==1)) || ((OptionValues[1]>OptionValues[0]) && (Choice==2))){
		Rwd = 1;
	    }else {
		Rwd = -1;
	    }


	    SumReward = SumReward + 1000 * OptionValues[Choice-1];
	    //SumReward = parseInt(SumReward*1000)/1000;
	    
	    //console.log(OptionValues[Choice-1]+'\t'+SumReward);

	    // if (Choice==1)
	    // 	var Feedback = '<div class="row">  <div class="col-md-1"> </div> <div class="col-md-3" align = "center"><font size="5">^</font></div> <div  id = "Middle"  class="col-md-4"></div><div class="col-md-3" align = "center"> <font size="5"></font> </div> <div class="col-md-1"> </div> </div>';
	    // else if (Choice==2)
	    // 	var Feedback = '<div class="row">  <div class="col-md-1"> </div> <div class="col-md-3" align = "center"><font size="5"></font></div> <div  id = "Middle"  class="col-md-4"></div><div class="col-md-3" align = "center"><font size="5">^</font> </div> <div class="col-md-1"> </div> </div>';

	    // $('#TextBoxDiv').html($('#TextBoxDiv').html()+Feedback);

	    
	    
	    SendPostDataDB(0);

	    function SendPostDataDB(call){
		clog = 'EXP: '+ExpName+' $ EXPID: '+ExpID+' $ ID: '+SubID+' $ TRIAL: '+TrialNum+' $ OP1: '+Option[0]+' $ OP2: '+Option[1]+' $ V1: '+OptionValues[0]+' $ V2: '+OptionValues[1]+' $ CTIME: '+(Choice_time-Init_time)+' $ CLR: '+(2*Choice-3)+' $ CGB: '+Rwd+' $ RTIME: '+(Reaction_time-Choice_time);

		$.ajax({
		    type: 'POST',
		    data: {exp: ExpName, expID: ExpID, id: SubID, trial: TrialNum, option1:Option[0], option2:Option[1], v1:OptionValues[0], v2:OptionValues[1], choice_time:Choice_time-Init_time, choice_left_right:2*Choice-3, choice_good_bad:Rwd, reaction_time:Reaction_time-Choice_time},
		    async: true,
		    url: 'InsertPostLearningDataDB.php',
		    dataType: 'json',
		    success: function(r) {
			//clog = 'post: sucess $ '+clog+' $ call: '+call+' $ errno: '+r[0].ErrNo+'\n';
			clog = 'post_learning_data $ '+clog+' $ dbcall success \n';
			log+= clog;
			
			if (r[0].ErrorNo > 0 && call+1<maxDBCalls){
			    //SendErrorDB(cl);
			    SendPostDataDB(call+1);
			}
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown) {
			//clog = 'post: error $ '+clog+' $ call: '+call+' $ stat: '+textStatus+' $ err: '+errorThrown+'\n';
			clog = 'post_learning_data $ '+clog+' $ dbcall failure \n';
			log+=clog;
			
			if(call+1<maxDBCalls){
			    //SendErrorDB(cl);
			    SendPostDataDB(call+1);
			}
			//alert("Status: " + textStatus);
			//alert("Error: " + errorThrown);
		    }
		});
	    };

	};

	
	function Next(){
	    TrialNum++;
	    if (TrialNum < NumPostLearningTrials) {
		setTimeout(function() {
                    $('#TextBoxDiv').fadeOut(500);
                    setTimeout(function() {
			$('#Stage').empty();
			$('#Bottom').empty();
			clickDisabeled=false;
			PlayPostLearning(TrialNum);
                    }, 500);
		}, fb_dur);
            } else {
		setTimeout(function() {
                    $('#TextBoxDiv').fadeOut(500);
                    setTimeout(function() {
			$('#Stage').empty();
			$('#Bottom').empty();
			clickDisabeled=false;
			EndPostLearning();
                    }, 500);
		}, fb_dur);
            }
	}
    };

    
    function EndPostLearning(){

	InsertLog(0,'post');
	
	// $('#Top').css('height', thisHeight / 20);
	// $('#Stage').css('width', DispWidth);
	// $('#Stage').css('min-height', thisHeight * 17 / 20);
	// $('#Bottom').css('min-height', thisHeight / 20);

	// var PicHeight = DispWidth / 2;

	CreateDiv('Stage', 'TextBoxDiv');

	var Title = '<H2 align = "center">SESSION</H2>';

	var toprint = parseInt(SumReward)/1000;
	
	var wonlost;
	var Info;
	var nextBut;
	if(Language=='en'){
	    wonlost = ' earned ';
	    if (toprint<0){
		wonlost = ' lost ';
	    }
	    
	    Info = '<H3 align = "center">You have finished this session. <br>You '+ wonlost +toprint+' points!</h3><br><br>';	
	    nextBut = '"Next"';
	}
	else if (Language=='fr'){
	    wonlost = ' gagné ';
	    if (toprint<0){
		wonlost = ' perdu ';
	    }

	    Info = '<H3 align = "center">Vous avez terminé cette session. <br>Vous avez'+ wonlost +toprint+' points!</h3><br><br>';
	    nextBut = '"Suivant"';
	}



	
	TotalReward= TotalReward+SumReward;
	//TotalReward = parseInt(TotalReward*1000)/1000;
	    
	SumReward = 0;

	$('#TextBoxDiv').html(Info);

	var Buttons = '<div align="center"><input align="center" type="button"  class="btn btn-default" id="Next" value='+nextBut+' ></div>';

	$('#Bottom').html(Buttons);


	$('#Next').click(function() {

	    $('#TextBoxDiv').remove();
	    $('#Stage').empty();
	    $('#Bottom').empty();
	    
	    if(Questionnaire){
		StartQuestionnaire();
	    }else{
		EndExperiment();
	    }
	})


    }

    function StartQuestionnaire(){

	// $('#Top').css('height', thisHeight / 20);
	// $('#Stage').css('width', DispWidth);
	// $('#Stage').css('min-height', thisHeight * 17 / 20);
	// $('#Bottom').css('min-height', thisHeight / 20);

	// var PicHeight = DispWidth / 2;

	CreateDiv('Stage', 'TextBoxDiv');

	var Title = '<H3 align = "center">QUESTIONNAIRE</H3>';

	var Info = '<H3 align = "center">Maintenant, nous aimerions vous poser quelques questions.<br><br>Nous vous prions d\'y répondre le plus précisément possible.<br><br>Nous vous rappelons que les réponses sont anonymes et ne seront pas divulguées.<br><br>Clickez sur start dès que vous êtes prêts.</H3><br><br>';


	$('#TextBoxDiv').html(Title+Info);

	var startBut;
	if(Language=='en')
	    startBut = '"Start!"'
	else if (Language=='fr')
	    startBut = '"Commencer"'

	var Buttons = '<div align="center"><input align="center" type="button"  class="btn btn-default" id="Start" value='+startBut+' ></div>';

	$('#Bottom').html(Buttons);


	$('#Start').click(function() {

	    $('#TextBoxDiv').remove();
	    $('#Stage').empty();
	    $('#Bottom').empty();
	    PlayQuestionnaire(1);
	});

    };

    function GetUserInfo(){

	// $('#Top').css('height', thisHeight / 20);
        // $('#Stage').css('width', DispWidth);
        // $('#Stage').css('min-height', thisHeight * 17 / 20);
        // $('#Bottom').css('min-height', thisHeight / 20);

	CreateDiv('Stage', 'TextBoxDiv');
	var Title = '<H3 align = "center">Please indicate your</H3><br>';
	var Age =  '<div align="center">Age: <input type="text" id = "age_id" name="age"><br></div>';
	var Gender = '<div align="center">Gender: <input type= "radio" id="m" name= "gender" >Male'+'<input type= "radio" id="f" name= "gender">Female<br></div>';

	$('#TextBoxDiv').html(Title+Age+'<br><br>'+Gender);

	var Buttons = '<div align="center"><input align="center" type="button"  class="btn btn-default" id="toQuestions" value="Next" ></div>';
        $('#Bottom').html(Buttons);
	
        $('#toQuestions').click(function() {
	    age_val = parseInt(document.getElementById('age_id').value);
	    
	    if( ($("input:radio:checked").length < 1) || isNaN(age_val) || (age_val <0) || (age_val>100) ){
		alert('Please fill the required fields.');
	    }
	    else {		
		gender_val = $("input:radio:checked").attr('id');
		SendUserDataDB(0);
		
		$('#TextBoxDiv').remove();
		$('#Stage').empty();
		$('#Bottom').empty();
		
		PlayQuestionnaire(1);
	    }
        });
			      
	
	function SendUserDataDB(){
	    $.ajax({
		type: 'POST',
		data: {id: SubID, age: age_val, gender: gender_val},
		async: true,
		url: 'InsertSubDetails.php',
		dataType: 'json',
		success: function(r) {
		    if (r[0].ErrorNo > 0) {
			//SubID = createCode();
			//RunExperiment(thisAge, thisEdu, thisSex);
			//DisplayError();
		    } else {
			//PlaySessions(0);
		    }
		    ;

		}, error: function(XMLHttpRequest, textStatus, errorThrown) {
		    alert("Status: " + textStatus);
		    alert("Error: " + errorThrown);
		}
	    });
	}	

    }
    function PlayQuestionnaire(QuestNum) {

	
        // $('#Top').css('height', thisHeight / 20);
        // $('#Stage').css('width', DispWidth);
        // $('#Stage').css('min-height', thisHeight * 17 / 20);
        // $('#Bottom').css('min-height', thisHeight / 20);
	// var PicHeight = DispWidth / 2;
	
        var NumQuestions = 8;//mettre a jour le nombre de pages (questions) via le script
        

        CreateDiv('Stage', 'TextBoxDiv');

        var Title = '<H2 align = "center"></H2>';
	var Info;
	var questID;
	var itemNum;
	var answer;
	var answer_value;

	var Question_time;
	var Reaction_time;
	
	var flag ='';
	var skip_id = '';
	var nb_skip = 0;
	
        switch (QuestNum) {
	case 1:
		var Info = '<H3 align="justify">The following questions measure your perception of your childhood and your current adult life. Please indicate your agreement with these statements. Please read each statement carefully, and then indicate how much you agree with the statement.</h3><br><br>';
		var Ticks = '';
		questID = "SESinstructions-1-";
		itemNum = 1;

		flag = "inst";

		break;
	
	case 2:
		var Info = '<H3 align="justify">When I was a child, my family usually had enough money for things when I was growing up</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >1 Strongly disagree<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >2<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >3<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >4<br>' +'<input type= "radio" id="5" name= "answer" value= 5 >5<br>' +'<input type= "radio" id="6" name= "answer" value= 6 >6<br>' +'<input type= "radio" id="7" name= "answer" value= 7 >7<br>' +'<input type= "radio" id="8" name= "answer" value= 8 >8<br>' +'<input type= "radio" id="9" name= "answer" value= 9 >9 Strongly agree<br>' +'';
		questID = "SES-7";
		itemNum = 1;

		break;
	
	case 3:
		var Info = '<H3 align="justify">When I was a child, I grew up in a relatively wealthy neighborhood</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >1 Strongly disagree<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >2<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >3<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >4<br>' +'<input type= "radio" id="5" name= "answer" value= 5 >5<br>' +'<input type= "radio" id="6" name= "answer" value= 6 >6<br>' +'<input type= "radio" id="7" name= "answer" value= 7 >7<br>' +'<input type= "radio" id="8" name= "answer" value= 8 >8<br>' +'<input type= "radio" id="9" name= "answer" value= 9 >9 Strongly agree<br>' +'';
		questID = "SES-7";
		itemNum = 2;

		break;
	
	case 4:
		var Info = '<H3 align="justify">When I was a child, I felt relatively wealthy compared to the other kids in my school</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >1 Strongly disagree<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >2<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >3<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >4<br>' +'<input type= "radio" id="5" name= "answer" value= 5 >5<br>' +'<input type= "radio" id="6" name= "answer" value= 6 >6<br>' +'<input type= "radio" id="7" name= "answer" value= 7 >7<br>' +'<input type= "radio" id="8" name= "answer" value= 8 >8<br>' +'<input type= "radio" id="9" name= "answer" value= 9 >9 Strongly agree<br>' +'';
		questID = "SES-7";
		itemNum = 3;

		break;
	
	case 5:
		var Info = '<H3 align="justify">Now as an adult, I have enough money to buy things I want</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >1 Strongly disagree<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >2<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >3<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >4<br>' +'<input type= "radio" id="5" name= "answer" value= 5 >5<br>' +'<input type= "radio" id="6" name= "answer" value= 6 >6<br>' +'<input type= "radio" id="7" name= "answer" value= 7 >7<br>' +'<input type= "radio" id="8" name= "answer" value= 8 >8<br>' +'<input type= "radio" id="9" name= "answer" value= 9 >9 Strongly agree<br>' +'';
		questID = "SES-7";
		itemNum = 4;

		break;
	
	case 6:
		var Info = '<H3 align="justify">Now as an adult, I don\'t need to worry too much about paying my bills</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >1 Strongly disagree<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >2<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >3<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >4<br>' +'<input type= "radio" id="5" name= "answer" value= 5 >5<br>' +'<input type= "radio" id="6" name= "answer" value= 6 >6<br>' +'<input type= "radio" id="7" name= "answer" value= 7 >7<br>' +'<input type= "radio" id="8" name= "answer" value= 8 >8<br>' +'<input type= "radio" id="9" name= "answer" value= 9 >9 Strongly agree<br>' +'';
		questID = "SES-7";
		itemNum = 5;

		break;
	
	case 7:
		var Info = '<H3 align="justify">Now as an adult, I don\'t think I\'ll have to worry about money too much in the future</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >1 Strongly disagree<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >2<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >3<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >4<br>' +'<input type= "radio" id="5" name= "answer" value= 5 >5<br>' +'<input type= "radio" id="6" name= "answer" value= 6 >6<br>' +'<input type= "radio" id="7" name= "answer" value= 7 >7<br>' +'<input type= "radio" id="8" name= "answer" value= 8 >8<br>' +'<input type= "radio" id="9" name= "answer" value= 9 >9 Strongly agree<br>' +'';
		questID = "SES-7";
		itemNum = 6;

		break;
	
	case 8:
		var Info = '<H3 align="justify"><b>Think of this ladder as representing where people stand in their communities.</b> People define community in different ways: please define it in whatever way is most meaningful to you. At the <b>top</b> of the ladder are the people who have the <b>highest standing</b> in their community. At the <b>bottom</b> are the people who have the <b>lowest standing</b> in their community. <b>Where would you place yourself on this ladder?</b></h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 10 >10 Top - highest standing<br>' +'<input type= "radio" id="2" name= "answer" value= 9 >9<br>' +'<input type= "radio" id="3" name= "answer" value= 8 >8<br>' +'<input type= "radio" id="4" name= "answer" value= 7 >7<br>' +'<input type= "radio" id="5" name= "answer" value= 6 >6<br>' +'<input type= "radio" id="6" name= "answer" value= 5 >5<br>' +'<input type= "radio" id="7" name= "answer" value= 4 >4<br>' +'<input type= "radio" id="8" name= "answer" value= 3 >3<br>' +'<input type= "radio" id="9" name= "answer" value= 2 >2<br>' +'<input type= "radio" id="10" name= "answer" value= 1 >1 Bottom - lower standing<br>' +'';
		questID = "SES-7";
		itemNum = 7;

		break;
	default:
	    
            break;
        }
        ;
        
        $('#TextBoxDiv').html(Title + Info + Ticks);

	Question_time = (new Date()).getTime();
		

        var Buttons = '<div align="center"><input align="center" type="button"  class="btn btn-default" id="Next" value="Next" ></div>';

        $('#Bottom').html(Buttons);


        $('#Next').click(function() {

	    if (flag=='inst'){
		$('#TextBoxDiv').remove();
                $('#Stage').empty();
                $('#Bottom').empty();
			
		QuestNum++;
		
                if(QuestNum<=NumQuestions){
		    PlayQuestionnaire(QuestNum);
		}else{
		    EndExperiment();
		}
            
	    }
            else if ($("input:radio:checked").length < 1) {
                alert('Please select one answer.');
		
            } else {
		Reaction_time = (new Date()).getTime();
		
		answer = parseInt( $("input:radio:checked").attr('id') );
		answer_value = $("input:radio:checked").val();

		//console.log(answer+' '+answer_value);


		
		SendQuestDataDB(0);
		//console.log($("input:radio:checked").val());
		
                $('#TextBoxDiv').remove();
                $('#Stage').empty();
                $('#Bottom').empty();
		
		if(flag =='skip' && skip_id== parseInt(answer)){
		    QuestNum+=nb_skip;
		}
		
		QuestNum++;
	    
                if(QuestNum<=NumQuestions){
		    PlayQuestionnaire(QuestNum);
		}else{
		    EndExperiment();
		}
            }
            ;
	    
	    
        });


	    function SendQuestDataDB(call){
		clog = 'EXP: '+ExpName+' $ EXPID: '+ExpID+' $ ID: '+SubID+' $ QUESTIONNAIRE: '+questID+' $ ITEM: '+itemNum+' $ ANSWER: '+answer+' $ VAL:'+answer_value+' $ RTIME: '+(Reaction_time-Question_time);

		$.ajax({
		    type: 'POST',
		    data: {exp: ExpName, expID: ExpID, id: SubID, qid: questID, item: itemNum, ans: answer, val:answer_value, reaction_time:Reaction_time-Question_time},
		    async: true,
		    url: 'InsertQuestionnaireDataDB.php',
		    dataType: 'json',
		    success: function(r) {
			//clog = 'quest: sucess $ '+clog+' $ call: '+call+' $ errno: '+r[0].ErrNo+'\n';
			clog = 'questionnaire_data $ '+clog+' $ dbcall success \n';
			log+= clog;
			
			if (r[0].ErrorNo > 0 && call+1<maxDBCalls){
			    //SendErrorDB(cl);
			    SendQuestDataDB(call+1);
			}
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown) {
			//clog = 'quest: error $ '+clog+' $ call: '+call+' $ stat: '+textStatus+' $ err: '+errorThrown+'\n';
			clog = 'questionnaire_data $ '+clog+' $ dbcall failure \n';
			log+=clog;
			
			if(call+1<maxDBCalls){
			    //SendErrorDB(cl);
			    SendQuestDataDB(call+1);
			}
			//alert("Status: " + textStatus);
			//alert("Error: " + errorThrown);
		    }
		});
	    };
    };

    
    function EndExperiment() {

	InsertLog(0,'log');
	
	// $('#Top').css('height', thisHeight / 20);
	// $('#Stage').css('width', DispWidth);
	// $('#Stage').css('min-height', thisHeight * 17 / 20);
	// $('#Bottom').css('min-height', thisHeight / 20);

	CreateDiv('Stage', 'TextBoxDiv');

	var toprint = parseInt(TotalReward)/1000;

	var wonlost;
	if (Language=='en'){
	    wonlost = ' earned ';
	    if (toprint<0){
		wonlost = ' lost ';
	    }
	}
	else if (Language=='fr'){
	    wonlost = ' gagné ';
	    if (toprint<0){
		wonlost = ' perdu ';
	    }
	}

	var Title = '<h3 align = "center">Le jeu est terminé.<br>Vous avez '+wonlost+toprint+' points au total.<br><br>Merci de votre participation!<br><br>Veuillez cliquer sur le lien suivant afin de compléter l\'étude:<br></h3><br>';
	var url = '';//'<center><a href="'+link+'">Prolific</a></center>';
	if (CompLink)
	    url = '<center><a href="'+link+'">Cliquez ici.</a></center>';

	$('#TextBoxDiv').html(Title+url);

	
    };


    function getKeyCode(event){
	return event.which;
	// if (event.key !== undefined) {
	//     // Handle the event with KeyboardEvent.key and set handled true.
	//     return event.key;
	// } else if (event.keyIdentifier !== undefined) {
	//     // Handle the event with KeyboardEvent.keyIdentifier and set handled true.
	//     return event.keyIdentifier;
	// } else if (event.keyCode !== undefined) {
	//     // Handle the event with KeyboardEvent.keyCode and set handled true.
	//     return event.keyCode;
	// }	
    }
    
    //Utility Functions
    function getColor(FB){
	color = border_color;
	if(FB==0){
	    //color = "#bfbfc9";
	    color = "black";
	}else if(FB==1){
	    color = "#07ed19";
	}else if(FB==-1){
	    color = "#f20202";
	}else if(FB==0.1){
	    color = "#1bb527";
	}else if(FB==-0.1){
	    color = "#ba1616";
	}
	return color;
    }

    
    function CreateCode() {
	return Math.floor(Math.random() * 10000000000);
    };


    function CreateDiv(ParentID, ChildID) {

	var d = $(document.createElement('div'))
            .attr("id", ChildID);
	var container = document.getElementById(ParentID);

	d.appendTo(container);
    };


    function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
	    // Pick a random index
	    let index = Math.floor(Math.random() * counter);

	    // Decrease counter by 1
	    counter--;

	    // And swap the last element with it
	    let temp = array[counter];
	    array[counter] = array[index];
	    array[index] = temp;
	}

	return array;
    };

    function hasRepetitiveValues(tab,lim){
        compt = 0;
        for (index=0; index<tab.length-1; index++){
            if (tab[index][0] == tab[index+1][0]){
                compt= compt+1;
            }
            else {
                compt=0;
            }
            if (compt==lim){
                return true;
            }
        }
        return false;
    };
});


