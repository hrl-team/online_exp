import sys,os

task = sys.argv[1]

img_dir = 'images/'+sys.argv[2]+'/'

js_in = open('RLTask_template.js','r')
js_out = open('RLTask.js','w')
js_text = js_in.read()

cfg_file = open('config/'+task+'/task.cfg','r')
cond_file = open('config/'+task+'/task.cond','r')
info_file = open('config/'+task+'/task.info','r')
cons_file = open('config/'+task+'/task.cons','r')
inst_file = open('config/'+task+'/task.inst','r')
post_file = open('config/'+task+'/task.post','r')
questinfo_file = open('config/'+task+'/task.quest_info','r')
questitems_file = open('config/'+task+'/task.quest_items','r')
end_file = open('config/'+task+'/task.end','r')

start = js_text.find('ExpName')
end = js_text.find(';',start)
js_text = js_text.replace(js_text[start:end],'ExpName'+' = \''+task+'\'')

#################################
#Insert variables
for line in cfg_file:
    param = line.split()[0]
    val = line.split()[1]
    start = js_text.find(param,end)
    end = js_text.find(';',start)
    js_text = js_text.replace(js_text[start:end],param+' = '+val)




##########################
#Insert conditions
cond_file.readline()
conditions = cond_file.read().split('\n')
start = js_text.find('var Conditions = ')
end = js_text.find(';',start)


magCond = []
valCond = []
infCond = []


cond_text = 'var Conditions = ['
for c in conditions:
    if(c[0]!='#'):
        cond_text+= '['
        ci = c.split('\t')
        for v in ci:
            cond_text+=v+','
        cond_text +=']'+','
        if ci[2] not in magCond:
            magCond.append(ci[2])
        if ci[3] not in valCond:
            valCond.append(ci[3])
        if ci[4] not in infCond:
            infCond.append(ci[4])
        
cond_text +=']'
js_text = js_text.replace(js_text[start:end],cond_text)


start = js_text.find('var MagCond = ')
end = js_text.find(';',start)
cond_text = 'var MagCond = ['
for c in magCond:
    cond_text+=c+','
cond_text +=']'
js_text = js_text.replace(js_text[start:end],cond_text)


start = js_text.find('var ValCond = ')
end = js_text.find(';',start)
cond_text = 'var ValCond = ['
for c in valCond:
    cond_text+=c+','
cond_text +=']'
js_text = js_text.replace(js_text[start:end],cond_text)


start = js_text.find('var InfCond = ')
end = js_text.find(';',start)
cond_text = 'var InfCond = ['
for c in infCond:
    cond_text+=c+','
cond_text +=']'
js_text = js_text.replace(js_text[start:end],cond_text)

##########################
#Insert information about images
files = os.listdir(img_dir+'stim/') 
nb_img = len(files)
ext = files[0].split('.')[1]

param = 'IMGPath'
val = img_dir
start = js_text.find(param)
end = js_text.find(';',start)
js_text = js_text.replace(js_text[start:end],param+' = \''+val+'\'')

param = 'NbIMG'
val = nb_img
start = js_text.find(param)
end = js_text.find(';',start)
js_text = js_text.replace(js_text[start:end],param+' = '+str(val))


param = 'IMGExt'
val = ext
start = js_text.find(param)
end = js_text.find(';',start)
js_text = js_text.replace(js_text[start:end],param+' = \''+val+'\'')

################################
#Insert the information page
inst_title = info_file.readline().strip('\n')
info_file.readline()
inst_info = info_file.read()

end = js_text.find('function Information()')
tofind = 'Title = \'<H2 align = \"center\">'
start = js_text.find(tofind,end)
end = js_text.find('</H2>',start)
js_text = js_text.replace(js_text[start+len(tofind):end],inst_title.replace('\'','\\\''))


tofind = 'Info = \'<H3 align = "justify">'
start = js_text.find(tofind,start)
end = js_text.find('</H3>',start)
js_text = js_text.replace(js_text[start+len(tofind):end],inst_info.replace('\'','\\\'').replace('\n','<br>'))


##############################
#Insert consent clauses
cons_title = cons_file.readline().strip('\n')
cons_file.readline()
cons_info = cons_file.readline().strip('\n')
cons_file.readline()


end = js_text.find('function Consent()')
tofind = 'Title = \'<H2 align = \"center\">'
start = js_text.find(tofind,end)
end = js_text.find('</H2>',start)
js_text = js_text.replace(js_text[start+len(tofind):end],cons_title.replace('\'','\\\''))


tofind = 'Info = \'<H3>'
start = js_text.find(tofind,start)
end = js_text.find('</H3>',start)
js_text = js_text.replace(js_text[start+len(tofind):end],cons_info.replace('\'','\\\''))


tofind = 'Ticks ='
start = js_text.find(tofind,start)
end = js_text.find(';',start)

cons_text = ''
nb_cons = 1
for clause in cons_file:
    cons_text += '\'<input type=\"checkbox\" name=\"consent\" value=\"consent'+str(nb_cons)+'\" >'+clause.strip('\n').replace('\'','\\\'')+'<br>\' + '
    nb_cons+=1
    pass

js_text = js_text.replace(js_text[start+len(tofind):end],cons_text[:-2])


##################
#Instructions
instructions = inst_file.read()
nbskip = instructions.count('skip$')
instructions = instructions.split('#')
nbInst = len(instructions)-nbskip


tofind = 'NumPages'
start = js_text.find(tofind,end)
end = js_text.find(';',start)
js_text = js_text.replace(js_text[start:end],tofind+' = '+str(nbInst))



tofind = 'switch (PageNum) {'
start = js_text.find(tofind,end)
end = js_text.find('default',start)

