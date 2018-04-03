<%

function stringifyWT(obj) {
	var type = DataType(obj);
	var curObj = obj;
	var outStr = '';

	if (obj == null || obj == undefined){
		return 'null';
	}
	if (type == 'string' || type == 'integer' || type == 'real') {
		return '\"' + StrReplace(StrReplace(obj, '\\', '\\\\'), '\"', '\'') + '\"';
	}
	if (type == 'bool'){
		return obj;
	}

	if (IsArray(obj)) {
		var temp = '';
		for (prop in obj) {
			temp += stringifyWT(prop) + ',';
		}
		temp = temp.substr(0, temp.length - 1);
		outStr += '[' + temp + ']';
	} else {
		var temp = '';
		for (prop in obj) {
			temp += '"' + prop + '":' + stringifyWT(obj[prop]) + ',';
		}
		temp = temp.substr(0, temp.length - 1);
		outStr += '{' + temp + '}';
	}
	return outStr;
}

function _toJSON(obj){
	// return tools.object_to_text(obj, 'json');
	return stringifyWT(obj);
}

function getBossID ( curPersonID ) {
	try {
		var curPersonCardTE = OpenDoc(UrlFromDocID(curPersonID)).TopElem;
	} catch (e) {
		return null;
	}
    var bossID = ArrayOptFind(curPersonCardTE.func_managers, "boss_type_id == 6356115904072873766 ")
    if ( bossID == undefined ) {
        return null; 
    }
    return bossID.person_id;
}

// Бибилотеки 

DropFormsCache(FilePathToUrl(AppDirectoryPath()) + '/wt/web/new_assessment/server/assessment.js');
var _assessments = OpenCodeLib( FilePathToUrl(AppDirectoryPath()) + '/wt/web/new_assessment/server/assessment.js' );

DropFormsCache(FilePathToUrl(AppDirectoryPath()) + '/wt/web/new_assessment/server/assessment_edit.js');
var _assessments_edit = OpenCodeLib( FilePathToUrl(AppDirectoryPath()) + '/wt/web/new_assessment/server/assessment_edit.js' );

// Константы		
var testUserID = 6380228981464856704; // 6027161646093979588 -- 6380228981464856704
// var curUserID = 5977897374409171445; // 6027161646093979588 -- 6380228981464856704


function getAssessment( queryObjects ) {
	var curPaID = queryObjects.HasProperty('pa_id') ? Int(queryObjects.pa_id) : null;
	try { 
		var curPaCard = OpenDoc(UrlFromDocID(curPaID));
		var curPaCardTE = curPaCard.TopElem; 
	} catch (e) {
		return _toJSON({ error : 'Произошла ошибка при открытии карточки оценки по компетенции, код ошибки - ' + e });
	}

	try {
		var userID = curPaCard.TopElem.person_id;
	} catch (e) {
		return _toJSON({ error : 'Произошла ошибка при получении ID сотрудника , код ошибки - ' + e });
	}

	try {
		var bossID = getBossID( userID );
	} catch (e) {
		return _toJSON({ error : 'Произошла ошибка при получении ID руководителя , код ошибки - ' + e });
	}

	try {
		var curAssessmentAppraiseID = curPaCard.TopElem.assessment_appraise_id;
	} catch (e) {
		return _toJSON({ error : 'Произошла ошибка при получении ID процедуры , код ошибки - ' + e });
	}

	try {
		var STEP = ArrayOptFirstElem(XQuery("for $elem in assessment_plans where 
			$elem/person_id = " + userID + " 
			and $elem/assessment_appraise_id = " + curAssessmentAppraiseID + "
		return $elem")).workflow_state; 
	} catch (e) {
		return _toJSON({ error : 'Произошла ошибка при получении этапа оценки , код ошибки - ' + e });
	}

	var isCollaborator = curUserID == userID;
	var isBoss = curUserID == bossID;

	return _toJSON ({
		step : Trim(STEP),
		isBoss : isBoss,
		isCollaborator : isCollaborator,
		assessments : [
		//	_assessments.newObject( 'assessment_0', 'prevAssessment', 'Оценка - Карьерная лестница', userID, curUserID, bossID ),
			_assessments.newObject( 'assessment_1', 'curAssessment', 'Результаты за 2017 год', userID, curUserID, bossID  ) 
		]
	});
}

function postEditTask( queryObjects ) {
	return _assessments_edit.editTask( queryObjects );
}

function postRemoveTasks( queryObjects ) {
	return _assessments_edit.removeTask( queryObjects );
}

function postAddTask( queryObjects ) {
	return _assessments_edit.addTask( queryObjects );
}	


function postSaveCompetences(queryObjects){
	try {
		var curPaID = queryObjects.HasProperty('pa_id') ? Int(queryObjects.pa_id) : null;
		if (curPaID == null){
			throw 'Недостаточно параметров'
		}

		var competences = tools.read_object(queryObjects.Body).competences;
		var curPaCard = OpenDoc(UrlFromDocID(curPaID));
		var curPaCardTE = curPaCard.TopElem;

		var isPersonAssessment = curUserID == curPaCardTE.person_id;
		var isExpertAssessment = curUserID == curPaCardTE.expert_person_id;
		var isSelfAssessment = isPersonAssessment && isExpertAssessment;

		for (c in competences){
			newCompId = StrLeftRange(c.id, c.id.indexOf('_stage'));
			comp = ArrayOptFind(curPaCardTE.competences, 'This.competence_id == ' + newCompId);
			if (comp != undefined){
				if (isSelfAssessment){
					comp.mark = c.userMark.value.selectedPayload;
				} else if (isExpertAssessment){
					comp.mark = c.bossMark.value.selectedPayload;
				}
			}
		}
		curPaCard.Save();

		var curAssessmentAppraiseID = curPaCard.TopElem.assessment_appraise_id;
		var assessmentPlan = ArrayOptFirstElem(XQuery("for $elem in assessment_plans where 
			$elem/person_id = " +  curPaCardTE.person_id + " 
			and $elem/assessment_appraise_id = " + curAssessmentAppraiseID + "
		return $elem"));
		if (assessmentPlan != undefined){
			var step = 'firstStep';
			var assessmentPlanDoc = OpenDoc(UrlFromDocID(Int(assessmentPlan.id)));
			if (assessmentPlanDoc.TopElem.workflow_state == 'firstStep') {
				step = 'secondStep';
			} else if (assessmentPlanDoc.TopElem.workflow_state == 'secondStep'){
				step = 'thirdStep';
			}
			assessmentPlanDoc.TopElem.workflow_state = step;
			assessmentPlanDoc.Save();
		}
		var ref = queryObjects.Request.Header['Referer'];
		queryObjects.Request.Redirect(ref);
	} catch(e){
		return _toJSON({ error : 'Ошибка \r\n' + e });
	}
}
//alert( _toJSON( getAssessment( { pa_id : 6435287674624031699 } ))); // 6435288459934178010 - Мар, 6435287674624031699 - Мил.

%>