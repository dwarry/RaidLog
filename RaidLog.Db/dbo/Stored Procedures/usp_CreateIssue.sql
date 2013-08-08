CREATE PROCEDURE [dbo].[usp_CreateIssue]
    @projectId int,
    @raisedBy nvarchar(50),
    @raisedDate date,
    @description nvarchar(2048),
    @workstream nvarchar(50),
    @commentary nvarchar(2048),
    @owner nvarchar(50)
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @issueNumbers Table(issueNo int);
    DECLARE	@issueNumber int;

    UPDATE dbo.Project
    set NextIssueNumber = NextIssueNumber + 1
    output deleted.NextIssueNumber into @issueNumbers
    where Id = @projectId;
    
    if @@ROWCOUNT = 0
        RETURN 1;
    
    select @issueNumber = issueNo
    from @issueNumbers;	

    INSERT INTO [dbo].[Issue]
           ([ProjectId]
           ,[IssueNumber]
           ,[Description]
           ,[RaisedDate]
           ,[RaisedBy]
           ,[Workstream]
           ,[Commentary]
           ,[UpdatedTimestamp]
           ,[UpdatedBy])
     OUTPUT
            INSERTED.*
     VALUES
           (@projectId
           ,@issueNumber
           ,@description
           ,@raisedDate
           ,@raisedBy
           ,@workstream
           ,@commentary
           ,SYSDATETIME()
           ,CURRENT_USER);
    
    RETURN 0;
END