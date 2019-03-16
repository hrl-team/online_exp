$(document).ready(function() {
    
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////          Init exp parameters             /////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var ExpName = 'task1';
    var Language = "en";
    var CompLink = 0;
    var NumSessions = 2;
    var PostLearning = 0;
    var Questionnaire = 1;
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
    
    var Conditions = [[0.75,0.25,1,1,0,],[0.75,0.25,1,1,1,],[0.75,0.25,1,-1,0,],[0.75,0.25,1,-1,1,],];
    var MagCond = [1,];
    var ValCond = [1,-1,];
    var InfCond = [0,1,];

    var TrainingConditions = Conditions.slice(0);//copy
    var NumTrainingCond = TrainingConditions.length;

    var Conds = [];
    for (j = 0; j < StatesPerCondition; j++) {
	Conditions = shuffle(Conditions);
	for (i = 0; i < Conditions.length; i++) {
	    Conds.push(Conditions[i]);
	}
    }

    Conditions = Conds;

    var NumCond = Conditions.length;
    var NumCondPerSession = NumCond/NumSessions; 
    var NumTrials = TrialsPerCondition*NumCond/NumSessions;

    
    // Get available options
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
    

    //Randomize them
    available_options = shuffle(available_options);


    //Affect a pair of options for each condition
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

       
    //Build postlearning
    var PLOptions = [];
    var PLOptionValues = [];
    var indexes = [];
    var k = 0;
    for(var i = 0;i<NumCond*2;i++){
    	for(var j = 0;j<NumCond*2;j++){
	    if (i!=j){
		PLOptions.push([AllOptions[i],AllOptions[j]]);
		PLOptionValues.push([AllOptionValues[i],AllOptionValues[j]]);
		indexes.push(k);
		k++;
		
		//Show each pair twice in each order
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


    var NumPostLearningTrials = PostLearningOptions.length;

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
    

    //Build training
    var TrainingSession = [];
    for (c = 0; c < NumTrainingCond; c++) {
    	for (t = 0; t < NbTrainingTrials; t++) {
    	    TrainingSession.push([TrainingConditions[c],TrainingOptions[c]]);
    	}	
    }
    // if (InterLeaved){
    // 	TrainingSession = shuffle(TrainingSession);
    //}


    



   
    //init variables
    var SumReward = 0;
    var TotalReward = 0;
    var InvertedPosition = 0;
    var clickDisabeled = false;
    var TrainSess = -1;
    var maxDBCalls = 1;


    var log = '';
    var clog = '';
    
    var ExpID = CreateCode();
    var SubID = ExpID;
    var Init_time = (new Date()).getTime();
    var browsInfo = GetOS()+' - '+GetBrowser();


    var link = '';
    url = location.href;




    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////          Start the experiment            /////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    GetUserID();      


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////       User info functions     ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function GetUserID() {


        CreateDiv('Stage', 'TextBoxDiv');
	
	if(Language=='en'){
            var Title = '<H3 align = "justify">Before you start, please:<br><br>- maximize your browser window<br><br>- switch off phone/e-mail/music & anything else distracting<br><br>- and please enter your Prolific ID: <input type="text" id = "textbox_id" name="ID"></H3>';
	    var Buttons = '<div align="center"><input align="center" type="button"  class="btn btn-default" id="toConsent" value="Next" ></div>';
	}
	else if(Language=='fr'){
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

		Information();
	    }else{
		alert('You must enter your Prolific ID.');
	    }
        });
    };

    function GetUserInfo(){

	CreateDiv('Stage', 'TextBoxDiv');

	if(Language=='en'){
	    var Title = '<H3 align = "center">Please indicate your</H3><br>';
	    var Age =  '<div align="center">Age: <input type="text" id = "age_id" name="age"><br></div>';
	    var Gender = '<div align="center">Gender: <input type= "radio" id="m" name= "gender" >Male'+'<input type= "radio" id="f" name= "gender">Female<br></div>';
	    var Buttons = '<div align="center"><input align="center" type="button"  class="btn btn-default" id="toQuestions" value="Next" ></div>';
	}
	else if(Language=='fr'){
	    var Title = '<H3 align = "center">Quel est votre âge?</H3><br>';
	    var Age =  '<div align="center"><input type="text" id = "age_id" name="age"><br></div>';
	    var Gender = '<H3 align = "center">Vous êtes</H3><br><div align="center"><input type= "radio" id="m" name= "gender" >  Un homme  '+'<input type= "radio" id="f" name= "gender">  Une femme<br></div><br><br><br>';
	    var Buttons = '<div align="center"><input align="center" type="button"  class="btn btn-default" id="toQuestions" value="Suivant" ></div>';
	}
	$('#TextBoxDiv').html(Title+Age+'<br><br>'+Gender);

        $('#Bottom').html(Buttons);
	
        $('#toQuestions').click(function() {
	    age_val = parseInt(document.getElementById('age_id').value);
	    
	    if( ($("input:radio:checked").length < 1) || isNaN(age_val) || (age_val <0) || (age_val>100) ){
            if(Language=='en'){
                alert('Please fill the required fields.');        
            }
            else if(Language=='fr'){
                alert('Veuillez indiquer les informations requises.');
            }
		}
	    else {		
		gender_val = $("input:radio:checked").attr('id');
		SendUserDataDB(0);
		
		$('#TextBoxDiv').remove();
		$('#Stage').empty();
		$('#Bottom').empty();
		
		Information();
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
    
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////          Information      ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function Information() {

        CreateDiv('Stage', 'TextBoxDiv');

        var Title = '<H2 align = "center"></H2>';
        var Info = '<H3 align = "justify">In this game, you have to earn a maximum of points by discovering which cards are the most likely to give you points... or to make you lose points!<br><br>For each of your choices, you will see how much points you earned or lost.<br><br>Sometimes, you will also see how much you would have earned or lost if you had chosen the other card.<br><br>Let\'s start with a little practice!<br></H3>';

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



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////          Consent          ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function Consent() {


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


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////          Instructions     ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function Instructions(PageNum) {


	var NumPages = 11;
        

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

	FBcolor = getColor(parseFloat(FB));
	CFBcolor = getColor(parseFloat(CFB));
	
	var counterfact = !isNaN(parseFloat(FB)) && !isNaN(parseFloat(CFB));
	if (counterfact){
	    CFBcolor = border_color;
	}
	var condimg = parseInt(flag);


	if(isNaN(condimg)){
	    $('#TextBoxDiv').html(Title + Info);
	    
	}else{
	    
	    var Option1 = '<img id = "Option1" id = "Option1" src="'+IMGPath+'stim/'+TrainingOptions[condimg-1][0]+'.'+IMGExt+'" style="border:5px solid '+ FBcolor+'">';
            var Option2 = '<img id = "Option1" id = "Option2" src="'+IMGPath+'stim/'+TrainingOptions[condimg-1][1]+'.'+IMGExt+'" style="border:5px solid '+CFBcolor+'">';


            var ThisImage = '</br></br><div class="row">  <div class="col-md-1"></div>  <div id = "leftimg" class="col-md-3" align = "center">' + Option1 + '</div><div id = "Middle" class="col-md-4"></div><div id="rightimg" class="col-md-3" align = "center">' + Option2 + '</div><div class="col-md-1"></div></div>';	
	    
            var Feedback = '<div class="row">  <div class="col-md-1"> </div> <div id = "leftfb" class="col-md-3" align = "center"><font size="5">' + FB + '</font></div> <div  id = "Middle"  class="col-md-4"></div><div id="rightfb" class="col-md-3" align = "center"> <font size="5">' + CFB + '</font> </div> <div  class="col-md-1"> </div> </div>';

	    $('#TextBoxDiv').html(Title + ThisImage + Feedback + Info);
	}
	
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
    	$.ajax({
    	    type: 'POST',
    	    data: {expID: ExpID, id: SubID, exp: ExpName, browser: browsInfo},
    	    async: true,
    	    url: 'InsertExpDetails.php',
    	    dataType: 'json',
    	    success: function(r) {
		clog = 'experiment_data $ '+clog+' $ dbcall success \n';
    		log+= clog;
		InsertLog(0,'exp');

    		if (r[0].ErrorNo > 0 && call+1<maxDBCalls){
    		    SendExpDataDB(call+1);
    		}
    	    },
    	    error: function(XMLHttpRequest, textStatus, errorThrown) {
    		clog = 'experiment_data $ '+clog+' $ dbcall failure \n';
    		log+=clog;
    		InsertLog(0,'exp');

    		if(call+1<maxDBCalls){
    		    SendExpDataDB(call+1);
    		}
    	    },
		});
    }

    

    function InsertLog(call,ext){
    	$.ajax({
    	    type: 'POST',
	    data: {expID: ExpID, id: SubID, exp: ExpName, log:log, ext:ext},
	    async: true,
    	    url: 'InsertLog.php',
    	    dataType: 'json',
		    error: function(XMLHttpRequest, textStatus, errorThrown) {
    	    	clog='insertlog failure call '+call+' - status: '+textStatus+' - error: '+errorThrown+'\n';
    	    	log+=clog;
		msg ="Internet connection";
		if(Language=='en'){
		    msg ="Please verify your internet connection before continuing the experiment";
		}
		else if(Language=='fr'){
		    msg="Veuillez vérifier votre connexion internet avant de continuer";
		}
		alert(msg);
		InsertLog(call+1,ext);
    	    }
    	});
    }
    

    

    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////          Trainning        ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function PlayTraining(TrialNum) {

	
	if($('#TextBoxDiv').length == 0){
            CreateDiv('Stage', 'TextBoxDiv');
	    document.getElementById("TextBoxDiv").style.backgroundColor = "white";
	}

	var Condition = TrainingSession[TrialNum][0];
	var Option = TrainingSession[TrialNum][1];

	var Option1 = images[Option[0]];
	Option1.id = "Option1";
	Option1 = Option1.outerHTML;
	
	var Option2 = images[Option[1]];
	Option2.id = "Option2";
	Option2 = Option2.outerHTML;


	var FB1 = fb_images["empty"];
	FB1.id = "FB1";
	FB1 = FB1.outerHTML;
	
        var FB2 = fb_images["empty"];
	FB2.id = "FB2";
	FB2 = FB2.outerHTML;
	

	if(Language=='en'){
            var Title = '<div id = "Title"><H2 align = "center">Click on the card of your choice<br><br><br><br></H2></div>';
	}
	else if(Language=='fr'){
	    var Title = '<div id = "Title"><H2 align = "center">Cliquez sur la carte de votre choix<br><br><br><br></H2></div>';
	}
     
		
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
	    
	    var key = getKeyCode(e);
	    
	    if ((key ==101 && !InvertedPosition) || (key ==112 && InvertedPosition)){
	    	if(clickDisabeled)
	    	    return;
	    	clickDisabeled = true;

	    	fb = Reward(1);
	    	color = getColor(fb);
	    	document.getElementById("Option1").style.borderColor="black";
		targetElement.removeEventListener('keypress', myEventHandler);
	    	
	    }
	    else if ((key ==112 && !InvertedPosition) || (key ==101 && InvertedPosition)){
	    	if(clickDisabeled)
	    	    return;
	    	clickDisabeled = true;

	    	fb = Reward(2);
	    	color = getColor(fb);
	    	document.getElementById("Option2").style.borderColor="black";
		targetElement.removeEventListener('keypress', myEventHandler);
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
	    document.getElementById("Option1").style.borderColor="black";            

        });
        $('#Option2').click(function() {
	    if(clickDisabeled)
		return;
	    clickDisabeled = true;
	    
            fb = Reward(2);
	    document.getElementById("Option2").style.borderColor="black";
        });

	
	function Reward(Choice) {
	    
	    var Reaction_time = (new Date()).getTime();

	    var left_right = -1;

	    if( (InvertedPosition && (Choice==1)) || (!InvertedPosition && (Choice==2)) ) {
		left_right = 1;
	    }

	    

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
	    
            if (Choice === 1) {
		if (RandomNum1 < P1) {
                    ThisReward = Rwd;
		}
		if (RandomNum2 < P2) {
                    OtherReward = Rwd;
		}
		
            } else {
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
			slideCard(pic2);
		    }

		    
		}, 500)
		
	    }else{
		fb2.src = fb_images[''+ThisReward].src;
		setTimeout(function() {

		    slideCard(pic2);
		    
		    if(Info===1){
			fb1.src = fb_images['cf_'+OtherReward].src;
			slideCard(pic1);		
		    }

		    
                }, 500)

		
	    }



	    
	    SendTrainDataDB(0);


	    Next();



	    function slideCard(img){
	
		tl = new TimelineLite();
		tl.to(img, 1, {y:"100%"})
	    }

	    
	    function SendTrainDataDB(call){
		clog = 'EXP: '+ExpName+' $ EXPID: '+ExpID+' $ ID: '+SubID+' $ SESSION: '+TrainSess+' $ TRIAL: '+TrialNum+' $ P1: '+P1+' $ P2: '+P2+' $ MAG: '+Mag+' $ VAL: '+Val+' $ INF: '+Info+' $ OP1: '+Option[0]+' $ OP2: '+Option[1]+' $ INV: '+InvertedPosition+' $ CTIME: '+(Choice_time-Init_time)+' $ CLR: '+left_right+' $ CGB: '+((Choice == 1)?1:0)+' $ RGB: '+((ThisReward == Rwd)?1:0)+' $ CFGB: '+((OtherReward == Rwd)?1:0)+' $ RTIME: '+(Reaction_time-Choice_time);

		$.ajax({
		    type: 'POST',
		    data: {exp: ExpName, expID: ExpID, id: SubID, session: TrainSess, trial: TrialNum, p1:P1, p2:P2, magnitude:Mag, valence:Val, information:Info, option1:Option[0], option2:Option[1], inverted:InvertedPosition, choice_time:Choice_time-Init_time, choice_left_right:left_right, choice_good_bad:((Choice == 1)?1:0), reward_good_bad:((ThisReward == Rwd)?1:0), other_reward_good_bad:((OtherReward == Rwd)?1:0), reaction_time:Reaction_time-Choice_time},
		    async: true,
		    url: 'InsertLearningDataDB.php',
		    dataType: 'json',
		    success: function(r) {
			clog = 'learning_data $ '+clog+' $ dbcall success \n';
			log+= clog;
			
			if (r[0].ErrorNo > 0 && call+1<maxDBCalls){
			    SendTrainDataDB(call+1);
			}
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown) {
			clog = 'learning_data $ '+clog+' $ dbcall failure \n';
			log+=clog;
			
			if(call+1<maxDBCalls){
			    SendTrainDataDB(call+1);
			}
		    }
		});

	    };

	    return ThisReward;

	};

	
	function Next(){
	    TrialNum++;
	    if (TrialNum < NbTrainingTrials*NumTrainingCond) {
		setTimeout(function() {
		    $('#stimrow').fadeOut(500);
		    $('#fbrow').fadeOut(500);
		    setTimeout(function() {
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


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////          Learning         ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function StartSessions(){
	
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
	    Info = '<H3 align = "center">Now, you are about to start the game.<br>Click on start when you are ready.</h3><br><br>';

	    instBut  = "Return to instructions";
	    trainBut = "Play the practice again";
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
	    Buttons+='<input align="center" type="button"  class="btn btn-default" id="Train" value='+trainBut+' >\n\ ';
	}
	Buttons+='<input align="center" type="button"  class="btn btn-default" id="Start" value='+startBut+' >';
	Buttons+='</div>';

        $('#Bottom').html(Buttons);

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
			    PlaySessions(0);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 10);

        });

    }


    function EndTrainingStartSessions(){
	InsertLog(0,'train');
	
        var NumPages = 2;
        

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
	    Info += '<H3 align = "center">Now, you are about to start the game.<br>Click on start when you are ready.</h3><br><br>';
	    
	    instBut  = '"Return to instructions"';
	    trainBut = '"Play the practice again"';
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
	    Buttons+='<input align="center" type="button"  class="btn btn-default" id="Train" value='+trainBut+' >\n\ ';
	}
	Buttons+='<input align="center" type="button"  class="btn btn-default" id="Start" value='+startBut+' >';
	Buttons+='</div>';

        $('#Bottom').html(Buttons);

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
			    PlaySessions(0);
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


	if($('#TextBoxDiv').length == 0){
            CreateDiv('Stage', 'TextBoxDiv');
	    document.getElementById("TextBoxDiv").style.backgroundColor = "white";
	}

	var Condition = Sessions[SessionNum][TrialNum][0];
	var Option = Sessions[SessionNum][TrialNum][1];

	var Option1 = images[Option[0]];
	Option1.id = "Option1";
	Option1 = Option1.outerHTML;
	
	var Option2 = images[Option[1]];
	Option2.id = "Option2";
	Option2 = Option2.outerHTML;

	var FB1 = fb_images["empty"];
	FB1.id = "FB1";
	FB1 = FB1.outerHTML;
	
        var FB2 = fb_images["empty"];
	FB2.id = "FB2";
	FB2 = FB2.outerHTML;
	
	if(Language=='en'){
            var Title = '<div id = "Title"><H2 align = "center">Click on the card of your choice<br><br><br><br></H2></div>';
	}
	else if(Language=='fr'){
	    var Title = '<div id = "Title"><H2 align = "center">Cliquez sur la carte de votre choix<br><br><br><br></H2></div>';
	}

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
		targetElement.removeEventListener('keypress', myEventHandler);
	    	
	    }
	    else if ((key ==112 && !InvertedPosition) || (key ==101 && InvertedPosition)){
	    	if(clickDisabeled)
	    	    return;
	    	clickDisabeled = true;

	    	fb = Reward(2);
	    	color = getColor(fb);
		document.getElementById("Option2").style.borderColor="black";
		targetElement.removeEventListener('keypress', myEventHandler);
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
			slideCard(pic2);
			
			
		    }

		    
		}, 500)
		
	    }else{
		fb2.src = fb_images[''+ThisReward].src;
		setTimeout(function() {

		    slideCard(pic2);
		    
		    if(Info===1){
			fb1.src = fb_images['cf_'+OtherReward].src;
			slideCard(pic1);
			
			
		    }

		    
                }, 500)

		
	    }


	    
	    SendLearnDataDB(0);


	    Next();
	    






	    function slideCard(img){
	
		tl = new TimelineLite();
		tl.to(img, 1, {y:"100%"})
	    }

	    
	    function SendLearnDataDB(call){
		clog = 'EXP: '+ExpName+' $ EXPID: '+ExpID+' $ ID: '+SubID+' $ SESSION: '+SessionNum+' $ TRIAL: '+TrialNum+' $ P1: '+P1+' $ P2: '+P2+' $ MAG: '+Mag+' $ VAL: '+Val+' $ INF: '+Info+' $ OP1: '+Option[0]+' $ OP2: '+Option[1]+' $ INV: '+InvertedPosition+' $ CTIME: '+(Choice_time-Init_time)+' $ CLR: '+left_right+' $ CGB: '+((Choice == 1)?1:0)+' $ RGB: '+((ThisReward == Rwd)?1:0)+' $ CFGB: '+((OtherReward == Rwd)?1:0)+' $ RTIME: '+(Reaction_time-Choice_time);

		$.ajax({
		    type: 'POST',
		    data: {exp: ExpName, expID: ExpID, id: SubID, session: SessionNum, trial: TrialNum, p1:P1, p2:P2, magnitude:Mag, valence:Val, information:Info, option1:Option[0], option2:Option[1], inverted:InvertedPosition, choice_time:Choice_time-Init_time, choice_left_right:left_right, choice_good_bad:((Choice == 1)?1:0), reward_good_bad:((ThisReward == Rwd)?1:0), other_reward_good_bad:((OtherReward == Rwd)?1:0), reaction_time:Reaction_time-Choice_time},
		    async: true,
		    url: 'InsertLearningDataDB.php',
		    dataType: 'json',
		    success: function(r) {
			clog = 'learning_data $ '+clog+' $ dbcall success \n';
			log+= clog;
			
			if (r[0].ErrorNo > 0 && call+1<maxDBCalls){
			    SendLearnDataDB(call+1);
			}
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown) {
			clog = 'learning_data $ '+clog+' $ dbcall failure \n';
			log+=clog;
			
			if(call+1<maxDBCalls){
			    SendLearnDataDB(call+1);
			}
		    }
		});

	    };


	    return ThisReward;

	};

	
	function Next(){
	    TrialNum++;
	    if (TrialNum < NumTrials) {
		setTimeout(function() {
		    $('#stimrow').fadeOut(500);
		    $('#fbrow').fadeOut(500);
                    setTimeout(function() {

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

	    Info = '<H3 align = "center">You have done half of the game. <br>So far, you have '+wonlost+toprint+' points.</h3><br><br>';
	    nextBut='"Next"';
	}
	else if (Language=='fr'){
	    wonlost= ' gagné ';
	    if (toprint<0){
		wonlost = ' perdu ';
	    }

	    Info = '<H3 align = "center">Vous êtes à la moitié du jeu. <br>Jusqu\'ici vous avez'+wonlost+toprint+' points.<br>Encore 5 minutes d\'effort et vous aurez terminé !</h3><br><br>';
	    
	    nextBut='"Suivant"';
	}
	TotalReward= TotalReward+SumReward;
	SumReward = 0;
	
	$('#TextBoxDiv').html(Info);

	
	var Buttons = '<div align="center"><input align="center" type="button"  class="btn btn-default" id="Next" value='+nextBut+' ></div>';

	$('#Bottom').html(Buttons);


	$('#Next').click(function() {
	    $('#TextBoxDiv').remove();
	    $('#Stage').empty();
	    $('#Bottom').empty();
	    
	    PlaySessions(SessionNum);
	    
	})
    }

    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////            Postlearning              //////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function StartPostLearning(PageNum) {

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
		$('#Stage').html('<H1 align = "center">A vos marques...</H1>');
                setTimeout(function() {
		    $('#Stage').html('<H1 align = "center">Prêts?</H1>');
                    setTimeout(function() {
			$('#Stage').html('<H1 align = "center">Partez!</H1>');
                	setTimeout(function() {
			    $('#Stage').empty();
			    PlayPostLearning(0);
			}, 1000);
		    }, 1000);
		}, 1000);
	    }, 10);
          

        });

    };

    
    function PlayPostLearning(TrialNum) {

        CreateDiv('Stage', 'TextBoxDiv');


	var Option = PostLearningOptions[TrialNum];

        var Option1 = '<img id = "Option1" src="'+IMGPath+'stim/'+Option[0]+'.'+IMGExt+'" class="img-responsive center-block" style="border:5px solid '+ border_color +'">';
        var Option2 = '<img id = "Option2" src="'+IMGPath+'stim/'+Option[1]+'.'+IMGExt+'" class="img-responsive center-block" style="border:5px solid '+ border_color +'">';

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
	
	//targetElement.addEventListener('keypress',myEventHandler);
	
	//with click
    $('#Option1').click(function() {
    if(clickDisabeled)
	return;
    clickDisabeled = true;
    
        $(this).css({"border-color": "white",
		 "border-width": "5px",
		 "border-style": "solid"});

        Reward(1);
    Next();

    });
    $('#Option2').click(function() {
        if(clickDisabeled)
	return;
    clickDisabeled = true;

    $(this).css({"border-color": "white",
		 "border-width": "5px",
		 "border-style": "solid"});


        Reward(2);
    Next();
    });

	

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
			clog = 'post_learning_data $ '+clog+' $ dbcall success \n';
			log+= clog;
			
			if (r[0].ErrorNo > 0 && call+1<maxDBCalls){
			    SendPostDataDB(call+1);
			}
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown) {
			clog = 'post_learning_data $ '+clog+' $ dbcall failure \n';
			log+=clog;
			
			if(call+1<maxDBCalls){
			    SendPostDataDB(call+1);
			}
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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////       Questionnaires          //////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function StartQuestionnaire(){

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

    function PlayQuestionnaire(QuestNum) {

	
        var NumQuestions = 75;
        

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
		var Info = '<H3 align="justify">Do you smoke cigarettes on a daily basis?</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1  >Yes<br>' +'<input type= "radio" id="2" name= "answer" value= 0 >No<br>' +'';
		questID = "FTNDskiptest-1";
		itemNum = 1;

		flag = "skip";
		skip_id = 2;
		nb_skip = 6;

		break;
	
	case 2:
		var Info = '<H3 align="justify">How soon after waking do you smoke your first cigarette? </h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 3  >Within 5 minutes<br>' +'<input type= "radio" id="2" name= "answer" value= 2  >5-30 minutes<br>' +'<input type= "radio" id="3" name= "answer" value= 1  >31-60 minutes<br>' +'<input type= "radio" id="4" name= "answer" value= 0 >Later<br>' +'';
		questID = "FTND-6";
		itemNum = 1;

		break;
	
	case 3:
		var Info = '<H3 align="justify">Do you find it difficult to refrain from smoking in places where it is forbidden? </h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1  >Yes<br>' +'<input type= "radio" id="2" name= "answer" value= 0 >No<br>' +'';
		questID = "FTND-6";
		itemNum = 2;

		break;
	
	case 4:
		var Info = '<H3 align="justify">Which cigarette would you hate to give up? </h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1  >The first in the morning<br>' +'<input type= "radio" id="2" name= "answer" value= 0 >Any other<br>' +'';
		questID = "FTND-6";
		itemNum = 3;

		break;
	
	case 5:
		var Info = '<H3 align="justify">How many cigarettes a day do you smoke? </h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 0  >10 or less<br>' +'<input type= "radio" id="2" name= "answer" value= 1  >11-20<br>' +'<input type= "radio" id="3" name= "answer" value= 2  >21-30<br>' +'<input type= "radio" id="4" name= "answer" value= 3 >31 or more<br>' +'';
		questID = "FTND-6";
		itemNum = 4;

		break;
	
	case 6:
		var Info = '<H3 align="justify">Do you smoke more frequently in the morning? </h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1  >Yes<br>' +'<input type= "radio" id="2" name= "answer" value= 0 >No<br>' +'';
		questID = "FTND-6";
		itemNum = 5;

		break;
	
	case 7:
		var Info = '<H3 align="justify">Do you smoke even if you are sick in bed most of the day? </h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1  >Yes<br>' +'<input type= "radio" id="2" name= "answer" value= 0 >No<br>' +'';
		questID = "FTND-6";
		itemNum = 6;

		break;
	
	case 8:
		var Info = '<H3 align="justify">Do you ever have a drink containing alcohol? </h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1  >Yes<br>' +'<input type= "radio" id="2" name= "answer" value= 0 >No<br>' +'';
		questID = "AUDITskiptest-1";
		itemNum = 1;

		flag = "skip";
		skip_id = 2;
		nb_skip = 10;

		break;
	
	case 9:
		var Info = '<H3 align="justify">How often do you have a drink containing alcohol? </h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 0  >Never<br>' +'<input type= "radio" id="2" name= "answer" value= 1  >Monthly or less<br>' +'<input type= "radio" id="3" name= "answer" value= 2  >2-4 times a month<br>' +'<input type= "radio" id="4" name= "answer" value= 3  >2-3 times a week<br>' +'<input type= "radio" id="5" name= "answer" value= 4 >4 or more times a week<br>' +'';
		questID = "AUDIT-10";
		itemNum = 1;

		break;
	
	case 10:
		var Info = '<H3 align="justify">How many standard drinks containing alcohol do you have on a typical day when drinking? </h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 0  >Not concerned<br>' +'<input type= "radio" id="2" name= "answer" value= 0  >1 or 2<br>' +'<input type= "radio" id="3" name= "answer" value= 1  >3 or 4<br>' +'<input type= "radio" id="4" name= "answer" value= 2  >5 or 6<br>' +'<input type= "radio" id="5" name= "answer" value= 3  >7 to 9<br>' +'<input type= "radio" id="6" name= "answer" value= 4 >10 or more<br>' +'';
		questID = "AUDIT-10";
		itemNum = 2;

		break;
	
	case 11:
		var Info = '<H3 align="justify">How often do you have six or more drinks on one occasion? </h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 0  >Never<br>' +'<input type= "radio" id="2" name= "answer" value= 1  >Less than monthly<br>' +'<input type= "radio" id="3" name= "answer" value= 2  >Monthly<br>' +'<input type= "radio" id="4" name= "answer" value= 3  >Weekly<br>' +'<input type= "radio" id="5" name= "answer" value= 4 >Daily or almost daily<br>' +'';
		questID = "AUDIT-10";
		itemNum = 3;

		break;
	
	case 12:
		var Info = '<H3 align="justify">During the past year, how often have you found that you were not able to stop drinking once you had started? </h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 0  >Never<br>' +'<input type= "radio" id="2" name= "answer" value= 1  >Less than monthly<br>' +'<input type= "radio" id="3" name= "answer" value= 2  >Monthly<br>' +'<input type= "radio" id="4" name= "answer" value= 3  >Weekly<br>' +'<input type= "radio" id="5" name= "answer" value= 4 >Daily or almost daily<br>' +'';
		questID = "AUDIT-10";
		itemNum = 4;

		break;
	
	case 13:
		var Info = '<H3 align="justify">During the past year, how often have you failed to do what was normally expected of you because of drinking? </h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 0  >Never<br>' +'<input type= "radio" id="2" name= "answer" value= 1  >Less than monthly<br>' +'<input type= "radio" id="3" name= "answer" value= 2  >Monthly<br>' +'<input type= "radio" id="4" name= "answer" value= 3  >Weekly<br>' +'<input type= "radio" id="5" name= "answer" value= 4 >Daily or almost daily<br>' +'';
		questID = "AUDIT-10";
		itemNum = 5;

		break;
	
	case 14:
		var Info = '<H3 align="justify">During the past year, how often have you needed a drink in the morning to get yourself going after a heavy drinking session? </h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 0  >Never<br>' +'<input type= "radio" id="2" name= "answer" value= 1  >Less than monthly<br>' +'<input type= "radio" id="3" name= "answer" value= 2  >Monthly<br>' +'<input type= "radio" id="4" name= "answer" value= 3  >Weekly<br>' +'<input type= "radio" id="5" name= "answer" value= 4 >Daily or almost daily<br>' +'';
		questID = "AUDIT-10";
		itemNum = 6;

		break;
	
	case 15:
		var Info = '<H3 align="justify">During the past year, how often have you had a feeling of guilt or remorse after drinking? </h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 0  >Never<br>' +'<input type= "radio" id="2" name= "answer" value= 1  >Less than monthly<br>' +'<input type= "radio" id="3" name= "answer" value= 2  >Monthly<br>' +'<input type= "radio" id="4" name= "answer" value= 3  >Weekly<br>' +'<input type= "radio" id="5" name= "answer" value= 4 >Daily or almost daily<br>' +'';
		questID = "AUDIT-10";
		itemNum = 7;

		break;
	
	case 16:
		var Info = '<H3 align="justify">During the past year, have you been unable to remember what happened the night before because you had been drinking? </h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 0  >Never<br>' +'<input type= "radio" id="2" name= "answer" value= 1  >Less than monthly<br>' +'<input type= "radio" id="3" name= "answer" value= 2  >Monthly<br>' +'<input type= "radio" id="4" name= "answer" value= 3  >Weekly<br>' +'<input type= "radio" id="5" name= "answer" value= 4 >Daily or almost daily<br>' +'';
		questID = "AUDIT-10";
		itemNum = 8;

		break;
	
	case 17:
		var Info = '<H3 align="justify">Have you or someone else been injured as a result of your drinking? </h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 0  >No<br>' +'<input type= "radio" id="2" name= "answer" value= 2  >Yes, but not in the past year<br>' +'<input type= "radio" id="3" name= "answer" value= 4 >Yes, during the past year<br>' +'';
		questID = "AUDIT-10";
		itemNum = 9;

		break;
	
	case 18:
		var Info = '<H3 align="justify">Has a relative or friend, doctor or other health worker been concerned about your drinking or suggested you cut down? </h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 0  >No<br>' +'<input type= "radio" id="2" name= "answer" value= 2  >Yes, but not in the past year<br>' +'<input type= "radio" id="3" name= "answer" value= 4 >Yes, during the past year<br>' +'';
		questID = "AUDIT-10";
		itemNum = 10;

		break;
	
	case 19:
		var Info = '<H3 align="justify">For the following questions, please select the reply that is closest to how you have been feeling in the past week. Don\'t take too long over your replies, your immediate is best.</h3><br><br>';
		var Ticks = '';
		questID = "HADSinstructions-1-";
		itemNum = 1;

		flag = "inst";

		break;
	
	case 20:
		var Info = '<H3 align="justify">I feel tense or "wound up".</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 3 >Most of the time<br>' +'<input type= "radio" id="2" name= "answer" value= 2From time to time >A lot of the time<br>' +'<input type= "radio" id="3" name= "answer" value= 0 >Not at all<br>' +'';
		questID = "HADS-14";
		itemNum = 1;

		break;
	
	case 21:
		var Info = '<H3 align="justify">I get a sort of frightened feeling as if something awful is about to happen.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 3 >Very definitely and quite badly<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Yes, but not too badly<br>' +'<input type= "radio" id="3" name= "answer" value= 1 >A little, but it doesn\'t worry me<br>' +'<input type= "radio" id="4" name= "answer" value= 0 >Not at all<br>' +'';
		questID = "HADS-14";
		itemNum = 2;

		break;
	
	case 22:
		var Info = '<H3 align="justify">Worrying thoughts go through my mind.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 3 >A great deal of the time<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >A lot of the time<br>' +'<input type= "radio" id="3" name= "answer" value= 1 >From time to time, but not too often<br>' +'<input type= "radio" id="4" name= "answer" value= 0 >Only occasionally<br>' +'';
		questID = "HADS-14";
		itemNum = 3;

		break;
	
	case 23:
		var Info = '<H3 align="justify">I can sit at ease and feel relaxed.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 0 >Definitely<br>' +'<input type= "radio" id="2" name= "answer" value= 1 >Usually<br>' +'<input type= "radio" id="3" name= "answer" value= 2 >Not often<br>' +'<input type= "radio" id="4" name= "answer" value= 3 >Not at all<br>' +'';
		questID = "HADS-14";
		itemNum = 4;

		break;
	
	case 24:
		var Info = '<H3 align="justify">I get a sort of frightened feeling like "butterflies" in the stomach.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 0 >Not at all<br>' +'<input type= "radio" id="2" name= "answer" value= 1 >Occasionally<br>' +'<input type= "radio" id="3" name= "answer" value= 2 >Quite often<br>' +'<input type= "radio" id="4" name= "answer" value= 3 >Very often<br>' +'';
		questID = "HADS-14";
		itemNum = 5;

		break;
	
	case 25:
		var Info = '<H3 align="justify">I feel restless as I have to be on the move.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 3 >Very much indeed<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Quite a lot<br>' +'<input type= "radio" id="3" name= "answer" value= 1 >Not very much<br>' +'<input type= "radio" id="4" name= "answer" value= 0 >Not at all<br>' +'';
		questID = "HADS-14";
		itemNum = 6;

		break;
	
	case 26:
		var Info = '<H3 align="justify">I get sudden feelings of panic.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 3 >Very often indeed<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Quite often<br>' +'<input type= "radio" id="3" name= "answer" value= 1 >Not very often<br>' +'<input type= "radio" id="4" name= "answer" value= 0 >Not at all<br>' +'';
		questID = "HADS-14";
		itemNum = 7;

		break;
	
	case 27:
		var Info = '<H3 align="justify">I still enjoy the things I used to enjoy.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 0 >Definitely as much<br>' +'<input type= "radio" id="2" name= "answer" value= 1 >Not quite so much<br>' +'<input type= "radio" id="3" name= "answer" value= 2 >Only a little<br>' +'<input type= "radio" id="4" name= "answer" value= 3 >Hardly at all<br>' +'';
		questID = "HADS-14";
		itemNum = 8;

		break;
	
	case 28:
		var Info = '<H3 align="justify">I can laugh and see the funny side of things.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 0 >As much as I always could<br>' +'<input type= "radio" id="2" name= "answer" value= 1 >Not quite so much now<br>' +'<input type= "radio" id="3" name= "answer" value= 2 >Definitely not so much now<br>' +'<input type= "radio" id="4" name= "answer" value= 3 >Not at all<br>' +'';
		questID = "HADS-14";
		itemNum = 9;

		break;
	
	case 29:
		var Info = '<H3 align="justify">I feel cheerful.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 3 >Not at all<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Not often<br>' +'<input type= "radio" id="3" name= "answer" value= 1 >Sometimes<br>' +'<input type= "radio" id="4" name= "answer" value= 0 >Most of the time<br>' +'';
		questID = "HADS-14";
		itemNum = 10;

		break;
	
	case 30:
		var Info = '<H3 align="justify">I feel as if I am slowed down.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 3 >Nearly all the time<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Very often<br>' +'<input type= "radio" id="3" name= "answer" value= 1 >Sometimes<br>' +'<input type= "radio" id="4" name= "answer" value= 0 >Not at all<br>' +'';
		questID = "HADS-14";
		itemNum = 11;

		break;
	
	case 31:
		var Info = '<H3 align="justify">I have lost interest in my appearance.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 3 >Definitely<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >I don\'t take as much care as I should<br>' +'<input type= "radio" id="3" name= "answer" value= 1 >I may not take quite as much care<br>' +'<input type= "radio" id="4" name= "answer" value= 0 >I take just as much care as ever<br>' +'';
		questID = "HADS-14";
		itemNum = 12;

		break;
	
	case 32:
		var Info = '<H3 align="justify">I look forward with enjoyment to things.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 0 >As much as I ever did<br>' +'<input type= "radio" id="2" name= "answer" value= 1 >Rather less than I used to<br>' +'<input type= "radio" id="3" name= "answer" value= 2 >Definitely less than I used to<br>' +'<input type= "radio" id="4" name= "answer" value= 3 >Hardly at all<br>' +'';
		questID = "HADS-14";
		itemNum = 13;

		break;
	
	case 33:
		var Info = '<H3 align="justify">I can enjoy a good book or radio or TV program.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 0 >Often<br>' +'<input type= "radio" id="2" name= "answer" value= 1 >Sometimes<br>' +'<input type= "radio" id="3" name= "answer" value= 2 >Not often<br>' +'<input type= "radio" id="4" name= "answer" value= 3 >Very seldom<br>' +'';
		questID = "HADS-14";
		itemNum = 14;

		break;
	
	case 34:
		var Info = '<H3 align="justify">Indicate how much you agree or disagree with the following statements.</h3><br><br>';
		var Ticks = '';
		questID = "BISBASinstructions-1-";
		itemNum = 1;

		flag = "inst";

		break;
	
	case 35:
		var Info = '<H3 align="justify">A person\'s family is the most important thing in life.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >Very true for me<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Somewhat true for me<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >Somewhat false for me<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >Very false for me<br>' +'';
		questID = "BISBAS-24";
		itemNum = 1;

		break;
	
	case 36:
		var Info = '<H3 align="justify">Even if something bad is about to happen to me, I rarely experience fear or nervousness.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >Very true for me<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Somewhat true for me<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >Somewhat false for me<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >Very false for me<br>' +'';
		questID = "BISBAS-24";
		itemNum = 2;

		break;
	
	case 37:
		var Info = '<H3 align="justify">I go out of my way to get things I want.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >Very true for me<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Somewhat true for me<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >Somewhat false for me<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >Very false for me<br>' +'';
		questID = "BISBAS-24";
		itemNum = 3;

		break;
	
	case 38:
		var Info = '<H3 align="justify">When I\'m doing well at something I love to keep at it.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >Very true for me<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Somewhat true for me<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >Somewhat false for me<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >Very false for me<br>' +'';
		questID = "BISBAS-24";
		itemNum = 4;

		break;
	
	case 39:
		var Info = '<H3 align="justify">I\'m always willing to try something new if I think it will be fun.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >Very true for me<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Somewhat true for me<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >Somewhat false for me<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >Very false for me<br>' +'';
		questID = "BISBAS-24";
		itemNum = 5;

		break;
	
	case 40:
		var Info = '<H3 align="justify">How I dress is important to me.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >Very true for me<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Somewhat true for me<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >Somewhat false for me<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >Very false for me<br>' +'';
		questID = "BISBAS-24";
		itemNum = 6;

		break;
	
	case 41:
		var Info = '<H3 align="justify">When I get something I want, I feel excited and energized.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >Very true for me<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Somewhat true for me<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >Somewhat false for me<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >Very false for me<br>' +'';
		questID = "BISBAS-24";
		itemNum = 7;

		break;
	
	case 42:
		var Info = '<H3 align="justify">Criticism or scolding hurts me quite a bit.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >Very true for me<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Somewhat true for me<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >Somewhat false for me<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >Very false for me<br>' +'';
		questID = "BISBAS-24";
		itemNum = 8;

		break;
	
	case 43:
		var Info = '<H3 align="justify">When I want something I usually go all-out to get it.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >Very true for me<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Somewhat true for me<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >Somewhat false for me<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >Very false for me<br>' +'';
		questID = "BISBAS-24";
		itemNum = 9;

		break;
	
	case 44:
		var Info = '<H3 align="justify">I will often do things for no other reason than that they might be fun.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >Very true for me<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Somewhat true for me<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >Somewhat false for me<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >Very false for me<br>' +'';
		questID = "BISBAS-24";
		itemNum = 10;

		break;
	
	case 45:
		var Info = '<H3 align="justify">It\'s hard for me to find the time to do things such as get a haircut.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >Very true for me<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Somewhat true for me<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >Somewhat false for me<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >Very false for me<br>' +'';
		questID = "BISBAS-24";
		itemNum = 11;

		break;
	
	case 46:
		var Info = '<H3 align="justify">If I see a chance to get something I want I move on it right away.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >Very true for me<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Somewhat true for me<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >Somewhat false for me<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >Very false for me<br>' +'';
		questID = "BISBAS-24";
		itemNum = 12;

		break;
	
	case 47:
		var Info = '<H3 align="justify">I feel pretty worried or upset when I think or know somebody is angry at me.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >Very true for me<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Somewhat true for me<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >Somewhat false for me<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >Very false for me<br>' +'';
		questID = "BISBAS-24";
		itemNum = 13;

		break;
	
	case 48:
		var Info = '<H3 align="justify">When I see an opportunity for something I like I get excited right away.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >Very true for me<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Somewhat true for me<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >Somewhat false for me<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >Very false for me<br>' +'';
		questID = "BISBAS-24";
		itemNum = 14;

		break;
	
	case 49:
		var Info = '<H3 align="justify">I often act on the spur of the moment.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >Very true for me<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Somewhat true for me<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >Somewhat false for me<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >Very false for me<br>' +'';
		questID = "BISBAS-24";
		itemNum = 15;

		break;
	
	case 50:
		var Info = '<H3 align="justify">If I think something unpleasant is going to happen I usually get pretty "worked up".</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >Very true for me<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Somewhat true for me<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >Somewhat false for me<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >Very false for me<br>' +'';
		questID = "BISBAS-24";
		itemNum = 16;

		break;
	
	case 51:
		var Info = '<H3 align="justify">I often wonder why people act the way they do.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >Very true for me<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Somewhat true for me<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >Somewhat false for me<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >Very false for me<br>' +'';
		questID = "BISBAS-24";
		itemNum = 17;

		break;
	
	case 52:
		var Info = '<H3 align="justify">When good things happen to me, it affects me strongly.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >Very true for me<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Somewhat true for me<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >Somewhat false for me<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >Very false for me<br>' +'';
		questID = "BISBAS-24";
		itemNum = 18;

		break;
	
	case 53:
		var Info = '<H3 align="justify">I feel worried when I think I have done poorly at something important.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >Very true for me<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Somewhat true for me<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >Somewhat false for me<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >Very false for me<br>' +'';
		questID = "BISBAS-24";
		itemNum = 19;

		break;
	
	case 54:
		var Info = '<H3 align="justify">I crave excitement and new sensations.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >Very true for me<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Somewhat true for me<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >Somewhat false for me<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >Very false for me<br>' +'';
		questID = "BISBAS-24";
		itemNum = 20;

		break;
	
	case 55:
		var Info = '<H3 align="justify">When I go after something I use a "no holds barred" approach.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >Very true for me<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Somewhat true for me<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >Somewhat false for me<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >Very false for me<br>' +'';
		questID = "BISBAS-24";
		itemNum = 21;

		break;
	
	case 56:
		var Info = '<H3 align="justify">I have very few fears compared to my friends.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >Very true for me<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Somewhat true for me<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >Somewhat false for me<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >Very false for me<br>' +'';
		questID = "BISBAS-24";
		itemNum = 22;

		break;
	
	case 57:
		var Info = '<H3 align="justify">It would excite me to win a contest.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >Very true for me<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Somewhat true for me<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >Somewhat false for me<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >Very false for me<br>' +'';
		questID = "BISBAS-24";
		itemNum = 23;

		break;
	
	case 58:
		var Info = '<H3 align="justify">I worry about making mistakes.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >Very true for me<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Somewhat true for me<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >Somewhat false for me<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >Very false for me<br>' +'';
		questID = "BISBAS-24";
		itemNum = 24;

		break;
	
	case 59:
		var Info = '<H3 align="justify">The following questions measure your perception of your childhood and your current adult life. Please indicate your agreement with these statements. Please read each statement carefully, and then indicate how much you agree with the statement.</h3><br><br>';
		var Ticks = '';
		questID = "SESinstructions-1-";
		itemNum = 1;

		flag = "inst";

		break;
	
	case 60:
		var Info = '<H3 align="justify">When I was growing up, someone in my house was always yelling at someone else.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >1 Strongly disagree<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >2<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >3<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >4<br>' +'<input type= "radio" id="5" name= "answer" value= 5 >5<br>' +'<input type= "radio" id="6" name= "answer" value= 6 >6<br>' +'<input type= "radio" id="7" name= "answer" value= 7 >7<br>' +'<input type= "radio" id="8" name= "answer" value= 8 >8<br>' +'<input type= "radio" id="9" name= "answer" value= 9 >9 Strongly agree<br>' +'';
		questID = "SES-13";
		itemNum = 1;

		break;
	
	case 61:
		var Info = '<H3 align="justify">Some of the punishments I received when I was a child now seem too harsh to me.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >1 Strongly disagree<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >2<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >3<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >4<br>' +'<input type= "radio" id="5" name= "answer" value= 5 >5<br>' +'<input type= "radio" id="6" name= "answer" value= 6 >6<br>' +'<input type= "radio" id="7" name= "answer" value= 7 >7<br>' +'<input type= "radio" id="8" name= "answer" value= 8 >8<br>' +'<input type= "radio" id="9" name= "answer" value= 9 >9 Strongly agree<br>' +'';
		questID = "SES-13";
		itemNum = 2;

		break;
	
	case 62:
		var Info = '<H3 align="justify">I guess you could say that I wasn’t treated as well as I should have been at home.</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >1 Strongly disagree<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >2<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >3<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >4<br>' +'<input type= "radio" id="5" name= "answer" value= 5 >5<br>' +'<input type= "radio" id="6" name= "answer" value= 6 >6<br>' +'<input type= "radio" id="7" name= "answer" value= 7 >7<br>' +'<input type= "radio" id="8" name= "answer" value= 8 >8<br>' +'<input type= "radio" id="9" name= "answer" value= 9 >9 Strongly agree<br>' +'';
		questID = "SES-13";
		itemNum = 3;

		break;
	
	case 63:
		var Info = '<H3 align="justify">When I was younger than 10, things were often chaotic in my house</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >1 Strongly disagree<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >2<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >3<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >4<br>' +'<input type= "radio" id="5" name= "answer" value= 5 >5<br>' +'<input type= "radio" id="6" name= "answer" value= 6 >6<br>' +'<input type= "radio" id="7" name= "answer" value= 7 >7<br>' +'<input type= "radio" id="8" name= "answer" value= 8 >8<br>' +'<input type= "radio" id="9" name= "answer" value= 9 >9 Strongly agree<br>' +'';
		questID = "SES-13";
		itemNum = 4;

		break;
	
	case 64:
		var Info = '<H3 align="justify">When I was younger than 10, people often moved in and out of my house on a pretty random basis</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >1 Strongly disagree<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >2<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >3<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >4<br>' +'<input type= "radio" id="5" name= "answer" value= 5 >5<br>' +'<input type= "radio" id="6" name= "answer" value= 6 >6<br>' +'<input type= "radio" id="7" name= "answer" value= 7 >7<br>' +'<input type= "radio" id="8" name= "answer" value= 8 >8<br>' +'<input type= "radio" id="9" name= "answer" value= 9 >9 Strongly agree<br>' +'';
		questID = "SES-13";
		itemNum = 5;

		break;
	
	case 65:
		var Info = '<H3 align="justify">When I was younger than 10, I had a hard time knowing what my parents or other people in my house were going to say or do from day-to-day </h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >1 Strongly disagree<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >2<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >3<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >4<br>' +'<input type= "radio" id="5" name= "answer" value= 5 >5<br>' +'<input type= "radio" id="6" name= "answer" value= 6 >6<br>' +'<input type= "radio" id="7" name= "answer" value= 7 >7<br>' +'<input type= "radio" id="8" name= "answer" value= 8 >8<br>' +'<input type= "radio" id="9" name= "answer" value= 9 >9 Strongly agree<br>' +'';
		questID = "SES-13";
		itemNum = 6;

		break;
	
	case 66:
		var Info = '<H3 align="justify">When I was younger than 10, my family usually had enough money for things when I was growing up</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >1 Strongly disagree<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >2<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >3<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >4<br>' +'<input type= "radio" id="5" name= "answer" value= 5 >5<br>' +'<input type= "radio" id="6" name= "answer" value= 6 >6<br>' +'<input type= "radio" id="7" name= "answer" value= 7 >7<br>' +'<input type= "radio" id="8" name= "answer" value= 8 >8<br>' +'<input type= "radio" id="9" name= "answer" value= 9 >9 Strongly agree<br>' +'';
		questID = "SES-13";
		itemNum = 7;

		break;
	
	case 67:
		var Info = '<H3 align="justify">When I was younger than 10, I grew up in a relatively wealthy neighborhood</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >1 Strongly disagree<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >2<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >3<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >4<br>' +'<input type= "radio" id="5" name= "answer" value= 5 >5<br>' +'<input type= "radio" id="6" name= "answer" value= 6 >6<br>' +'<input type= "radio" id="7" name= "answer" value= 7 >7<br>' +'<input type= "radio" id="8" name= "answer" value= 8 >8<br>' +'<input type= "radio" id="9" name= "answer" value= 9 >9 Strongly agree<br>' +'';
		questID = "SES-13";
		itemNum = 8;

		break;
	
	case 68:
		var Info = '<H3 align="justify">When I was younger than 10, I felt relatively wealthy compared to the other kids in my school</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >1 Strongly disagree<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >2<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >3<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >4<br>' +'<input type= "radio" id="5" name= "answer" value= 5 >5<br>' +'<input type= "radio" id="6" name= "answer" value= 6 >6<br>' +'<input type= "radio" id="7" name= "answer" value= 7 >7<br>' +'<input type= "radio" id="8" name= "answer" value= 8 >8<br>' +'<input type= "radio" id="9" name= "answer" value= 9 >9 Strongly agree<br>' +'';
		questID = "SES-13";
		itemNum = 9;

		break;
	
	case 69:
		var Info = '<H3 align="justify">Now as an adult, I have enough money to buy things I want</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >1 Strongly disagree<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >2<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >3<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >4<br>' +'<input type= "radio" id="5" name= "answer" value= 5 >5<br>' +'<input type= "radio" id="6" name= "answer" value= 6 >6<br>' +'<input type= "radio" id="7" name= "answer" value= 7 >7<br>' +'<input type= "radio" id="8" name= "answer" value= 8 >8<br>' +'<input type= "radio" id="9" name= "answer" value= 9 >9 Strongly agree<br>' +'';
		questID = "SES-13";
		itemNum = 10;

		break;
	
	case 70:
		var Info = '<H3 align="justify">Now as an adult, I don\'t need to worry too much about paying my bills</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >1 Strongly disagree<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >2<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >3<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >4<br>' +'<input type= "radio" id="5" name= "answer" value= 5 >5<br>' +'<input type= "radio" id="6" name= "answer" value= 6 >6<br>' +'<input type= "radio" id="7" name= "answer" value= 7 >7<br>' +'<input type= "radio" id="8" name= "answer" value= 8 >8<br>' +'<input type= "radio" id="9" name= "answer" value= 9 >9 Strongly agree<br>' +'';
		questID = "SES-13";
		itemNum = 11;

		break;
	
	case 71:
		var Info = '<H3 align="justify">Now as an adult, I don\'t think I\'ll have to worry about money too much in the future</h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1 >1 Strongly disagree<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >2<br>' +'<input type= "radio" id="3" name= "answer" value= 3 >3<br>' +'<input type= "radio" id="4" name= "answer" value= 4 >4<br>' +'<input type= "radio" id="5" name= "answer" value= 5 >5<br>' +'<input type= "radio" id="6" name= "answer" value= 6 >6<br>' +'<input type= "radio" id="7" name= "answer" value= 7 >7<br>' +'<input type= "radio" id="8" name= "answer" value= 8 >8<br>' +'<input type= "radio" id="9" name= "answer" value= 9 >9 Strongly agree<br>' +'';
		questID = "SES-13";
		itemNum = 12;

		break;
	
	case 72:
		var Info = '<H3 align="justify"><b>Think of this ladder as representing where people stand in their communities.</b> People define community in different ways: please define it in whatever way is most meaningful to you. At the <b>top</b> of the ladder are the people who have the <b>highest standing</b> in their community. At the <b>bottom</b> are the people who have the <b>lowest standing</b> in their community. <b>Where would you place yourself on this ladder?</b></h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 10 >10 Top - highest standing<br>' +'<input type= "radio" id="2" name= "answer" value= 9 >9<br>' +'<input type= "radio" id="3" name= "answer" value= 8 >8<br>' +'<input type= "radio" id="4" name= "answer" value= 7 >7<br>' +'<input type= "radio" id="5" name= "answer" value= 6 >6<br>' +'<input type= "radio" id="6" name= "answer" value= 5 >5<br>' +'<input type= "radio" id="7" name= "answer" value= 4 >4<br>' +'<input type= "radio" id="8" name= "answer" value= 3 >3<br>' +'<input type= "radio" id="9" name= "answer" value= 2 >2<br>' +'<input type= "radio" id="10" name= "answer" value= 1 >1 Bottom - lower standing<br>' +'';
		questID = "SES-13";
		itemNum = 13;

		break;
	
	case 73:
		var Info = '<H3 align="justify">Generally speaking, would you say that most people can be trusted or that you can\'t be too careful in dealing with most people? </h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 1  >Most people can be trusted<br>' +'<input type= "radio" id="2" name= "answer" value= 2 >Can\'t be too careful<br>' +'';
		questID = "TRUST-1";
		itemNum = 1;

		break;
	
	case 74:
		var Info = '<H3 align="justify">To what extent are you satisfied with your current standard of living? </h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 0 >0 Absolutely dissatisfied<br>' +'<input type= "radio" id="2" name= "answer" value= 1 >1<br>' +'<input type= "radio" id="3" name= "answer" value= 2 >2<br>' +'<input type= "radio" id="4" name= "answer" value= 3 >3<br>' +'<input type= "radio" id="5" name= "answer" value= 4 >4<br>' +'<input type= "radio" id="6" name= "answer" value= 5 >5 Neither satisfied nor dissatisfied<br>' +'<input type= "radio" id="7" name= "answer" value= 6 >6<br>' +'<input type= "radio" id="8" name= "answer" value= 7 >7<br>' +'<input type= "radio" id="9" name= "answer" value= 8 >8<br>' +'<input type= "radio" id="10" name= "answer" value= 9 >9<br>' +'<input type= "radio" id="11" name= "answer" value= 10 >10 Absolutely satisfied<br>' +'';
		questID = "CEPREMAP-2";
		itemNum = 1;

		break;
	
	case 75:
		var Info = '<H3 align="justify">When you think about what you will experience in the coming years, are you satisfied with this perspective? </h3><br><br>';
		var Ticks = '<input type= "radio" id="1" name= "answer" value= 0 >0 Absolutely dissatisfied<br>' +'<input type= "radio" id="2" name= "answer" value= 1 >1<br>' +'<input type= "radio" id="3" name= "answer" value= 2 >2<br>' +'<input type= "radio" id="4" name= "answer" value= 3 >3<br>' +'<input type= "radio" id="5" name= "answer" value= 4 >4<br>' +'<input type= "radio" id="6" name= "answer" value= 5 >5 Neither satisfied nor dissatisfied<br>' +'<input type= "radio" id="7" name= "answer" value= 6 >6<br>' +'<input type= "radio" id="8" name= "answer" value= 7 >7<br>' +'<input type= "radio" id="9" name= "answer" value= 8 >8<br>' +'<input type= "radio" id="10" name= "answer" value= 9 >9<br>' +'<input type= "radio" id="11" name= "answer" value= 10 >10 Absolutely satisfied<br>' +'';
		questID = "CEPREMAP-2";
		itemNum = 2;

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

		SendQuestDataDB(0);
		
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
		    clog = 'questionnaire_data $ '+clog+' $ dbcall success \n';
		    log+= clog;
		    
		    if (r[0].ErrorNo > 0 && call+1<maxDBCalls){
			SendQuestDataDB(call+1);
		    }
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
		    clog = 'questionnaire_data $ '+clog+' $ dbcall failure \n';
		    log+=clog;
		    
		    if(call+1<maxDBCalls){
			SendQuestDataDB(call+1);
		    }
		    
		}
	    });
	};
    };

    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////       End     /////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function EndExperiment() {

	InsertLog(0,'log');

	CreateDiv('Stage', 'TextBoxDiv');

	var toprint = parseInt(TotalReward)/1000;

	var wonlost;
	var click;
	if (Language=='en'){
	    wonlost = ' earned ';
	    click = 'Prolific.ac';
	    if (toprint<0){
		wonlost = ' lost ';
	    }
	}
	else if (Language=='fr'){
	    wonlost = ' gagné ';
	    click = 'Cliquez ici.';
	    if (toprint<0){
		wonlost = ' perdu ';
	    }
	}

	var Title = '<h3 align = "center">Le jeu est terminé.<br>Vous avez '+wonlost+toprint+' points au total.<br><br>Merci de votre participation!<br></h3><br>';
	var url = '';
	if (CompLink)
	    url = '<center><a href="">'+click+'</a></center>';

	$('#TextBoxDiv').html(Title+url);

	
    };


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////        Utility functions               //////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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


    function getKeyCode(event){
	   return event.which;
    }
    
    //Utility Functions
    function getColor(FB){
	color = border_color;
	if(FB==0){
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

	while (counter > 0) {
	    let index = Math.floor(Math.random() * counter);
	    counter--;

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


