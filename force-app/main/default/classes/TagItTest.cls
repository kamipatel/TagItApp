@isTest
public class TagItTest {

    @testSetup 
    static void setup() {
        // Create common test accounts
        Profile p = [SELECT Id FROM Profile WHERE Name='Standard User'];
       
        User u = new User(Alias = 'standt', Email='kamipatel@gmail.com',
                          EmailEncodingKey='UTF-8', LastName='Testing', LanguageLocaleKey='en_US',
                          LocaleSidKey='en_US', ProfileId = p.Id,
                          TimeZoneSidKey='America/Los_Angeles', UserName='tagtest@salesforce.com');
        insert u;
       
        // Query your permission set name from Organization that your want to test.
        PermissionSet ps = [SELECT Id FROM PermissionSet WHERE Name = 'TagitPerms'];
       
        // Assign the above inserted user for the above Permission Set.
        PermissionSetAssignment psa = new PermissionSetAssignment();
        psa.AssigneeId = u.Id;
        psa.PermissionSetId = ps.Id;
        insert psa;

    }

    @isTest 
    static void testTagFunctions() {

        User u = [select Id, Email from User where Email='kamipatel@gmail.com' limit 1];

        System.runAs(u)
        {
            Test.startTest();

            Account a = new Account(Name = 'TestAcct');        
            insert a;
    
            Tag__c t = new Tag__c();        
            t.Name = 'High Profile';
            t.Active__c = true;
            t.Tag_Color__c= 'Green';         
            t.Help_Text__c = 'high profile help';
            insert t;

            TagHelper th = new TagHelper();
            
            
            List<Tag__c> tags = TagHelper.getTags();
            System.assertEquals(1, tags.size());

            String oId = TagHelper.CreateTagLink(a.Id, t.id);

            List<Object_Tag__c> accountTags = TagHelper.getAccountTags(a.Id);
            System.assertEquals(1, accountTags.size());


            TagHelper.SoftDeleteLink(oId);            

            TagHelper.getSomething('DummySuccess');

            Test.stopTest();
        }
    }

    
}