inst_text = ''
i=0
for line in instructions:
    el = line.split('$')

    flag = el[0].strip()
    FB = el[1].strip()
    CFB = el[2].strip()
    inst = el[3].strip()
    inst = inst.replace('\\','<b>').replace('/','</b>')


    
    if(flag!='skip'):
        inst_text+='\n\tcase '+str(i+1)+':\n\t\tvar Info = \'<H3 align="center">'+inst.replace('\n','<br>').replace('\'','\\\'')+'</h3><br><br>\';'
        inst_text+='\n\t\tflag=\''+flag+'\';'
        inst_text+='\n\t\tFB=\''+FB+'\';'
        inst_text+='\n\t\tCFB=\''+CFB+'\';'
        inst_text+='\n\t\tbreak;\n\t'
        i+=1

js_text = js_text.replace(js_text[start+len(tofind):end],inst_text)




################################
#Insert post learning page
inst_title = post_file.readline().strip('\n')
post_file.readline()
instructions = post_file.read().split('#')
nbInst = len(instructions)

ref = js_text.find('function StartPostLearning(PageNum)')

tofind = 'NumPages'
start = js_text.find(tofind,ref)
end = js_text.find(';',start)
js_text = js_text[:start]+tofind+' = '+str(nbInst)+js_text[end:]


tofind = 'Title = \'<H3 align = \"center\">'
start = js_text.find(tofind,ref)
end = js_text.find('</H3>\';',start)
js_text = js_text[:start+len(tofind)]+inst_title+js_text[end:]


tofind = 'switch (PageNum) {'
start = js_text.find(tofind,ref)
end = js_text.find('default',start)


inst_text = ''
i=0
for inst in instructions:
    inst_text+='\n\tcase '+str(i+1)+':\n\t\tvar Info = \'<H3 align="center">'+inst.replace('\n','<br>')+'</h3><br><br>\';'
    inst_text+='\n\t\tbreak;\n\t'
    i+=1
js_text = js_text[:start+len(tofind)]+inst_text+js_text[end:]



################################
#Insert questionnaire info page
inst_title = questinfo_file.readline().strip('\n')
questinfo_file.readline()
inst_info = questinfo_file.read()

tofind = 'Title = \'<H3 align = \"center\">'
cue = 'QuestionnaireTitle'
start = js_text.find(tofind+cue,end)
end = js_text.find('</H3>\';',start)
js_text = js_text.replace(js_text[start+len(tofind):end],inst_title)





tofind = 'Info = \'<H3 align = \"center\">'
start = js_text.find(tofind,end)
end = js_text.find('</H3>',start)
js_text = js_text.replace(js_text[start+len(tofind):end],inst_info.replace('\n','<br>').replace('\'','\\\''))


##################
#Insert questionnaire

questionnaires = questitems_file.read().split('#')
nbQuest = 0
for q in questionnaires[1::]:
    nbQuest+=int(q.split('\n')[0].split('-')[1])



tofind = 'NumQuestions'
start = js_text.find(tofind,end)
end = js_text.find(';',start)
js_text = js_text.replace(js_text[start:end],tofind+' = '+str(nbQuest))

tofind = 'switch (QuestNum) {'
start = js_text.find(tofind,end)
end = js_text.find('default',start)

inst_text = ''


i=1
for q in questionnaires[1::]:
    items = q.split('\n')
    quest_name = items[0].replace('#','')

    skip_id =''
    nb_skip = ''
    flag = ''
    
    if 'instructions' in quest_name:
        flag = 'inst'

    elif 'skiptest' in quest_name:
        skip_id = quest_name.split('-')[2]
        nb_skip = quest_name.split('-')[3]
        quest_name = quest_name.split('-')[0]+'-'+quest_name.split('-')[1]
        flag = 'skip'

    for it in items[1::]:
        line = it.split('$')
        if len(line)>1:
            #print line
            qnum = line[0]
            qtext = line[1].replace('\\','<b>').replace('/','</b>').replace('\'','\\\'')    

            qanswers = line[2::]
            #print qanswers
            inst_text+='\n\tcase '+str(i)+':\n\t\tvar Info = \'<H3 align="justify">'+qtext.replace('\n','<br>')+'</h3><br><br>\';'
            #Insert answers
            inst_text+='\n\t\tvar Ticks = '
            ai = 1
            if flag!='inst':
                for a in qanswers:
                    inst_text+='\'<input type= \"radio\" id=\"'+str(ai)+'\" name= \"answer\" value= '+a.split(':')[1]+' >'+a.split(':')[0].strip('\n').replace('\'','\\\'')+'<br>\' +'
                    ai+=1
            inst_text+='\'\';\n\t\tquestID = \"'+quest_name+'\";\n\t\titemNum = '+qnum+';\n\n'
            if flag =='skip':
                inst_text+='\t\tflag = \"'+flag+'\";\n\t\tskip_id = '+skip_id+';\n\t\tnb_skip = '+nb_skip+';\n\n'
            elif flag =='inst':
                inst_text+='\t\tflag = \"'+flag+'";\n\n'
                
            inst_text+='\t\tbreak;\n\t'
            i+=1


            
js_text = js_text.replace(js_text[start+len(tofind):end],inst_text)


################################
#End experiment
end_text = end_file.read()
end_info = end_text.split('--')[0]
end_url = end_text.split('--')[1].strip('\n')


end = js_text.find('function EndExperiment()')
tofind = 'Title = \'<h3 align = \"center\">'
start = js_text.find(tofind,end)
end = js_text.find('</h3>',start)
js_text = js_text.replace(js_text[start+len(tofind):end],end_info.replace('\n','<br>'))


tofind = 'href="'
start = js_text.find(tofind,end)
end = js_text.find('\">',start)
js_text = js_text.replace(js_text[start+len(tofind):end],end_url)

#######################
js_out.write(js_text)
