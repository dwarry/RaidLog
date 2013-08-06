/// <reference path="../../Scripts/typings/durandal/durandal.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../Scripts/typings/knockout.validation/knockout.validation.d.ts" />
// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />

import app = require("durandal/app");
import logger = require("services/logger");

export class EditableViewModel<T> {

    item: KnockoutObservable<T>;

    isNewItem: KnockoutComputed<boolean>;

    canSave: KnockoutComputed<boolean>;

    canDelete: KnockoutComputed<boolean>;

    validation: KnockoutValidatedObservable;

    /**
     * @param item The item ()
     */
    constructor(item: KnockoutObservable<T>,
                public itemName: string,
                isNewItem?: () => boolean,
                private savedNewItemCallback?: () => void ) {
            
        this.item = item;

        this.isNewItem = ko.computed(isNewItem || () => this.item === null, this);


    }

    

    activate(){
        this.updateFromItem();
    }

    doSaveItem(): JQueryPromise<T>{
        logger.logWarning("dummy doSaveItem invoked", this, "viewmodels/EditableViewModel", false);

        var dfd = $.Deferred();
        dfd.resolve(null);
        return dfd.promise();
    }

    saveItem() {
        var wasNew = this.isNewItem();

        return this.doSaveItem().done((item, status,jqxhr) =>{
            this.item = item;
            
            if (wasNew && this.savedNewItemCallback) {
                this.savedNewItemCallback();
            }
        });
    }

    updateFromItem(){
        var it = this.item;
        $.each(it, (key, value) => {
            if(key in this && this.hasOwnProperty(key)){
                if(ko.isObservable(this[key])){
                    this[key](value);
                }
                else{
                    this[key] = value;
                }
            }
        });
    }
}
