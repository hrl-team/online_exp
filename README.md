# Online Human RL experiments

This code implements a Two-Armed Bandit task for studying human reinforcement leanring.
It was written based on the tutorial of Uri Hertz on Online Experiments Development (http://www.urihertz.net/projects.html).
It uses text configuration files, so you don't need to write javascript code (to some extent).
Configuration files should be put under the folder "config/**TASK-NAME**/"
Examples of configuration files are provided with the code.
You can have many configuration folders.
This way, you can configure as many different tasks as you want. 


## CONFIGURATION FILES

Things that can be modified through the configuration files:
<pre>
- Global parameters (see below) (task.cfg)
- Conditions					(task.cond)
- Displayed Information text	(task.info)
- Displayed consent text		(task.cons)
- Displayed instructions		(task.inst)
- Displayed postlearning text	(task.post)
- Questionnaires description 	(task.quest_info)
- Questionnaires				(task.quest_items)
</pre>

Global parameters (task.cfg) include:	
<pre>
- Language											(english "en" or french "fr")
- Whether or not a completion link is included		(0/1)
- Number of sessions								N
- Whether or not to include a postlearning session	(0/1)
- Whether or not to include a questionnaire 		(0/1)
- Maximum number of training sessions				N
- Number of training trials							N
- Number of trials per condition					N
- Number of different stimuli per condition			N
- Whether or not trials are interleaved				(0/1)
</pre>

Conditions (task.cond) are specified, with five parameters, one condition per line:
<pre>
- P1:	probability of outcome for option 1 [0 1]
- P2:	probability of outcome for option 2 [0 1]
- Mag:	magnitude of the outcome 			N>0
- Val:	valence of the outcome. 			1: positive or zero, -1: negative or zero, 0: symmetric +1/-1
- Info:	partial or complete outcome			(0/1)
</pre>


Questionnaires can be specified in task.quest_items as following:

<pre>
#[NAME OF QUESTIONNAIRE 1]-[NUMBER OF ITEMS]
1 $ QUESTION1 $ ANSWER1:SCORE1 $ ANSWER2:SCORE2 $ ANSWER3:SCORE3 
2 $ QUESTION2 $ ANSWER1:SCORE1 $ ANSWER2:SCORE2 $ ANSWER3:SCORE3 <br>
#[NAME OF QUESTIONNAIRE 2]-[NUMBER OF ITEMS]
1 $ QUESTION1 $ ANSWER1:SCORE1 $ ANSWER2:SCORE2 $ ANSWER3:SCORE3 
2 $ QUESTION2 $ ANSWER1:SCORE1 $ ANSWER2:SCORE2 $ ANSWER3:SCORE3
</pre>

Make sure you don't include these characters in your text '#$:-' as they are used for parsing questionnaires.
You can also use "skiptests" to skip some questionnaires. For example, if a person doesn't smoke, it is not necessary to ask her about her smoking habits.
Skiptests are defined as following:
 
<pre>
#[NAME OF NEXT QUESTIONNAIRE]skiptest-1-[ID OF THE ANSWER FOR THE TEST TO BE TRUE]-[NUMBER OF ITEMS IN THE NEXT QUESTIONNAIRE]
1 $ QUESTION $ ANSWER1:SCORE1 $ ANSWER2:SCORE2
</pre>

Task images must be put under the folder "images/**IMAGE-FOLDER-NAME**". 
Stimuli images under "images/**IMAGE-FOLDER-NAME**/stim" and outcomes under "images/**IMAGE-FOLDER-NAME**/outcome".


# GENERATING A TASK
Once e a task is specified through configuration files, it can be generated using the command " python generate.py **TASK-NAME** **IMAGE-FOLDER-NAME** "
This will generate a javascript file "RLTask.js", which will be the main code for running the task.
Example: to generate a task called task1 using the images in cards_gif, you need to run the command "python generate.py task1 cards_gif".

To run the experiment, you need to configure a server (and a mysql database) in which you put the generated code.
You will find a template for an empty database in "sql/empty_db.sql". 
You need to configure your database account in the file "connectDB.php".
In addition to the mysql database, experiment logs are recorded under the "/log" folder.
