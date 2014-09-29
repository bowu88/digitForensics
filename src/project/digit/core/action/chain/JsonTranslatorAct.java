package project.digit.core.action.chain;

import java.util.List;

import net.sf.json.JSONObject;
import project.digit.core.vo.PagerVo;
import project.digit.utils.translator.JsonTranslator;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class JsonTranslatorAct extends ActionSupport {

	private static final long serialVersionUID = 2162305889052689727L;
	
	public JSONObject jsonObj;
	
	private JSONObject getJSONObject() {
		return (JSONObject)ActionContext.getContext().get("jsonObj");
	}
	
	@SuppressWarnings("rawtypes")
	private List getDataList() {
		return (List)ActionContext.getContext().get("datalist");
	} 
	
	@SuppressWarnings("rawtypes")
	private Class getBeanClass() {
		return (Class)ActionContext.getContext().get("bean");
	}
	
	public String execute() {
		jsonObj	=	getJSONObject();
		jsonObj.put("rows", JsonTranslator.trans2JsonArray(getDataList(), getBeanClass()));
		jsonObj.put("page", PagerVo.curPage);     
        jsonObj.put("total", PagerVo.totalPage);    
        jsonObj.put("records", PagerVo.totalNumber); 
		return SUCCESS;
	}
	
	public JSONObject getJsonObj() {
		return this.jsonObj;
	}
	
	public void setJsonObj(JSONObject jsonObj) {
		this.jsonObj	=	jsonObj;
	}
}
