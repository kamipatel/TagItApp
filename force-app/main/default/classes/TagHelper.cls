public with sharing class TagHelper {

    public TagHelper() {

}

@AuraEnabled(cacheable=true)
public static List<Object_Tag__c> getAccountTags(String recordId) {
   return [select Id, IsDeleted__c, Account__r.Id, Tag__r.Id, Tag__r.Name, Tag__r.Tag_Color__c, Tag__r.Help_Text__c, Tag__r.Active__c, Tag__r.Description__c, Tag__r.Category__c from Object_Tag__c where IsDeleted__c=false and Tag__r.Active__c=true and Account__r.Id=: recordId WITH SECURITY_ENFORCED];
}

@AuraEnabled(cacheable=true)
public static List<Tag__c> getTags() {
   return [select Id, Name, Active__c ,Tag_Color__c, Help_Text__c, Description__c, Category__c from Tag__c where Active__c=true WITH SECURITY_ENFORCED];
}

@AuraEnabled
public static String CreateTagLink(String recordId, String tagId) {

    String [] insertFields = new String [] {'tagitapp__account__c',
                                                   'tagitapp__tag__c',
                                                   'tagitapp__isdeleted__c'};       
    // Obtaining the field name/token map for the Object_Tag__c object
    Map<String,Schema.SObjectField> m = Schema.SObjectType.Object_Tag__c.fields.getMap();
    
    for (String fieldToCheck : insertFields) {
      // Check if the user has create access on the each field
      if (!m.get(fieldToCheck).getDescribe().isCreateable()) {
        return 'FLS Error';
      }
    }

    Object_Tag__c o = new Object_Tag__c();
    o.Account__c = recordId;
    o.Tag__c = tagId;    
    o.IsDeleted__c = false;
    insert o;
    return o.Id;
}

@AuraEnabled
public static String SoftDeleteLink(String recordId) {

    String [] updateFields = new String [] {'tagitapp__isdeleted__c'};       
    // Obtaining the field name/token map for the Contact object
    Map<String,Schema.SObjectField> m = Schema.SObjectType.Object_Tag__c.fields.getMap();
    for (String fieldToCheck : updateFields) {
      // Check if the user has create access on the each field
      if (!m.get(fieldToCheck).getDescribe().isUpdateable()) {
        return 'FLS Error';
      }
    }

    Object_Tag__c o = [select Id, IsDeleted__c from Object_Tag__c where Id=:recordId WITH SECURITY_ENFORCED];
    o.IsDeleted__c = true;    
    update o;
    return recordId;
}

@AuraEnabled(cacheable=true)
public static UserRecordAccess getUserRecordAccess(String recordId) {
    return [SELECT RecordId, HasEditAccess FROM UserRecordAccess WHERE UserId = :UserInfo.getUserId() AND RecordId=: recordId WITH SECURITY_ENFORCED];
}

}
