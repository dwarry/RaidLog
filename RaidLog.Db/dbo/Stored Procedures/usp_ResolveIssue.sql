CREATE PROCEDURE [dbo].[usp_ResolveIssue]
    
    @id int,
    @version int,
    @resolvedDate date,
    @resolvedBy nvarchar(50),
    @resolutionDescription nvarchar(512)
    
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;
  
    DECLARE @raisedDate date;

    SELECT @raisedDate = RaisedDate
      FROM [dbo].[Issue] WITH (UPDLOCK) 
     WHERE [Id] = @id;
    
    IF @@ROWCOUNT = 0
        THROW 50001,'No Issue with requested Id',1;

    IF @raisedDate > @resolvedDate 
        THROW 50001, 'Cannot Resolve an Issue before it was Raised.',2;

    UPDATE  [dbo].[Issue]
    SET     [ResolvedDate] = @resolvedDate
           ,[ResolvedBy] = @resolvedBy
           ,[ResolutionDescription] = @resolutionDescription
           ,[UpdatedTimestamp]  = SYSDATETIME()
           ,[UpdatedBy]         = CURRENT_USER
     OUTPUT
            INSERTED.*
     WHERE  [Id] = @id 
     AND    [Version] = @version;
    
END