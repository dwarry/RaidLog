import dlg = require("plugins/dialog");

import ds = require("services/dataService");

import ActionDetails = require("./actionDetails");

class ActionDetailsDialog extends ActionDetails{
	
    constructor(dto: ds.ActionDto)
    {
	    super(dto, (item) => {dlg.close(this, true);});
    }

    cancel(){
	    dlg.close(this, false);
    }
}

export = ActionDetailsDialog;