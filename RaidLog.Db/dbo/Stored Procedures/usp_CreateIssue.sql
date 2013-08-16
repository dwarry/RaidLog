CREATE PROCEDURE [dbo].[usp_CreateIssue]
    @projectId int,
    @raisedBy nvarchar(50),
    @raisedDate date,
    @description nvarchar(2048),
    @workstream nvarchar(50),
    @commentary nvarchar(2048),
    @owner nvarchar(50),
    @ragStatus nvarchar(5),
    @expectedClosureDate date
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
        THROW 50001, 'No Project with that id', 1;
    
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
           ,[UpdatedBy]
           ,[RagStatus]
           ,[PreviousRagStatus]
           ,[DateLastReviewed]
           ,[ExpectedClosureDate])
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
           ,CURRENT_USER
           ,@ragStatus
           ,@ragStatus
           ,SYSDATETIME()
           ,@expectedClosureDate);
    
END