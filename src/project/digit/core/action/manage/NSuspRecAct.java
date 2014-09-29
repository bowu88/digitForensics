package project.digit.core.action.manage;

import java.util.List;

import net.sf.json.JSONObject;
import project.digit.core.action.base.GridReqParamAction;
import project.digit.core.model.basic.Suspect;
import project.digit.core.service.impl.basic.NSuspRecService;
import project.digit.core.vo.QueryOptions;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ModelDriven;

public class NSuspRecAct extends GridReqParamAction implements ModelDriven<QueryOptions> {
	
	private NSuspRecService service	=	NSuspRecService.getService();
	
	public QueryOptions getModel() {
		// TODO Auto-generated method stub
		return opts;
	}
	
	private JSONObject getJSONObject() {
		JSONObject jsonObj	=	new JSONObject();
		jsonObj.put("page", opts.getPage());
		return jsonObj;
	}
	
	public String execute() {
		this.setGridPagerParam(opts);
		
		String flag	=	opts.get_search();
		opts.setQueryId(ActionContext.getContext().getSession().get("userId").toString());
		List<Suspect> list	=	null;
		if(flag.equals("true")) {
			list	=	service.doSearchQuery(opts);
		} else {
			list	=	service.doRegularQuery(opts);
		}
		ActionContext.getContext().put("datalist", list);
		ActionContext.getContext().put("bean", Suspect.class);
		ActionContext.getContext().put("jsonObj", getJSONObject());
		return "SUCCESS";
	}
	
	private static final long serialVersionUID = -5705886992650521426L;
}
