public with sharing class TagHelper {
    public TagHelper() {

    }


@AuraEnabled(cacheable=true)
public static List<Object_Tag__c> getAccountTags(String recordId) {
   return [select Id, Account__r.Id, Tag__r.Id, Tag__r.Name, Tag__r.Tag_Color__c, Tag__r.Help_Text__c, Tag__r.Active__c, Tag__r.Description__c, Tag__r.Category__c from Object_Tag__c where Tag__r.Active__c=true and Account__r.Id=: recordId WITH SECURITY_ENFORCED];
   //return [select Id, Account__r.Id, Tag__r.Id, Tag__r.Name, Tag__r.Tag_Color__c, Tag__r.Help_Text__c, Tag__r.Active__c, Tag__r.Description__c, Tag__r.Category__c from Object_Tag__c where Tag__r.Active__c=true and Account__r.Id=: recordId];
   // return null;
}

@AuraEnabled(cacheable=true)
public static List<Tag__c> getTags() {
   return [select Id, Name, Active__c ,Tag_Color__c, Help_Text__c, Description__c, Category__c from Tag__c where Active__c=true WITH SECURITY_ENFORCED];
   //return [select Id, Name, Active__c ,Tag_Color__c, Help_Text__c, Description__c, Category__c from Tag__c where Active__c=true];
}

@AuraEnabled
public static String CreateTagLink(String recordId, String tagId) {
    Object_Tag__c o = new Object_Tag__c();
    o.Account__c = recordId;
    o.Tag__c = tagId;
    
    insert o;

    return o.Id;
}

@AuraEnabled(cacheable=true)
public static UserRecordAccess getUserRecordAccess(String recordId) {
    return [SELECT RecordId, HasEditAccess FROM UserRecordAccess WHERE UserId = :UserInfo.getUserId() AND RecordId=: recordId];
    //return null;
}


}
